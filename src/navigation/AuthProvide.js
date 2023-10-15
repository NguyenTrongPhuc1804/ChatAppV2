import React, { createContext, useState } from "react";
import firebase from "firebase/app";
import { auth } from "../firebase";
import { showToast } from "../help/toolkit";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});
function AuthProvide({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        onLogin: async (email, password) => {
          setLoading(true);
          auth
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
              // ...
              setLoading(false);
              setUser(user);
              showToast(
                "success",
                `Login successfully with email ${userCredential.user.email}`
              );
            })
            .catch((error) => {
              showToast("danger", "Sai email hoặc mật khẩu !!");
              setLoading(false);
            });
        },
        register: async (email, password) => {
          setLoading(true);
          await auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              userCredential.user
                .updateProfile({
                  displayName: email,
                  photoURL:
                    "https://firebasestorage.googleapis.com/v0/b/chatappv2-c26e4.appspot.com/o/dafault%2Fpngwing.com.png?alt=media&token=54b585a5-5f1f-43f2-a992-f344554c94dd&_gl=1*1uiijyc*_ga*MjUwNTcyNzM4LjE2OTYzMTg2MjU.*_ga_CW55HF8NVT*MTY5NzAwMjM3OS4xNy4xLjE2OTcwMDM1NzMuMjYuMC4w",
                })
                .then(() => {
                  showToast(
                    "success",
                    `register successfully with email ${userCredential.user.email}`
                  );
                  setUser(user);
                  navigate.navigate("Login");
                  setLoading(false);
                  // Update successful
                  // ...
                })
                .catch((error) => {
                  showToast("danger", error.message);
                  setLoading(false);

                  // An error occurred
                  // ...
                });
              console.log(user);

              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              showToast("danger", errorMessage);

              console.log(errorMessage);

              // ..
            });
        },
        logout: async (email, password) => {
          setLoading(true);
          auth
            .signOut()
            .then(() => {
              // Sign-out successful.
              showToast("success", "Logout Success");
              setUser(null);
              setLoading(false);
            })
            .catch((error) => {
              showToast("danger", error.message);
              setLoading(false);

              // An error happened.
            });
        },
        updateInfo: async (displayName) => {
          setLoading(true);
          await auth.currentUser
            .updateProfile({
              displayName: displayName,
            })
            .then(() => {
              showToast("success", `Cập nhật tên tài khoản thành công`);
              setLoading(false);
              // Update successful
              // ...
            })
            .catch((error) => {
              showToast("danger", error.message);
              setLoading(false);

              // An error occurred
              // ...
            });
        },
        forgotPassword: async (email) => {
          await auth
            .sendPasswordResetEmail(email)
            .then((res) => {
              showToast(
                "success",
                "Đã gửi email đặt lại password ,vui lòng kiể tra email"
              );
              navigate.navigate("Login");
            })
            .catch((err) => {
              console.log(err.message);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvide;
