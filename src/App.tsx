import {useEffect, useState} from "react";
import {SignUp} from "./components/signUpForm/SignUp";
import {SignIn} from "./components/signInForm/SignIn";
import {Main} from "./components/main/Main";
import { Route, Routes, useNavigate} from "react-router-dom";
import Layout from "./components/nav/Layout";
import {Users} from "./components/users/Users";
import {Devices} from "./components/devices/Devices";
import {Groups} from "./components/groups/Groups";
import Loader from "./components/loader/Loader";
import {mobxStore} from "./store/auth/mobx";
import {observer} from "mobx-react-lite";


export type NavContent = {
  navActive: boolean;
  setNavActive: (navActive: boolean) => void;
  signActive: boolean;
  setSignActive: (signActive: boolean) => void;
};
function AppComponent() {
  const [menuActive, setMenuActive] = useState(false);
  const [nav, setNav] = useState(false);
  const navigate=useNavigate()

    useEffect(()=>{

  if (mobxStore.isLoggedIn) {
     navigate('/',{replace:true} )
  }else  {
      navigate('/SignIn' ,{replace:true} )
      window.history.replaceState(null,"",window.location.href)
  }
    },[mobxStore.isLoggedIn])


  return mobxStore.isLoading ? <Loader/> :(
            <Routes>
            <Route
                path="/"
                element={<Layout  signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />}
            >
                <Route
                    index
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
                {/*<Route path="map" element={<Map />} />*/}
            </Route>

                <Route
                    path="SignUp"
                    element={<SignUp signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />}
                />
                <Route
                    path="SignIn"
                    element={<SignIn signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />}
                />
            </Routes>
  )}
export const App=observer(AppComponent);
