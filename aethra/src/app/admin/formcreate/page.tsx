'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


export default function FormCreate() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState('');
    const [available, setAvailable] = useState<boolean>(true);
    const [deadline, setDeadline] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/admin/crud-service/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                price,
                image,
                available,
                deadline
            }),
        });

        if (res.ok) {
            toast.success('Content added')
            router.push('/admin/create');
            router.refresh();
        } else {
            toast.error('Failed to add content')
        }
    }


    return (
        <>
        <div className='p-4 max-w-xl mx-auto '>
            <h1 className='text-xl text-center border-b-2 pb-3'>New Service</h1>
            <form onSubmit={handleSubmit} className='space-y-4 mt-8'>
                <div className='grid grid-cols-2 gap-4'>

                    {/* Input title */}
                    <div>
                        <label className="block mb-1">
                        <input
                        type="text"
                        className="w-full border p-2 rounded-[7px]"
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                        <span className='poppins-text text-gray-400 text-[13px] tracking-wider '>Title</span> 
                        </label>
                    </div>

                    {/* Input price */}
                    <div>
                        <label className="block mb-1">
                        <input
                        type="number"
                        className="w-full border p-2 rounded-[7px]"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        required
                        />
                        <span className='poppins-text text-gray-400 text-[13px] tracking-wider '>Price</span>
                        </label>
                    </div>

                    {/* Input image */}
                    <div>
                        <label className="block mb-1">
                        <input
                        type="text"
                        className="w-full border p-2 rounded-[7px]"
                        placeholder='Image URL'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        />
                         <span className='poppins-text text-gray-400 text-[13px] tracking-wider '>Image URL</span> 
                        </label>
                    </div>

                    {/* Input deadline */}
                    <div>
                        <label className="block mb-1">
                        <input
                        type="date"
                        className="w-full border p-2 rounded-[7px]"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                        />
                        <span className='poppins-text text-gray-400 text-[13px] tracking-wider '>Deadline</span> 
                        </label>
                    </div>
                </div>

                {/* bottom form */}
                <div className='flex flex-col w-full gap-3'>

                    {/* Input description */}
                    <div>
                        <label className="flex flex-col mb-1">
                        <textarea
                        className="w-full border p-2 rounded-[7px]"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        ></textarea>
                        <span className='poppins-text text-gray-400 text-[13px] tracking-wider '>Description</span> 
                        </label>
                    </div>

                    {/* Status button */}
                    <div>
                        <label className="mb-1">
                        <select
                        name='availability'
                        className="w-full border p-2 bg-gray-900 rounded-[7px]"
                        value={available ? 'true' : 'false'}
                        onChange={(e) => setAvailable(e.target.value === 'true')}
                        >
                        <option value="true">True</option>
                        <option value="false">False</option>
                        </select>
                        <span className='poppins-text text-gray-400 text-[13px] tracking-wider '>Availability</span> 
                        </label>
                    </div>

                </div>

                <div className='flex justify-end gap-2'>
                    <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-white  bg-gray-800 px-3 py-2 rounded hover:opacity-80 cursor-pointer"
                    >
                    Cancel
                    </button>

                    <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                    Save
                    </button>
            </div>         
            </form>
        </div>
        </>
        
    )
}