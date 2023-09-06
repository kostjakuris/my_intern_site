import "./Header.min.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import signOutIcon from "../../icons/codicon_sign-out.svg";
import { HookData } from "../input/inputVariables";
import SignIn from "../signInForm/SignIn";
import headerAvatar from "../../icons/carbon_user-avatar-filled-alt1.svg";
import arrowDown from "../../icons/mdi_chevron-down.svg";
import { initialState } from "../../store/auth/slice";
import { useAppSelector } from "../../Hook";
import { useAppDispatch } from "../../Hook";
import { logOut } from "../../store/auth/opetations";

const Header = ({ ...props }: HookData) => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.user.email);
  const avatar = useAppSelector((state) => state.auth.user.avatar);
  const role = useAppSelector((state) => state.auth.user.role);
  function changeNavState() {
    if (props.signActive) {
      props.setSignActive(false);
    }
    if (props.navActive) {
      props.setNavActive(false);
    }
  }
  return (
    <header className="header" onClick={() => changeNavState()}>
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
      <div className="block"></div>
      <div className="header__wrapper">
        <div className="header__img">
          <img className="header__img-icon" src={avatar} alt="avatar" />
        </div>
        <div className="header__info">
          <div className="header__info-title">{role}</div>
          <a href="mailto:" className="header__info-email">
            {email}
          </a>
        </div>
        <span className="header__icon" onClick={() => props.setSignActive(true)}>
          <img
            className={props.signActive ? "header__icon-image active" : "header__icon-image"}
            src="icons/mdi_chevron-down.svg"
            alt="arrow"
          />
        </span>
        <div
          className={props.signActive ? "header__menu" : "header__menu disabled"}
          onClick={(e) => e.stopPropagation()}
        >
          <Link to="/SignIn" className="header__button" onClick={() => dispatch(logOut())}>
            <span className="button__img">
              <img className="button__img-icon" src="icons/codicon_sign-out.svg" alt="door" />
            </span>
            Sign out
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
