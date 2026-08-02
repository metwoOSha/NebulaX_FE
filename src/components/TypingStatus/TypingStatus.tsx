'use client';

import cls from './TypingStatus.module.css';

function formatTypingText(usernames: string[]): string {
    if (usernames.length === 1) return `${usernames[0]} is typing…`;
    if (usernames.length === 2) return `${usernames[0]} and ${usernames[1]} are typing…`;
    return `${usernames[0]}, ${usernames[1]} and ${usernames.length - 2} more are typing…`;
}

export default function TypingStatus({ usernames }: { usernames: string[] }) {
    return (
        <div className={cls.typingStatus}>
            <span className={cls.dots}>
                <span className={cls.dot} />
                <span className={cls.dot} />
                <span className={cls.dot} />
            </span>
            <span>{formatTypingText(usernames)}</span>
        </div>
    );
}
