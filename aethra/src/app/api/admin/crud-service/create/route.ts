import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; 

export async function POST(req: NextRequest) {
    const body = await req.json();
    const  { title, description, price, image, available, deadline } = body;

    const createPost = await db.service.create({
    data: {
        title,
        description,
        price,
        image,
        available,
        deadline: new Date(deadline),
      },
    })

    return NextResponse.json(createPost)
}