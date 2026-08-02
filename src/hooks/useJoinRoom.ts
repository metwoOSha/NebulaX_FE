'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinRoom } from '@/api/Rooms.api';

export function useJoinRoom() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => joinRoom(id),
        onSuccess: (_res, id) => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
            queryClient.invalidateQueries({ queryKey: ['room', id] });
            queryClient.invalidateQueries({ queryKey: ['room-members', id] });
        },
    });
}
