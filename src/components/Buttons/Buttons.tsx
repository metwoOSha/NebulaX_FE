'use client';

import clsx from 'clsx';

import { useThemeStore } from '@/store/themeStore';
import cls from './Buttons.module.css';
import { ArrowLeftIcon, SunIcon, MoonIcon, SidebarIcon, MembersIcon } from '@/components/icons';

type ButtonType = 'back' | 'action' | 'profile' | 'send' | 'close' | 'primary' | 'danger';
type ActionType = 'menu' | 'members' | 'theme';

interface ButtonsProps {
    type: ButtonType;
    action?: ActionType;
    onClick?: () => void;
    username?: string;
    avatarColor?: string;
    ariaLabel?: string;
    isActive?: boolean;
    label?: React.ReactNode;
    disabled?: boolean;
    htmlType?: 'button' | 'submit';
    className?: string;
}

const ACTION_ICONS: Record<ActionType, React.ReactNode> = {
    menu: <SidebarIcon />,
    members: <MembersIcon />,
    theme: null,
};

export default function Buttons({
    type,
    action,
    onClick,
    username,
    avatarColor,
    ariaLabel,
    isActive,
    label,
    disabled,
    htmlType = 'button',
    className,
}: ButtonsProps) {
    const { theme, toggleTheme } = useThemeStore();

    if (type === 'back') {
        return (
            <button className={clsx(cls.back, className)} onClick={onClick} aria-label={ariaLabel ?? 'Back'}>
                <ArrowLeftIcon />
            </button>
        );
    }

    if (type === 'action' && action === 'theme') {
        return (
            <button
                className={clsx(cls.btn, cls.btnGhost, cls.iconGhost, className)}
                onClick={toggleTheme}
                aria-label={ariaLabel ?? 'theme'}
            >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
        );
    }

    if (type === 'action') {
        return (
            <button
                className={clsx(cls.action, isActive && cls.actionActive, className)}
                onClick={onClick}
                aria-label={ariaLabel ?? action}
            >
                {ACTION_ICONS[action!]}
            </button>
        );
    }

    if (type === 'profile') {
        const initials = username?.charAt(0).toUpperCase() ?? 'U';

        return (
            <button
                className={clsx(cls.profile, className)}
                onClick={onClick}
                aria-label={ariaLabel ?? 'Profile'}
                style={{ backgroundImage: `linear-gradient(${avatarColor}, ${avatarColor})` }}
            >
                <span>{initials}</span>
            </button>
        );
    }

    if (type === 'send') {
        return (
            <button className={clsx(cls.btn, cls.send, className)} onClick={onClick} aria-label={ariaLabel ?? 'Send'}>
                ↑
            </button>
        );
    }

    if (type === 'close') {
        return (
            <button
                type="button"
                className={clsx(cls.btn, cls.btnGhost, cls.close, className)}
                onClick={onClick}
                aria-label={ariaLabel ?? 'Close'}
            >
                ✕
            </button>
        );
    }

    if (type === 'primary') {
        return (
            <button
                type={htmlType}
                className={clsx(cls.btn, cls.btnPrimary, className)}
                onClick={onClick}
                disabled={disabled}
            >
                {label}
            </button>
        );
    }

    if (type === 'danger') {
        return (
            <button
                type={htmlType}
                className={clsx(cls.btn, cls.btnDanger, className)}
                onClick={onClick}
                disabled={disabled}
            >
                {label}
            </button>
        );
    }

    return null;
}
