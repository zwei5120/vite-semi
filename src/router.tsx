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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      {/* 重定向 */}
      <Route path="/" loader={() => redirect("/login")}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/home" element={<Home></Home>} children={
        <React.Fragment>
          <Route path="/home/page1" element={<Page1></Page1>}></Route>
        </React.Fragment>
      }></Route>
    </React.Fragment>
  )
);
