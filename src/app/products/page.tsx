'use client'
import { useEffect, useState } from 'react';
import { usePaginatedProducts } from '../../hooks/useProducts';
import { IProduct } from '@/types/product';
import ProductCard from '../components/ProductCard';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageParam = searchParams.get('page') || '1';
    const pageLimit = parseInt(searchParams.get('pageLimit') || '5');
    const searchParam = searchParams.get('searchParam') || '';
    const sortBy = searchParams.get('sortBy') || '';

    const [page, setPage] = useState(parseInt(pageParam));

    const [search, setSearch] = useState(searchParam);
    const [sort, setSort] = useState(sortBy);

    const { data, isFetching, isLoading } = usePaginatedProducts(page, pageLimit, search, sort);

    const updateQueryParams = () => {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('pageLimit', pageLimit.toString());
        params.set('searchParam', search);
        params.set('sortBy', sort);
        router.replace(`/products?${params.toString()}`);
    };
    useEffect(() => {
        setPage(1);
    }, [search, sort]);
    useEffect(() => {
        updateQueryParams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageLimit, search, sort]);

    return (
        <div className="bg-white dark:bg-stone-900 text-white p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white text-stone-950">Products</h1>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    placeholder="Search..."
                    className="p-2 rounded bg-stone-800 text-stone-200"
                />
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="p-2 rounded bg-stone-800 text-stone-200"
                >
                    <option value="">Sort by</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading || isFetching ? (
                    <p>Loading...</p>
                ) : (
                    data?.data?.map((product: IProduct) => (
                        <ProductCard
                            id={product.id}
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            description={product.description}
                            rating={product.rating}
                        />
                    ))
                )}
            </div>

            <div className="flex justify-between items-center mt-4 text-stone-950 dark:text-white">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page <= 1}
                    className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 text-white"
                >
                    Previous
                </button>
                <span>
                    Page {page} of {data?.headers['x-total-count'] / pageLimit}
                </span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!data?.headers['x-total-count'] || data?.headers['x-total-count'] / pageLimit <= page}
                    className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 text-white"
                >
                    Next
                </button>
            </div>
        </div>
    );
}