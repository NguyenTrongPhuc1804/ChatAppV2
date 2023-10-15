import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLOR } from "../constans/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import InputCus from "../components/InputCus";
import { AuthContext } from "../navigation/AuthProvide";
import { showToast } from "../help/toolkit";
import Loading from "../components/Loading";
const { width, height } = Dimensions.get("window");
const Register = () => {
  const { user, register, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconFirmPassword] = useState("");
  if (loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: 40,
          height: height,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 34,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: 30,
              color: COLOR.primary,
              marginBottom: 26,
            }}
          >
            Tạo tài khoản
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 600, textAlign: "center" }}>
            Tạo một tài khoản để bạn có thể khám phá ứng dụng !!
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <KeyboardAwareScrollView style={{}}>
            <View style={{ width: "100%" }}>
              <InputCus
                title="Email"
                value={email}
                onChange={(value) => setEmail(value)}
              />
            </View>
            <View style={{ width: "100%" }}>
              <InputCus
                title="Password"
                password
                value={password}
                onChange={(value) => setPassword(value)}
              />
            </View>
            <View style={{ width: "100%" }}>
              <InputCus
                title="Confirm password"
                password
                value={confirmPassword}
                onChange={(value) => setconFirmPassword(value)}
              />
            </View>
          </KeyboardAwareScrollView>

          <TouchableOpacity
            onPress={() => {
              if (password != confirmPassword) {
                showToast("warning", "Confirm Password not correct");
              } else {
                register(email, password);
              }
            }}
            style={{
              borderRadius: 10,
              width: "100%",
              backgroundColor: COLOR.primary,
              paddingVertical: 15,
              paddingHorizontal: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
              marginBottom: 29,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: COLOR.second,
                textAlign: "center",
              }}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 10 }}>Đăng nhập với</Text>
          <View
            style={{
              flexDirection: "row",
              width: 250,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name={"logo-facebook"}
                size={24}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: "#ECECEC",
                  borderRadius: 10,
                }}
                color={"black"}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name={"logo-google"}
                size={24}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: "#ECECEC",
                  borderRadius: 10,
                }}
                color={"black"}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name={"logo-apple"}
                size={24}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: "#ECECEC",
                  borderRadius: 10,
                }}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
