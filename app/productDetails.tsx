import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { addToCart } from './store/cartSlice';
import { selectProductById } from './store/productsSlice';

const ProductDetailScreen = () => {
    const params = useLocalSearchParams();
    const productId = params.productId as string;

    const router = useRouter();
    const dispatch = useAppDispatch();

    const product = useAppSelector((state) =>
        selectProductById(state, productId)
    );
    const [quantity, setQuantity] = useState<number>(1);

    // Debug log
    console.log('Product ID from params:', productId);
    console.log('Product found:', product);

    if (!productId) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No product ID provided</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Product not found</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const discountedPrice = product.originalPrice * (1 - product.discount / 100);
    const totalPrice = (discountedPrice * quantity).toFixed(2);

    const handleAddToCart = (): void => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: parseFloat(discountedPrice.toFixed(2)),
                image: product.image,
            })
        );

        Alert.alert('Success', 'Added to cart!', [
            {
                text: 'OK',
                onPress: () => router.back(),
            },
        ]);
    };

    const incrementQuantity = (): void => setQuantity(quantity + 1);
    const decrementQuantity = (): void => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <View style={styles.wrapper}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <LinearGradient
                colors={['rgba(206, 234, 211, 1)', 'rgba(248, 252, 245, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.35]}
                style={styles.gradient}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header with Back Button */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.headerBackButton}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.headerBackButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={{color: "#212121", fontSize: 18, fontWeight: "bold"}}>Details</Text>
                        <View style={styles.placeholder} />
                    </View>

                    {/* Product Image */}
                    <View style={styles.imageContainer}>
                        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
                    </View>

                    {/*total proce section*/}
                    <View style={styles.totalPriceContainer}>
                        <Text style={styles.totalLabel}>Total Price</Text>
                        <Text style={styles.totalPrice}>${totalPrice}</Text>
                    </View>

                    {/* Product Info */}
                    <View style={styles.infoContainer}>
                        {/* Product Name */}
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <View style={styles.quantitySelector}>
                                <View style={{backgroundColor: '#F4F6F8', flexDirection: "row", gap: 5, borderRadius: 20, padding: 5}}>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={decrementQuantity}
                                    >
                                        <Text style={styles.quantityButtonText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityValue}>{quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={incrementQuantity}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/*category*/}
                        <View style={styles.categoryContainer}>
                            <Text style={{fontSize: 18}}>Category: </Text>
                            <Text style={{fontSize: 18}}>{product.category}</Text>
                        </View>
                        {/* Description */}
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.descriptionText}>{product.description}</Text>
                        </View>
                    </View>

                    {/* Bottom Add to Cart Section */}
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F8FCF5',
    },
    gradient: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 60,
        paddingBottom: 120,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#2F9C5C',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerBackButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerBackButtonText: {
        fontSize: 24,
        color: '#2F9C5C',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#010101',
    },
    placeholder: {
        width: 40,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    productImage: {
        width: 300,
        height: 300,
        borderRadius: 20,
    },
    discountBadge: {
        position: 'absolute',
        top: 20,
        left: 40,
        backgroundColor: '#2F9C5C',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    discountText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    infoContainer: {
        paddingHorizontal: 20,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: 'white',
    },
    productNameContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    categoryContainer:{
        flexDirection: 'row',
        marginBottom: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#010101',
        marginBottom: 12,
        maxWidth: 160
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    starIcon: {
        fontSize: 18,
        marginRight: 6,
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    descriptionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#010101',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 20,
        color: 'black',
    },
    quantityValue: {
        fontSize: 22,
        color: '#010101',
        minWidth: 30,
        textAlign: 'center',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    totalPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#86CD93',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    totalLabel: {
        fontSize: 14,
        color: '#010101',
    },
    totalPrice: {
        fontSize: 24,
        color: '#010101',
    },
    addToCartButton: {
        backgroundColor: '#010101',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    addToCartText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});