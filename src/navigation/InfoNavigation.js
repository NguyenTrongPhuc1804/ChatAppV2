import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "../screens/InfoScreen";
import { COLOR } from "../constans/color";
const Stack = createStackNavigator();

const InfoNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTintColor: "white",
        headerShown: false,
      })}
      initialRouteName="Register"
    >
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          title: "Info",
          headerStyle: {
            backgroundColor: COLOR.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default InfoNavigation;
