// pages/services.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    }

    fetchServices();
  }, []);

  const handleAddToCart = async (serviceId: number) => {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId, quantity: 1 }),
    });

    if (response.ok) {
      alert('Service added to cart!');
    }
  };

  return (
    <div className='mt-20'>
      <h1>All Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service: any) => (
          <div key={service.id} className="bg-white p-4 rounded shadow">
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-2 font-bold">{service.title}</h3>
            <p>{service.description}</p>
            <p className="text-xl font-semibold">${service.price}</p>
            <button
              onClick={() => handleAddToCart(service.id)}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add to Cart
            </button>
            <Link href={`/service/${service.id}`}>
              <a className="block mt-2 text-blue-500">View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}