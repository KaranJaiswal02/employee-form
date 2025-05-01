import dbConnect from "@/lib/dbConnect";
import NominationForm2DataModel from "@/models/forms/nomination-form2";
import { NominationForm2Document } from "@/models/forms/nomination-form2";
import mongoose from "mongoose";

export async function POST(req: Request) {
    await dbConnect();
    
    try {
        const body: NominationForm2Document = await req.json();
        // console.log(body)
        
        // Validate request body
        if (!body) {
            return Response.json({ message: "Invalid request data" }, { status: 400 });
        }

        const nominationForm2Data = new NominationForm2DataModel(body);
        const savedNominationForm2Data = await nominationForm2Data.save();
        
        return Response.json({ 
            message: "Nomination Form 2 submitted successfully", 
            data: savedNominationForm2Data 
        }, { status: 201 });
        
    } catch (error) {
        console.log("Error in POST /idcard-form:", error);
        
        let errorMessage = "Internal Server Error";
        let statusCode = 500;
        
        if (error instanceof mongoose.Error.ValidationError) {
            errorMessage = `Validation Error: ${error.message}`;
            statusCode = 400;
        } else if (error instanceof SyntaxError) {
            errorMessage = "Invalid JSON format";
            statusCode = 400;
        }
        
        return Response.json({ message: errorMessage }, { status: statusCode });
    }
}
