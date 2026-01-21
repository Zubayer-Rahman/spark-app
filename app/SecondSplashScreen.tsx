import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/Buttons";
import {useEffect} from "react";

const SecondSplashScreen = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        router.replace("/(auth)/login");
      }, 5000);
      return () => clearTimeout(timer);
    }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/SecondSplash.png")}
        style={{ width: "100%", height: "70%", resizeMode: "cover" }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>
          Tasty Meals Delivered Faster Than You Think
        </Text>
        <Text style={styles.subTitle}>
          We bring your food quickly and saftey ensurring every bite stays hot,
          fresh, and just the way you like iy.
        </Text>
        <Pressable>
          <IconButton
            title="Get Started"
            onPress={() => {
              router.replace("/(auth)/login");
            }}
            iconName="chevron-forward-outline"
          />
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <Text>Not a member?</Text>
          <Pressable>
            <Text style={{ color: "green", fontSize: 13, fontWeight: "bold" }}>
              Register Now
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SecondSplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      "linear-gradient(180deg,rgba(206, 234, 211, 1) 0%, rgba(248, 252, 245, 1) 35%);",
    height: "100%",
  },
  content: {
    gap: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    padding: 20,
    bottom: 0,
    height: "55%",
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 46,
    fontWeight: 500,
    lineHeight: 48,
  },
  subTitle: {
    fontFamily: "Nunito",
    fontSize: 16,
    lineHeight: 24,
    color: "gray",
  },
});
