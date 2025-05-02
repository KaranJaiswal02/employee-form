import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import IAPIResponse from "@/types/responseType";

export async function PATCH(req: NextRequest) {
    await dbConnect();

    try {
        const xUserId = req.headers.get("x-userid");
        const role = req.headers.get("x-userrole");

        if (role !== "admin") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    errors: ["Only admins can perform this action"],
                },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { userId: targetUserId } = body;

        if (!targetUserId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing userId in request body",
                    errors: ["userId is required"],
                },
                { status: 400 }
            );
        }

        if (xUserId === targetUserId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cannot change your own role",
                    errors: ["Admins cannot toggle their own role"],
                },
                { status: 400 }
            );
        }

        const user = await User.findById(targetUserId);

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

        user.role = user.role === "admin" ? "user" : "admin";
        await user.save();

        const response: IAPIResponse = {
            success: true,
            message: `User role updated to '${user.role}'`,
            errors: [],
            data: { userId: user._id, newRole: user.role },
        };

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error("Error in PATCH /users/toggle-role:", error);

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
