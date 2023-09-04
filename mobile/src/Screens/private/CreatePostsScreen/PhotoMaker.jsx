import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import {
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";

import { Camera } from "expo-camera";

const PhotoMaker = ({ goBack, setPhoto }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onChangeCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onMakePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    goBack();
  };

  return (
    <Camera
      style={styles.camera}
      type={type}
      ref={(ref) => {
        setCamera(ref);
      }}
    >
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
          <Entypo name="back" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onMakePhoto}
          style={styles.photoButton}
        >
          <MaterialIcons name="motion-photos-on" size={70} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={onChangeCamera}>
          <MaterialIcons name="flip-camera-android" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

PhotoMaker.defaultProps = {
  goBack: () => {},
  onMakePhoto: () => {},
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonsWrapper: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  photoButton: {
    marginLeft: 50,
    marginRight: 50,
  },
});

export default PhotoMaker;
