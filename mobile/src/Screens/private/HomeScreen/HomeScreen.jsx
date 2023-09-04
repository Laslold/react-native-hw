import "react-native-gesture-handler";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../ProfileScreen";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { PostScreen } from "../nestedScreen";
import CreatePostsScreen from "../CreatePostsScreen";
import { useDispatch } from "react-redux";
import { logoutAuthThunk } from "../../../redux/auth/auth-operation";

const HomeTab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logoutAuthThunk());
  };
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore-o" size={24} color="#21212180" />
          ),
          tabBarShowLabel: false,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={logOut}>
              <Feather name="log-out" size={24} color="#21212180" />
            </TouchableOpacity>
          ),
        }}
        name="Публікації"
        component={PostScreen}
        style={{ backgroundColor: "#fff" }}
      />
      <HomeTab.Screen
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
          // headerLeft: () => (
          //   <TouchableOpacity
          //     style={{ marginLeft: 10 }}
          //     onPress={() => console.log("Hey im left")}
          //   >
          //     <Feather name="arrow-left" size={24} color="#21212180" />
          //   </TouchableOpacity>
          // ),
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <HomeTab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color="#21212180" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </HomeTab.Navigator>
  );
};

export default HomeScreen;
