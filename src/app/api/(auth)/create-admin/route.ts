import { NextResponse } from "next/server";
import { seedAdmin } from "@/lib/seedAdmin";

export async function GET() {
    try {
        const message = await seedAdmin() as string;
        return NextResponse.json({ success: true, message });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message || "An error occurred" }, { status: 500 });
    }
}
