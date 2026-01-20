import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navbar from '../Navbar';

export default function TabsLayout() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Slot />
                <Navbar />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});