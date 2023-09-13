import React from "react";
import "./Groups.css";
import { useState } from "react";
import ModalFunction from "../modal-function/ModalFunction";
import GroupGrid from "./GroupGrid";
import { HookData } from "../input/inputVariables";

const GroupCard = ({ ...props }: HookData) => {
  const [groupDetailsActive, setGroupDetailsActive] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  function changeMenu() {
    if (openActive) {
      setOpenActive(false);
    }
  }
  return (
    <div className="groups__card" onClick={changeMenu}>
      <div className="groups__card-top">
        <div className="groups__card-name">Name</div>
        <div className="groups__card-menu">
          <span className="groups__card-open" onClick={() => setOpenActive((prev) => !prev)}>
            <img src="icons/charm_menu-kebab.svg" alt="menu" />
          </span>
          <span className={openActive ? "groups__card-edit active" : "groups__card-edit"}>
            <img src="icons/Edit.svg" alt="edit" />
          </span>
          <span className={openActive ? "groups__card-delete active" : "groups__card-delete"}>
            <img src="icons/Delete.svg" alt="delete" />
          </span>
        </div>
      </div>
      <div className="groups__card-devices">17 Devices</div>
      <div className="groups__card-button">
        <button className="submit__button-groups" onClick={() => setGroupDetailsActive(true)}>
          Details
        </button>
      </div>
      <ModalFunction
        active={groupDetailsActive}
        setActive={setGroupDetailsActive}
        activeClassName={"modal__content active"}
        className={"modal__content"}
      >
        <div className="modal__top">
          <h3 className="form-wrapper-modal__title">User`s info</h3>
        </div>
        <GroupGrid
          signActive={props.signActive}
          setSignActive={props.setSignActive}
          navActive={props.navActive}
          setNavActive={props.setNavActive}
        />
      </ModalFunction>
    </div>
  );
};

export default GroupCard;
