import axios from 'axios';

export type FetcherOptions<T> = {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any,
    searchParams?: { [key: string]: string | number }
}

export const fetcher = async <T>(payload: FetcherOptions<T>) => {
    const { path, method, body, searchParams } = payload;
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;

    
    const url = new URL(path, baseUrl);
    if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
            url.searchParams.append(key, value.toString());
        })
    }

    axios
    
    const res = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (!res.ok) {
        
        throw new Error(res.statusText);
    }

    return await res.json() as Promise<T>;
}