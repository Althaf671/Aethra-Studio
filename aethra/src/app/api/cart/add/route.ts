import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { serviceId, userId, quantity } = body;

  if (!userId || !serviceId || !quantity) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const existing = await db.cart.findFirst({
      where: {
        userId,
        serviceId,
      },
    });

    if (existing) {
      await db.cart.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await db.cart.create({
        data: {
          userId,
          serviceId,
          quantity,
        },
      });
    }

    return NextResponse.json({ message: 'Added to cart' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}