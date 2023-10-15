import { auth, database } from "../firebase";
import firebase from "firebase/compat/app";
import { showToast } from "../help/toolkit";
export const userModal = {
  updatePassword: async (oldPassword, newPassword, confirmPassword) => {
    var credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      oldPassword
    );

    auth.currentUser
      .reauthenticateWithCredential(credential)
      .then(async function () {
        // User re-authenticated.
        console.log(oldPassword, newPassword, confirmPassword);
        try {
          if (newPassword === "" && confirmPassword === "") {
            showToast("danger", "Vui lòng nhập mật khẩu mới");
            return;
          }
          if (newPassword !== confirmPassword) {
            showToast("danger", "Nhập lại mật khẩu không chính xác !!");
          } else {
            await auth.currentUser.updatePassword(newPassword);
            showToast("success", "Cập nhật mật khẩu thành công");

            // Update successful.
          }
        } catch (e) {
          showToast("danger", e.message);
        }
      })
      .catch(function (error) {
        // An error happened.
        showToast("danger", "mật khẩu cũ không đúng");
      });
  },
  upLoadFileImg: async ({ blob, setPhotoUrl, setLoadingProgress }) => {
    try {
      console.log(blob);
      var metadata = {
        contentType: "image/jpeg",
      };

      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child("images/" + Date.now().toString() + ".jpg")
        .put(blob, metadata);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          var progress = snapshot.bytesTransferred / snapshot.totalBytes;
          setLoadingProgress(progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error.message, true);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await auth.currentUser
              .updateProfile({
                photoURL: downloadURL,
              })
              .then(() => {
                showToast("success", `Cập nhật ảnh đại diện thành công`);
                // Update successful
                // ...
                setPhotoUrl(downloadURL);
              })
              .catch((error) => {
                showToast("danger", error.message);

                // An error occurred
                // ...
              });
          });
        }
      );
    } catch (err) {
      alert("upload fail");
    }
  },
  verticalEmail: async () => {
    try {
      await auth.currentUser.sendEmailVerification();
      alert("Đã gửi email xác minh ,Vui lòng kiểm tra hợp thư");
      // const sd = await auth.currentUser.emailVerified;
      // alert(sd);
    } catch (er) {
      alert(er.message);
    }
  },
  userOnline: async (nameRooms) => {
    console.log("!23");
    var uid = auth.currentUser.uid;
    var name = auth.currentUser.displayName;
    var img = auth.currentUser.photoURL;
    var userStatusDatabaseRef = database.ref("/status/" + uid);

    var isOfflineForDatabase = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    var isOnlineForDatabase = {
      state: "online",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
      nameRooms,
      name,
      img,
    };

    database.ref(".info/connected").on("value", function (snapshot) {
      if (snapshot.val() == false) {
        return;
      }

      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(function () {
          userStatusDatabaseRef.set(isOnlineForDatabase);
        });
    });
  },
  userDisconnect: async () => {
    var uid = auth.currentUser.uid;
    var userStatusDatabaseRef = database.ref("/status/" + uid);
    userStatusDatabaseRef.remove();
  },
  listUserOnline: async (nameRooms, setData) => {
    var listUser = database.ref("status");
    let arr = [];
    listUser.on("value", (snapshot) => {
      snapshot.forEach((user) => {
        console.log(nameRooms);
        console.log(user.val().nameRooms);
        if (
          user.val().nameRooms == nameRooms &&
          user.val().state === "online"
        ) {
          arr = [
            ...arr,
            {
              id: user.val().name + Date.now().toString(),
              name: user.val().name,
              avatar: user.val().img,
            },
          ];
        }
      });
      setData(arr);
      listUser.off();
    });
  },
};
