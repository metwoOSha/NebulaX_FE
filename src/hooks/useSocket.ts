'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { getSocketToken } from '@/api/Auth.api';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';

export function useSocket() {
    const { user } = useAuthStore();
    const { setSocket } = useSocketStore();

    useEffect(() => {
        if (!user) return;

        let cancelled = false;
        let socket: ReturnType<typeof io> | undefined;

        getSocketToken().then(({ token }) => {
            if (cancelled) return;

            socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
                withCredentials: true,
                auth: { token },
            });

            socket.on('connect', () => console.log('Socket connected:', socket?.id));
            socket.on('disconnect', () => console.log('Socket disconnected'));

            setSocket(socket);
        });

        return () => {
            cancelled = true;
            socket?.disconnect();
            setSocket(null);
        };
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps
}
