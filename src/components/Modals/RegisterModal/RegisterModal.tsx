'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import IconBadge from '@/components/IconBadge/IconBadge';
import Input from '@/components/Input/Input';
import AvatarColorPicker from '@/components/AvatarColorPicker/AvatarColorPicker';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import cls from './RegisterModal.module.css';

export const registerSchema = z.object({
    username: z.string().min(3, 'At least 3 characters').max(50),
    name: z.string().min(2, 'At least 2 characters').max(50),
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100),
    avatarColorId: z.number().int().min(1).max(8),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterModalProps {
    onSwitchToLogin: () => void;
    onSubmit?: (values: RegisterFormValues) => void;
}

export default function RegisterModal({ onSwitchToLogin, onSubmit }: RegisterModalProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { avatarColorId: 1 },
    });

    const submit = handleSubmit((values) => onSubmit?.(values));

    return (
        <ModalOverlay width={380} dimmed={false}>
            <button type="button" className={cls.close} onClick={onSwitchToLogin} aria-label="Close">
                ✕
            </button>

            <div className={cls.header}>
                <IconBadge tileId={0} size="xl" />
                <div className={cls.headings}>
                    <div className={cls.title}>Create your account</div>
                    <div className={cls.subtitle}>Join a room and meet your squad</div>
                </div>
            </div>

            <form className={cls.form} onSubmit={submit} noValidate>
                <Input
                    variant="form"
                    label="Username"
                    placeholder="nova"
                    error={errors.username?.message}
                    {...register('username')}
                />
                <Input
                    variant="form"
                    label="Name"
                    placeholder="Nova"
                    error={errors.name?.message}
                    {...register('name')}
                />
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

                <Controller
                    name="avatarColorId"
                    control={control}
                    render={({ field }) => <AvatarColorPicker value={field.value} onChange={field.onChange} />}
                />

                <button type="submit" className={cls.submit} disabled={isSubmitting}>
                    Create account
                </button>
            </form>

            <div className={cls.switch}>
                Already have an account?{' '}
                <span className={cls.switchLink} onClick={onSwitchToLogin}>
                    Sign in
                </span>
            </div>
        </ModalOverlay>
    );
}
