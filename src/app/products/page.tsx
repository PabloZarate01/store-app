'use client';

import { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '@/redux/slices/searchSlice';
import { RootState } from '@/redux/store';
import { IProduct } from '@/types/product';
import Image from 'next/image';

export default function ProductsPage() {
    const dispatch = useDispatch();
    const query = useSelector((state: RootState) => state.search.query);

    const [searchTerm, setSearchTerm] = useState(query);
    const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useProducts(searchTerm);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setQuery(searchTerm));
    };

    useEffect(() => {
        const onScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight &&
                hasNextPage &&
                !isFetching
            ) {
                fetchNextPage();
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [hasNextPage, isFetching, fetchNextPage]);

    return (
        <div className='bg-stone-900 p-4'>
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    style={{ padding: '0.5rem', width: '100%' }}
                />
                <button type="submit">Search</button>
            </form>
            {
                (isLoading || isFetching) ? <div>Loading...</div> : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {data?.pages.map((page: unknown) =>
                        (page as IProduct[]).map((product: IProduct) => (
                            <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem' }}>
                                <h2>{product.title}</h2>
                                <Image src={product.image || ''} alt={product.title} width={100} height={100} about='x' />
                                <p>${product.price}</p>
                            </div>
                        ))
                    )}
                </div>
            }
        </div>
    );
}