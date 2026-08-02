'use client';

import { useEffect, useState } from 'react';
import { useSocketStore } from '@/store/socketStore';
import { useAuthStore } from '@/store/authStore';

interface Message {
    id: string;
    text: string;
    user_id: string;
    username: string;
    avatar_color_id: number;
    created_at: string;
}

interface TypingUser {
    userId: string;
    username: string;
}

export function useRoom(roomId: string, enabled = true) {
    const { socket, onlineUserIds, setOnlineUserIds } = useSocketStore();
    const { user } = useAuthStore();
    const [messages, setMessages] = useState<Message[]>([]);
    const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);

    useEffect(() => {
        if (!socket || !roomId || !enabled) return;

        socket.emit('join_room', roomId);

        socket.on('message', (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on('online_users', (users: string[]) => {
            setOnlineUserIds(users);
        });

        socket.on('typing', (data: TypingUser) => {
            setTypingUsers((prev) => [...prev.filter((u) => u.userId !== data.userId), data]);
            setTimeout(() => {
                setTypingUsers((prev) => prev.filter((u) => u.userId !== data.userId));
            }, 3000);
        });

        return () => {
            socket.emit('leave_room', roomId);
            socket.off('message');
            socket.off('online_users');
            socket.off('typing');
        };
    }, [socket, roomId, enabled, setOnlineUserIds]);

    const sendMessage = (text: string) => {
        socket?.emit('message', { roomId, text });
    };

    const sendTyping = () => {
        socket?.emit('typing', { roomId });
    };

    const onlineUsers = user && !onlineUserIds.includes(user.id) ? [...onlineUserIds, user.id] : onlineUserIds;

    return { messages, onlineUsers, typingUsers, sendMessage, sendTyping };
}
