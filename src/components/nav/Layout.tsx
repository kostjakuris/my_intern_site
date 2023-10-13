import React from "react";
import { Outlet} from "react-router-dom";
import Nav from "./Nav";
import { NavContent } from "../../App";
import {Header} from "../header/Header";


const Layout = ({ ...props }: NavContent) => {
  return (
    <div>
        <Header
          signActive={props.signActive}
          setSignActive={props.setSignActive}
          navActive={props.navActive}
          setNavActive={props.setNavActive}
        />

        <Nav
          navActive={props.navActive}
          setNavActive={props.setNavActive}
          signActive={props.signActive}
          setSignActive={props.setSignActive}
        />


      <Outlet />
    </div>
  );
};

export default Layout;
