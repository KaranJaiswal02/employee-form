import dbConnect from "@/lib/dbConnect";
import NominationForm2DataModel from "@/models/forms/nomination-form2";
import { NominationForm2Document } from "@/models/forms/nomination-form2";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import IAPIResponse from "@/types/responseType";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const body: NominationForm2Document = await req.json();
        
        // Validate request body
        if (!body) {
            const response: IAPIResponse = {
                success: false,
                message: "Invalid request data",
                errors: ["Request body is missing or malformed"],
            };
            return NextResponse.json(response, { status: 400 });
        }

        // Create new Nomination Form 2 entry
        const nominationForm2Data = new NominationForm2DataModel(body);
        const savedNominationForm2Data = await nominationForm2Data.save();

        const response: IAPIResponse = {
            success: true,
            message: "Nomination Form 2 submitted successfully",
            errors: [],
            data: savedNominationForm2Data,
        };
        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.log("Error in POST /nomination-form2:", error);

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
