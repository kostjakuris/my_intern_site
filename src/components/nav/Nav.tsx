import "./Nav.min.css";
import { Route, Routes, NavLink } from "react-router-dom";
import profileIcon from "../../icons/icomoon-free_profile.svg";
import deviceIcon from "../../icons/clarity_devices-line.svg";
import usersIcon from "../../icons/heroicons_users-solid.svg";
import groupsIcon from "../../icons/ic_baseline-important-devices.svg";
import mapIcon from "../../icons/uil_map.svg";
import { NavContent } from "../../App";
import menuIcon from "../../icons/Group.svg";
import Main from "../main/Main";
import Users from "../users/Users";
import Devices from "../devices/Devices";
import Map from "../map/Map";
import { useJsApiLoader } from "@react-google-maps/api";

const API_KEY: any = process.env.REACT_APP_API_KEY;

const Nav = ({ ...props }: NavContent) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });
  return (
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
            <img src={menuIcon} alt="menu" />
          </span>
        </div>
        <div className="header__nav-open--mobile" onClick={(e) => e.stopPropagation()}>
          <span
            className={props.navActive ? "header__nav-icon active" : "header__nav-icon"}
            onClick={() => props.setNavActive(true)}
          >
            <img src={menuIcon} alt="menu" />
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
              <img className="main__nav-img" src={profileIcon} alt="profile" />
            </span>
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "main__nav-button active" : "main__nav-button")}
            to="/devices"
          >
            <span className="main__nav-icon">
              <img className="main__nav-img" src={deviceIcon} alt="devices" />
            </span>
            Devices
          </NavLink>
          <NavLink className="main__nav-button" to="/users">
            <span className="main__nav-icon">
              <img className="main__nav-img" src={usersIcon} alt="users" />
            </span>
            Users
          </NavLink>
          <NavLink className="main__nav-button" to="/groups">
            <span className="main__nav-icon">
              <img className="main__nav-img" src={groupsIcon} alt="groups" />
            </span>
            Groups
          </NavLink>
          <NavLink className="main__nav-button" to="/map">
            <span className="main__nav-icon">
              <img className="main__nav-img" src={mapIcon} alt="map" />
            </span>
            Map
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
