'use client';

import { useAuthStore } from '@/store/authStore';
import { updateProfile, UpdateProfileBody } from '@/api/User.api';

export function useProfile() {
    const { user, setUser } = useAuthStore();

    const handleUpdateProfile = async (data: UpdateProfileBody) => {
        if (!user) return;
        const res = await updateProfile(user.id, data);
        setUser(res.user);
    };

    return { handleUpdateProfile };
}
