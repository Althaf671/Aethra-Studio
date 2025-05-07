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
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
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

  const toggleSelected = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    await Promise.all(selectedIds.map((id) => handleDelete(id)));
    setDeleteMode(false);
    setSelectedIds([]);
  };

  const handleDeleteClick = () => {
    if (deleteMode && selectedIds.length > 0) {
      handleBulkDelete();
    } else {
      setDeleteMode((prev) => !prev);
      setSelectedIds([]);
    }
  };

  return (
    <div className="relative container p-4 max-w-xl mx-auto">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      <div
        className={`flex justify-between items-center border-b-2 pb-3 ${
          open ? 'opacity-50' : 'opacity-100'
        } transition-opacity duration-300 ease-in-out`}
      >
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
            alt={deleteMode ? 'Confirm Delete' : 'Delete Service'}
            width={24}
            height={24}
            onClick={handleDeleteClick}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-3">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="border p-3 w-[200px] rounded-xl text-xs flex flex-col justify-between relative"
              >
                {deleteMode && (
                  <label>
                  <input
                    type="checkbox"
                    className="absolute top-2 left-2 w-4 h-4"
                    checked={selectedIds.includes(service.id)}
                    onChange={() => toggleSelected(service.id)}
                  />
                  *
                  </label>
                )}

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

                <button
                  type="button"
                  onClick={() => router.push(`/admin/formedit/${service.id}`)}
                  className="text-white bg-blue-600 hover:opacity-80 underline cursor-pointer px-4 py-2 rounded-xl mt-2"
                >
                  Edit
                </button>
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

