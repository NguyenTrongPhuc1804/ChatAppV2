import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { COLOR } from "../constans/color";
const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: COLOR.primary },
        headerTintColor: "white",
        headerTitleAlign: "center",
      })}
      initialRouteName="Register"
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Trang chủ",
          headerStyle: {
            backgroundColor: COLOR.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
