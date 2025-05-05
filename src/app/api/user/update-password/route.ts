import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/bcrypt";

export async function PATCH(req: NextRequest) {
    await dbConnect();

    try {
        const role = req.headers.get("x-userrole");
        if (role !== "admin") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    errors: ["Only admins can update user passwords"],
                },
                { status: 403 }
            );
        }

        const { userId, newPassword } = await req.json();

        if (!userId || !newPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields",
                    errors: ["userId and newPassword are required"],
                },
                { status: 400 }
            );
        }

        const user = await User.findById(userId);
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

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: "Password updated successfully",
                errors: [],
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
                errors: ["An unexpected error occurred"],
            },
            { status: 500 }
        );
    }
}
