'use client';

import clsx from 'clsx';
import cls from './CardBadge.module.css';

interface CardBadgeProps {
    type: 'admin' | 'member' | 'join';
}

export default function CardBadge({ type }: CardBadgeProps) {
    return <span className={clsx(cls.tag, cls[type])}>{type}</span>;
}
