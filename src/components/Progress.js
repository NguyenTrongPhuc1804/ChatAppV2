import { View, Text } from "react-native";
import React from "react";
import { ProgressBar, MD3Colors } from "react-native-paper";
import { COLOR } from "../constans/color";
const Progress = ({ loading, visible }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <ProgressBar
        style={{ width: 100 }}
        progress={loading}
        color={COLOR.second}
        visible={visible}
      />
    </View>
  );
};

export default Progress;
