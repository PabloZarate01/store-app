'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeItem, clearCart, updateQuantity } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartPage() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const router = useRouter();

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="container mx-auto p-6 bg-stone-50 dark:bg-stone-900 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-stone-800 dark:text-stone-100">Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">Your cart is currently empty.</p>
                    <button
                        onClick={() => router.push('/products')}
                        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Browse Products
                    </button>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-stone-200 dark:bg-stone-800">
                                    <th className="p-4 text-stone-700 dark:text-stone-300">Product</th>
                                    <th className="p-4 text-stone-700 dark:text-stone-300">Price</th>
                                    <th className="p-4 text-stone-700 dark:text-stone-300">Quantity</th>
                                    <th className="p-4 text-stone-700 dark:text-stone-300">Total</th>
                                    <th className="p-4 text-stone-700 dark:text-stone-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="border-t border-stone-300 dark:border-stone-700">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="bg-white h-16 w-16 rounded-lg object-contain"
                                                    width={16}
                                                    height={16}
                                                />
                                                <span className="text-stone-800 dark:text-stone-100">{item.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-stone-700 dark:text-stone-300">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                                                    }
                                                    className="px-2 py-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="text-stone-800 dark:text-stone-100">{item.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                                                    }
                                                    className="px-2 py-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-4 text-stone-700 dark:text-stone-300">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => dispatch(removeItem(item))}
                                                className="text-red-600 hover:text-red-700 transition"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <div>
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
                            >
                                Clear Cart
                            </button>
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-stone-800 dark:text-stone-100">
                                Total: ${cartTotal.toFixed(2)}
                            </p>
                            <button
                                onClick={() => router.push('/checkout')}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 ml-4"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}