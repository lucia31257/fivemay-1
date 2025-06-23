'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
interface InputAreaProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function InputArea(
    { onSend, disabled }: InputAreaProps
) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim()) {
            onSend(input);
            setInput("");
        }
    };

    return (
        <div className="mt-4 flex gap-2">
            <textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border p-2 rounded resize-none"
                placeholder="text here"
            />
            <Button
                onClick={handleSend}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Send
            </Button>
        </div>)
}
