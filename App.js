import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyNavigation from "./src/navigation";
import HomeNavigation from "./src/navigation/HomeNavigation";
import LoginNavigation from "./src/navigation/LoginNavigation";
import MyTab from "./src/navigation/MyTab";
import RoomNavigation from "./src/navigation/RoomNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <MyNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
