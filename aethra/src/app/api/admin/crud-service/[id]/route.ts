import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // ambil id dari URL

  const body = await request.json();
  const { title, description, price, image, available, deadline } = body;

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
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  try {
    await db.service.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}