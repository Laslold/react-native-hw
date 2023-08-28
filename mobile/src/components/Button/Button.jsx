import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Button = (props) => {
  const { onPress, text, disabled=false, ...inputProps } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        !disabled ? styles.btn : { ...styles.btn, backgroundColor: "#e8e8e8" }
      }
      {...inputProps}
    >
      <Text style={styles.btnText}> {text}</Text>
    </TouchableOpacity>
  );
};


export default Button;

const styles = StyleSheet.create({
  btn: {
    // marginHorizontal: 16,
    marginTop: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "mainMedium",
    fontSize: 16,
    lineHeight: 18.75,
    borderRadius: 10,
    backgroundColor: "#ff6c00",
  },
  btnText: {
    fontFamily: "mainRegular",
    fontSize: 16,

    color: "#ffffff",
  },
});
