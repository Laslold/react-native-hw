import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
const initialState = {
  email: "",
  password: "",
  nickname: "",
};
const RegistrationScreen = (props) => {
  const { navigation } = props;
  // const [pass, setPass] = useState("");
  const [state, setState] = useState(initialState);
  const [showPass, setShowPass] = useState(false);
  const [isShowKeyb, setIsShowKeyb] = useState(false);
  const handlePress = () => {
    navigation.navigate("Login");
  };
  const showPassword = () => {
    setShowPass(!showPass);
  };
  const keyboardHide = () => {
    setIsShowKeyb(false);
    Keyboard.dismiss();
    console.log("state", state);
    setState(initialState);
  };
  const keyboardBlurHiden = () => {
    if (setIsShowKeyb(false)) {
      return;
    }

    setIsShowKeyb(false);
  };
  console.log(`keyboadState`);
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/backgroundAuth.jpg")}
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
            <Text style={styles.text}>Реєстрація</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <View
                style={{ ...styles.form, marginBottom: isShowKeyb ? 10 : 80 }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Логін"
                  onFocus={() => setIsShowKeyb(true)}
                  onBlur={() => keyboardBlurHiden()}
                  value={state.nickname}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, nickname: value }))
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                  keyboardType="email-address"
                  onFocus={() => setIsShowKeyb(true)}
                  onBlur={() => keyboardBlurHiden()}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <View style={styles.toggleInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    secureTextEntry={!showPass}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    onFocus={() => setIsShowKeyb(true)}
                    onBlur={() => keyboardBlurHiden()}
                  />
                  <TouchableOpacity
                    onPress={showPassword}
                    style={styles.toggleBtn}
                  >
                    {showPass ? (
                      <Text style={styles.visible}>Сховати</Text>
                    ) : (
                      <Text style={styles.visible}>Показати</Text>
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={keyboardHide} style={styles.btn}>
                  <Text style={styles.btnText}> Зареєстуватися</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress} style={styles.link}>
                  <Text style={styles.linkText}> Вже є акаунт? Увійти</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "flex-end",
  },
  background: {
    height: "auto",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  addPhotoView: {
    height: 120,
    width: 144,

    marginLeft: "auto",
    marginRight: "auto",

    alignItems: "center",
    bottom: 66,
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
  text: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    alignItems: "center",
    fontFamily: "mainMedium",
    fontSize: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },

  form: {
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#e8e8e8",
    // marginHorizontal: 16,
    marginTop: 16,
    height: 50,
    borderRadius: 10,
    color: "#212121",
    padding: 16,
    fontFamily: "mainRegular",
    fontSize: 16,
  },
  toggleInput: { width: "100%" },
  toggleBtn: {
    bottom: 40,
    alignSelf: "flex-end",
    // left: 270,
  },
  visible: {
    color: "#1b4371",
    paddingRight: 15,
    fontFamily: "mainRegular",
    fontSize: 16,
  },
  btn: {
    marginHorizontal: 16,
    marginTop: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "mainMedium",
    fontSize: 16,
    lineHeight: 18.75,
    borderRadius: 10,
    backgroundColor: "#ff6c00",
  },
  btnText: {
    fontFamily: "mainRegular",
    fontSize: 16,

    color: "#ffffff",
  },
  link: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 16,
  },
  linkText: {
    fontFamily: "mainMedium",
    fontSize: 16,
    color: "#1b4371",
  },
});

export default RegistrationScreen;
