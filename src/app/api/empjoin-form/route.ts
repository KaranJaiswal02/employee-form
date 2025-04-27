import dbConnect from "@/lib/dbConnect";
import EmpJoinForm from "@/models/empjoin_form";
import { IEmpFormData } from "@/models/empjoin_form";
import mongoose from "mongoose";

export async function POST(req: Request) {
    await dbConnect();
    
    try {
        const body: IEmpFormData = await req.json();
        // console.log(body)
        
        // Validate request body
        if (!body) {
            return Response.json({ message: "Invalid request data" }, { status: 400 });
        }

        const empJoinForm = new EmpJoinForm(body);
        const savedEmpJoinForm = await empJoinForm.save();
        
        return Response.json({ 
            message: "Employee Join Form submitted successfully", 
            data: savedEmpJoinForm 
        }, { status: 201 });
        
    } catch (error) {
        console.log("Error in POST /empjoin-form:", error);
        
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
