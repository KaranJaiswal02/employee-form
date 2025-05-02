import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import IAPIResponse from "@/types/responseType";

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const xUserId = req.headers.get("x-userid");
        const role = req.headers.get("x-userrole");

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

        const users = await User.find({ _id: { $ne: xUserId } }, { password: 0, __v: 0, createdAt: 0, updatedAt: 0 });

        const response: IAPIResponse = {
            success: true,
            message: "Users fetched successfully",
            errors: [],
            data: users,
        };

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error("Error in GET /users/all:", error);

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
