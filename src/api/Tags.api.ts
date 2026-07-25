import { get } from './http';

export async function getTags() {
    const res = await get('/tags');
    return res.json();
}
