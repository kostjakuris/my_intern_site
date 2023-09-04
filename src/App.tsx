import { useState } from "react";
import SignUp from "./components/signUpForm/SignUp";
import SignIn from "./components/signInForm/SignIn";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";

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
        element={<Header signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />}
      />
      <Route
        path="/"
        element={<Nav navActive={nav} setNavActive={setNav} signActive={menuActive} setSignActive={setMenuActive} />}
      />
      <Route
        path="/"
        element={<Main signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />}
      />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  );
}
export default App;
