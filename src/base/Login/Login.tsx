'use client';

import { useState } from 'react';
import Aurora from '@/components/Aurora/Aurora';
import LoginModal from '@/components/Modals/LoginModal/LoginModal';
import RegisterModal from '@/components/Modals/RegisterModal/RegisterModal';
import type { RegisterFormValues } from '@/components/Modals/RegisterModal/RegisterModal';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const { handleLogin, handleRegister } = useAuth();

    const onRegister = ({ avatarColorId, ...values }: RegisterFormValues) =>
        handleRegister({ ...values, avatar_color_id: avatarColorId, about: null });

    return (
        <>
            <Aurora />
            {mode === 'login' ? (
                <LoginModal onSwitchToRegister={() => setMode('register')} onSubmit={handleLogin} />
            ) : (
                <RegisterModal onSwitchToLogin={() => setMode('login')} onSubmit={onRegister} />
            )}
        </>
    );
}
