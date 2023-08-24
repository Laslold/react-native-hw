import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Router from "./src/router";
import React from "react";
import { useFonts } from "expo-font";

const App = () => {
  const isLogin = false; //true or false
  const [fontsLoaded, fontError] = useFonts({
    mainRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    mainBold: require("./assets/fonts/Roboto-Bold.ttf"),
    mainMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Router isLogin={isLogin} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
