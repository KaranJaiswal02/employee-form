import dbConnect from "@/lib/dbConnect";
import NominationForm1DataModel from "@/models/forms/nomination-form1";
import { NominationForm1Document } from "@/models/forms/nomination-form1";
import mongoose from "mongoose";

export async function POST(req: Request) {
    await dbConnect();
    
    try {
        const body: NominationForm1Document = await req.json();
        // console.log(body)
        
        // Validate request body
        if (!body) {
            return Response.json({ message: "Invalid request data" }, { status: 400 });
        }

        const nominationForm1Data = new NominationForm1DataModel(body);
        const savedNominationForm1Data = await nominationForm1Data.save();
        
        return Response.json({ 
            message: "Nomination Form 1 submitted successfully", 
            data: savedNominationForm1Data 
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
