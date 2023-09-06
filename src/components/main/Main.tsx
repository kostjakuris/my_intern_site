import "./Main.min.css";
import { useState } from "react";
import Modal from "../modal/Modal";
import { HookData } from "../input/inputVariables";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../Hook";

const Main = ({ ...props }: HookData) => {
  const [modalActive, setModalActive] = useState(false);
  const [secondButton, setSecondButton] = useState(true);
  const [thirdButton, setThirdButton] = useState(false);
  const [button, setButton] = useState(false);
  const name = useAppSelector((state) => state.auth.user.name);
  const surname = useAppSelector((state) => state.auth.user.surname);
  const role = useAppSelector((state) => state.auth.user.role);
  const phone_number = useAppSelector((state) => state.auth.user.phone_number);
  const country = useAppSelector((state) => state.auth.user.country);
  const email = useAppSelector((state) => state.auth.user.email);
  const address = useAppSelector((state) => state.auth.user.address);
  const city = useAppSelector((state) => state.auth.user.city);
  const avatar = useAppSelector((state) => state.auth.user.avatar);

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
          <img className="page-info__img" src={avatar} alt="avatar" />
          <span className="change__img" onClick={() => setButton((prev) => !prev)}>
            <button
              className={button ? "change__img-button active" : "change__img-button"}
              onClick={(e) => e.stopPropagation()}
            >
              Upload your photo
            </button>
            <img className="change__img-icon" src="icons/Vector.svg" alt="pen" />
          </span>
          <p className="page-info__username">
            {name} {surname}
          </p>
        </div>
        <Modal
          active={modalActive}
          setActive={setModalActive}
          activeClassName={"modal__content active"}
          className={"modal__content"}
        />
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
                <p className="personal-data__info">{role}</p>
              </div>
              <div className="personal-data__phonenumber personal-data__padding">
                <p className="personal-data__title">Phone number</p>
                <p className="personal-data__info">{phone_number}</p>
              </div>
            </div>

            <div className="personal-data__center personal-data--mobile">
              <div className="personal-data__email personal-data__padding">
                <p className="personal-data__title">Email</p>
                <p className="personal-data__info personal-data__desktop-email">{email}</p>
                <p className="personal-data__info personal-data__mobile-email personal-data__padding">{email}</p>
              </div>
              <div className="personal-data__adress personal-data__padding">
                <p className="personal-data__title">Adress</p>
                <p className="personal-data__info ">{address}</p>
              </div>
            </div>

            <div className="personal-data__right personal-data--mobile">
              <div className="personal-data__country personal-data__padding">
                <p className="personal-data__title">Country</p>
                <p className="personal-data__info">{country}</p>
              </div>
              <div className="personal-data__town personal-data__padding">
                <p className="personal-data__title">Town</p>
                <p className="personal-data__info">{city}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
