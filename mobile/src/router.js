import PublicGroup from "./Screens/public";
import PrivateGroup from "./Screens/private";
import { useSelector } from "react-redux";
import { isLogine } from "../src/redux/auth/auth-selector";

const Router = () => {
  const isLogin = useSelector(isLogine);

  return isLogin ? <PrivateGroup /> : <PublicGroup />;
};

export default Router;
