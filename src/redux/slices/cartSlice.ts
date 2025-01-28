import { IProduct } from '@/types/product';
import { createSlice } from '@reduxjs/toolkit';

export interface CartItem extends IProduct {
    title: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart: state => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;