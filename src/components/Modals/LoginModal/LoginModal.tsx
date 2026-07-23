'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import IconBadge from '@/components/IconBadge/IconBadge';
import Input from '@/components/Input/Input';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import cls from './LoginModal.module.css';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginModalProps {
    onSwitchToRegister: () => void;
    onSubmit?: (values: LoginFormValues) => void;
}

export default function LoginModal({ onSwitchToRegister, onSubmit }: LoginModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

    const submit = handleSubmit((values) => onSubmit?.(values));

    return (
        <ModalOverlay width={380} dimmed={false}>
            <div className={cls.header}>
                <IconBadge tileId={0} size="xl" />
                <div className={cls.headings}>
                    <div className={cls.title}>Welcome back</div>
                    <div className={cls.subtitle}>Sign in to jump back into your rooms</div>
                </div>
            </div>

            <form className={cls.form} onSubmit={submit} noValidate>
                <Input
                    variant="form"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <Input
                    variant="form"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password')}
                />
                <button type="submit" className={cls.submit} disabled={isSubmitting}>
                    Sign in
                </button>
            </form>

            <div className={cls.switch}>
                Don&apos;t have an account?{' '}
                <span className={cls.switchLink} onClick={onSwitchToRegister}>
                    Sign up
                </span>
            </div>
        </ModalOverlay>
    );
}
