'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AdminSidebar from '@/app/components/adminComponents/sideBar';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  deadline: string;
}

export default function CrudService() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/admin/crud-service/read');
      const data = await res.json();
      setServices(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/admin/crud-service/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setServices((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="relative container p-4 max-w-xl mx-auto ">

      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      <div className={`flex justify-between items-center border-b-2 pb-3 ${open ? "opacity-50" : "opacity-100"} transition-opacity duration-300 ease-in-out`}>
        <div className="flex gap-1 items-center">
          <Image
            src="/images/misc/whiteMenu.png"
            alt="Menu"
            width={24}
            height={24}
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          />
          <h1 className="text-xl font-semibold">Service Editor</h1>
        </div>

        <div className="flex gap-2">
          <Image
            src="/images/adminAssets/add-button.svg"
            alt="Add Service"
            width={24}
            height={24}
            onClick={() => router.push('/admin/formcreate')}
            className="cursor-pointer"
          />
          <Image
            src="/images/adminAssets/delete-button.svg"
            alt="Delete Service"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-3">
        {services.length > 0 ? (
          services.map((service) => (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
              <div key={service.id} className="w-fit flex flex-col border p-3 rounded-xl mb-2 text-xs justify-between">
              <h1>{service.title}</h1>
              {service.image && (
              <div className="mt-2">
                <Image
                  src={service.image}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="rounded-[7px] object-cover"
                />
              </div>
              )}
              <div className='flex w-full justify-between mt-1'>
                <p className='price-color text-[14px]'>Rp{service.price}</p>
              </div>
              <p className='text-[14px]'>{service.description}</p>

              <button
              type='button'
                onClick={() => handleDelete(service.id)}
                className="text-white bg-red hover:opacity-80 underline cursor-pointer px-4 py-2 rounded-xl"
              >
                Delete
              </button>
            </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No services found.</p>
        )}
      </div>
    </div>
  );
}