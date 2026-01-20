import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
Animated,
Dimensions,
StatusBar,
StyleSheet,
Text,
View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
onAnimationEnd?: () => void;
navigationTarget?: string;
duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
onAnimationEnd,
navigationTarget = "./(tabs)/HomeScreen.tsx",
duration = 3000,
}) => {
const navigation = useNavigation();

// Animation values
const fadeAnim = useRef(new Animated.Value(0)).current;
const scaleAnim = useRef(new Animated.Value(0.3)).current;
const slideAnim = useRef(new Animated.Value(50)).current;

useEffect(() => {
// Start animations
Animated.parallel([
Animated.timing(fadeAnim, {
toValue: 1,
duration: 1000,
useNativeDriver: true,
}),
Animated.spring(scaleAnim, {
toValue: 1,
tension: 10,
friction: 2,
useNativeDriver: true,
}),
Animated.timing(slideAnim, {
toValue: 0,
duration: 800,
delay: 200,
useNativeDriver: true,
}),
]).start();

    // Navigate after duration
    const timer = setTimeout(() => {
      if (onAnimationEnd) {
        onAnimationEnd();
      } else {
        navigation.navigate(navigationTarget as never);
      }
    }, duration);

    return () => clearTimeout(timer);

}, []);

return (
<!-- <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" /> -->

      {/* Background gradient effect */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />

      {/* Logo/Icon */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Replace with your logo image */}
        <View style={styles.iconPlaceholder}>
          <Text style={styles.iconText}>🚚</Text>
        </View>
      </Animated.View>

      {/* App Name */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.appName}>QuickDeliver</Text>
        <Text style={styles.tagline}>Fast & Reliable Delivery</Text>
      </Animated.View>

      {/* Loading indicator */}
      <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
        <View style={styles.loadingBar}>
          <Animated.View
            style={[
              styles.loadingProgress,
              {
                width: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </Animated.View>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>Powered by Your Company</Text>
      </Animated.View>
    </View>

);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#FF6B35",
alignItems: "center",
justifyContent: "center",
},
gradientTop: {
position: "absolute",
top: 0,
left: 0,
right: 0,
height: height _ 0.4,
backgroundColor: "rgba(255, 107, 53, 0.8)",
borderBottomLeftRadius: 100,
borderBottomRightRadius: 100,
},
gradientBottom: {
position: "absolute",
bottom: 0,
left: 0,
right: 0,
height: height _ 0.3,
backgroundColor: "rgba(255, 87, 34, 0.6)",
borderTopLeftRadius: 100,
borderTopRightRadius: 100,
},
logoContainer: {
marginBottom: 30,
},
iconPlaceholder: {
width: 120,
height: 120,
borderRadius: 60,
backgroundColor: "rgba(255, 255, 255, 0.2)",
alignItems: "center",
justifyContent: "center",
borderWidth: 3,
borderColor: "rgba(255, 255, 255, 0.3)",
},
iconText: {
fontSize: 60,
},
textContainer: {
alignItems: "center",
marginBottom: 50,
},
appName: {
fontSize: 36,
fontWeight: "bold",
color: "#FFFFFF",
marginBottom: 8,
letterSpacing: 1,
},
tagline: {
fontSize: 16,
color: "rgba(255, 255, 255, 0.9)",
fontWeight: "500",
},
loadingContainer: {
position: "absolute",
bottom: 100,
width: width \* 0.6,
},
loadingBar: {
height: 4,
backgroundColor: "rgba(255, 255, 255, 0.3)",
borderRadius: 2,
overflow: "hidden",
},
loadingProgress: {
height: "100%",
backgroundColor: "#FFFFFF",
borderRadius: 2,
},
footer: {
position: "absolute",
bottom: 40,
},
footerText: {
fontSize: 12,
color: "rgba(255, 255, 255, 0.7)",
fontWeight: "500",
},
});

export default SplashScreen;
