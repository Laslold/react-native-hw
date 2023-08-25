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
  addPhotoView: {
    position: "absolute",
    height: 120,
    width: 144,

    marginLeft: "auto",
    marginRight: "auto",

    alignItems: "center",
    top: -60,
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
    marginBottom: 22,
    marginTop: 92,
  },

  form: {
    marginHorizontal: 16,
  },

  toggleInput: { width: "100%" },
  toggleBtn: {
    bottom: 38,
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
});
export default styles;
