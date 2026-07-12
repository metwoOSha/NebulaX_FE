'use client';

import { useThemeStore } from '@/store/themeStore';
import cls from './Buttons.module.css';
import { ArrowLeftIcon, SunIcon, MoonIcon, SidebarIcon, MembersIcon } from '@/components/icons';

type ButtonType = 'back' | 'action' | 'profile';
type ActionType = 'menu' | 'members' | 'theme';

interface ButtonsProps {
    type: ButtonType;
    action?: ActionType;
    onClick?: () => void;
    username?: string;
    avatarColor?: string;
    ariaLabel?: string;
    isActive?: boolean;
}

const ACTION_ICONS: Record<ActionType, React.ReactNode> = {
    menu: <SidebarIcon />,
    members: <MembersIcon />,
    theme: null,
};

export default function Buttons({ type, action, onClick, username, avatarColor, ariaLabel, isActive }: ButtonsProps) {
    const { theme, toggleTheme } = useThemeStore();

    if (type === 'back') {
        return (
            <button className={cls.back} onClick={onClick} aria-label={ariaLabel ?? 'Back'}>
                <ArrowLeftIcon />
            </button>
        );
    }

    if (type === 'action' && action === 'theme') {
        return (
            <button className={`${cls.btn} ${cls.btnGhost}`} onClick={toggleTheme} aria-label={ariaLabel ?? 'theme'}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
        );
    }

    if (type === 'action') {
        return (
            <button
                className={`${cls.action} ${isActive ? cls.actionActive : ''}`}
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
                className={cls.profile}
                onClick={onClick}
                aria-label={ariaLabel ?? 'Profile'}
                style={{ backgroundImage: `linear-gradient(${avatarColor}, ${avatarColor})` }}
            >
                <span>{initials}</span>
            </button>
        );
    }

    return null;
}
