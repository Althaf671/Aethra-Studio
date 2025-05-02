'use client';

import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

const TopSection = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedPhone = localStorage.getItem('phone');
    if (storedPhone) {
      setPhone(storedPhone);
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: session?.user.id,
          phone: phone || '',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Profile updated successfully');
        console.log('Profile updated successfully', data);

        // Simpan ke localStorage
        if (phone) {
          localStorage.setItem('phone', phone);
        }

        setIsEditing(false);
      } else {
        toast.error('Update failed. Check your input again');
        console.error('Failed to update profile:', data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    const storedPhone = localStorage.getItem('phone');
    if (storedPhone) {
      setPhone(storedPhone);
    }
  };

  return (
    <>
    <div className='flex justify-baseline gap-2 mb-2.5'>
        <Link href="/">
           <Image src="/images/misc/arrowBack.png" width={35} height={35} alt='home button'/>
        </Link>
      <h1 className='text-2xl'>{session?.user.name}'s dashboard</h1>
    </div>
    <div className="relative flex min-h-[7rem] justify-between items-baseline border-[1.2px] py-3 px-4 pb-8 rounded-2xl">
      {/* Left Profile Section */}
      <div className="flex flex-col text-left">
        <div className="mt-2 flex flex-col gap-1">
          <p className="text-[15px]">Username: {session?.user.name}</p>
          <p className="text-[15px]">User ID: <span className='opacity-60'>{session?.user.id}</span></p>
          <p className="text-[15px]">
            E-mail:
            <span className="underline ml-1 text-amber-400">{session?.user.email}</span>;
          </p>

          {/* Phone Section */}
          <div className="flex items-center gap-1.5">
            <p className="text-[15px]">Phone:</p>
            {!isEditing ? (
              <span className="underline text-white text-[15px]">
                {phone || 'Enter phone'};
              </span>
            ) : (
              <PhoneInput
                international
                defaultCountry="ID"
                placeholder="+62 812-3456-7890"
                value={phone || undefined}
                onChange={(value) => setPhone(value ?? undefined)}
                className="max-w-[140px] underline text-[12px]"
              />
            )}
          </div>
        </div>
      </div>

      {/* Edit / Save / Cancel Button */}
      <div className="absolute top-3.5 right-3">
        {!isEditing ? (
           <Image
           src="/images/misc/editBTN.png"
           width={30}
           height={30}
           alt="Edit Profile"
           onClick={() => setIsEditing(true)}
           className="cursor-pointer"
         />
        ) : (
          <>
            <div className='flex gap-1.5'>
                <button
                    onClick={handleSave}
                    className="btn-edit cursor-pointer px-2 py-0.5 font-bold"
                >
                Save
                </button>
                <button
                    onClick={handleCancel}
                    className="btn-edit cursor-pointe px-2 py-0.5 font-bold"
                >
                Close
                </button>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default TopSection;