import { API_URL } from '../config/api';

const withRetry = (fn, retries = 2, delay = 1000) => {
    const attempt = (n) =>
        fn().catch((err) => {
            if (n <= 0) throw err;
            return new Promise((resolve) => setTimeout(resolve, delay)).then(() => attempt(n - 1));
        });
    return attempt(retries);
};

export const fetchTopSales = () =>
    withRetry(() =>
        fetch(`${API_URL}/top-sales`).then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        }));

export const fetchCategories = () =>
    withRetry(() =>
        fetch(`${API_URL}/categories`).then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        }));

export const fetchItems = ({ categoryId, offset = 0, q = '' } = {}) => {
    const params = new URLSearchParams();
    if (categoryId) params.set('categoryId', categoryId);
    if (offset) params.set('offset', offset);
    if (q) params.set('q', q);
    const query = params.toString();
    return withRetry(() =>
        fetch(`${API_URL}/items${query ? `?${query}` : ''}`).then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        }));
};

export const fetchItem = (id) =>
    withRetry(() =>
        fetch(`${API_URL}/items/${id}`).then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        }));

export const postOrder = (order) =>
    fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    }).then((res) => {
        if (!res.ok) throw new Error(res.statusText);
    });
