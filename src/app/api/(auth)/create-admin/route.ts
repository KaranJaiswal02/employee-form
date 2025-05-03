import { NextResponse } from "next/server";
import { seedAdmin } from "@/lib/seedAdmin";

export async function GET() {
    const message = await seedAdmin() as string;
    return NextResponse.json({ success: true, message });
}
