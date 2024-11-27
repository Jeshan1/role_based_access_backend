import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";

export const adminSeeder = async () => {
    try {
        const user = await User.findOne({ role: "admin" });

        if (user) {
            console.log("Admin already exists");
        } else {
            const hashedPassword = await bcrypt.hash("password", 10); // Hash the password

            await User.create({
                email: "admin1@gmail.com",
                username: "admin",
                password: hashedPassword, // Store the hashed password
                role: "admin",
            });

            console.log("Admin seeded successfully");
        }
    } catch (error) {
        console.error("Error seeding admin user:", error.message);
    }
};
