import "./Main.min.css";
import { useState } from "react";
import Modal from "../modal/Modal";
import changeIcon from "../../icons/Vector.svg";
import avatarIcon from "../../icons/carbon_user-avatar-filled-alt.svg";
import { HookData } from "../input/inputVariables";

const Main = ({ ...props }: HookData) => {
  const [modalActive, setModalActive] = useState(false);
  const [secondButton, setSecondButton] = useState(true);
  const [thirdButton, setThirdButton] = useState(false);
  const [button, setButton] = useState(false);

  function changeState() {
    if (props.signActive) {
      props.setSignActive(false);
    }
    if (button) {
      setButton(false);
    }
    if (props.navActive) {
      props.setNavActive(false);
    }
  }

  return (
    <main className="main-page" onClick={() => changeState()}>
      <section className="main-page__info">
        <div className="page-info__icon">
          <img className="page-info__img" src={avatarIcon} alt="avatar" />
          <span className="change__img" onClick={() => setButton((prev) => !prev)}>
            <button
              className={button ? "change__img-button active" : "change__img-button"}
              onClick={(e) => e.stopPropagation()}
            >
              Upload your photo
            </button>
            <img className="change__img-icon" src={changeIcon} alt="pen" />
          </span>
          <p className="page-info__username">Valentin Kravchenko</p>
        </div>
        <Modal active={modalActive} setActive={setModalActive} />
        <button className="main-page-info__edit" onClick={() => setModalActive(true)}>
          Edit profile
        </button>
      </section>
      <section className="main-page__data">
        <div className="main-page__nav">
          <div className="page__nav-list">
            <button
              className={secondButton ? "page__nav-link active" : "page__nav-link"}
              onClick={() => setSecondButton(true)}
            >
              About
            </button>

            <button
              className={thirdButton ? "page__nav-link active" : "page__nav-link"}
              onClick={() => setThirdButton(true)}
              name="Settings"
            >
              Settings
            </button>
          </div>
        </div>
        <div className="main-page__personal-data">
          <h4 className="personal-data__header">Personal information</h4>

          <div className="personal-data__wrapper">
            <div className="personal-data__left personal-data--mobile">
              <div className="personal-data__role personal-data__padding">
                <p className="personal-data__title">Role</p>
                <p className="personal-data__info">Customer</p>
              </div>
              <div className="personal-data__phonenumber personal-data__padding">
                <p className="personal-data__title">Phone number</p>
                <p className="personal-data__info">069567830</p>
              </div>
            </div>

            <div className="personal-data__center personal-data--mobile">
              <div className="personal-data__email personal-data__padding">
                <p className="personal-data__title">Email</p>
                <p className="personal-data__info personal-data__desktop-email">example@gmail.com</p>
                <p className="personal-data__info personal-data__mobile-email">example @gmail.com</p>
              </div>
              <div className="personal-data__adress personal-data__padding">
                <p className="personal-data__title">Adress</p>
                <p className="personal-data__info ">Zaporojskaya street 16</p>
              </div>
            </div>

            <div className="personal-data__right personal-data--mobile">
              <div className="personal-data__country personal-data__padding">
                <p className="personal-data__title">Country</p>
                <p className="personal-data__info">Ukraine</p>
              </div>
              <div className="personal-data__town personal-data__padding">
                <p className="personal-data__title">Town</p>
                <p className="personal-data__info">Zaporozhye</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
