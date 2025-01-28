'use client';

import Image from 'next/image';
import { useProduct } from '../product/[id]/hooks';
import { useRouter } from 'next/navigation';
import RatingStars from './RatingStars';
import { addItem, CartItem } from '@/redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function ProductDetails({ productId }: { productId: string }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const { data: product, isLoading, isError } = useProduct(productId as string);

    if (isLoading) {
        return <div className="text-center mt-10 text-xl font-semibold">Loading product details...</div>;
    }

    if (isError || !product) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-4xl font-extrabold text-red-600">Product Not Found</h1>
                <p className="text-gray-500 mt-4">
                    Sorry, we couldn&apos;t find the product you were looking for.
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-blue-600 text-white px-6 py-3 mt-6 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Go Back to Home
                </button>
            </div>
        );
    }
    const addProductToCart = () => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            dispatch(addItem({ ...existingItem, quantity: existingItem.quantity + 1 } as CartItem));
        } else {
            dispatch(addItem({ ...product, quantity: 1 } as CartItem));
        }
    }

    return (
        <div className="container h-screen mx-auto p-6 bg-stone-50 dark:bg-stone-900 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Product Image */}
                <div className="w-full md:w-1/2">
                    <Image
                        src={product.image}
                        alt={product.title}
                        className="rounded-lg shadow-md"
                        width={500}
                        height={500}
                    />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-100">{product.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">{product.description}</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-6">
                        ${product.price.toFixed(2)}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mt-4">
                        <RatingStars rating={product.rating.rate} />
                        <span className="ml-2 text-gray-500 dark:text-gray-300">
                            ({product.rating.count} reviews)
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button onClick={addProductToCart} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                            Add to Cart
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}