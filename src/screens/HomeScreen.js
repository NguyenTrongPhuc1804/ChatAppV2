import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import homeBg from "../../assets/bg-home.png";
import { COLOR } from "../constans/color";
const { height, width } = Dimensions.get("window");
const HomeScreen = () => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <StatusBar backgroundColor={COLOR.primary} />
      <ImageBackground
        style={{ flex: 1, width: "100%", height: "100%" }}
        resizeMode="cover"
        source={homeBg}
      />
    </View>
  );
};

export default HomeScreen;
