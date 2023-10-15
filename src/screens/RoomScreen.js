import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { userModal } from "../modal/userModal";

const RoomScreen = () => {
  const navigate = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const result = userModal.userDisconnect();
      return () => {
        result;
      };
    }, [])
  );
  const listRoom = [
    {
      id: 1,
      avatar:
        "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      name: "Room 1",
    },
    {
      id: 2,
      avatar:
        "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      name: "Room 2",
    },
    {
      id: 3,
      avatar:
        "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      name: "Room 3",
    },
    {
      id: 4,
      avatar:
        "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      name: "Room 4",
    },
  ];
  return (
    <View style={{}}>
      <StatusBar hidden={true} />

      <FlatList
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigate.navigate("ChatScreen", {
                id: item.id,
                name: item.name,
              });
            }}
            style={{
              flex: 1,
              padding: 10,
            }}
          >
            <View
              style={{
                borderRadius: 20,
                height: 150,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,
                elevation: 9,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  borderRadius: 50,
                  width: 70,
                  height: 70,
                }}
                source={{
                  uri: item.avatar,
                }}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        data={listRoom}
        numColumns={2}
      />
    </View>
  );
};

export default RoomScreen;
