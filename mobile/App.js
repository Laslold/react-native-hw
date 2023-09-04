import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Router from "./src/router";
import React from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const App = () => {
  // const isLogin = useSelector(isLogine); //true or false

  // const value = useSelector((state) => console.log(state));

  const [fontsLoaded, fontError] = useFonts({
    mainRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    mainBold: require("./assets/fonts/Roboto-Bold.ttf"),
    mainMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
