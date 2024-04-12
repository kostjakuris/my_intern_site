import "./Nav.min.css";
import {NavLink} from "react-router-dom";
import {NavContent} from "../../App";

const Nav = ({...props}: NavContent) => {
    return (
        <div>
            <div className="main__nav">
                <div className="header__nav-open">
                    <span className="header__nav-icon">
                        <img src="icons/Group.svg" alt="menu"/>
                    </span>
                </div>
                <div className="header__nav-open--mobile" onClick={(e) => e.stopPropagation()}>
                    <span
                        className={props.navActive ? "header__nav-icon active" : "header__nav-icon"}
                        onClick={() => props.setNavActive(true)}
                    >
                        <img src="icons/Group.svg" alt="menu"/>
                    </span>
                </div>
            </div>
            
            <nav
                className={props.navActive ? "main__nav--mobile active" : "main__nav--mobile"}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="main__nav-buttons">
                    <NavLink className={({isActive}) => (isActive ? "main__nav-button active" : "main__nav-button")}
                             to="">
                        <span className="main__nav-icon">
                            <img className="main__nav-img" src="icons/icomoon-free_profile.svg" alt="profile"/>
                        </span>
                        Profile
                    </NavLink>
                    <NavLink
                        className={({isActive}) => (isActive ? "main__nav-button active" : "main__nav-button")}
                        to="devices"
                    >
                        <span className="main__nav-icon">
                            <img className="main__nav-img" src="icons/clarity_devices-line.svg" alt="devices"/>
                        </span>
                        Devices
                    </NavLink>
                    <NavLink className="main__nav-button" to="users">
                        <span className="main__nav-icon">
                            <img className="main__nav-img" src="icons/heroicons_users-solid.svg" alt="users"/>
                        </span>
                        Users
                    </NavLink>
                    <NavLink className="main__nav-button" to="groups">
                        <span className="main__nav-icon">
                            <img className="main__nav-img" src="icons/ic_baseline-important-devices.svg" alt="groups"/>
                        </span>
                        Groups
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
