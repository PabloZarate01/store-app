import { IProduct } from '@/types/product';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProductById = async (id: string): Promise<IProduct> => {
    const { data } = await axios.get(`http://localhost:3001/products/${id}`);
    return data;
};

export const useProduct = (id: string) => {
    return useQuery<IProduct, Error>({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};