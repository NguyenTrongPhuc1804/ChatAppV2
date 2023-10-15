import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLOR } from "../constans/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputCus from "../components/InputCus";
import { AuthContext } from "../navigation/AuthProvide";
import Loading from "../components/Loading";
import ChangePassForm from "../components/ChangePassForm";
import { userModal } from "../modal/userModal";
import { pickImage } from "../help/imagePicker";
import Progress from "../components/Progress";
import { auth } from "../firebase";
import { showToast } from "../help/toolkit";

const { width, height } = Dimensions.get("window");

const InfoScreen = () => {
  const { logout, loading, user, updateInfo } = useContext(AuthContext);
  const [nickname, setNickName] = useState(user.displayName);
  const [visible, setVisible] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [emailVerified, setEmailVerified] = useState(
    auth.currentUser.emailVerified
  );
  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleChangePass = (infoPass) => {
    const { oldPassword, newPassword, confirmPassword } = infoPass;
    userModal.updatePassword(oldPassword, newPassword, confirmPassword);
    setVisible(false);
  };
  const handleUpdateImage = () => {
    pickImage(
      (value) => setPhotoUrl(value),
      (value) => setLoadingProgress(value)
    );
  };
  const handleEmailVerified = () => {
    if (emailVerified) {
      showToast("success", "Tài khoản của bạn đã xác minh thành công");
    } else {
      userModal.verticalEmail();
    }
  };
  if (loading) {
    <Loading />;
  }
  return (
    <>
      <StatusBar backgroundColor={COLOR.primary} />

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR.primary,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            borderBottomRightRadius: 100,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.57,
            shadowRadius: 15.19,

            elevation: 23,
            marginBottom: 20,
          }}
        >
          <View style={{ position: "relative" }}>
            <Image
              style={{
                width: 130,
                height: 130,
                marginBottom: 10,
                borderRadius: 100,
              }}
              source={{ uri: user.photoURL }}
            />
            <Progress
              loading={loadingProgress}
              visible={
                loadingProgress === 0 || loadingProgress === 1 ? false : true
              }
            />

            <TouchableOpacity
              onPress={handleUpdateImage}
              style={{ position: "absolute", bottom: 10, right: 0 }}
            >
              <Ionicons name={"create-outline"} size={34} color={"white"} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
            }}
          >
            {user.displayName}
          </Text>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              bottom: 20,
              left: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                updateInfo(nickname);
              }}
              style={{
                width: "fit-content",
                paddingHorizontal: 15,
                paddingVertical: 6,
                borderWidth: 2,
                borderRadius: 20,
                borderColor: "white",
                marginRight: 20,
              }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>
                Cập nhật tên tài khoản
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout()}>
              <Ionicons name={"log-out-outline"} size={34} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          style={{
            flex: 1,

            paddingHorizontal: 30,
            paddingTop: 30,
          }}
        >
          <Text style={{ marginBottom: 8 }}>Tên tài khoản</Text>
          <InputCus
            title="Nickname"
            value={nickname}
            onChange={(value) => setNickName(value)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text style={{}}>Email</Text>
            <TouchableOpacity
              onPress={handleEmailVerified}
              style={{
                padding: 5,
                backgroundColor: emailVerified ? "green" : "red",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white" }}>
                {emailVerified ? "Email đã xác minh" : "Xác minh email"}
              </Text>
            </TouchableOpacity>
          </View>
          <InputCus title="Email" value={user.email} editable={false} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 8,
            }}
          >
            <Text style={{}}>Mật khẩu</Text>
            <TouchableOpacity
              onPress={() => showDialog()}
              style={{
                padding: 5,
                borderRadius: 10,
                backgroundColor: COLOR.primary,
              }}
            >
              <Text style={{ color: "white" }}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
          <InputCus title="Password" password />
        </KeyboardAwareScrollView>
        <ChangePassForm
          visible={visible}
          onChange={showDialog}
          handleCancel={handleCancel}
          handleChangePass={handleChangePass}
        />
      </View>
    </>
  );
};

export default InfoScreen;
