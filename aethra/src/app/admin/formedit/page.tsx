'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  deadline: string;
}

export default function EditServicePage() {
  const router = useRouter();
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    available: false,
    deadline: '',
  });

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/admin/crud-service/${id}`);
        const data = await res.json();
        setService(data);
        setForm({
          title: data.title,
          description: data.description,
          price: String(data.price),
          image: data.image,
          available: data.available,
          deadline: data.deadline,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
        setLoading(false);
      }
    }
    if (id) fetchService();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/crud-service/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          price: parseInt(form.price),
        }),
      });

      if (res.ok) {
        alert('Service updated successfully!');
        router.push('/admin/crud-service');
      } else {
        alert('Failed to update service.');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Something went wrong.');
    }
  };

  if (loading) return <p className="mt-20 text-center">Loading service data...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-20 p-4 border rounded-xl shadow-sm">
      <h1 className="text-xl font-bold mb-4">Edit Service</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="deadline"
          placeholder="Deadline"
          value={form.deadline}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          Available
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Service
        </button>
      </form>
    </div>
  );
}