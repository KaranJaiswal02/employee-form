import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import IAPIResponse from "@/types/responseType";

export async function GET(req: NextRequest) {
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

        const omitFields = "-_id -userId -__v -createdAt -updatedAt";

        const user = await User.findById(actualUserId)
            .populate("staffJoiningForm", omitFields)
            .populate("idCardForm", omitFields)
            .populate("familyDetailsForm", omitFields)
            .populate("bankMandateForm", omitFields)
            .populate("nominationForm1", omitFields)
            .populate("gratuityForm", omitFields)
            .populate("nominationForm2", omitFields);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                    errors: ["No user found with the provided ID"],
                },
                { status: 404 }
            );
        }

        const response: IAPIResponse = {
            success: true,
            message: "Form data fetched successfully",
            errors: [],
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
                forms: {
                    bankMandateFormData: user.bankMandateForm,
                    grauFormData: user.gratuityForm,
                    idCardFormData: user.idCardForm,
                    nominationForm1Data: user.nominationForm1,
                    nominationForm2Data: user.nominationForm2,
                    staffFamilyFormData: user.familyDetailsForm,
                    empFormData: user.staffJoiningForm,
                },
            },
        };

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error("Error in GET /user-forms:", error);

        let errorMessage = "Internal Server Error";
        let errorDetails = ["An unexpected error occurred"];
        let statusCode = 500;

        if (error instanceof mongoose.Error.CastError) {
            errorMessage = "Invalid User ID";
            errorDetails = ["The provided user ID is not valid"];
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
