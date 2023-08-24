import "react-native-gesture-handler";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "../../components";
import { CreatePostsScreen } from "../../components";
import { ProfileScreen } from "../../components";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();
// const options = { headerShown: true };

const PrivateRoutes = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore-o" size={24} color="#21212180" />
          ),
          tabBarShowLabel: false,
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarItemStyle: {
            height: 40,
            width: 70,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
            margin: 4.5,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={24} color="#ffffff" />
          ),
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color="#21212180" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default PrivateRoutes;
