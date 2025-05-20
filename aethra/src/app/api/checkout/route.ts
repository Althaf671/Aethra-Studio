import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {

});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }
  const cartItems = [
    {
      name: 'Design Service',
      amount: 1500000,
      quantity: 1,
    },
    {
      name: 'Landing Page Build',
      amount: 2500000,
      quantity: 1,
    },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Stripe VA needs third-party in ID
      mode: 'payment',
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'idr',
          product_data: { name: item.name },
          unit_amount: item.amount,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
}