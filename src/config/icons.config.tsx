import { ReactNode } from 'react';
import { LogoIcon } from '@/components/icons/IconBadge/LogoIcon';
import { GameIcon } from '@/components/icons/IconBadge/GameIcon';
import { LightningIcon } from '@/components/icons/IconBadge/LightningIcon';
import { MoonIcon } from '@/components/icons/IconBadge/MoonIcon';
import { FireIcon } from '@/components/icons/IconBadge/FireIcon';
import { MovieIcon } from '@/components/icons/IconBadge/MovieIcon';
import { MusicIcon } from '@/components/icons/IconBadge/MusicIcon';
import { SportIcon } from '@/components/icons/IconBadge/SportIcon';
import { SpaceIcon } from '@/components/icons/IconBadge/SpaceIcon';

export const SIZES = {
    xl: { box: 52, radius: 18, iconSize: 26 },
    lg: { box: 46, radius: 16, iconSize: 22 },
    md: { box: 40, radius: 14, iconSize: 20 },
    sm: { box: 30, radius: 11, iconSize: 15 },
    label: { box: 30, radius: 9, iconSize: 16 },
};

export type Size = keyof typeof SIZES;

export interface Tile {
    id: number;
    name: string;
    icon: ReactNode;
    gradient: [string, string];
}

export const LOGO: Tile & { id: 0 } = {
    id: 0,
    name: 'NebulaX',
    icon: <LogoIcon />,
    gradient: ['#9d6bff', '#6d28d9'],
};

export const TILES: Tile[] = [
    { id: 1, name: 'Video games', icon: <GameIcon />, gradient: ['#7884f6', '#5865f2'] },
    { id: 2, name: 'Energy', icon: <LightningIcon />, gradient: ['#fcc04a', '#faa61a'] },
    { id: 3, name: 'Late night', icon: <MoonIcon />, gradient: ['#8f7cff', '#6d28d9'] },
    { id: 4, name: 'Trending', icon: <FireIcon />, gradient: ['#ef5a82', '#e91e63'] },
    { id: 5, name: 'Film & TV', icon: <MovieIcon />, gradient: ['#3dc0fd', '#00a8fc'] },
    { id: 6, name: 'Music', icon: <MusicIcon />, gradient: ['#5fc27e', '#3ba55d'] },
    { id: 7, name: 'Sport', icon: <SportIcon />, gradient: ['#b07cce', '#9b59b6'] },
    { id: 8, name: 'Space', icon: <SpaceIcon />, gradient: ['#ff8a5c', '#ff5a3c'] },
];

export const getTileById = (id: number) => (id === LOGO.id ? LOGO : TILES.find((tile) => tile.id === id));
