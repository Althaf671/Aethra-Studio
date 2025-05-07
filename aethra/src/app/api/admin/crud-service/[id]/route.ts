import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await request.json();

    const  { title, description, price, image, available, deadline } = body;

    try {
        const updateService = await db.service.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                price,
                image,
                available,
                deadline: new Date(deadline),
            },
        });
        return NextResponse.json(updateService);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);

    try {
        await db.service.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}