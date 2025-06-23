'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function SideBar({
    collapsed,
    toggleCollapsed,
    children,
}: {
    collapsed: boolean;
    toggleCollapsed: () => void;
    children?: React.ReactNode;
}) {
    return (
        // <aside
        //     className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white z-40">

        <aside
            className={cn(
                "fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white z-40",
                collapsed ? "w-0 md:w-16" : "w-64"
            )}
        >
            <div className="h-full flex flex-col p-4 gap-4 overflow-hidden bg-amber-300">
                <div className="w-full">
                    <ThemeToggle />
                    {!collapsed && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleCollapsed}
                            className="mb-2 w-3 h-10 bg-fuchsia-500 mr-40"
                        >
                            {collapsed ? "->" : "<-"}
                        </Button>)
                    }
                </div>
                {!collapsed && children}
            </div>
        </aside>
    );
}
