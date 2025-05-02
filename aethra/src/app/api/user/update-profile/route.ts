import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';

export default async function Handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id, name, phone } = req.body;

    try {
      const updatedUser = await db.user.update({
        where: { id: id },  
        data: {
          name,
          phone,
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}