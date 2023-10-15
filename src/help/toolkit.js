import { showMessage, hideMessage } from "react-native-flash-message";
export const showToast = (type, message) => {
  showMessage({
    message,
    type,
  });
};
