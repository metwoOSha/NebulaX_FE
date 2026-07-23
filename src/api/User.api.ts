import { User } from '@/types/user.types';

export type UpdateProfileBody = Partial<Pick<User, 'username' | 'name' | 'avatar_color_id'>>;

// TODO: no backend endpoint yet — stub until the real API is ready
export async function updateProfile(body: UpdateProfileBody): Promise<UpdateProfileBody> {
    return new Promise((resolve) => setTimeout(() => resolve(body), 300));
}
