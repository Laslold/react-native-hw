import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";

const Stack = createStackNavigator();

const options = { headerShown: false };

const PublicRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={options}
        name="Registration"
        component={RegistrationScreen}
      />
      <Stack.Screen options={options} name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
