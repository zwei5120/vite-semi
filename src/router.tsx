import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Error from "./pages/Error";
import AuthComp from "./pages/AuthComp";
import { AuthProvider } from "./store/auth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      {/* 重定向 */}
      <Route path="/" loader={() => redirect("/login")}></Route>
      <Route path="login" element={<Login></Login>}></Route>
      <Route
        element={
          <AuthProvider>
            <AuthComp></AuthComp>
          </AuthProvider>
        }
      >
        <Route
          path="home"
          element={<Home></Home>}
          children={
            <React.Fragment>
              {/* 使用Outlet组件在父组件中占位 在此处配置路由 当匹配到对应路由时 将渲染对应的组件到Outlet处 */}
              <Route path="page1" element={<Page1></Page1>}></Route>
              <Route path="page2" element={<Page2></Page2>}></Route>
            </React.Fragment>
          }
        ></Route>
      </Route>

      <Route path="*" element={<Error />}></Route>
    </React.Fragment>
  )
);
