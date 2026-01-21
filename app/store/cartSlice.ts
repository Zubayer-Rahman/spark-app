import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem } from '../types';
import { RootState } from './index';
import { ImageSourcePropType } from 'react-native';

interface AddToCartPayload {
    id: string;
    name: string;
    price: number;
    image: ImageSourcePropType;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            state.totalQuantity++;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    image: newItem.image,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }

            state.totalAmount += newItem.price;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                state.totalQuantity--;
                state.totalAmount -= existingItem.price;

                if (existingItem.quantity === 1) {
                    state.items = state.items.filter((item) => item.id !== id);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice -= existingItem.price;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;
export const selectCartTotalQuantity = (state: RootState): number => state.cart.totalQuantity;
export const selectCartTotalAmount = (state: RootState): number => state.cart.totalAmount;