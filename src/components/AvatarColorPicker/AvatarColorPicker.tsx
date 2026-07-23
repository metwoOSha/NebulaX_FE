'use client';

import clsx from 'clsx';

import { AVATAR_COLORS } from '@/config/avatars.config';
import cls from './AvatarColorPicker.module.css';

interface AvatarColorPickerProps {
    value: number;
    onChange: (id: number) => void;
    label?: string;
}

export default function AvatarColorPicker({ value, onChange, label = 'Avatar color' }: AvatarColorPickerProps) {
    return (
        <div className={cls.wrapper}>
            {label && <div className={cls.label}>{label}</div>}
            <div className={cls.grid}>
                {Object.entries(AVATAR_COLORS).map(([id, color]) => {
                    const colorId = Number(id);
                    return (
                        <button
                            key={colorId}
                            type="button"
                            aria-label={`Avatar color ${colorId}`}
                            onClick={() => onChange(colorId)}
                            className={clsx(cls.swatch, value === colorId && cls.swatchActive)}
                            style={{ backgroundColor: color }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
