import { db } from "@/lib/db";
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import * as z from 'zod';

// Define a schema for input validation
const userSchema = z 
    .object({
        name: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z 
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters'),
    });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Validasi input menggunakan Zod
        const { email, name, password } = userSchema.parse(body);

        // Cek apakah email atau nama sudah ada di database
        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { name: name },
                ],
            },
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json({ user: null, message: "User with this email already exists." }, { status: 409 });
            }
            if (existingUser.name === name) {
                return NextResponse.json({ user: null, message: "User with this name already exists." }, { status: 409 });
            }
        }

        // Encrypt password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Hapus field password sebelum mengembalikan data user
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully." }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                message: 'Invalid input data',
                details: error.errors, // Mengirimkan error spesifik dari Zod
            }, { status: 400 });
        }
        
        // Tangani error lainnya
        console.error(error);
        return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
    }
}