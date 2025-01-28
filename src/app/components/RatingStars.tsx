import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { theme } from '@/tailwind.theme';

interface RatingStarsProps {
    rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5
    return (
        <div className="flex items-center">
            {Array(emptyStars)
                .fill(0)
                .map((_, i) => (
                    <Star key={`empty-${i}`} className="text-yellow-500 w-5 h-5" />
                ))}
            <div className='absolute flex'>
                {Array(filledStars)
                    .fill(0)
                    .map((_, i) => (
                        <Star key={`filled-${i}`} fill={theme.yellow[500]} className="text-yellow-500 w-5 h-5" strokeWidth={0} />
                    ))}
                {halfStars === 1 && <StarHalf fill={theme.yellow[500]} className="text-yellow-500 w-5 h-5" strokeWidth={0} />}
            </div>
        </div>
    );
};

export default RatingStars;