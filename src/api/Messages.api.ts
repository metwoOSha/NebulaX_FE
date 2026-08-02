import { get } from './http';

export async function getMessages(roomId: string, cursor?: string | null) {
    const params: Record<string, string | number> = { limit: 50 };
    if (cursor) params.cursor = cursor;

    const res = await get(`/rooms/${roomId}/messages`, params);
    return res.json();
}
