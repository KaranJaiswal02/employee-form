import dbConnect from "@/lib/dbConnect";
import IempFamilyDataModel from "@/models/forms/staff-family-members";
import { StaffFamilyFormData } from "@/models/forms/staff-family-members";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import IAPIResponse from "@/types/responseType";
import { User } from "@/models/user/user";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const xUserId = req.headers.get("x-userid");
        const staffId = req.headers.get("userid");
        const role = req.headers.get("x-userrole");

        const actualUserId = role === "admin" ? staffId : xUserId;

        if (!actualUserId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    errors: ["User ID is missing from headers"],
                },
                { status: 401 }
            );
        }

        const body: StaffFamilyFormData = await req.json();

        if (!body) {
            const response: IAPIResponse = {
                success: false,
                message: "Invalid request data",
                errors: ["Request body is missing or malformed"],
            };
            return NextResponse.json(response, { status: 400 });
        }

        // Check if form already exists for this user
        const existingForm = await IempFamilyDataModel.findOne({ userId: actualUserId });

        let result;
        if (existingForm) {
            await IempFamilyDataModel.updateOne({ userId: actualUserId }, { $set: body });
            result = await IempFamilyDataModel.findOne({ userId: actualUserId });
        } else {
            const newForm = new IempFamilyDataModel({ ...body, userId: actualUserId });
            result = await newForm.save();
        }

        await User.updateOne(
            { _id: actualUserId },
            { $set: { familyDetailsForm: result._id } }
        );

        const response: IAPIResponse = {
            success: true,
            message: "Family Member Form saved successfully",
            errors: [],
            data: result,
        };
        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error("Error in POST /staff-family-members:", error);

        let errorMessage = "Internal Server Error";
        let errorDetails = ["An unexpected error occurred"];
        let statusCode = 500;

        if (error instanceof mongoose.Error.ValidationError) {
            errorMessage = "Validation Error";
            errorDetails = [error.message];
            statusCode = 400;
        } else if (error instanceof SyntaxError) {
            errorMessage = "Invalid JSON format";
            errorDetails = ["The request body is not properly formatted"];
            statusCode = 400;
        }

        const response: IAPIResponse = {
            success: false,
            message: errorMessage,
            errors: errorDetails,
        };
        return NextResponse.json(response, { status: statusCode });
    }
}
