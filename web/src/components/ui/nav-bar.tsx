'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/home/theme-toggle';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function NavBar() {
    const [hasScrolled, setHasScrolled] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setHasScrolled(window.scrollY > 10);
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDark = theme === 'dark';

    const navBackground = cn(
        'transition-all duration-300 backdrop-blur',
        hasScrolled
            ? isDark
                ? 'bg-black/60 border border-white/10 shadow-md'
                : 'bg-white/80 border border-border shadow-md'
            : isDark
                ? 'bg-blue-950'
                : 'bg-blue-300'
    );

    return (
        <header className="sticky top-0 z-50 w-full">
            <nav
                className={cn(
                    'mx-auto flex w-full items-center justify-between px-6 md:px-8 xl:px-0',
                    navBackground
                )}
            >
                <div className="flex h-[56px] w-full items-center justify-between px-4">
                    <div className="flex items-center">
                        <Logo />
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Link href="/chat" className="border-border">Dashboard</Link>
                    </div>
                </div>

            </nav>
        </header>
    );
}
