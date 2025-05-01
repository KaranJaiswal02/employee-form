import dbConnect from "@/lib/dbConnect";
import EmpJoinForm from "@/models/forms/empjoin_form";
import { IEmpFormData } from "@/models/forms/empjoin_form";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import IAPIResponse from "@/types/responseType";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const body: IEmpFormData = await req.json();
        
        // Validate request body
        if (!body) {
            const response: IAPIResponse = {
                success: false,
                message: "Invalid request data",
                errors: ["Request body is missing or malformed"],
            };
            return NextResponse.json(response, { status: 400 });
        }

        // Create new Employee Join form entry
        const empJoinForm = new EmpJoinForm(body);
        const savedEmpJoinForm = await empJoinForm.save();

        const response: IAPIResponse = {
            success: true,
            message: "Employee Join Form submitted successfully",
            errors: [],
            data: savedEmpJoinForm,
        };
        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.log("Error in POST /empjoin-form:", error);

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
