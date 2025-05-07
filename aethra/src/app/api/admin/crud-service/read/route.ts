import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    const service = await db.service.findMany();
    return NextResponse.json(service)
}