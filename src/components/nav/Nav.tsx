import "./Nav.min.css";
import { Route, Routes, NavLink, Navigate } from "react-router-dom";
import { NavContent } from "../../App";
import Main from "../main/Main";
import Users from "../users/Users";
import Devices from "../devices/Devices";
import Map from "../map/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import { initialState } from "../../store/auth/slice";

const API_KEY: any = process.env.REACT_APP_API_KEY;

const Nav = ({ ...props }: NavContent) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });
  return initialState.user.name === null ? (
    <Navigate to="/SignUp" />
  ) : (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              signActive={props.signActive}
              setSignActive={props.setSignActive}
              navActive={props.navActive}
              setNavActive={props.setNavActive}
            />
          }
        />

        <Route
          path="/devices"
          element={
            <Devices
              signActive={props.signActive}
              setSignActive={props.setSignActive}
              navActive={props.navActive}
              setNavActive={props.setNavActive}
            />
          }
        />

        <Route
          path="/users"
          element={
            <Users
              signActive={props.signActive}
              setSignActive={props.setSignActive}
              navActive={props.navActive}
              setNavActive={props.setNavActive}
            />
          }
        />

        <Route path="/map" element={isLoaded ? <Map /> : "Page not found"} />
      </Routes>
      <div className="main__nav">
        <div className="header__nav-open">
          <span className="header__nav-icon">
            <img src="icons/Group.svg" alt="menu" />
          </span>
        </div>
        <div className="header__nav-open--mobile" onClick={(e) => e.stopPropagation()}>
          <span
            className={props.navActive ? "header__nav-icon active" : "header__nav-icon"}
            onClick={() => props.setNavActive(true)}
          >
            <img src="icons/Group.svg" alt="menu" />
          </span>
        </div>
      </div>

      <nav
        className={props.navActive ? "main__nav--mobile active" : "main__nav--mobile"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="main__nav-buttons">
          <NavLink className={({ isActive }) => (isActive ? "main__nav-button active" : "main__nav-button")} to="/">
            <span className="main__nav-icon">
              <img className="main__nav-img" src="icons/icomoon-free_profile.svg" alt="profile" />
            </span>
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "main__nav-button active" : "main__nav-button")}
            to="/devices"
          >
            <span className="main__nav-icon">
              <img className="main__nav-img" src="icons/clarity_devices-line.svg" alt="devices" />
            </span>
            Devices
          </NavLink>
          <NavLink className="main__nav-button" to="/users">
            <span className="main__nav-icon">
              <img className="main__nav-img" src="icons/heroicons_users-solid.svg" alt="users" />
            </span>
            Users
          </NavLink>
          <NavLink className="main__nav-button" to="/groups">
            <span className="main__nav-icon">
              <img className="main__nav-img" src="icons/ic_baseline-important-devices.svg" alt="groups" />
            </span>
            Groups
          </NavLink>
          <NavLink className="main__nav-button" to="/map">
            <span className="main__nav-icon">
              <img className="main__nav-img" src="icons/uil_map.svg" alt="map" />
            </span>
            Map
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
