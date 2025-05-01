import dbConnect from "@/lib/dbConnect";
import NominationForm1DataModel from "@/models/forms/nomination-form1";
import { NominationForm1Document } from "@/models/forms/nomination-form1";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import IAPIResponse from "@/types/responseType";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const body: NominationForm1Document = await req.json();
        
        // Validate request body
        if (!body) {
            const response: IAPIResponse = {
                success: false,
                message: "Invalid request data",
                errors: ["Request body is missing or malformed"],
            };
            return NextResponse.json(response, { status: 400 });
        }

        // Create new Nomination Form 1 entry
        const nominationForm1Data = new NominationForm1DataModel(body);
        const savedNominationForm1Data = await nominationForm1Data.save();

        const response: IAPIResponse = {
            success: true,
            message: "Nomination Form 1 submitted successfully",
            errors: [],
            data: savedNominationForm1Data,
        };
        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.log("Error in POST /nomination-form1:", error);
        
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
