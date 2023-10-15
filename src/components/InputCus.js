import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLOR } from "../constans/color";

const InputCus = ({ password, title, value, onChange, editable }) => {
  const [eye, setEye] = useState(true);
  return (
    <View style={{ position: "relative" }}>
      <TextInput
        editable={editable}
        style={{
          height: 54,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: COLOR.primary,
          backgroundColor: "#F1F4FF",
          padding: 10,
          fontSize: 16,
          marginBottom: 20,
        }}
        value={value}
        onChangeText={(e) => onChange(e)}
        secureTextEntry={password ? eye : false}
        placeholder={title}
      />
      {password ? (
        <TouchableOpacity
          onPress={() => {
            setEye(!eye);
          }}
          style={{ position: "absolute", top: 14, right: 20 }}
        >
          <Ionicons name={eye ? "eye-off" : "eye"} size={24} color={"black"} />
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

export default InputCus;
