'use client';

import Messages from '@/components/chat/messages';
import InputArea from '@/components/chat/input-area';

export default function Chat() {
    const handleSend = (message: string) => {
    };
    return (
        <>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="bg-emerald-400 w-1/4 bg-center content-center">
                    <h1 className="center">hello</h1>
                </div>
            </div>
            <div className="border-t p-4">
                <InputArea onSend={handleSend} />
            </div>
        </>
    );
}
