import {useEffect, useState} from "react";
import SignUp from "./components/signUpForm/SignUp";
import SignIn from "./components/signInForm/SignIn";
import Main from "./components/main/Main";
import {Route, Routes, useNavigate} from "react-router-dom";
import Layout from "./components/nav/Layout";
import Users from "./components/users/Users";
import Devices from "./components/devices/Devices";
import Map from "./components/map/Map";
import Groups from "./components/groups/Groups";
import {useAppSelector} from "./Hook";
import Loader from "./components/loader/Loader";


export type NavContent = {
    navActive: boolean;
    setNavActive: (navActive: boolean) => void;
    signActive: boolean;
    setSignActive: (signActive: boolean) => void;
};

function App () {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const [menuActive, setMenuActive] = useState(false);
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        
        if (isLoggedIn) {
            navigate("/", {replace : true});
        } else {
            navigate("/SignIn", {replace : true});
        }
    }, [isLoggedIn]);
    
    
    return isLoading ? <Loader/> : (
        <Routes>
            <Route
                path="/"
                element={<Layout signActive={menuActive} setSignActive={setMenuActive} navActive={nav}
                                 setNavActive={setNav}/>}
            >
                <Route
                    index
                    element={<Main signActive={menuActive} setSignActive={setMenuActive} navActive={nav}
                                   setNavActive={setNav}/>}
                />
                <Route
                    path="devices"
                    element={
                        <Devices signActive={menuActive} setSignActive={setMenuActive} navActive={nav}
                                 setNavActive={setNav}/>
                    }
                />
                
                <Route
                    path="users"
                    element={
                        <Users signActive={menuActive} setSignActive={setMenuActive} navActive={nav}
                               setNavActive={setNav}/>
                    }
                />
                
                <Route
                    path="groups"
                    element={
                        <Groups signActive={menuActive} setSignActive={setMenuActive} navActive={nav}
                                setNavActive={setNav}/>
                    }
                />
                {/*<Route path="map" element={<Map />} />*/}
            </Route>
            
            <Route
                path="SignUp"
                element={<SignUp signActive={menuActive} setSignActive={setMenuActive} navActive={nav}
                                 setNavActive={setNav}/>}
            />
            <Route
                path="SignIn"
                element={<SignIn signActive={menuActive} setSignActive={setMenuActive} navActive={nav}
                                 setNavActive={setNav}/>}
            />
        </Routes>
    );
}

export default App;
