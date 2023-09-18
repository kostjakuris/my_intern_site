import React,{useEffect} from "react";
import { HookData } from "../input/inputVariables";
import { useState } from "react";
import "./Groups.css";
import GroupCard from "./GroupCard";
import {useAppDispatch, useAppSelector} from "../../Hook";
import {getGroups} from "../../store/auth/opetations";

const Groups = ({ ...props }: HookData) => {
  const [addGroup, setAddGroup] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);
  const [groupDetailsActive, setGroupDetailsActive] = useState(false);
  const dispatch =useAppDispatch()
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
            <GroupCard
                signActive={props.signActive}
                setSignActive={props.setSignActive}
                navActive={props.navActive}
                setNavActive={props.setNavActive}
                group_id={1}
            />
            <GroupCard
                signActive={props.signActive}
                setSignActive={props.setSignActive}
                navActive={props.navActive}
                setNavActive={props.setNavActive}
                group_id={2}
            />
          </div>
          <div className="first-card">
            <GroupCard
                signActive={props.signActive}
                setSignActive={props.setSignActive}
                navActive={props.navActive}
                setNavActive={props.setNavActive}
                group_id={3}
            />
            <GroupCard
                signActive={props.signActive}
                setSignActive={props.setSignActive}
                navActive={props.navActive}
                setNavActive={props.setNavActive}
                group_id={4}
            />
          </div>
        </div>
      </div>
  );
};

export default Groups;