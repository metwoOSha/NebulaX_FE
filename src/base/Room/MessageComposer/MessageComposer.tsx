'use client';

import { useState } from 'react';
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

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        onSend?.(trimmed);
        setText('');
    };

    return (
        <div className={cls.messageComposer}>
            <Input
                value={text}
                placeholder={roomName ? `Message ${roomName}` : undefined}
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
