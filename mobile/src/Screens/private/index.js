import "react-native-gesture-handler";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen/PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

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
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => console.log("Hey im exit")}
            >
              <Feather name="log-out" size={24} color="#21212180" />
            </TouchableOpacity>
          ),
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
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => console.log("Hey im left")}
            >
              <Feather name="arrow-left" size={24} color="#21212180" />
            </TouchableOpacity>
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
