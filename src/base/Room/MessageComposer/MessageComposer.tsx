'use client';

import { useRef, useState } from 'react';
import Input from '@/components/Input/Input';
import cls from './MessageComposer.module.css';
import Buttons from '@/components/Buttons/Buttons';

interface MessageComposerProps {
    roomName?: string;
    onSend?: (text: string) => void;
    onTyping?: () => void;
}

export default function MessageComposer({ roomName, onSend, onTyping }: MessageComposerProps) {
    const [text, setText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        onSend?.(trimmed);
        setText('');
    };

    const handleFocus = () => {
        // Give the mobile keyboard/visual-viewport a moment to open before scrolling —
        // scrolling immediately measures against the pre-keyboard viewport height.
        setTimeout(() => {
            inputRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }, 300);
    };

    return (
        <div className={cls.messageComposer}>
            <Input
                ref={inputRef}
                value={text}
                placeholder={roomName ? `Message ${roomName}` : undefined}
                onFocus={handleFocus}
                onChange={(e) => {
                    setText(e.target.value);
                    onTyping?.();
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSend();
                    }
                }}
            />
            <Buttons type="send" onClick={handleSend} disabled={!text.trim()} />
        </div>
    );
}
