'use client';

import { ShoppingCart, Sun, Moon } from 'lucide-react'; // Lucide Icons
import { useSelector } from 'react-redux';
import { useTheme } from 'next-themes';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Topbar() {
    const router = useRouter();
    const cartItemCount = useSelector((state: RootState) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="bg-stone-900 dark:bg-stone-950 dark:text-stone text-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div
                    onClick={() => router.push('/')}
                    className="text-xl font-bold cursor-pointer hover:text-gray-400 transition"
                >
                    Store App
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.push('/products')}
                        className="text-base hover:text-gray-400 transition"
                    >
                        Products
                    </button>
                    <button
                        onClick={() => router.push('/about')}
                        className="text-base hover:text-gray-400 transition"
                    >
                        About Us
                    </button>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="text-white hover:text-gray-400 transition"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? (
                            <Moon className="w-6 h-6" />
                        ) : (
                            <Sun className="w-6 h-6" />
                        )}
                    </button>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => router.push('/cart')}
                    >
                        <ShoppingCart className="w-6 h-6 text-white hover:text-gray-400 transition" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}