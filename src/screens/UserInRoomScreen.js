import { View, Text, Image, FlatList } from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { userModal } from "../modal/userModal";
const UserInRoomScreen = () => {
  const route = useRoute();
  const { nameRooms } = route.params;
  const isStart = useRef(true);
  const [data, setData] = useState([]);
  console.log(data, "123");
  const renderUserOnline = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <View
          style={{
            borderRadius: 15,
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
          }}
        >
          <Image
            style={{ width: 80, height: 80, borderRadius: 50 }}
            source={{
              uri: item.avatar,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="online-prediction" size={24} color="green" />
              <Text style={{ marginLeft: 10, fontSize: 16 }}>online</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  useLayoutEffect(() => {
    if (isStart.current) {
      userModal.listUserOnline(nameRooms, (value) => setData(value));
    }

    return () => {
      isStart.current = false;
    };
  }, []);
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderUserOnline}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserInRoomScreen;
