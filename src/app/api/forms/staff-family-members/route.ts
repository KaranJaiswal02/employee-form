import dbConnect from "@/lib/dbConnect";
import IempFamilyDataModel from "@/models/forms/staff-family-members";
import { StaffFamilyFormData } from "@/models/forms/staff-family-members";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import IAPIResponse from "@/types/responseType";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const body: StaffFamilyFormData = await req.json();
        
        // Validate request body
        if (!body) {
            const response: IAPIResponse = {
                success: false,
                message: "Invalid request data",
                errors: ["Request body is missing or malformed"],
            };
            return NextResponse.json(response, { status: 400 });
        }

        // Create new Family Member form entry
        const familyForm = new IempFamilyDataModel(body);
        const savedFamilyForm = await familyForm.save();

        const response: IAPIResponse = {
            success: true,
            message: "Family Member Form submitted successfully",
            errors: [],
            data: savedFamilyForm,
        };
        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.log("Error in POST /staff-family-members:", error);

        let errorMessage = "Internal Server Error";
        let errorDetails = ["An unexpected error occurred"];
        let statusCode = 500;

        // Handle validation and syntax errors
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
