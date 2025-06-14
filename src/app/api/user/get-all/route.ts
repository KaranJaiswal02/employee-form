import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import IAPIResponse from "@/types/responseType";
import { BankMandateFormData } from "@/models/forms/bank-mandate";
import { IGratuityForm } from "@/models/forms/gratuity-form";
import { IdCardFormData } from "@/models/forms/idcard-form";
import { NominationForm1Model } from "@/models/forms/nomination-form1";
import { NominationForm2Model } from "@/models/forms/nomination-form2";
import { StaffFamilyFormData } from "@/models/forms/staff-family-members";
import { IEmpFormData } from "@/models/forms/staffjoin_form";

interface UserFormData {
    _id: string;
    name: string;
    email: string;
    role: string;
    bankMandateForm?: BankMandateFormData;
    gratuityForm?: IGratuityForm;
    idCardForm?: IdCardFormData;
    nominationForm1?: NominationForm1Model;
    nominationForm2?: NominationForm2Model;
    familyDetailsForm?: StaffFamilyFormData;
    staffJoiningForm?: IEmpFormData;
    [key: string]: unknown;
}

interface UserWithStatus extends Omit<UserFormData,
    'bankMandateForm' |
    'gratuityForm' |
    'idCardForm' |
    'nominationForm1' |
    'nominationForm2' |
    'familyDetailsForm' |
    'staffJoiningForm'> {
    status: "Completed" | "Pending";
}

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const xUserId = req.headers.get("x-userid");
        const role = req.headers.get("x-userrole");
        const omitCurrentUser = req.headers.get("omit-current-user") === "true";
        // const size = parseInt(req.headers.get("size") as string) || 10;
        // const page = parseInt(req.headers.get("page") as string) || 1;
        // const size = parseInt(req.nextUrl.searchParams.get("size") || "0");
        // const page = parseInt(req.nextUrl.searchParams.get("page") || "0");

        if (!xUserId || !role) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized Access",
                    errors: ["Missing authentication token"],
                },
                { status: 401 }
            );
        }

        if (role !== "admin") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    errors: ["Only admins can access this resource"],
                },
                { status: 403 }
            );
        }

        const filter = omitCurrentUser ? { _id: { $ne: xUserId } } : {};

        const rawUsers = (await User.find(filter, {
            password: 0,
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
        })
            .lean()
            .sort({ updatedAt: -1 })) as unknown as UserFormData[];
            // .skip((page - 1) * size).limit(size);

        const users: UserWithStatus[] = rawUsers.map((user) => {
            const {
                bankMandateForm,
                gratuityForm,
                idCardForm,
                nominationForm1,
                nominationForm2,
                familyDetailsForm,
                staffJoiningForm,
                ...rest
            } = user;

            const isCompleted =
                !!bankMandateForm &&
                !!gratuityForm &&
                !!idCardForm &&
                !!nominationForm1 &&
                !!nominationForm2 &&
                !!familyDetailsForm &&
                !!staffJoiningForm;

            return {
                ...rest,
                _id: user._id,
                status: isCompleted ? "Completed" : "Pending",
            };
        });

        const response: IAPIResponse = {
            success: true,
            message: "Users fetched successfully",
            errors: [],
            data: users,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.log("Error in GET /users/all:", error);

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
