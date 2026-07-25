import { User } from '@/types/user.types';
import { patch } from './http';

export type UpdateProfileBody = Partial<Pick<User, 'username' | 'name' | 'avatar_color_id' | 'tags'>>;

export async function updateProfile(id: string, body: UpdateProfileBody): Promise<{ user: User }> {
    const res = await patch(`/users/${id}`, body);
    return res.json();
}
