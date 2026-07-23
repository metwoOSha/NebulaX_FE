import { LoginBody, RegisterBody } from '@/types/user.types';
import { get, post } from './http';

const GET_AUTH = (type: string) => `/auth/${type}`;

export async function login(body: LoginBody) {
    const res = await post(GET_AUTH('login'), body);
    return res.json();
}

export async function register(body: RegisterBody) {
    const res = await post(GET_AUTH('register'), body);
    return res.json();
}

export async function logout() {
    const res = await post(GET_AUTH('logout'), {});
    return res.json();
}

export async function getMe() {
    const res = await get(GET_AUTH('me'));
    return res.json();
}
