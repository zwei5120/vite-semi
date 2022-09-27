import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const AuthComp: React.FC<React.PropsWithChildren> = (props) => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  console.log("location", location, "auth", auth);
<<<<<<< HEAD
  // 未登录或权限数据为空 转到登录页面 开发时暂时关闭校验过程
  /* if (!auth || !auth?.permissions) {
    return <Navigate to="/login" replace ></Navigate>
  } */
=======
  // 未登录或权限数据为空 转到登录页面
  // if (!auth || !auth?.permissions) {
  //   return <Navigate to="/login" replace ></Navigate>
  // }
>>>>>>> 17c4e1e94c30de0f5036042671b9bed7b9598b4c
  // 作为路由组件 获取当前路由 查询该路由对应权限数据后进行显示
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default AuthComp;
