import { getQueryString } from '@/helpers/getQueryString';

const BASE_URL =
    typeof window === 'undefined' ? `${process.env.NEXT_PUBLIC_API_URL}/api` || 'http://localhost:3001/api' : '/api';

async function getAuthHeaders(): Promise<Record<string, string>> {
    if (typeof window === 'undefined') {
        try {
            const { cookies } = await import('next/headers');
            const cookiesStore = await cookies();
            const token = cookiesStore.get('token');
            if (!token) return {};
            return { Cookie: `token=${token.value}` };
        } catch (err) {
            return {};
        }
    }
    return {};
}

async function handleResponse(res: Response): Promise<Response> {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        const message =
            body?.message || (body?.errors?.length ? body.errors[0].message : null) || `HTTP error: ${res.status}`;
        throw new Error(message);
    }
    return res;
}

export async function get(url: string, params?: Record<string, string | number>): Promise<Response> {
    const query = params ? getQueryString(params) : '';
    const res = await fetch(`${BASE_URL}${url}${query}`, {
        method: 'GET',
        credentials: 'include',
        headers: await getAuthHeaders(),
    });

    return handleResponse(res);
}

export async function post(url: string, body: unknown): Promise<Response> {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(await getAuthHeaders()),
        },
        body: JSON.stringify(body),
    });
    return handleResponse(res);
}

export async function patch(url: string, body: unknown): Promise<Response> {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(await getAuthHeaders()),
        },
        body: JSON.stringify(body),
    });

    return handleResponse(res);
}

export async function del(url: string): Promise<Response> {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: await getAuthHeaders(),
    });

    return handleResponse(res);
}
