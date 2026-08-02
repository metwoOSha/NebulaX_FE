'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRoom, deleteRoom, getRooms, joinRoom, leaveRoom, updateRoom } from '@/api/Rooms.api';
import type { RoomsResponse, UpdateRoomBody } from '@/types/room.types';

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

    const joinRoomMutation = useMutation({
        mutationFn: (id: string) => joinRoom(id),
        onSuccess: (_res, id) => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
            router.push(`/room/${id}`);
        },
    });

    const updateRoomMutation = useMutation({
        mutationFn: ({ id, body }: { id: string; body: UpdateRoomBody }) => updateRoom(id, body),
        onSuccess: (_res, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
            queryClient.invalidateQueries({ queryKey: ['room', id] });
        },
    });

    const deleteRoomMutation = useMutation({
        mutationFn: (id: string) => deleteRoom(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        },
    });

    const leaveRoomMutation = useMutation({
        mutationFn: (id: string) => leaveRoom(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        },
    });

    return {
        ...roomsQuery,
        createRoomMutation,
        joinRoomMutation,
        updateRoomMutation,
        deleteRoomMutation,
        leaveRoomMutation,
    };
}
