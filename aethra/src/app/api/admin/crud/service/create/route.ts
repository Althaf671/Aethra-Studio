import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, price, image, available, deadline } = req.body;

    try {
      const newService = await prisma.service.create({
        data: {
          title,
          description,
          price,
          image,
          available,
          deadline: new Date(deadline), 
        },
      });
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create service' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}