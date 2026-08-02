'use client';

import { useState } from 'react';
import Buttons from '@/components/Buttons/Buttons';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import cls from './ConfirmModal.module.css';

interface ConfirmModalProps {
    title: string;
    subtitle: string;
    confirmLabel: string;
    danger?: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export default function ConfirmModal({ title, subtitle, confirmLabel, danger, onClose, onConfirm }: ConfirmModalProps) {
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = async () => {
        setSubmitting(true);
        setError(null);
        try {
            await onConfirm();
            onClose();
        } catch (err) {
            setSubmitting(false);
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
    };

    return (
        <ModalOverlay width={360} padding="22px 26px 26px">
            <div className={cls.topBar}>
                <Buttons type="close" onClick={onClose} />
            </div>

            <div className={cls.header}>
                <div className={cls.title}>{title}</div>
                <div className={cls.subtitle}>{subtitle}</div>
            </div>

            {error && <span className={cls.error}>{error}</span>}

            <div className={cls.actions}>
                <Buttons type="ghost" label="Cancel" onClick={onClose} disabled={isSubmitting} className={cls.action} />
                <Buttons
                    type={danger ? 'danger' : 'primary'}
                    label={isSubmitting ? 'Please wait…' : confirmLabel}
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className={cls.action}
                />
            </div>
        </ModalOverlay>
    );
}
