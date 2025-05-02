import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';


/*==== API Handler ===*/
export async function GET() {
    return NextResponse.json(
       { hello: 'World'}
    )
}