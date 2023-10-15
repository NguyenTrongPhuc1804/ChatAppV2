import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginNavigation from "./LoginNavigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeNavigation from "./HomeNavigation";
import { COLOR } from "../constans/color";
import InfoNavigation from "./InfoNavigation";
import RoomNavigation from "./RoomNavigation";
import { AuthContext } from "./AuthProvide";

const Tab = createBottomTabNavigator();

const MyTab = () => {
  const { user } = useContext(AuthContext);
  return user ? (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Trang chủ": {
              iconName = focused ? "home" : "home-outline";
              break;
            }
            case "Phòng chat": {
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              break;
            }
            case "Thông tin": {
              iconName = focused ? "ios-list" : "ios-list-outline";
              break;
            }
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          backgroundColor: COLOR.primary,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          color: "white",
        },
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeNavigation} />
      <Tab.Screen
        name="Phòng chat"
        component={RoomNavigation}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen name="Thông tin" component={InfoNavigation} />
    </Tab.Navigator>
  ) : (
    <LoginNavigation />
  );
};

export default MyTab;
