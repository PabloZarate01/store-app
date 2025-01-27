import React from 'react';
import Image from 'next/image';
import RatingStars from './RatingStars';
// import useLazyLoad from '@/hooks/useLazyLoad';

interface ProductProps {
    title: string;
    image: string;
    price: number;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
}

const ProductCard: React.FC<ProductProps> = ({ title, image, price, description, rating }) => {
    // const { isVisible, imgRef } = useLazyLoad();
    return (
        <div className="flex flex-col rounded-lg shadow-lg bg-white dark:bg-stone-800 dark:text-stone-200 overflow-hidden transition-colors duration-300">
            <div className="relative w-full h-64 bg-white">
                <Image
                    // ref={imgRef}
                    src={image}
                    alt={title}
                    fill
                    className="object-contain"
                    priority
                    // loading='lazy'
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
                    <button className="bg-stone-700 text-white dark:bg-stone-600 px-4 py-2 rounded-lg hover:bg-stone-600 dark:hover:bg-stone-500 transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;