import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async ({ pageParam = 1, query = '' }: { pageParam: number; query: string }) => {
    const { data } = await axios.get(
        `https://fakestoreapi.com/products?limit=10&page=${pageParam}&search=${query}`
    );
    return data;
};

export const useProducts = (query: string) =>
    useInfiniteQuery({
        queryKey: ['products', query],
        queryFn: ({ pageParam }: { pageParam?: number }) => fetchProducts({ pageParam: pageParam ?? 1, query }),
        getNextPageParam: (lastPage: {
            [x: string]: unknown; nextPage?: number
        }) => lastPage.nextPage || undefined,
        initialPageParam: 1,
    });