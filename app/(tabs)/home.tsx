import {Image, StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar, Pressable} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Icon} from "expo-router/build/native-tabs";
import React, { useState } from 'react';

const HomeScreen = () => {
    const [isLiked, setIsLiked] = useState(false);
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
                            source={require("../../assets/images/food-network 1.png")}
                            style={styles.logo}
                        />
                    </View>

                    {/*profile section*/}
                    <View style={{marginBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View style={{flexDirection:"row", gap: 10, alignItems: "center"}}>
                            <Image
                                source={require("../../assets/images/profile-pic.png")}
                                style={{width: 50, height: 50}}
                            />
                            <View>
                                <Text style={{fontSize: 22, fontWeight: "bold"}}>Hi Zubayer</Text>
                                <Text>Welcome Back!</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: "row", gap: 10, }}>
                            <Pressable>
                                <Image source={require("../../assets/images/Message.png")} style={{width: 25, height: 25}} />
                            </Pressable>
                            <Pressable>
                                <Image source={require("../../assets/images/notification.png")} style={{width: 25, height: 25}}/>
                            </Pressable>
                        </View>
                    </View>

                    {/*banner*/}
                    <View style={styles.bannerContainer}>
                        <Image source={require("../../assets/images/banner.png")} style={styles.bannerImage} resizeMode="cover"
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
                            {categories.map((category, index) => (
                                <TouchableOpacity key={index} style={styles.categoryCard}>
                                    <View style={styles.categoryIcon}>
                                        <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                                    </View>
                                    <Text style={styles.categoryName}>{category.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Popular Dishes Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Flash Sale</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>View all</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}

                        >
                            {popularDishes.map((dish, index) => (
                                <Pressable key={index} style={styles.dishCard}>
                                    <View>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={{backgroundColor: "#2F9C5C", padding: 5, marginTop: 5, borderRadius: 12, color: "white"}}>{dish.sale}</Text>

                                            <Pressable onPress={() => setIsLiked(!isLiked)} style={{backgroundColor: "white", padding: 5, borderRadius: "50%"}}>
                                                <Text style={{ fontSize: 20, color: isLiked ? 'red' : 'grey' }}>
                                                    {isLiked ? '❤️' : '🤍'}
                                                </Text>
                                            </Pressable>
                                        </View>
                                        <Image source={dish.image}/>
                                    </View>
                                </Pressable>
                            ))}
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

const categories = [
    { name: "Pizza", emoji: "🍕" },
    { name: "Burger", emoji: "🍔" },
    { name: "Sushi", emoji: "🍣" },
    { name: "Pasta", emoji: "🍝" },
    { name: "Salad", emoji: "🥗" },
    { name: "Dessert", emoji: "🍰" },
];

const popularDishes = [
    {
        sale: "50%",
        color: "#C3F5B0",
        image: require("../../assets/images/dish.png"),
    },
    {
        sale: "50%",
        color: "#C3F5B0",
        image: require("../../assets/images/dish.png"),
    },
];

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'linear-gradient(180deg,rgba(206, 234, 211, 1) 0%, rgba(248, 252, 245, 1) 35%)',
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
    // Header Styles
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },
    subtitle: {
        fontSize: 14,
        color: "#5a8569",
    },
    logo: {
        width: 80,
        height: 40,
    },

    // Section Styles
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#010101",
    },
    seeAll: {
        fontSize: 14,
        color: "#5a8569",
        fontWeight: "600",
    },

    // Category Styles
    categoriesContainer: {
        gap: 12,
        paddingRight: 20,
    },
    categoryCard: {
        alignItems: "center",
        gap: 8,
    },
    categoryIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
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
        fontWeight: "600",
        color: "#2d5f3f",
    },

    // Dish Card Styles
    dishCard: {
        backgroundColor: "#C3F5B0",
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
        marginRight: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        alignItems: "center",
    },
    // Bottom Spacing
    bottomSpacing: {
        height: 100, // Space for navbar
    },
});