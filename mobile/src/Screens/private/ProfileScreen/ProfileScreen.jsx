import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { getUserInfo } from "../../../redux/auth/auth-selector";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, query, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { logoutAuthThunk } from "../../../redux/auth/auth-operation";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const db = getDatabase();
  const auth = getAuth();
  const userInfo = useSelector(getUserInfo);
  const { nickname, email } = userInfo;
  const dispatch = useDispatch();

  const getUserPosts = async () => {
    const dbParams = query(ref(db, "posts"));

    onValue(dbParams, (snapshot) => {
      const data = snapshot.val();
      const userPosts = Object.values(data)
        .reverse()
        .filter((el) => el.email === email);
      if (userPosts) {
        setPosts(userPosts);
      }
    });
  };

  const logOut = useCallback(() => {
    dispatch(logoutAuthThunk());
  }, [dispatch]);

  const onPressComents = (postId) => {
    navigation.navigate("Коментарі", {
      postId,
      userId: userInfo.uid,
      name: userInfo.nickname,
    });
  };
  const onPressLocation = (location, name) => {
    navigation.navigate("Мапа", { location, name });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const schemaItem = ({ item }) => {
    return (
      <View style={styles.postWrapper}>
        <Image style={styles.imagePost} source={{ uri: item.pictureUrl }} />
        <Text style={styles.imageName}>{item.pictureName}</Text>
        <View style={styles.postInfoWrapper}>
          <TouchableOpacity
            style={styles.comentsWrapper}
            activeOpacity={0.7}
            onPress={() => onPressComents(item.postId)}
          >
            <Feather name="message-circle" size={24} color="#BDBDBD" />
            <Text style={styles.comentsText}>
              {item?.comments ? Object.keys(item.comments).length : 0}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.locationWrapper}
            activeOpacity={0.7}
            onPress={() => onPressLocation(item.location, item.pictureName)}
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text style={styles.locationText}>{item.pictureLocationName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../images/backgroundAuth.jpg")}
        style={styles.image}
      >
        <View style={styles.background}>
          <View style={styles.addPhotoView}>
            <View style={styles.addPhoto}></View>
            <AntDesign
              name="pluscircleo"
              size={24}
              color="orange"
              style={styles.iconPlus}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.text}>{nickname}</Text>
            <TouchableOpacity
              style={{ marginRight: 10, marginLeft: 40 }}
              onPress={logOut}
            >
              <Feather name="log-out" size={24} color="#21212180" />
            </TouchableOpacity>
          </View>
          <View style={{ paddingBottom: 10, height: "80%" }}>
            <FlatList
              data={posts}
              keyExtractor={(el, idx) => idx.toString()}
              renderItem={schemaItem}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "flex-end",
    // color: "red",
  },
  background: {
    height: "90%",
    // width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    // alignItems: "center",
  },
  addPhotoView: {
    position: "absolute",
    height: 120,
    width: 144,

    // marginLeft: "auto",
    // marginRight: "auto",

    alignItems: "center",
    top: -60,
    left: "30%",

    // bottom: 66,
  },
  addPhoto: {
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  iconPlus: {
    left: 60,
    bottom: 42,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
    // marginHorizontal: 16,
    marginTop: 52,
  },
  text: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",

    fontFamily: "mainMedium",
    fontSize: 30,
    marginLeft: 22,
    marginBottom: 12,

    // paddingLeft: 30,
  },

  postWrapper: {
    marginTop: 8,
  },

  imagePost: {
    marginHorizontal: 16,
    height: 240,
    borderRadius: 8,
  },
  imageName: {
    color: "#212121",
    fontFamily: "mainMedium",
    fontSize: 16,
    lineHeight: 19,
    marginHorizontal: 16,
    marginTop: 8,
  },
  postInfoWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  comentsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  comentsText: {
    color: "#BDBDBD",
    fontFamily: "mainRegular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#212121",
    fontFamily: "mainRegular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
    textDecorationLine: "underline",
  },
});
