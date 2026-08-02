'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getRoomMembers } from '@/api/Rooms.api';

export function useRoomMembers(roomId: string) {
    return useQuery({
        queryKey: ['room-members', roomId],
        queryFn: () => getRoomMembers(roomId),
        placeholderData: keepPreviousData,
    });
}
