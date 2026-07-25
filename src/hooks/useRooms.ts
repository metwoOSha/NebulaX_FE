'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRoom, getRooms } from '@/api/Rooms.api';
import type { RoomsResponse } from '@/types/room.types';

export function useRooms() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const roomsQuery = useQuery({
        queryKey: ['rooms'],
        queryFn: async (): Promise<RoomsResponse> => {
            return getRooms();
        },
        refetchOnMount: 'always',
    });

    const createRoomMutation = useMutation({
        mutationFn: createRoom,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
            router.push(`/room/${res.room.id}`);
        },
    });

    return { ...roomsQuery, createRoomMutation };
}
