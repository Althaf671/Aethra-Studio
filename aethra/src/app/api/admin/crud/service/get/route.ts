import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const services = await prisma.service.findMany();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}