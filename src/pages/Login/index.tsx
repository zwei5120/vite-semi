import React, { useEffect } from "react";
import { useUserInfo, userA } from "../../store/userInfo";

const Login = () => {
  const getUserInfo = useUserInfo((state) => state?.getUserInfo);
  const say = userA((state) => state?.say)
  useUserInfo?.subscribe((state) => state?.userInfo?.name)
  useEffect(() => {
    getUserInfo?.()
    say?.()
  }, [])
  return <div className="text-red-500">Login</div>;
};

export default Login;
