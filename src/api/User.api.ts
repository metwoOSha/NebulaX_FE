import { User } from '@/types/user.types';
import { get, patch } from './http';

export type UpdateProfileBody = Partial<Pick<User, 'username' | 'name' | 'avatar_color_id' | 'tags'>>;

export async function updateProfile(id: string, body: UpdateProfileBody): Promise<{ user: User }> {
    const res = await patch(`/users/${id}`, body);
    return res.json();
}

export async function getUserById(id: string): Promise<{ user: User }> {
    const res = await get(`/users/${id}`);
    return res.json();
}
