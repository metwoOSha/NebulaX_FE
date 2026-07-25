export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar_color_id: number;
    about: string | null;
    tags: string[];
}

export type RegisterBody = Omit<User, 'id' | 'tags'> & { password: string };
export type LoginBody = Pick<User, 'email'> & { password: string };
