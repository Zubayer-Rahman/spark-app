import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import "react-native-reanimated";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as SplashScreen from 'expo-splash-screen';


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing your EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY");
}

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'Nutino-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
        'Nutino-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
        'Nutino-SemiBold': require('../assets/fonts/Nunito-Bold.ttf'),
        'Nutino-Bold': require('../assets/fonts/Nunito-ExtraBold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
  return (
      <ClerkProvider
          tokenCache={tokenCache}
          publishableKey={publishableKey}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ClerkProvider>
  );
}