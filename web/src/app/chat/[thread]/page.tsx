'use client';

import React, { useState, useEffect } from 'react';
import InputArea from '@/components/chat/input-area';

import Link from 'next/link';
import { PlusCircle, MessagesSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SideBar } from '@/components/home/side-bar';

import { useRef } from 'react';


export default function Chat() {
    const [messages, setMessages] = useState<string[]>([]);
    const messageEndRef = useRef<HTMLDivElement>(null);

    const handleSend = (message: string) => {
        setMessages((prev) => [...prev, message]);
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <main className="w-full overflow-hidden h-full">
            <div className="flex flex-col h-full p-4 w-full">
                {/* messages */}
                <div className="flex-1 overflow-y-auto space-y-2">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className="bg-blue-100 rounded-md p-2 text-sm text-gray-800"
                        >
                            {msg}
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
                {/* inputarea */}
                <InputArea onSend={handleSend} />

            </div>

        </main>
    );
}



