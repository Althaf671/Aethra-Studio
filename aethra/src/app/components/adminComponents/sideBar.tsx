'use client';

import Link from "next/link";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-black text-white z-50 transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Content */}
      <div className="p-4">
        <div className="flex justify-between border-b-2 border-white items-center mb-4">
          <p className="font-bold tracking-wide text-xl">Admin Menu</p>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-3xl cursor-pointer"
          >
            ×
          </button>
        </div>
        <ul className="flex flex-col gap-2 text-[16px]">
          <Link href='/admin' className="hover:underline cursor-pointer">Dashboard</Link>
          <Link href='/admin/create' className="hover:underline cursor-pointer">Services</Link>
        </ul>
      </div>
    </div>
  );
}