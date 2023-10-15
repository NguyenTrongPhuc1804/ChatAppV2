import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RoomScreen from "../screens/RoomScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { COLOR } from "../constans/color";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ChatScreen from "../screens/ChatScreen";
import UserInRoomScreen from "../screens/UserInRoomScreen";
const Stack = createStackNavigator();

const RoomNavigation = () => {
  const navigate = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTintColor: "white",
      })}
      initialRouteName="Register"
    >
      <Stack.Screen
        name="InfoScreen"
        component={RoomScreen}
        options={{
          title: "Rooms",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.primary,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigate.navigate("Trang chủ");
              }}
              style={{ paddingLeft: 15 }}
            >
              <AntDesign name="home" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigate.navigate("Info");
              }}
              style={{ paddingRight: 15 }}
            >
              <AntDesign name="infocirlceo" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.primary,
          },

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigate.navigate("UserInRoomScreen", {
                  nameRooms: `${route.params.name}-${route.params.id}`,
                });
              }}
              style={{ paddingRight: 15 }}
            >
              <AntDesign name="addusergroup" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="UserInRoomScreen"
        component={UserInRoomScreen}
        options={{
          title: "User in room",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RoomNavigation;
