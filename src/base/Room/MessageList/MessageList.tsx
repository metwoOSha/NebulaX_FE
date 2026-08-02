'use client';

import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { getAvatarColorById } from '@/config/avatars.config';
import cls from './MessageList.module.css';
import Message from '../Message/Message';
import MessageListSkeleton from './MessageListSkeleton';

interface MessageItem {
    id: string;
    text: string;
    user_id: string;
    username: string;
    avatar_color_id: number;
    created_at: string;
}

interface MessageListProps {
    messages: MessageItem[];
    currentUserId?: string;
    hasNextPage?: boolean;
    onLoadMore?: () => void;
    loadingMessages?: boolean;
}

export default function MessageList({
    messages,
    currentUserId,
    hasNextPage,
    onLoadMore,
    loadingMessages,
}: MessageListProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTop = container.scrollHeight;
    }, [messages.length]);

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container || !hasNextPage) return;

        if (container.scrollTop === 0) {
            onLoadMore?.();
        }
    };

    if (loadingMessages) {
        return (
            <div className={cls.messageList}>
                <MessageListSkeleton />
            </div>
        );
    }

    return (
        <div className={cls.messageList} ref={containerRef} onScroll={handleScroll}>
            {messages.map((message) => (
                <Message
                    key={message.id}
                    text={message.text}
                    username={message.username}
                    avatarColor={getAvatarColorById(message.avatar_color_id)}
                    time={dayjs(message.created_at).format('h:mm A')}
                    isOwn={message.user_id === currentUserId}
                />
            ))}
        </div>
    );
}
