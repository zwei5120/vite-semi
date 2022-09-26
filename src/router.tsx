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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      {/* 重定向 */}
      <Route path="/" loader={() => redirect("/login")}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/home" element={<Home></Home>} children={
        <React.Fragment>
          <Route path="/home/page1" element={<Page1></Page1>}></Route>
          <Route path="/home/page2" element={<Page2></Page2>}></Route>
        </React.Fragment>
      }></Route>
    </React.Fragment>
  )
);
