'use client';
import React, { useEffect } from 'react'
import { useNavbar } from "@/context/NavbarContext";
import TopSection from "../components/profileComponents/TopSection";

export default function Profile() {
    const { hide, show } = useNavbar();

    useEffect(() => {
        hide(); 
        return () => {
          show(); 
        };
      }, []);

  return (
    <div className="text-center text-3xl container flex flex-col p-4 pb-10 pt-5 md:p-6 lg:p-10  text-white">
      <TopSection />
    </div>
  );
}

