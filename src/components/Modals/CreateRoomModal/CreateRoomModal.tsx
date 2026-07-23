'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Buttons from '@/components/Buttons/Buttons';
import Input from '@/components/Input/Input';
import RoomThemePicker from '@/components/RoomThemePicker/RoomThemePicker';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import cls from './CreateRoomModal.module.css';

export const createRoomSchema = z.object({
    name: z.string().min(1, 'Room name is required').max(50),
    description: z.string().max(200),
    tileId: z.number().int().min(1).max(8),
});

export type CreateRoomFormValues = z.infer<typeof createRoomSchema>;

interface CreateRoomModalProps {
    onClose: () => void;
    onSubmit?: (values: CreateRoomFormValues) => void;
}

export default function CreateRoomModal({ onClose, onSubmit }: CreateRoomModalProps) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateRoomFormValues>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: { name: '', description: '', tileId: 5 },
    });

    const submit = handleSubmit((values) => onSubmit?.(values));

    return (
        <ModalOverlay width={400} padding="26px">
            <div className={cls.header}>
                <span className={cls.title}>Create room</span>
                <Buttons type="close" compact onClick={onClose} className={cls.close} />
            </div>

            <form onSubmit={submit} noValidate>
                <div className={cls.field}>
                    <div className={cls.fieldLabel}>Name</div>
                    <Input variant="form" placeholder="Room name" error={errors.name?.message} {...register('name')} />
                </div>

                <div className={cls.field}>
                    <div className={cls.fieldLabel}>Description</div>
                    <Input
                        variant="form"
                        placeholder="Short description"
                        error={errors.description?.message}
                        {...register('description')}
                    />
                </div>

                <div className={cls.fieldLabel}>Theme</div>
                <Controller
                    name="tileId"
                    control={control}
                    render={({ field }) => <RoomThemePicker value={field.value} onChange={field.onChange} label="" />}
                />

                <div className={cls.actions}>
                    <Buttons type="ghost" htmlType="button" label="Cancel" onClick={onClose} className={cls.action} />
                    <Buttons
                        type="primary"
                        htmlType="submit"
                        label="Create room"
                        disabled={isSubmitting}
                        className={cls.action}
                    />
                </div>
            </form>
        </ModalOverlay>
    );
}
