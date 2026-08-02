import { CreateRoomBody, Room, RoomMember, UpdateRoomBody } from '@/types/room.types';
import { del, get, patch, post } from './http';

const ROOM = (id: string) => `/rooms/${id}`;

export async function getRooms() {
    const res = await get('/rooms');
    return res.json();
}

export async function getRoomById(id: string): Promise<{ room: Room }> {
    const res = await get(ROOM(id));
    return res.json();
}

export async function getRoomMembers(id: string): Promise<{ members: RoomMember[] }> {
    const res = await get(`${ROOM(id)}/members`);
    return res.json();
}

export async function createRoom(body: CreateRoomBody) {
    const res = await post('/rooms', body);
    return res.json();
}

export async function updateRoom(id: string, body: UpdateRoomBody) {
    const res = await patch(ROOM(id), body);
    return res.json();
}

export async function deleteRoom(id: string) {
    const res = await del(ROOM(id));
    return res.json();
}

export async function joinRoom(id: string) {
    const res = await post(`${ROOM(id)}/join`, {});
    return res.json();
}

export async function leaveRoom(id: string) {
    const res = await del(`${ROOM(id)}/leave`);
    return res.json();
}
