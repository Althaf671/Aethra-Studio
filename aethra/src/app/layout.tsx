import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterLayout from "./components/miscComponents/FooterLayout";
import { NavbarProvider } from "@/context/NavbarContext";
import NavbarLayout from "./components/miscComponents/NavbarLayout";
import AuthProvider from "./providers/sessionProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aethra Studio",
  description: "Made with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider> 
          <NavbarProvider> 
            <NavbarLayout />
              {children}
            <FooterLayout />
          </NavbarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
