'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRoomById } from '@/api/Rooms.api';
import type { RoomsResponse } from '@/types/room.types';

export function useRoomById(roomId: string) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['room', roomId],
        queryFn: () => getRoomById(roomId),
        staleTime: 5 * 60 * 1000,
        initialData: () => {
            const rooms = queryClient.getQueryData<RoomsResponse>(['rooms']);
            const myRoom = rooms?.my.find((r) => r.id === roomId);
            if (myRoom) return { room: { ...myRoom, role: 'admin' as const } };

            const joinedRoom = rooms?.joined.find((r) => r.id === roomId);
            if (joinedRoom) return { room: { ...joinedRoom, role: 'member' as const } };

            return undefined;
        },
    });
}
