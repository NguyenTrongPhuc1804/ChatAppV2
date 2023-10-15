import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../constans/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import InputCus from "../components/InputCus";
import { AuthContext } from "../navigation/AuthProvide";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");
const Login = () => {
  const navigate = useNavigation();
  const { onLogin, loading } = useContext(AuthContext);
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    onLogin(account.email, account.password);
  };
  if (loading) {
    <Loading />;
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
            marginBottom: 74,
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
            Đăng nhập
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 600, textAlign: "center" }}>
            Chào mừng bạn đã trở lại!
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <View style={{ width: "100%" }}>
            <TextInput
              placeholder="Email"
              onChangeText={(e) => {
                setAccount({ ...account, email: e });
              }}
              style={{
                width: "100%",
                height: 54,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: COLOR.primary,
                backgroundColor: "#F1F4FF",
                padding: 10,
                marginBottom: 29,
                fontSize: 16,
              }}
            ></TextInput>
          </View>
          <View style={{ width: "100%" }}>
            <InputCus
              title="Password"
              password
              onChange={(e) => setAccount({ ...account, password: e })}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigate.navigate("ForgotPassword");
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: COLOR.primary,
                fontWeight: 700,
                marginBottom: 29,
              }}
            >
              Quên mật khẩu
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
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
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate.push("Register");
            }}
            style={{}}
          >
            <Text
              style={{ textAlign: "center", fontSize: 14, fontWeight: 600 }}
            >
              Tạo tài khoản mới
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

export default Login;
