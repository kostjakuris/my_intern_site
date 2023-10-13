import "./Header.min.css";
import {Link} from "react-router-dom";
import {HookData} from "../input/inputVariables";
import {mobxStore} from "../../store/auth/mobx";
import {observer} from "mobx-react-lite";


const HeaderComponent = ({...props}: HookData) => {
    
    function changeNavState () {
        if (props.signActive) {
            props.setSignActive(false);
        }
        if (props.navActive) {
            props.setNavActive(false);
        }
    }
    
    return (
        <header className="header" onClick={() => changeNavState()}>
            <div className="block"></div>
            <div className="header__wrapper">
                <div className="header__img">
                    <img className="header__img-icon" src={mobxStore ? mobxStore.user.avatar : ""} alt="avatar"/>
                </div>
                <div className="header__info">
                    <div className="header__info-title">{mobxStore ? mobxStore.user.role : ""}</div>
                    <a href="mailto:" className="header__info-email">
                        {mobxStore ? mobxStore.user.email : ""}
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
                    <Link to="/SignIn" className="header__button" onClick={() => mobxStore.logOut()}>
            <span className="button__img">
              <img className="button__img-icon" src="icons/codicon_sign-out.svg" alt="door"/>
            </span>
                        Sign out
                    </Link>
                </div>
            </div>
        </header>
    );
};

export const Header = observer(HeaderComponent);
