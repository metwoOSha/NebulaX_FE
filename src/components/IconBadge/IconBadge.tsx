'use client';

import { SIZES, Size, getTileById } from '@/config/icons.config';
import cls from './IconBadge.module.css';

interface IconBadgeProps {
    tileId: number;
    size?: Size;
}

export default function IconBadge({ tileId, size = 'md' }: IconBadgeProps) {
    const { box, radius, iconSize } = SIZES[size];
    const tile = getTileById(tileId);
    if (!tile) return null;

    return (
        <div
            className={cls.badge}
            style={{
                width: box,
                height: box,
                borderRadius: radius,
                backgroundImage: `linear-gradient(150deg, ${tile.gradient[0]}, ${tile.gradient[1]})`,
            }}
        >
            <div className={cls.icon} style={{ width: iconSize, height: iconSize }}>
                {tile.icon}
            </div>
        </div>
    );
}
