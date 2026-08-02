export interface Room {
    id: string;
    name: string;
    description: string;
    theme_id: number;
    created_at: string;
    online_count?: number;
}

export type CreateRoomBody = {
    name: string;
    description: string;
    theme_id: number;
};

export interface RoomsResponse {
    my: Room[];
    joined: Room[];
    recommended: Room[];
}

export interface RoomMember {
    id: string;
    username: string;
    avatar_color_id: number;
    role: 'admin' | 'member';
}
