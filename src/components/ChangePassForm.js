import { View, Text } from "react-native";
import React, { useState } from "react";
import Dialog from "react-native-dialog";
import InputCus from "./InputCus";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const ChangePassForm = ({ visible, handleCancel, handleChangePass }) => {
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <View style={{}}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Đổi mật khẩu</Dialog.Title>
        <View style={{}}>
          <InputCus
            password
            title={"Mật khẩu cũ"}
            value={changePassword.oldPassword}
            onChange={(e) =>
              setChangePassword({ ...changePassword, oldPassword: e })
            }
          />
          <InputCus
            password
            title={"Mật khẩu mới"}
            value={changePassword.newPassword}
            onChange={(e) =>
              setChangePassword({ ...changePassword, newPassword: e })
            }
          />
          <InputCus
            password
            title={"Xác nhận mật khẩu"}
            value={changePassword.confirmPassword}
            onChange={(e) =>
              setChangePassword({ ...changePassword, confirmPassword: e })
            }
          />
        </View>
        <Dialog.Button label="Hủy" onPress={() => handleCancel()} />
        <Dialog.Button
          label="Lưu"
          onPress={() => {
            handleChangePass(changePassword);
            setChangePassword({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          }}
        />
      </Dialog.Container>
    </View>
  );
};

export default ChangePassForm;
