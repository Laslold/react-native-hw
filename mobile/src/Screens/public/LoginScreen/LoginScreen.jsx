import { useState, useCallback, useEffect } from "react";
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
import { TextField } from "../../../components";
import styles from "./loginScreenStyles";
import { Button } from "../../../components";
const LoginScreen = (props) => {
  const { navigation } = props;

  const [state, setState] = useState({
    email: "",
    password: "",
    showPass: false,
    isShowKeyb: false,
    inputNameInFocus: "",
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handlePress = useCallback(() => {
    navigation.navigate("Registration");
  }, []);
  const showPassword = () => {
    setState((prevState) => ({ ...prevState, showPass: !showPass }));
  };

  const onSubmit = (isDisable) => {
    if (!isDisable) return;
    setState((prevState) => ({ ...prevState, isShowKeyb: false }));
    Keyboard.dismiss();
    console.log("stateLogin", { email, password });
    setState((prevState) => ({
      ...prevState,
      email: "",
      password: "",
    }));
  };

  const { email, password, showPass, isShowKeyb, inputNameInFocus } = state;

  const isDisable = email && password;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../images/backgroundAuth.jpg")}
          style={styles.image}
        >
          <View style={styles.background}>
            <Text style={styles.text}>Увійти</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <View
                style={{
                  ...styles.form,
                  marginBottom: isKeyboardVisible ? 10 : 50,
                  gap: 16,
                }}
              >
                <TextField
                  placeholder="Адреса електронної пошти"
                  keyboardType="email-address"
                  value={state.email}
                  onChange={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: value.trim(),
                    }))
                  }
                />
                <View style={styles.toggleInput}>
                  <TextField
                    placeholder="Пароль"
                    secureTextEntry={!showPass}
                    value={state.password}
                    onChange={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value.trim(),
                      }))
                    }
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
                {!isKeyboardVisible && (
                  <View>
                    <Button
                      onPress={() => onSubmit(isDisable)}
                      disabled={!isDisable}
                      text="Увійти"
                    />

                    <TouchableOpacity onPress={handlePress} style={styles.link}>
                      <Text style={styles.linkText}>
                        Немає акаунту?
                        <Text style={styles.linkTextLine}> Зареєстуватися</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
