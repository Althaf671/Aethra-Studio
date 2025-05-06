// pages/admin.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchServices() {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    }

    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/services/${id}/delete`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setServices(services.filter((service: any) => service.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/edit/${id}`);
  };

  return (
    <div className='z-50'>
      <h1>Admin Panel</h1>
      <button
        onClick={() => router.push('/admin/create')}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Create New Service
      </button>
      <div className="mt-4">
        {services.map((service: any) => (
          <div key={service.id} className="flex justify-between items-center">
            <div>
              <h3>{service.title}</h3>
              <p>${service.price}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(service.id)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}