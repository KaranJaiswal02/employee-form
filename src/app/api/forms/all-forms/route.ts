import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user";
import BankMandateForm from "@/models/forms/bank-mandate";
import GratuityForm from "@/models/forms/gratuity-form";
import IdCardForm from "@/models/forms/idcard-form";
import NominationForm1 from "@/models/forms/nomination-form1";
import NominationForm2 from "@/models/forms/nomination-form2";
import FamilyDetailsForm from "@/models/forms/staff-family-members";
import StaffJoiningForm from "@/models/forms/staffjoin_form";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import IAPIResponse from "@/types/responseType";

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const xUserId = req.headers.get("x-userid") as string;
        const staffId = req.headers.get("userid") as string;
        const role = req.headers.get("x-userrole") as string;

        const actualUserId = staffId !== "null" && role === "admin" ? staffId : xUserId;

        if (!actualUserId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    errors: ["User ID is missing from headers"],
                },
                { status: 401 }
            );
        }

        const currentUser = await User.findById(xUserId).lean<IUser | null>();
        interface IUser {
            bankMandateForm?: string;
            gratuityForm?: string;
            idCardForm?: string;
            nominationForm1?: string;
            nominationForm2?: string;
            familyDetailsForm?: string;
            staffJoiningForm?: string;
            name: string;
            email: string;
            role: string;
        }

        const user = await User.findById(actualUserId).lean<IUser>();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                    errors: ["No user found with the provided ID"],
                },
                { status: 404 }
            );
        }

        // Fetch referenced form documents individually
        const [
            bankMandateFormData,
            grauFormData,
            idCardFormData,
            nominationForm1Data,
            nominationForm2Data,
            staffFamilyFormData,
            empFormData,
        ] = await Promise.all([
            BankMandateForm.findById(user.bankMandateForm).select("-_id -userId -__v -createdAt -updatedAt").lean(),
            GratuityForm.findById(user.gratuityForm).select("-_id -userId -__v -createdAt -updatedAt").lean(),
            IdCardForm.findById(user.idCardForm).select("-_id -userId -__v -createdAt -updatedAt").lean(),
            NominationForm1.findById(user.nominationForm1).select("-_id -userId -__v -createdAt -updatedAt").lean(),
            NominationForm2.findById(user.nominationForm2).select("-_id -userId -__v -createdAt -updatedAt").lean(),
            FamilyDetailsForm.findById(user.familyDetailsForm).select("-_id -userId -__v -createdAt -updatedAt").lean(),
            StaffJoiningForm.findById(user.staffJoiningForm).select("-_id -userId -__v -createdAt -updatedAt").lean(),
        ]);

        const response: IAPIResponse = {
            success: true,
            message: "Form data fetched successfully",
            errors: [],
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
                currentUserRole: currentUser?.role,
                currentUserName: currentUser?.name,
                forms: {
                    bankMandateFormData,
                    grauFormData,
                    idCardFormData,
                    nominationForm1Data,
                    nominationForm2Data,
                    staffFamilyFormData,
                    empFormData,
                },
            },
        };

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.log("Error in GET /user-forms:", error);

        let errorMessage = "Internal Server Error";
        let errorDetails = ["An unexpected error occurred"];
        let statusCode = 500;

        if (error instanceof mongoose.Error.CastError) {
            errorMessage = "Invalid User ID";
            errorDetails = ["The provided user ID is not valid"];
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
