import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ImageSourcePropType } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

interface NavItem {
    name: string;
    route: string;
    icon: ImageSourcePropType;
}

const Navbar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    // Navigation items configuration
    const navItems: NavItem[] = [
        {
            name: 'Home',
            route: '/(tabs)/home',
            icon: require('../assets/images/home.png'),
        },
        {
            name: 'Search',
            route: '/(tabs)/search',
            icon: require('../assets/images/search.png'),
        },
        {
            name: 'Likes',
            route: '/(tabs)/likes',
            icon: require('../assets/images/notification.png'),
        },
        {
            name: 'Cart',
            route: '/(tabs)/cart',
            icon: require('../assets/images/cart.png'),
        },
        {
            name: 'Profile',
            route: '/(tabs)/profile',
            icon: require('../assets/images/profile.png'),
        },
    ];

    const isActive = (route: string): boolean => pathname === route;

    return (
        <View style={styles.container}>
            <BlurView intensity={80} tint="light" style={styles.blurContainer}>
                <View style={styles.navBar}>
                    {navItems.map((item: NavItem, index: number) => {
                        const active = isActive(item.route);

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => router.push(item.route as any)}
                                style={styles.navItem}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.iconContainer,
                                        active && styles.iconContainerActive,
                                    ]}
                                >
                                    <Image
                                        source={item.icon}
                                        style={[
                                            styles.icon,
                                            active && styles.iconActive,
                                        ]}
                                        resizeMode="contain"
                                    />
                                    {active && (
                                        <Text style={styles.navText}>{item.name}</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
        zIndex: 999,
    },
    blurContainer: {
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    navBar: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    iconContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    iconContainerActive: {
        borderWidth: 0,
        backgroundColor: '#CEEAD3',
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#000',
    },
    iconActive: {
        tintColor: '#2d5f3f',
    },
    navText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#2d5f3f',
        marginTop: 2,
    },
});

export default Navbar;