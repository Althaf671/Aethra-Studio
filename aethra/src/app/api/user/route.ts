import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as z from 'zod';


// Define a schema for input validation
const userSchema = z 
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z 
            .string()
            .min(1, 'password is required')
            .min(8, 'password must have than 8 characters'),
    })

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        // check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if(existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exist :(" }, { status: 409})
        }

        // check if email already exists
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if(existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username already exist :(" }, { status: 409 })
        }

        // Encrypt password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        });

        const { password: newUserPassword, ...rest } = newUser

        return NextResponse.json({ user: rest, message: "user created succesfully" }, { status: 201 })
    } catch(error) {
        return NextResponse.json({ message: "ada yang salah njir" }, { status: 500 });
    }
}




