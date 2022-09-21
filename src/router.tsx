import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import React from "react";
import Login from "./pages/Login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/login" element={<Login></Login>}></Route>
    </React.Fragment>
  )
);
