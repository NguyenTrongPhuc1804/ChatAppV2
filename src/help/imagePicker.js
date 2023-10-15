import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import { Platform } from "react-native";
import { userModal } from "../modal/userModal";

export const pickImage = async (setPhotoUrl, setLoadingProgress) => {
  // No permissions request is necessary for launching the image library

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const res = await fetch(result.assets[0].uri);
    const blob = await res.blob();
    userModal.upLoadFileImg({ blob, setPhotoUrl, setLoadingProgress });
  }
};
