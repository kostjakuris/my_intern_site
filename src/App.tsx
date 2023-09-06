import { useState } from "react";
import SignUp from "./components/signUpForm/SignUp";
import SignIn from "./components/signInForm/SignIn";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Layout from "./components/nav/Layout";
import Users from "./components/users/Users";
import Devices from "./components/devices/Devices";
import Map from "./components/map/Map";
import Groups from "./components/groups/Groups";

export type NavContent = {
  navActive: boolean;
  setNavActive: (navActive: boolean) => void;
  signActive: boolean;
  setSignActive: (signActive: boolean) => void;
};
function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [nav, setNav] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />}
      >
        <Route
          path="/"
          element={<Main signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />}
        />
        <Route
          path="devices"
          element={
            <Devices signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />
          }
        />

        <Route
          path="users"
          element={
            <Users signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />
          }
        />

        <Route
          path="groups"
          element={
            <Groups signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />
          }
        />
        <Route path="map" element={<Map />} />
      </Route>
      <Route path="SignUp/*" element={<SignUp />} />
      <Route path="SignIn/*" element={<SignIn />} />
    </Routes>
  );
}
export default App;
