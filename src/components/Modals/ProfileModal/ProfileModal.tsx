'use client';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Buttons from '@/components/Buttons/Buttons';
import Input from '@/components/Input/Input';
import AvatarColorPicker from '@/components/AvatarColorPicker/AvatarColorPicker';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { getAvatarColorById } from '@/config/avatars.config';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import cls from './ProfileModal.module.css';

const editableField = (min: number, message: string) =>
    z
        .string()
        .max(50)
        .refine((value) => value === '' || value.length >= min, message);

const profileSchema = z.object({
    username: editableField(3, 'At least 3 characters'),
    name: editableField(2, 'At least 2 characters'),
    avatarColorId: z.number().int().min(1).max(8),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileModalProps {
    onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
    const { user } = useAuthStore();
    const { handleUpdateProfile } = useProfile();
    const { handleLogout } = useAuth();

    const {
        control,
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: '',
            name: '',
            avatarColorId: user?.avatar_color_id ?? 1,
        },
    });

    const revealOnFocus = (field: 'username' | 'name', currentValue: string) => () => {
        if (!getValues(field)) setValue(field, currentValue);
    };

    const avatarColorId = useWatch({ control, name: 'avatarColorId' });

    const submit = handleSubmit(async ({ username, name, avatarColorId }) => {
        await handleUpdateProfile({
            username: username || user?.username,
            name: name || user?.name,
            avatar_color_id: avatarColorId,
        });
        onClose();
    });

    const initials = user?.username?.charAt(0).toUpperCase() ?? 'U';
    const avatarColor = getAvatarColorById(avatarColorId);

    return (
        <ModalOverlay width={400} padding="22px 26px 26px">
            <div className={cls.topBar}>
                <Buttons type="close" onClick={onClose} />
            </div>

            <div className={cls.header}>
                <div
                    className={cls.avatar}
                    style={{ backgroundImage: `linear-gradient(${avatarColor}, ${avatarColor})` }}
                >
                    <span>{initials}</span>
                </div>
                <div className={cls.headings}>
                    <div className={cls.title}>{user?.username}</div>
                    <div className={cls.subtitle}>Your profile</div>
                </div>
            </div>

            <form className={cls.form} onSubmit={submit} noValidate>
                <Controller
                    name="avatarColorId"
                    control={control}
                    render={({ field }) => <AvatarColorPicker value={field.value} onChange={field.onChange} />}
                />

                <div className={cls.field}>
                    <div className={cls.fieldLabel}>Username</div>
                    <Input
                        variant="form"
                        placeholder={user?.username ?? 'Username'}
                        error={errors.username?.message}
                        {...register('username')}
                        onFocus={revealOnFocus('username', user?.username ?? '')}
                    />
                </div>

                <div className={cls.field}>
                    <div className={cls.fieldLabel}>Name</div>
                    <Input
                        variant="form"
                        placeholder={user?.name ?? 'Name'}
                        error={errors.name?.message}
                        {...register('name')}
                        onFocus={revealOnFocus('name', user?.name ?? '')}
                    />
                </div>

                <Buttons
                    type="primary"
                    htmlType="submit"
                    label="Save changes"
                    disabled={isSubmitting}
                    className={cls.fullWidthBtn}
                />
            </form>

            <Buttons type="danger" label="Log out" onClick={handleLogout} className={cls.fullWidthBtn} />
        </ModalOverlay>
    );
}
