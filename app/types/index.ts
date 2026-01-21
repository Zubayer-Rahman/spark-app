import { ImageSourcePropType } from 'react-native';

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    originalPrice: number;
    discount: number;
    image: ImageSourcePropType;
    rating: number;
    reviews: number;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
    image: ImageSourcePropType;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}

export interface ProductsState {
    products: Product[];
}

export interface RootState {
    cart: CartState;
    products: ProductsState;
}

export type RootStackParamList = {
    Home: undefined;
    ProductDetail: { productId: string };
};