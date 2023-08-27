import { useState } from "react";
import SignUp from "./components/signUpForm/SignUp";
import Header from "./components/header/Header";
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
    <div>
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      <Header signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />
      <Nav navActive={nav} setNavActive={setNav} signActive={menuActive} setSignActive={setMenuActive} />
    </div>
  );
}
export default App;
