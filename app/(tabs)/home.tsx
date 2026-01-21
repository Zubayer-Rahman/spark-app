import {
    Image,
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../store/hooks';
import { selectAllProducts } from '../store/productsSlice';

interface Category {
    name: string;
    emoji: string;
}

const HomeScreen = () => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const products = useAppSelector(selectAllProducts);
    const router = useRouter();

    const handleProductPress = (productId: string): void => {
        router.push({
          pathname: '../productDetails',
          params: { productId }
        });
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
                    {/* Header Section */}
                    <View style={styles.header}>
                        <Image
                            source={require('../../assets/images/food-network 1.png')}
                            style={styles.logo}
                        />
                    </View>

                    {/* Profile Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.profileInfo}>
                            <Image
                                source={require('../../assets/images/profile-pic.png')}
                                style={styles.profilePic}
                            />
                            <View>
                                <Text style={styles.greeting}>Hi Zubayer</Text>
                                <Text style={styles.welcomeText}>Welcome Back!</Text>
                            </View>
                        </View>

                        <View style={styles.iconContainer}>
                            <Pressable>
                                <Image
                                    source={require('../../assets/images/Message.png')}
                                    style={styles.icon}
                                />
                            </Pressable>
                            <Pressable>
                                <Image
                                    source={require('../../assets/images/notification.png')}
                                    style={styles.icon}
                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* Banner */}
                    <View style={styles.bannerContainer}>
                        <Image
                            source={require('../../assets/images/banner.png')}
                            style={styles.bannerImage}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Categories Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Categories</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>View all</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoriesContainer}
                        >
                            {categories.map((category: Category, index: number) => (
                                <TouchableOpacity key={index} style={styles.categoryCard}>
                                    <View style={styles.categoryIcon}>
                                        <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                                    </View>
                                    <Text style={styles.categoryName}>{category.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Flash Sale Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Flash Sale</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>View all</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {products.map((product) => {
                                const discountedPrice = product.originalPrice * (1 - product.discount / 100);

                                return (
                                    <Pressable
                                        key={product.id}
                                        style={styles.dishCard}
                                        onPress={() => handleProductPress(product.id)}
                                    >
                                        <View>
                                            <View style={styles.dishCardHeader}>
                                                <Text style={styles.saleTag}>{product.discount}%</Text>

                                                <Pressable
                                                    onPress={() => setIsLiked(!isLiked)}
                                                    style={styles.likeButton}
                                                >
                                                    <Text style={styles.likeIcon}>
                                                        {isLiked ? '❤️' : '🤍'}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                            <Image source={product.image} style={styles.dishImage} />
                                            <View style={styles.dishInfo}>
                                                <Text style={styles.dishName} numberOfLines={1}>
                                                    {product.name}
                                                </Text>
                                                <View style={styles.priceRow}>
                                                    <Text style={styles.dishPrice}>
                                                        ${discountedPrice.toFixed(2)}
                                                    </Text>
                                                    <Text style={styles.dishOriginalPrice}>
                                                        ${product.originalPrice.toFixed(2)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* Bottom Spacing for Navbar */}
                    <View style={styles.bottomSpacing} />
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

export default HomeScreen;

const categories: Category[] = [
    { name: 'Pizza', emoji: '🍕' },
    { name: 'Burger', emoji: '🍔' },
    { name: 'Sushi', emoji: '🍣' },
    { name: 'Pasta', emoji: '🍝' },
    { name: 'Salad', emoji: '🥗' },
    { name: 'Dessert', emoji: '🍰' },
];

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    bannerContainer: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
    },
    bannerImage: {
        width: '100%',
        height: '90%',
        borderRadius: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    logo: {
        width: 80,
        height: 40,
    },
    profileSection: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileInfo: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    profilePic: {
        width: 50,
        height: 50,
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 14,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    icon: {
        width: 25,
        height: 25,
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#010101',
    },
    seeAll: {
        fontSize: 14,
        color: '#5a8569',
        fontWeight: '600',
    },
    categoriesContainer: {
        gap: 12,
        paddingRight: 20,
    },
    categoryCard: {
        alignItems: 'center',
        gap: 8,
    },
    categoryIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    categoryEmoji: {
        fontSize: 32,
    },
    categoryName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2d5f3f',
    },
    dishCard: {
        backgroundColor: '#C3F5B0',
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        width: 180,
    },
    dishCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saleTag: {
        backgroundColor: '#2F9C5C',
        padding: 5,
        marginTop: 5,
        borderRadius: 12,
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    likeButton: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 50,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeIcon: {
        fontSize: 20,
    },
    dishImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginVertical: 10,
    },
    dishInfo: {
        marginTop: 8,
    },
    dishName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d5f3f',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dishPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F9C5C',
    },
    dishOriginalPrice: {
        fontSize: 12,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    bottomSpacing: {
        height: 100,
    },
});