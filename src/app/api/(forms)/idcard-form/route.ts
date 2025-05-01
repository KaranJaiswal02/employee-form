import dbConnect from "@/lib/dbConnect";
import IdCardFormDataModel from "@/models/idcard-form";
import { IdCardFormData } from "@/models/idcard-form";
import mongoose from "mongoose";

export async function POST(req: Request) {
    await dbConnect();
    
    try {
        const body: IdCardFormData = await req.json();
        // console.log(body)
        
        // Validate request body
        if (!body) {
            return Response.json({ message: "Invalid request data" }, { status: 400 });
        }

        const idCardForm = new IdCardFormDataModel(body);
        const savedIdCardForm = await idCardForm.save();
        
        return Response.json({ 
            message: "Id Card Form submitted successfully", 
            data: savedIdCardForm 
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
