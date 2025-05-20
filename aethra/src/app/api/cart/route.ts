import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const cartItems = await db.cart.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        service: true,
      },
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, serviceId, quantity } = body;

    if (!userId || !serviceId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existingItem = await db.cart.findFirst({
      where: {
        userId,
        serviceId,
      },
    });

    if (existingItem) {
     
      const updated = await db.cart.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + (quantity || 1) },
      });

      return NextResponse.json(updated);
    }

    const newItem = await db.cart.create({
      data: {
        userId,
        serviceId,
        quantity: quantity || 1,
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}