import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/auth/auth-selector";
import { Feather } from "@expo/vector-icons";
const PostScreen = ({ route, navigation }) => {
  const [post, setPost] = useState([]);
  const userInfo = useSelector(getUserInfo);

  const getAllPosts = async () => {
    const db = getDatabase();
    const post = ref(db, "posts/");
    onValue(post, (snapshot) => {
      const data = snapshot.val();
      setPost(Object.values(data));
    });
    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `posts/`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       const data = snapshot.val();
    //       setPost(Object.values(data));
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  // useEffect(() => {
  //   if (route.params) {
  //     setPost((prevState) => [...prevState, route.params]);
  //   }
  // }, [route.params]);
  // console.log(userInfo);

  const onPressComents = (postId) => {
    navigation.navigate("CommentsScreen", {
      postId,
      userId: userInfo.uid,
      name: userInfo.nickname,
    });
  };
  const onPressLocation = (location, name) => {
    navigation.navigate("MapScreen", { location, name });
  };

  const shemaItem = ({ item }) => {
    return (
      <View style={styles.postWrapper}>
        <Image style={styles.image} source={{ uri: item.pictureUrl }} />
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
    <View style={styles.container}>
      <FlatList
        data={post}
        keyExtractor={(el, idx) => idx.toString()}
        renderItem={shemaItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 25,
  },

  postWrapper: {
    marginTop: 32,
  },

  image: {
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
export default PostScreen;
