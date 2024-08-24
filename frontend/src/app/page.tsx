import { AppBar } from "@/components/AppBar";
import { HeroSection } from "@/components/HeroSection";
import { HeroVideo } from "@/components/HeroVideo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex-col items-center p-24">
      <HeroSection/>
      <HeroVideo/>
    </main>
  );
}
