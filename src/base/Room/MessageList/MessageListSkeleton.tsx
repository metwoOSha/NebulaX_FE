'use client';

import clsx from 'clsx';
import cls from './MessageListSkeleton.module.css';

interface SkeletonRow {
    align: 'incoming' | 'outgoing';
    width: string;
    height: number;
}

const ROWS: SkeletonRow[] = [
    { align: 'incoming', width: '46%', height: 46 },
    { align: 'incoming', width: '60%', height: 34 },
    { align: 'outgoing', width: '40%', height: 38 },
    { align: 'incoming', width: '52%', height: 46 },
    { align: 'outgoing', width: '34%', height: 34 },
];

export default function MessageListSkeleton() {
    return (
        <div className={cls.list}>
            {ROWS.map((row, index) => (
                <div key={index} className={clsx(cls.row, row.align === 'outgoing' && cls.rowOutgoing)}>
                    {row.align === 'incoming' && <div className={clsx('skeleton', cls.avatar)} />}
                    <div className={clsx('skeleton', cls.bar)} style={{ width: row.width, height: row.height }} />
                </div>
            ))}
        </div>
    );
}
