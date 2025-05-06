import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'PUT') {
    const { title, description, price, image, available, deadline } = req.body;

    try {
      const updatedService = await prisma.service.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          price,
          image,
          available,
          deadline: new Date(deadline), 
        },
      });

      res.status(200).json(updatedService);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update service' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}