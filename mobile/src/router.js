import PublicGroup from "./Screens/public";
import PrivateGroup from "./Screens/private";
const Router = (props) => {
  const { isLogin } = props;

  return isLogin ? <PrivateGroup /> : <PublicGroup />;
};

export default Router;
