'use client';

import clsx from 'clsx';

import IconBadge from '@/components/IconBadge/IconBadge';
import { TILES } from '@/config/icons.config';
import cls from './RoomThemePicker.module.css';

interface RoomThemePickerProps {
    value: number;
    onChange: (id: number) => void;
    open: boolean;
    onToggle: () => void;
    label?: string;
}

export default function RoomThemePicker({ value, onChange, open, onToggle, label = 'Theme' }: RoomThemePickerProps) {
    return (
        <div className={cls.wrapper}>
            {label && <div className={cls.label}>{label}</div>}
            <button type="button" onClick={onToggle} className={cls.trigger}>
                <IconBadge tileId={value} size="sm" />
                <span className={cls.triggerLabel}>Change theme</span>
                <span className={clsx(cls.chevron, open && cls.chevronOpen)}>▾</span>
            </button>
            {open && (
                <div className={cls.grid}>
                    {TILES.map((tile) => (
                        <button
                            key={tile.id}
                            type="button"
                            aria-label={tile.name}
                            onClick={() => onChange(tile.id)}
                            className={clsx(cls.tile, value === tile.id && cls.tileActive)}
                        >
                            <IconBadge tileId={tile.id} size="lg" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
