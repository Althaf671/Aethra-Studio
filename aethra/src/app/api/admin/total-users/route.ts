import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/*==== API Handler ===*/
export async function GET(request: Request) {
  try {
    const totalUsers = await db.user.count();
    return NextResponse.json({ totalUsers });
  } catch (error) {
    console.error("Error fetching total users:", error);
    return NextResponse.json({ error: 'Failed to fetch total users' }, { status: 500 });
  }
}