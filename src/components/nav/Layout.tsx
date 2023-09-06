import React from "react";
import { useAppSelector } from "../../Hook";
import { Outlet, Navigate } from "react-router-dom";
import Nav from "./Nav";
import { NavContent } from "../../App";
import Header from "../header/Header";
import Main from "../main/Main";

const Layout = ({ ...props }: NavContent) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <Header
          signActive={props.signActive}
          setSignActive={props.setSignActive}
          navActive={props.navActive}
          setNavActive={props.setNavActive}
        />
      ) : (
        <Navigate to={"/SignUp"} />
      )}
      {isLoggedIn ? (
        <Nav
          navActive={props.navActive}
          setNavActive={props.setNavActive}
          signActive={props.signActive}
          setSignActive={props.setSignActive}
        />
      ) : (
        <Navigate to={"/SignUp"} />
      )}

      <Outlet />
    </>
  );
};

export default Layout;
