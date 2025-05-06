import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deletedService = await prisma.service.delete({
        where: { id: Number(id) },
      });

      res.status(200).json(deletedService);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete service' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}