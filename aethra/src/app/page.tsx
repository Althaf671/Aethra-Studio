import Hero from "@/components/homeComponents/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-2 text-white">
      <Hero />
      </div>
    </>
  );
}