import { View, Text, StatusBar } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { chatModal } from "../modal/chatModal";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../navigation/AuthProvide";
import { COLOR } from "../constans/color";
import { Ionicons } from "@expo/vector-icons";
import { userModal } from "../modal/userModal";
const ChatScreen = () => {
  const route = useRoute();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [nameRooms, setNameRooms] = useState(
    `${route.params.name}-${route.params.id.toString()}`
  );
  useEffect(() => {
    userModal.userOnline(nameRooms);
    return () => {};
  }, []);
  useLayoutEffect(() => {
    const result = chatModal.readData(nameRooms, (value) => setMessages(value));
    return () => {
      result;
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    chatModal.addData(messages[0], nameRooms);
  }, []);

  return (
    <>
      <StatusBar backgroundColor={COLOR.primary} />

      <GiftedChat
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={{ alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="send" size={24} color={COLOR.primary} />
          </Send>
        )}
        renderUsernameOnMessage={true}
        alwaysShowSend
        scrollToBottom
        alignTop
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.email,
          name: user.displayName,
          avatar: user.photoURL,
        }}
      />
    </>
  );
};

export default ChatScreen;
