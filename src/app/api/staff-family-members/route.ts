import dbConnect from "@/lib/dbConnect";
import IempFamilyDataModel from "@/models/staff-family-members";
import { StaffFamilyFormData } from "@/models/staff-family-members";
import mongoose from "mongoose";

export async function POST(req: Request) {
    await dbConnect();
    
    try {
        const body: StaffFamilyFormData = await req.json();
        if (!body) {
            return Response.json({ message: "Invalid request data" }, { status: 400 });
        }

        const familyForm = new IempFamilyDataModel(body);
        const savedFamilyForm = await familyForm.save();
        
        return Response.json({ 
            message: "Family Member Form submitted successfully", 
            data: savedFamilyForm 
        }, { status: 201 });
        
    } catch (error) {
        console.log("Error in POST /idcard-form:", error);
        
        let errorMessage = "Internal Server Error";
        let statusCode = 500;
        
        if (error instanceof mongoose.Error.ValidationError) {
            errorMessage = "Validation Error";
            statusCode = 400;
        } else if (error instanceof SyntaxError) {
            errorMessage = "Invalid JSON format";
            statusCode = 400;
        }
        
        return Response.json({ message: errorMessage }, { status: statusCode });
    }
}
