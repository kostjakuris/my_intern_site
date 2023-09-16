import React, {useEffect} from "react";
import { HookData } from "../input/inputVariables";
import { useState } from "react";
import "./Groups.css";
import GroupCard from "./GroupCard";
import { useAppSelector } from "../../Hook";
import { useAppDispatch } from "../../Hook";
import {getGroups} from "../../store/auth/opetations";
import ModalFunction from "../modal-function/ModalFunction";
import GroupGrid from "./GroupGrid";

const Groups = ({ ...props }: HookData) => {
  const [addGroup, setAddGroup] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);
  const dispatch=useAppDispatch()

  const [groupDetailsActive, setGroupDetailsActive] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const groupsArray = useAppSelector((state) => state.auth.groups);
  const [groupData, setGroupData] = useState<any[]|undefined>()
  function changeMenu() {
    if (openActive) {
      setOpenActive(false);
    }
  }

  useEffect(()=>{
    dispatch(getGroups())
    if (Array.isArray(groupsArray)) {
      setGroupData(groupsArray)
    }
  },[])

  return (
    <div className="groups__container">
      <div className="grid-function-groups">
        <div className="grid-buttons-groups">
          <button className="users-grid__button" onClick={() => setAddGroup(true)}>
            <span className="groups-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_add.svg" alt="add user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setDeleteGroup(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_delete-outline.svg" alt="delete user" />
            </span>
          </button>
        </div>
      </div>
      <div className="cards">
        <div className="first-card">
          <div className="groups__card" onClick={changeMenu}>
            <div className="groups__card-top">

              {groupData ? groupData.map((data: any) => (
                  <div className="groups__card-name">{props.group_id==data.id ? data.name :"Name"}</div>
              )):null}

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
            <div className="groups__card-devices">0 Devices</div>
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

          <div className="groups__card" onClick={changeMenu}>
            <div className="groups__card-top">

              {groupData ? groupData.map((data: any) => (
                  <div className="groups__card-name">{props.group_id==data.id ? data.name :"Name"}</div>
              )):null}

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
            <div className="groups__card-devices">0 Devices</div>
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
        </div>
        <div className="first-card">
          <div className="groups__card" onClick={changeMenu}>
            <div className="groups__card-top">

              {groupData ? groupData.map((data: any) => (
                  <div className="groups__card-name">{props.group_id==data.id ? data.name :"Name"}</div>
              )):null}

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
            <div className="groups__card-devices">0 Devices</div>
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

          <div className="groups__card" onClick={changeMenu}>
            <div className="groups__card-top">

              {groupData ? groupData.map((data: any) => (
                  <div className="groups__card-name">{props.group_id==data.id ? data.name :"Name"}</div>
              )):null}

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
            <div className="groups__card-devices">0 Devices</div>
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
        </div>
      </div>
    </div>
  );
};

export default Groups;
