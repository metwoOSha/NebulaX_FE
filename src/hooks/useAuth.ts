'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { login, register, logout } from '@/api/Auth.api';
import type { LoginBody, RegisterBody } from '@/types/user.types';

export function useAuth() {
    const { setUser, clearUser } = useAuthStore();
    const router = useRouter();

    const handleLogin = async (data: LoginBody) => {
        const res = await login(data);
        setUser(res.user);
        router.push('/');
    };

    const handleRegister = async (data: RegisterBody) => {
        const res = await register(data);
        setUser(res.user);
        router.push('/');
    };

    const handleLogout = async () => {
        await logout();
        clearUser();
        router.push('/login');
    };

    return { handleLogin, handleRegister, handleLogout };
}
