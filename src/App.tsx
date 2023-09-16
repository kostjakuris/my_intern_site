import {useEffect, useState} from "react";
import SignUp from "./components/signUpForm/SignUp";
import SignIn from "./components/signInForm/SignIn";
import Main from "./components/main/Main";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Layout from "./components/nav/Layout";
import Users from "./components/users/Users";
import Devices from "./components/devices/Devices";
import Map from "./components/map/Map";
import Groups from "./components/groups/Groups";
import {useAppDispatch, useAppSelector} from "./Hook";

export type NavContent = {
  navActive: boolean;
  setNavActive: (navActive: boolean) => void;
  signActive: boolean;
  setSignActive: (signActive: boolean) => void;
};
function App() {
    const dispatch=useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isRefreshing = useAppSelector((state) => state.auth.isRefreshing);
    console.log(isLoggedIn)
  const [menuActive, setMenuActive] = useState(false);
  const [nav, setNav] = useState(false);
  const navigate=useNavigate()

    useEffect(()=>{

  if (isLoggedIn) {
     navigate('/')
  }
    },[isLoggedIn])


  return (


            <Routes>
            <Route
                path="/"
                element={<Layout  signActive={menuActive} setSignActive={setMenuActive} navActive={nav} setNavActive={setNav} />}
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
export default App;
