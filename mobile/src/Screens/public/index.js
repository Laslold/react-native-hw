import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import { getLoading, getError } from "../../redux/auth/auth-selector";
import { useSelector } from "react-redux";
import { Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useEffect } from "react";
const Stack = createStackNavigator();

const options = { headerShown: false };

const PublicRoutes = () => {
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  useEffect(() => {
    if (error) {
      Alert.alert("Oops! Не вірно набраний логін або пароль");
    }
  }, [error]);
  return (
    <>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      <Stack.Navigator>
        <Stack.Screen
          options={options}
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen options={options} name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
};

export default PublicRoutes;
