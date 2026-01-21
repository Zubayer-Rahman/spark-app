import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../types';
import { RootState } from './index';

const initialState: ProductsState = {
    products: [
        {
            id: '1',
            name: 'Delicious Pizza Margherita',
            description: 'Fresh mozzarella, tomatoes, and basil on a thin crispy crust. Made with authentic Italian ingredients.',
            category: 'Pizza',
            originalPrice: 24.99,
            discount: 50,
            image: require('../../assets/images/dish.png'),
            rating: 4.5,
            reviews: 128,
        },
        {
            id: '2',
            name: 'Classic Cheese Burger',
            description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and our special sauce on a toasted bun.',
            category: 'Burger',
            originalPrice: 18.99,
            discount: 50,
            image: require('../../assets/images/dish.png'),
            rating: 4.7,
            reviews: 95,
        },
    ],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
    },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;

// Selectors
export const selectAllProducts = (state: RootState): Product[] =>
    state.products.products;

export const selectProductById = (state: RootState, productId: string): Product | undefined =>
    state.products.products.find((product) => product.id === productId);