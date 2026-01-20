import React from "react";
import { Image, StyleSheet } from "react-native";

const index = () => {
  return (
    <>
      <Image
        source={require("../../assets/images/food-network 1.png")}
        style={{ width: 50, height: 50 }}
      />
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
