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
  const [totalService, setTotalService] = useState<number>(0);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [resServices, resCount] = await Promise.all([
          fetch('/api/admin/crud-service/read'),
          fetch('/api/admin/total-service'),
        ]);

        if (resServices.ok) {
          const serviceData = await resServices.json();
          setServices(serviceData);
        } else {
          console.error('Error fetching services:', await resServices.text());
        }

        if (resCount.ok) {
          const countData = await resCount.json();
          setTotalService(countData.total || 0);
        } else {
          console.error('Error fetching count:', await resCount.text());
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/admin/crud-service/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setServices((prev) => prev.filter((item) => item.id !== id));
      setTotalService((prev) => prev - 1);
    }
  };

  const toggleSelected = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      alert('Choose at least one service to be deleted.');
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete these services?');
    if (!confirmDelete) return;

    await Promise.all(selectedIds.map((id) => handleDelete(id)));
    setDeleteMode(false);
    setSelectedIds([]);
  };

  return (
    <div className="relative container p-4 pb-28 max-w-xl mx-auto">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      <div className={`flex justify-between items-center border-b-2 pb-3 ${open ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300 ease-in-out`}>
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
      </div>

      {/* Controller */}
      <div className='flex flex-col justify-between mt-5 gap-3'>
        <div className='text-xl w-full text-gray-600 bg-white px-6 py-2.5 rounded-lg font-semibold'>
          Active Service: {totalService}
        </div>

        <div className='flex justify-between'>
          <div
            onClick={() => router.push('/admin/formcreate')}
            className='text-xl bg-card px-6 py-2.5 rounded-lg font-semibold cursor-pointer'
          >
            Add Service
          </div>

          <div
            onClick={() => setDeleteMode((prev) => !prev)}
            className='text-xl bg-card px-6 py-2.5 rounded-lg font-semibold cursor-pointer'
          >
            {deleteMode ? 'Cancel' : 'Edit'}
          </div>

          <div
            onClick={handleBulkDelete}
            className='text-xl bg-card-delete px-6 py-2.5 rounded-lg font-semibold cursor-pointer'
          >
            Delete
          </div>
        </div>

        {deleteMode && (
          <p className="text-red-500 mt-2 text-sm font-medium">Choose service that you want to delete.</p>
        )}
      </div>

      {/* Header */}
      <div className='border-2 border-white flex justify-between px-10 py-2 rounded-lg text-xl text-gray-300 font-semibold mt-4'>
        <p>Name</p>
        <p>Price</p>
        <p>Edit</p>
      </div>

      {/* Service Grid */}
      <div className="mt-5">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="border w-full p-4 rounded-xl text-xs flex justify-between items-center relative px-10"
              >
                {deleteMode && (
                  <label className="absolute top-5 left-2">
                    <input
                      aria-label="select service to delete"
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedIds.includes(service.id)}
                      onChange={() => toggleSelected(service.id)}
                    />
                  </label>
                )}

                <p className="font-bold text-base mt-2">{service.title}</p>
                <p className="text-[16px] mt-1 font-semibold">Rp{service.price}</p>
                 <div className='flex flex-col'>
                  <p
                  onClick={() => router.push(`/admin/formedit/${service.id}`)}
                  className="underline text-[16px] text-center cursor-pointer rounded-xl "
                  >
                  Edit
                  </p>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No services found.</p>
        )}
      </div>
    </div>
  );
}