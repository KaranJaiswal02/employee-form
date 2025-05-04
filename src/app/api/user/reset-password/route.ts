import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import IAPIResponse from "@/types/responseType";
import { verifyPassword, hashPassword } from "@/lib/bcrypt";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { oldPassword, newPassword } = await req.json();
        const userId = req.headers.get("x-userid");
        const role = req.headers.get("x-userrole");

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
                errors: ["User ID is missing from headers"],
            }, { status: 401 });
        }

        if (!oldPassword || !newPassword) {
            return NextResponse.json({
                success: false,
                message: "Missing Fields",
                errors: ["Both old and new passwords are required"],
            }, { status: 400 });
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User Not Found",
                errors: ["No user found with the provided ID"],
            }, { status: 404 });
        }

        const isValid = await verifyPassword(oldPassword, user.password);
        if (!isValid) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials",
                errors: ["Old password is incorrect"],
            }, { status: 401 });
        }

        user.password = await hashPassword(newPassword);
        await user.save();

        const response: IAPIResponse = {
            success: true,
            message: "Password reset successfully",
            errors: [],
        };

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error("Error in POST /reset-password:", error);

        const response: IAPIResponse = {
            success: false,
            message: "Internal Server Error",
            errors: ["An unexpected error occurred"],
        };

        return NextResponse.json(response, { status: 500 });
    }
}
