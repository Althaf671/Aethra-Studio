'use client';

import FooterLayout from "./FooterLayout";
import { NavbarProvider } from "@/context/NavbarContext";
import NavbarLayout from "./NavbarLayout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import("../../components/miscComponents/Loading"), { ssr: false });

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();  // Track the current pathname
  const [loading, setLoading] = useState(false);

  // Simulating loading state based on pathname changes
  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);  // Start loading
      setTimeout(() => {
        setLoading(false); // Stop loading after some delay
      }, 2200); // 1 second delay, adjust as needed
    };

    handleRouteChange(); // Trigger loading immediately on page load or route change

    return () => {
      setLoading(false);  // Cleanup loading state when unmounting
    };
  }, [pathname]);  // This runs every time the pathname changes

  return (
    <>
      <SessionProvider>
        <NavbarProvider>
          <NavbarLayout />
          <Toaster position="top-center" reverseOrder={false} />
          {loading && <Loading />} {/* Show loading animation */}
          {children}
          <FooterLayout />
        </NavbarProvider>
      </SessionProvider>
    </>
  );
}