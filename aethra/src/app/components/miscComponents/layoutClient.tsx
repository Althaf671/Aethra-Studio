'use client';

import FooterLayout from "./FooterLayout";
import { NavbarProvider, useNavbar } from "@/context/NavbarContext";
import NavbarLayout from "./NavbarLayout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


const Loading = dynamic(() => import("../../components/miscComponents/Loading"), { ssr: false });

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavbarProvider>
        <LayoutInner>
          {children}
        </LayoutInner>
      </NavbarProvider>
    </SessionProvider>
  );
}

function LayoutInner({ children }: { children: React.ReactNode }) {
  const { isVisible } = useNavbar();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2200);
    };

    handleRouteChange();

    return () => {
      setLoading(false);
    };
  }, [pathname]);

  return (
    <>
      {isVisible && <NavbarLayout />}
      <Toaster position="top-center" reverseOrder={false} />
      {loading && <Loading />}
      {children}
      <FooterLayout />
    </>
  );
}