import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import Navbar from './Navbar'

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/SecondSplashScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/food-network 1.png")}
          style={{ width: 200, height: 100 }}
        />
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      "linear-gradient(180deg,rgba(206, 234, 211, 1) 0%, rgba(248, 252, 245, 1) 35%)",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
