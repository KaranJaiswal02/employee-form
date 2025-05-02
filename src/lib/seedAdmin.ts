import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user";
import { hashPassword } from "./bcrypt";

export async function seedAdmin() : Promise<string> {
    await dbConnect();

    const adminEmail = process.env.ADMIN_EMAIL || "";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    if (!adminEmail || !adminPassword) {
        console.error("Admin email or password not set in environment variables.");
        return "Admin email or password not set in environment variables.";
    }    

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
        console.log("✅ Admin user already exists.");
        return "✅ Admin user already exists.";
    }

    const newAdmin = new User({
        email: adminEmail,
        password: await hashPassword(adminPassword),
        role: "admin",
    });

    await newAdmin.save();
    console.log("🎉 Admin user created successfully.");
    return "🎉 Admin user created successfully.";
}
