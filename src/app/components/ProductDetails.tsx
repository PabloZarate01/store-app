'use client';

import Image from 'next/image';
import { useProduct } from '../product/[id]/hooks';
import { useRouter } from 'next/navigation';
import RatingStars from './RatingStars';

interface ProductDetailsProps {
    productId: string;
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
    const router = useRouter();
    const { data: product, isLoading, isError } = useProduct(productId);

    if (isLoading) {
        return <div className="text-center mt-10">Loading product details...</div>;
    }

    if (isError || !product) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold">Product Not Found</h1>
                <p className="text-gray-500">We couldn&apos;t find the product you were looking for.</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                >
                    Go Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/2">
                    <Image
                        src={product.image}
                        alt={product.title}
                        className='rounded-lg object-contain'
                        width={250}
                        height={250}
                    />
                </div>
                <div className="ml-0 md:ml-8">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-xl font-semibold mt-4">${product.price.toFixed(2)}</p>
                    <p className="text-gray-500 mt-2">
                        <RatingStars rating={product.rating.rate} />
                    </p>
                </div>
            </div>
        </div>
    );
}