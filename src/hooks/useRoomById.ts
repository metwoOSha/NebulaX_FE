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
            const room = rooms?.my.find((r) => r.id === roomId) ?? rooms?.joined.find((r) => r.id === roomId);
            return room ? { room } : undefined;
        },
    });
}
