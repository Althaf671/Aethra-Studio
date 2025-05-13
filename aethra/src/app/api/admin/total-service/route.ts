import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const total = await db.service.count();
    return NextResponse.json({ total }); 
  } catch (error) {
    console.error('Error fetching service count:', error);
    return NextResponse.json({ total: 0 }, { status: 500 });
  }
}