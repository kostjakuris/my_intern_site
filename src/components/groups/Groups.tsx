import React, {useEffect, useState} from "react";
import {createGroupData, HookData} from "../input/inputVariables";
import "./Groups.min.css";
import {GroupCard} from "./GroupCard";
import Input from "../input/Input";
import ModalFunction from "../modal-function/ModalFunction";
import {useFormik} from "formik";
import * as yup from "yup";
import {mobxStore} from "../../store/auth/mobx";
import {observer} from "mobx-react-lite";

const GroupsComponent = ({...props}: HookData) => {
    const [addGroup, setAddGroup] = useState(false);
    const [groupDetailsActive, setGroupDetailsActive] = useState(false);
    const [openActive, setOpenActive] = useState(false);
    const [groupData, setGroupData] = useState<any[] | undefined>([]);
    
    const createGroupSchema = yup.object().shape({
        name : yup.string().required("Name required")
    });
    
    const {values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset} = useFormik({
        initialValues : {
            name : "",
        },
        validationSchema : createGroupSchema,
        onSubmit : async (values: createGroupData) => {
            await mobxStore.createGroup(values);
            handleReset(values);
        },
    });
    
    function changeMenu () {
        if (openActive) {
            setOpenActive(false);
        }
    }
    
    function changeState () {
        if (props.signActive) {
            props.setSignActive(false);
        }
        if (props.navActive) {
            props.setNavActive(false);
        }
    }
    
    useEffect(() => {
        if (mobxStore.user.role == "regional_admin") {
            mobxStore.getGroups().then(() => {
                if (Array.isArray(mobxStore.groups)) {
                    setGroupData(mobxStore.groups);
                }
            });
        }
    }, []);
    
    
    return mobxStore.user.role !== "regional_admin" ? (
        <div className="warn_message" onClick={() => changeState()}>You don`t have any permissions to see this
            page</div>
    ) : (
        <div className="groups__container" onClick={() => changeState()}>
            <div className="grid-function-groups">
                <div className="grid-buttons-groups">
                    <button className="users-grid__button" onClick={() => setAddGroup(true)}>
                        <span className="groups-grid__span">
                            <img className="users-grid__img" src="icons/material-symbols_add.svg" alt="add user"/>
                        </span>
                    </button>
                </div>
            </div>
            
            <ModalFunction active={addGroup} setActive={setAddGroup}
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
            <GroupCard
                groupData={groupData}
                signActive={props.signActive}
                setSignActive={props.setSignActive}
                navActive={props.navActive}
                setNavActive={props.setNavActive}
            />
        </div>
    );
};

export const Groups = observer(GroupsComponent);