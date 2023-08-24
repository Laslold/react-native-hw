import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { TouchableWithoutFeedback } from "react-native";
const initialState = {
  email: "",
  password: "",
};
const LoginScreen = (props) => {
  const { navigation } = props;
  const [state, setState] = useState(initialState);

  const [show, setShow] = useState({
    showPass: false,
    isShowKeyb: false,
  });
  const [inputNameInFocus, setInputNameInFocus] = useState("");

  const handlePress = () => {
    navigation.navigate("Registration");
  };
  const showPassword = useCallback(() => {
    setShow((prevShow) => ({ ...prevShow, showPass: !showPass }));
  }, [setShow]);
  const keyboardHide = useCallback(() => {
    setInputNameInFocus("");
    setShow((prevShow) => ({ ...prevShow, isShowKeyb: false }));
    Keyboard.dismiss();
  }, [setShow]);
  const keyboardBlurHiden = useCallback(() => {
    setInputNameInFocus("");
    if (!isShowKeyb) {
      return;
    }
    setShow((prevShow) => ({ ...prevShow, isShowKeyb: false }));
  }, [setShow]);
  const onFocusInput = useCallback(
    (inputName) => {
      setShow((prevShow) => ({ ...prevShow, isShowKeyb: true }));
      setInputNameInFocus(inputName);
    },
    [setShow]
  );
  const onSubmit = () => {
    setShow((prevShow) => ({ ...prevShow, isShowKeyb: false }));

    Keyboard.dismiss();
    console.log("stateLogin", state);
    setState(initialState);
  };
  const { showPass, isShowKeyb } = show;

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/backgroundAuth.jpg")}
          style={styles.image}
        >
          <View style={styles.background}>
            <Text style={styles.text}>Увійти</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <View
                style={{ ...styles.form, marginBottom: isShowKeyb ? 10 : 80 }}
              >
                <TextInput
                  style={
                    inputNameInFocus === "email"
                      ? { ...styles.input, ...styles.active }
                      : { ...styles.input, ...styles.default }
                  }
                  placeholder="Адреса електронної пошти"
                  keyboardType="email-address"
                  onFocus={() => onFocusInput(`email`)}
                  onBlur={keyboardBlurHiden}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <View style={styles.toggleInput}>
                  <TextInput
                    style={
                      inputNameInFocus === "password"
                        ? { ...styles.input, ...styles.active }
                        : { ...styles.input, ...styles.default }
                    }
                    placeholder="Пароль"
                    secureTextEntry={!showPass}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    onFocus={() => onFocusInput(`password`)}
                    onBlur={keyboardBlurHiden}
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
                <TouchableOpacity onPress={onSubmit} style={styles.btn}>
                  <Text style={styles.btnText}> Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress} style={styles.link}>
                  <Text style={styles.linkText}>
                    Немає акаунту?
                    <Text style={styles.linkTextLine}> Зареєстуватися</Text>
                  </Text>
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

  text: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    alignItems: "center",
    fontFamily: "mainMedium",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 32,
  },

  form: {
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    marginTop: 16,
    height: 50,
    borderRadius: 10,
    color: "#212121",
    padding: 16,
    fontFamily: "mainRegular",
    fontSize: 16,
  },
  default: {
    borderColor: "#e8e8e8",
    backgroundColor: "#e8e8e8",
  },
  active: {
    borderColor: "#ff6c00",
    backgroundColor: "#ffffff",
  },
  toggleInput: { width: "100%" },
  toggleBtn: {
    bottom: 40,
    alignSelf: "flex-end",
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
  linkTextLine: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
