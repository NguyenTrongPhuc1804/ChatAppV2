import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { showToast } from "../help/toolkit";
import { async } from "@firebase/util";
export const chatModal = {
  addData: async (message, nameRooms) => {
    const { user, _id, text, createdAt } = message;

    db.collection(nameRooms)
      .add({
        user,
        _id,
        text,
        createdAt,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },
  readData: async (nameRooms, setMessages) => {
    const allChat = db
      .collection(nameRooms)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) =>
        setMessages(
          querySnapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user,
          }))
        )
      );

    return allChat;
  },
};
