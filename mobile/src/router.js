import PublicGroup from "./Screens/public";
import PrivateGroup from "./Screens/private";
import { useSelector, useDispatch } from "react-redux";
import { isLogine } from "../src/redux/auth/auth-selector";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { app as db } from "./firebase/config";
import { userCurrent } from "./redux/auth/auth-slice";

const Router = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(getAuth(db), (user) => {
      if (user) {
        dispatch(userCurrent(user));
      }
    });
  }, [dispatch]);

  const isLogin = useSelector(isLogine);

  return isLogin ? <PrivateGroup /> : <PublicGroup />;
};

export default Router;
