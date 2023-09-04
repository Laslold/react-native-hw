import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/auth/auth-selector";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  getDatabase,
  onValue,
  child,
  get,
  set,
  ref as DataBaseRef,
} from "firebase/database";

const CommentsScreen = ({ route }) => {
  const [item, setItem] = useState({});

  const [nameCommentFocus, setNameCommentFocus] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const { postId, name } = route.params;

  // const getComments = async () => {
  //   const db = getDatabase();
  //   const post = ref(db, `posts/${postId}/comments/`);

  //   onValue(post, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("data", data);
  //     setPost(Object.values(data));
  //   });
  // };
  const getComments = async () => {
    await get(child(DataBaseRef(getDatabase()), `posts/${postId}/`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          const data = await snapshot.val();
          // console.log("datac  ", data);
          setItem(data);
          if (data?.comments) {
            setComments(Object.values(data.comments));
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const convertTime = (ms) => {
    const date = new Date(Number(ms));
    return date.toLocaleString("ru-ua");
  };

  const onSetPublishComment = async () => {
    const commentId = String(Date.now());
    await set(
      DataBaseRef(getDatabase(), "posts/" + postId + "/comments/" + commentId),
      {
        commentId,
        text: commentText,
        owner: name,
      }
    );

    setCommentText("");
    setNameCommentFocus(false);
    Keyboard.dismiss();
    getComments();
  };

  useEffect(() => {
    if (route.params) {
      getComments();
    }
  }, [route.params]);
  // console.log(item);
  const shemaItem = ({ item }) => {
    return (
      <View style={styles.singleCommentWrapper}>
        <Text style={styles.commentOwner}>
          {item.owner}:<Text style={styles.commentText}>{item.text}</Text>
        </Text>
        <Text>{convertTime(item.commentId)}</Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={{ uri: item.pictureUrl }} />
        {!nameCommentFocus && (
          <View style={styles.comentsWrapper}>
            <FlatList
              data={comments}
              keyExtractor={(el, idx) => idx.toString()}
              renderItem={shemaItem}
            />
          </View>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
            placeholder="Коментувати..."
            style={
              nameCommentFocus
                ? { ...styles.input, ...styles.nameCommentFocus }
                : styles.input
            }
            onFocus={() => setNameCommentFocus(true)}
            onBlur={() => setNameCommentFocus(false)}
          />
          <TouchableOpacity activeOpacity={0.7} onPress={onSetPublishComment}>
            <FontAwesome
              name="send"
              size={24}
              color="#FF6C00"
              style={styles.send}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  paddingHorizontal: 16,
    justifyContent: "flex-end",
  },
  image: {
    marginHorizontal: 16,
    height: 240,
    borderRadius: 8,
  },
  input: {
    marginHorizontal: 16,
    padding: 10,
    paddingRight: 30,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "transparent",
    fontFamily: "mainRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 15,
    marginBottom: 30,
  },
  hidden: { display: "none" },
  nameCommentFocus: {
    borderColor: "#FF6C00",
  },
  commentText: {
    color: "#212121",
    fontFamily: "mainMedium",
    fontSize: 13,

    lineHeight: 18,
  },
  commentOwner: {
    borderRadius: 6,
  },
  send: {
    position: "absolute",
    right: 20,
    bottom: 40,
  },
  comentsWrapper: {
    marginHorizontal: 16,
    height: 250,

    marginBottom: 15,
    marginTop: 10,
  },
  singleCommentWrapper: {
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    width: 300,
    padding: 5,
    borderRadius: 6,
  },
  inputWrapper: {
    position: "relative",
    marginHorizontal: 16,
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    fontFamily: "mainRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 16,
    borderRadius: 8,
  },
});
