export function getQueryString(params: Record<string, string | number>): string {
    const query = new URLSearchParams(
        Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
    ).toString();
    return query ? `?${query}` : '';
}
