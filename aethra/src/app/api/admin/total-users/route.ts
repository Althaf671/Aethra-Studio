import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db'; 
import { NextResponse } from 'next/server';

/*==== API Handler ===*/
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const totalUsers = await db.user.count(); 

        return NextResponse.json({ totalUsers });
    } catch (error) {
        console.error("Error fetching total users:", error);
        return NextResponse.json({ error: 'Failed to fetch total users' }, { status: 500 });
    }
}