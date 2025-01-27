import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { IProduct } from '@/types/product';

const fetchProducts = async (query: string, page: number): Promise<AxiosResponse<IProduct[]>> => {
    const res = axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?_per_page=5&_page=${page}`
    );
    return res
};
export const useProducts = (query: string, page: number) =>
    useQuery({
        queryKey: ['products', query, page],
        queryFn: () => fetchProducts(query, page),
        placeholderData: keepPreviousData
    });

export const fetchPaginatedProducts = async (
    page: number,
    limit: number,
    search: string,
    sort: string
): Promise<AxiosResponse<IProduct[]>> => {
    const [sortField, sortOrder] = sort.split('_');
    return axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
        params: {
            title_like: search,
            _sort: `${sortOrder === 'desc' ? '-' : ''}${sortField}` || undefined,
            _page: page,
            _limit: limit,
        },
    });
};
export const usePaginatedProducts = (
    page: number,
    limit: number,
    search: string,
    sort: string
) => {
    return useQuery({
        queryKey: ['paginatedProducts', page, limit, search, sort],
        queryFn: () => fetchPaginatedProducts(page, limit, search, sort),
    });
};
