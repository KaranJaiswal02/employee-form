import dbConnect from "@/lib/dbConnect";
import EmpJoinForm from "@/models/forms/staffjoin_form";
import { IEmpFormData } from "@/models/forms/staffjoin_form";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import IAPIResponse from "@/types/responseType";
import { User } from "@/models/user";

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

        const body: IEmpFormData = await req.json();

        if (!body) {
            const response: IAPIResponse = {
                success: false,
                message: "Invalid request data",
                errors: ["Request body is missing or malformed"],
            };
            return NextResponse.json(response, { status: 400 });
        }

        // Check if form already exists for this user
        const existingForm = await EmpJoinForm.findOne({ userId: actualUserId });

        let result;
        if (existingForm) {
            // Update existing form
            await EmpJoinForm.updateOne({ userId: actualUserId }, { $set: body });
            result = await EmpJoinForm.findOne({ userId: actualUserId });
        } else {
            // Create new form
            const newForm = new EmpJoinForm({ ...body, userId: actualUserId });
            result = await newForm.save();
        }

        await User.updateOne(
            { _id: actualUserId },
            { $set: { staffJoiningForm: result._id } }
        );

        const response: IAPIResponse = {
            success: true,
            message: "Employee Join Form saved successfully",
            errors: [],
            data: result,
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Error in POST /empjoin-form:", error);

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