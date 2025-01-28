import React from 'react';
import Image from 'next/image';
import RatingStars from './RatingStars';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/cartSlice';
import { IProduct } from '@/types/product';

const ProductCard: React.FC<IProduct> = ({ id, title, image, price, description, rating }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const addProductToCart = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        dispatch(addItem({
            id,
            title,
            price,
            description,
            image,
            rating,
            quantity: 1
        }))
    }
    const addProductToCartAndGoToCart = () => {
        dispatch(addItem({
            id,
            title,
            price,
            description,
            image,
            rating,
            quantity: 1
        }))
        router.push('/cart');
    }
    const navigateToProduct = () => {
        router.push(`product/${id}`);
    }
    return (
        <div role='button' onClick={navigateToProduct} className="flex flex-col rounded-lg shadow-lg bg-white text-stone-950 dark:bg-stone-800 dark:text-stone-200 overflow-hidden transition-colors duration-300">
            <div className="relative w-full h-64 bg-white">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold truncate">{title}</h2>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 truncate">
                    {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                </p>
                <div className="mt-2">
                    <RatingStars rating={rating.rate} />
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                        ({rating.count} reviews)
                    </span>
                </div>
                <div className="mt-auto flex justify-between items-center">
                    <span className="text-xl font-bold">${price.toFixed(2)}</span>
                    {/* ButtonGroup */}
                    <div className="flex gap-4">
                        <button onClick={addProductToCart} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Add to Cart
                        </button>
                        <button onClick={addProductToCartAndGoToCart} className="bg-stone-700 text-white dark:bg-stone-600 px-4 py-2 rounded-lg hover:bg-stone-600 dark:hover:bg-stone-500 transition">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;