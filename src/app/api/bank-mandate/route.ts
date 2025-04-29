import dbConnect from "@/lib/dbConnect";
import IbankMandateDataModel from "@/models/bank-mandate";
import { BankMandateFormData } from "@/models/bank-mandate";
import mongoose from "mongoose";

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body: BankMandateFormData = await req.json();
        // console.log(body)

        // Validate request body
        if (!body) {
            return Response.json({ message: "Invalid request data" }, { status: 400 });
        }

        const bankMandateForm = new IbankMandateDataModel(body);
        const savedBankMandateForm = await bankMandateForm.save();

        return Response.json({
            message: "Bank Mandate Form submitted successfully",
            data: savedBankMandateForm
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
