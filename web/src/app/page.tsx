'use client';
import NavBar from "@/components/ui/nav-bar";
import Image from "next/image";
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';


export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const background = cn(
    isDark
      ? 'bg-blue-950'
      : 'bg-blue-300'
  );
  return (
    <div className="w-full relative">
      <NavBar />
      <main>
        <div className="w-full divide-y divide-border">
          <div className="grid min-[650px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-6 bg-amber-200">
            <div className="h-50 bg-emerald-200">

            </div>
            <div className="h-50 bg-emerald-400">

            </div>
            <div className="h-50 bg-emerald-600">

            </div>
            <div className="h-50 bg-emerald-800">

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
