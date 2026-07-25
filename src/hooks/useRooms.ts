'use client';

import { useRouter } from 'next/navigation';
import { createRoom } from '@/api/Rooms.api';
import type { CreateRoomBody } from '@/types/room.types';

export function useRooms() {
    const router = useRouter();

    const handleCreateRoom = async (data: CreateRoomBody) => {
        const res = await createRoom(data);
        router.push(`/room/${res.room.id}`);
    };

    return { handleCreateRoom };
}
