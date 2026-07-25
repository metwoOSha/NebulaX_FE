export interface Room {
    id: string;
    name: string;
    description: string;
    theme_id: number;
    created_at: string;
    role?: 'admin' | 'member';
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
