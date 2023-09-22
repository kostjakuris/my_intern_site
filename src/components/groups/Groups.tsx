import React, {useCallback, useEffect} from "react";
import {HookData, SignInFormData} from "../input/inputVariables";
import { useState } from "react";
import "./Groups.css";
import GroupCard from "./GroupCard";
import {useAppDispatch, useAppSelector} from "../../Hook";
import {createGroup, deleteUser as deleteUserAction, getData, getGroups, logIn} from "../../store/auth/opetations";
import Input from "../input/Input";
import ModalFunction from "../modal-function/ModalFunction";
import {useFormik} from "formik";
import {createGroupData} from '../input/inputVariables'
import * as yup from "yup";
import {string} from "yup";



const Groups = ({ ...props }: HookData) => {
  const [addGroup, setAddGroup] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);
  const [groupDetailsActive, setGroupDetailsActive] = useState(false);
  const dispatch =useAppDispatch()
  const [openActive, setOpenActive] = useState(false);
  const groupsArray = useAppSelector((state) => state.auth.groups);
  const [groupData, setGroupData] = useState<any[]|undefined>([])
  const userRole = useAppSelector((state) => state.auth.user.role);

  const createGroupSchema = yup.object().shape({
    name: yup.string().required("Name required")
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createGroupSchema,
    onSubmit: async (values:createGroupData) => {
      await dispatch((createGroup(values)))
    },
  });
  function changeMenu() {
    if (openActive) {
      setOpenActive(false);
    }
  }

  function changeState() {
    if (props.signActive) {
      props.setSignActive(false);
    }
    if (props.navActive) {
      props.setNavActive(false);
    }
  }

  useEffect(()=>{
    if (userRole=="regional_admin") {
      dispatch(getGroups()).then(()=>{
      if (Array.isArray(groupsArray)) {
        setGroupData(groupsArray)
      }
      })
    }
  },[])


  return userRole!=="regional_admin" ? (
      <div className="warn_message" onClick={() => changeState()}>You don`t have any permissions to see this page</div>
      ) :(
      <div className="groups__container" onClick={() => changeState()}>
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

        <ModalFunction
            active={addGroup}
            setActive={setAddGroup}
            activeClassName={" modal-createGroup active"}
            className={"modal-createGroup"}
        >
          <p>Create new group</p>
          <form onSubmit={handleSubmit}>
          <Input
              id={"name"}
              name={"name"}
              type={"text"}
              placeholder={"Group name"}
              className={"email--signIn group-create"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              touched={touched.name}
              errors={errors.name}
          />
          <div className="buttons-group">

          <button className="cancel__button cancel__button-delete" onClick={() => setAddGroup(false)}>
            Cancel
          </button>

          <button className="submit__button-modal submit__button-modal-delete" type="submit">
            Create
          </button>
          </div>
          </form>
        </ModalFunction>
        <div className="cards">
          <div className="first-card">
            <GroupCard
                groupData={groupData}
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