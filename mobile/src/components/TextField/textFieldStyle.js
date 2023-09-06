import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  input: {
    width: 310,
    borderWidth: 1,
    marginTop: 16,
    height: 50,
    borderRadius: 10,
    color: "#212121",
    padding: 16,
    fontFamily: "mainRegular",
    fontSize: 16,
  },
  default: {
    borderColor: "#e8e8e8",
    backgroundColor: "#e8e8e8",
  },
  active: {
    borderColor: "#ff6c00",
    backgroundColor: "#ffffff",
  },
});

export default styles;
