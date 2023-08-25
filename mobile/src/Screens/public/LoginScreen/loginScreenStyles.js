import { StyleSheet } from "react-native";
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
    alignItems: "center",
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
    marginVertical: 32,
  },

  form: {
    marginHorizontal: 16,
  },

  toggleInput: { width: "100%" },
  toggleBtn: {
    bottom: 38,
    alignSelf: "flex-end",
  },
  visible: {
    color: "#1b4371",
    paddingRight: 15,
    fontFamily: "mainRegular",
    fontSize: 16,
  },
  btn: {
    // marginHorizontal: 16,
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
export default styles;
