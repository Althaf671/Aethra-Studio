'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type NavbarCtx = {
  isVisible: boolean;
  hide: () => void;
  show: () => void;
};

const NavbarContext = createContext<NavbarCtx | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  const value: NavbarCtx = {
    isVisible,
    hide: () => setIsVisible(false),
    show: () => setIsVisible(true),
  };

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
}

export function useNavbar() {
  const ctx = useContext(NavbarContext);
  if (!ctx) throw new Error('useNavbar must be used inside NavbarProvider');
  return ctx;
}

