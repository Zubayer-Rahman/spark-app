import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing your EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY");
}
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SafeAreaProvider>
        <SafeAreaView>
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
