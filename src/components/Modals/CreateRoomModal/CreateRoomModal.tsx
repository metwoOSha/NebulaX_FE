'use client';

import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Buttons from '@/components/Buttons/Buttons';
import Input from '@/components/Input/Input';
import RoomThemePicker from '@/components/RoomThemePicker/RoomThemePicker';
import TagsPicker from '@/components/TagsPicker/TagsPicker';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import cls from './CreateRoomModal.module.css';

export const createRoomSchema = z.object({
    name: z.string().min(1, 'Room name is required').max(50),
    description: z.string().max(200),
    tileId: z.number().int().min(1).max(8),
    tags: z.array(z.string()),
});

export type CreateRoomFormValues = z.infer<typeof createRoomSchema>;

interface CreateRoomModalProps {
    onClose: () => void;
    onSubmit?: (values: CreateRoomFormValues) => void;
    mode?: 'create' | 'edit';
    initialValues?: CreateRoomFormValues;
}

type OpenSection = 'theme' | 'tags' | null;

export default function CreateRoomModal({ onClose, onSubmit, mode = 'create', initialValues }: CreateRoomModalProps) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateRoomFormValues>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: initialValues ?? { name: '', description: '', tileId: 5, tags: [] },
    });

    const [openSection, setOpenSection] = useState<OpenSection>('theme');
    const themeSectionRef = useRef<HTMLDivElement>(null);
    const tagsPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const closeIfOutside = (e: Event) => {
            const target = e.target as Node;
            setOpenSection((current) => {
                if (!current) return current;
                const activeRef = current === 'theme' ? themeSectionRef : tagsPanelRef;
                if (activeRef.current && !activeRef.current.contains(target)) {
                    return null;
                }
                return current;
            });
        };

        const closeIfOutsideOnFocus = (e: FocusEvent) => {
            if ((e.target as HTMLElement).tagName === 'BUTTON') return;
            closeIfOutside(e);
        };
        document.addEventListener('click', closeIfOutside, true);
        document.addEventListener('focusin', closeIfOutsideOnFocus);
        return () => {
            document.removeEventListener('click', closeIfOutside, true);
            document.removeEventListener('focusin', closeIfOutsideOnFocus);
        };
    }, []);

    const submit = handleSubmit((values) => onSubmit?.(values));

    return (
        <ModalOverlay width={400} padding="26px">
            <div className={cls.header}>
                <span className={cls.title}>{mode === 'edit' ? 'Edit room' : 'Create room'}</span>
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

                <div ref={themeSectionRef} className={cls.section}>
                    <div className={cls.fieldLabel}>Theme</div>
                    <Controller
                        name="tileId"
                        control={control}
                        render={({ field }) => (
                            <RoomThemePicker
                                value={field.value}
                                onChange={(id) => {
                                    field.onChange(id);
                                    setOpenSection(null);
                                }}
                                open={openSection === 'theme'}
                                onToggle={() => setOpenSection((s) => (s === 'theme' ? null : 'theme'))}
                                label=""
                            />
                        )}
                    />
                </div>

                <div className={cls.section}>
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <TagsPicker
                                value={field.value}
                                onChange={field.onChange}
                                open={openSection === 'tags'}
                                onOpenChange={(open) => setOpenSection(open ? 'tags' : null)}
                                panelRef={tagsPanelRef}
                            />
                        )}
                    />
                </div>

                <div className={cls.actions}>
                    <Buttons type="ghost" htmlType="button" label="Cancel" onClick={onClose} className={cls.action} />
                    <Buttons
                        type="primary"
                        htmlType="submit"
                        label={mode === 'edit' ? 'Save changes' : 'Create room'}
                        disabled={isSubmitting}
                        className={cls.action}
                    />
                </div>
            </form>
        </ModalOverlay>
    );
}
