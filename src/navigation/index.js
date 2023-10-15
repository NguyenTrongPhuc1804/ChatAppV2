import React, { useContext } from "react";
import AuthProvide, { AuthContext } from "./AuthProvide";
import MyTab from "./MyTab";
import FlashMessage from "react-native-flash-message";
function MyNavigation() {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  return (
    <AuthProvide>
      <MyTab />
      <FlashMessage position="top" />
    </AuthProvide>
  );
}

export default MyNavigation;
