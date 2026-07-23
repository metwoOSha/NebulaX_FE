'use client';

import { useAuthStore } from '@/store/authStore';
import { updateProfile, UpdateProfileBody } from '@/api/User.api';

export function useProfile() {
    const { user, setUser } = useAuthStore();

    const handleUpdateProfile = async (data: UpdateProfileBody) => {
        await updateProfile(data);
        if (user) setUser({ ...user, ...data });
    };

    return { handleUpdateProfile };
}
