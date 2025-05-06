// pages/api/services/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const service = await prisma.service.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}