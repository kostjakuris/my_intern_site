import React from "react";
import { HookData } from "../input/inputVariables";
import { useState } from "react";
import "./Groups.css";
import GroupCard from "./GroupCard";

const Groups = ({ ...props }: HookData) => {
  const [addGroup, setAddGroup] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);

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
          <GroupCard
            signActive={props.signActive}
            setSignActive={props.setSignActive}
            navActive={props.navActive}
            setNavActive={props.setNavActive}
          />
          <GroupCard
            signActive={props.signActive}
            setSignActive={props.setSignActive}
            navActive={props.navActive}
            setNavActive={props.setNavActive}
          />
        </div>
        <div className="first-card">
          <GroupCard
            signActive={props.signActive}
            setSignActive={props.setSignActive}
            navActive={props.navActive}
            setNavActive={props.setNavActive}
          />
          <GroupCard
            signActive={props.signActive}
            setSignActive={props.setSignActive}
            navActive={props.navActive}
            setNavActive={props.setNavActive}
          />
        </div>
      </div>
    </div>
  );
};

export default Groups;
