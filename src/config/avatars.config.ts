export const AVATAR_COLORS: Record<number, string> = {
    1: '#5865f2', // blurple
    2: '#3ba55d', // green
    3: '#e91e63', // pink
    4: '#faa61a', // amber
    5: '#9b59b6', // purple
    6: '#00a8fc', // blue
    7: '#eb459e', // magenta
    8: '#7c4ad0', // violet
};

export const getAvatarColorById = (id: number) => AVATAR_COLORS[id] ?? AVATAR_COLORS[1];
