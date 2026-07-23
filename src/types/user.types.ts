export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar_color_id: number;
    about: string | null;
}

export type RegisterBody = Omit<User, 'id'> & { password: string };
export type LoginBody = Pick<User, 'email'> & { password: string };
