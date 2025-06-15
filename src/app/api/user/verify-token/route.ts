import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import IAPIResponse from "@/types/responseType";

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const xUserId = req.headers.get("x-userId");
        const xrole = req.headers.get("x-userRole");

        if (!xUserId || !xrole) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    errors: ["User ID or role is missing from headers"],
                },
                { status: 401 }
            );
        }

        const user = await User.findById(xUserId);

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

        const response: IAPIResponse = {
            success: true,
            message: "User found successfully",
            errors: [],
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.log("Error in GET /verify-token:", error);

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
