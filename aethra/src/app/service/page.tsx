// pages/services.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';


interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  deadline: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/admin/crud-service/read');
      const data = await res.json();
      setServices(data);
    }
    fetchData();
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
    <div className='mt-20 mx-5 pb-26'>
      {services.length > 0 ? (
             <div className="flex min-w-1/3 justify-between gap-4">
               {services.map((service) => (
                 <div
                   key={service.id}
                   className="border p-3 w-[200px] rounded-xl text-xs flex flex-col justify-between relative"
                 >

   
                   <h1 className="text-lg font-semibold">{service.title}</h1>
   
                   {service.image && (
                     <div className="mt-2">
                       <Image
                         src={service.image}
                         alt="Preview"
                         width={200}
                         height={200}
                         className="rounded-[7px] object-cover"
                       />
                     </div>
                   )}
   
                   <div className="flex w-full justify-between mt-1">
                     <p className="price-color text-[14px]">Rp{service.price}</p>
                   </div>
                   <p className="text-[14px]">{service.description}</p>
                 </div>
               ))}
             </div>
           ) : (
             <p className="text-gray-500 mt-4">No services found.</p>
           )}
    </div>
  );
}