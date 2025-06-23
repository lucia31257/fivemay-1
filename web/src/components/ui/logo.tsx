"use client"
import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';


export function Logo({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const [mounted, setMounted] = useState(false);
    const { theme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);
    const logoSrc = !mounted
        ? '/logo-black.png'
        : resolvedTheme === 'dark'
            ? '/logo-white.png'
            : '/logo-black.png';
    return (
        <Link
            className={cn("flex items-center gap-3.5", className)}
            href="/"
        >
            <Image
                src={logoSrc}
                alt="LOGO"
                width={100}
                height={22}
                priority
            >
            </Image>
        </Link>
    );
}