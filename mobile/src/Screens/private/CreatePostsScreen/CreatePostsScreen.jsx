import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Button } from "../../../components";
import { TextField } from "../../../components";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);
  const tacePicture = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log(location.coords.altitude);
    console.log(location.coords.latitude);
    setPhoto(photo.uri);
  };
  const sendPhoto = () => {
    // console.log(navigation);
    // console.log(photo);
    navigation.navigate("HomeScreen", {
      screen: "Публікації",
      params: { photo },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapCamera}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.thumb}>
              <Image
                source={{ uri: photo }}
                style={{ height: 120, width: 120 }}
              />
            </View>
          )}
          <TouchableOpacity onPress={tacePicture} style={styles.snap}>
            <MaterialIcons name="camera-alt" size={24} color="black" />
          </TouchableOpacity>
        </Camera>
      </View>
      <TouchableOpacity onPress={() => {}} style={styles.loadingBtn}>
        <Text style={styles.loading}>Завантажте фото</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <TextField placeholder="Назва" style={styles.name} />
        <TextField placeholder="Місцевість..." style={styles.location} />
        <Button text={"Опубліковати"} onPress={sendPhoto} />
      </View>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  wrapCamera: {
    borderRadius: 8,
    backgroundColor: "red",
    overflow: "hidden",
    marginTop: 32,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  snap: {
    height: 90,
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#ffffff30",
    alignItems: "center",
    justifyContent: "center",
  },
  thumb: {
    position: "absolute",
    left: 30,
    top: 20,
    borderColor: "#fff",
    borderWidth: 1,
  },
  loadingBtn: { marginTop: 8 },

  loading: {
    color: "#BDBDBD",
    fontFamily: "mainRegular",
    fontSize: 16,
  },
  form: {
    paddingVertical: 20,
  },
  name: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  location: {
    marginTop: 14,
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
});
