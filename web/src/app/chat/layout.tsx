'use client';

import { useState } from "react";
import Link from "next/link";
import { SideBar } from "@/components/home/side-bar";
import { Button } from "@/components/ui/button";
import Messages from "@/components/chat/messages";
import InputArea from "@/components/chat/input-area";
import { cn } from "@/lib/utils";
export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);

    return (

        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Sidebar */}
            <SideBar
                collapsed={collapsed}
                toggleCollapsed={() => setCollapsed(!collapsed)}
            >
                {!collapsed && (

                    <div className="flex flex-col gap-2 bg-amber-500">
                        <Link
                            href="/chat"
                            className="text-sm p-2 rounded bg-secondary hover:bg-secondary/80 transition"
                        >New Chat</Link>

                        <Link href="/chat/1" className="text-sm hover:underline">Chat 1</Link>
                        <Link href="/chat/2" className="text-sm hover:underline">Chat 2</Link>
                        <Link href="/chat/3" className="text-sm hover:underline">Chat 3</Link>
                    </div>
                )}
            </SideBar>
            <div className={cn("flex-1 flex flex-col overflow-hidden", collapsed ? 'ml-16' : 'ml-64')}>
                {collapsed && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCollapsed(!collapsed)}
                        className="mb-2 w-3 h-10 bg-fuchsia-500"
                    >
                        {collapsed ? "->" : "<-"}
                    </Button>
                )}

                {children}
            </div>


        </div>
    );
}
