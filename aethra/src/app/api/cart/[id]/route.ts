import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const cartItemId = parseInt(params.id);

    const deleted = await db.cart.delete({
      where: {
        id: cartItemId,
      },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}