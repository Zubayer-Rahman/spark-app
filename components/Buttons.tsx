import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  title: string;
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  title,
  onPress,
  iconName,
  backgroundColor = "#000000",
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{title}</Text>

      <Ionicons name={iconName} size={24} color="white" />
    </TouchableOpacity>
  );
};
export default IconButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 35,
    marginVertical: 10,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
});
