import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import { TextField } from "../../../components";
import styles from "./registrScreenStyles";
import { Button } from "../../../components";
import { signupAuthThunk } from "../../../redux/auth/auth-operation";
import { useDispatch } from "react-redux";

const RegistrationScreen = (props) => {
  const { navigation } = props;

  const [state, setState] = useState({
    email: "",
    password: "",
    nickname: "",
    showPass: false,
    isShowKeyb: false,
    inputNameInFocus: "",
  });

  const dispatch = useDispatch();

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
  const handlePress = () => {
    navigation.navigate("Login");
  };
  const showPassword = () => {
    setState((prevState) => ({ ...prevState, showPass: !showPass }));
  };

  const onSubmit = (isDisable) => {
    if (!isDisable) return;
    setState((prevState) => ({ ...prevState, isShowKeyb: false }));
    Keyboard.dismiss();
    dispatch(signupAuthThunk(state));
    // console.log("stateRegister", { email, password, nickname });
    setState((prevState) => ({
      ...prevState,
      email: "",
      password: "",
      nickname: "",
    }));
  };

  const { email, password, nickname, showPass, isShowKeyb, inputNameInFocus } =
    state;

  const isDisable = email && password && nickname;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
            <Text style={styles.text}>Реєстрація</Text>

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
                  placeholder="Логін"
                  value={state.nickname}
                  onChange={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      nickname: value.trim(),
                    }))
                  }
                />
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
                      text="Зареєстуватися"
                    />

                    <TouchableOpacity onPress={handlePress} style={styles.link}>
                      <Text style={styles.linkText}> Вже є акаунт? Увійти</Text>
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

export default RegistrationScreen;
