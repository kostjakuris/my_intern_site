import React, {createContext, useEffect} from "react";
import "./Groups.css";
import {useState} from "react";
import ModalFunction from "../modal-function/ModalFunction";
import GroupGrid from "./GroupGrid";
import {HookData} from "../input/inputVariables";
import {useAppSelector} from "../../Hook";
import {useAppDispatch} from "../../Hook";
import {getDevices} from "../../store/auth/opetations";
import Input from "../input/Input";

const GroupCard = ({groupData,navActive,setNavActive,signActive,setSignActive}: HookData) => {
    const [groupDetailsActive, setGroupDetailsActive] = useState(false);
    const [openActive, setOpenActive] = useState(false);
    const groupsArray = useAppSelector((state) => state.auth.groups);
    const dispatch = useAppDispatch()
    const [addRowData, setAddRowData] = useState<any[] | undefined>()
    const groupDevicesArray = useAppSelector((state) => state.auth.devices);

    function changeMenu() {
        if (openActive) {
            setOpenActive(false);
        }
    }

    useEffect(() => {
        dispatch(getDevices())
        if (Array.isArray(groupDevicesArray)) {
            setAddRowData(groupDevicesArray);
        }
    }, [])

    let length = addRowData?.length
    return (
        <div>
            {groupData ? groupData.map((data:any) => (
            <div className="groups__card" onClick={changeMenu}>

                <div className="groups__card-top">
                    <div
                         className="groups__card-name">{data.name}
                    </div>

                    <div className="groups__card-menu">
                        <span className="groups__card-open" onClick={() => setOpenActive((prev) => !prev)}>
                            <img src="icons/charm_menu-kebab.svg" alt="menu"/>
                        </span>
                        <span className={openActive ? "groups__card-edit active" : "groups__card-edit"}>
                            <img src="icons/Edit.svg" alt="edit"/>
                        </span>
                        <span className={openActive ? "groups__card-delete active" : "groups__card-delete"}>
                            <img src="icons/Delete.svg" alt="delete"/>
                        </span>
                    </div>
                </div>

                <div className="groups__card-devices">
                    {length} Devices
                </div>

                <div className="groups__card-button">
                    <button className="submit__button-groups" onClick={() => setGroupDetailsActive(true)}>
                        Details
                    </button>
                </div>
                <ModalFunction
                    active={groupDetailsActive}
                    setActive={setGroupDetailsActive}
                    activeClassName={" modal__content active"}
                    className={"modal__content"}
                >
                    <div className="modal__top">
                        <h3 className="form-wrapper-modal__title">User`s info</h3>
                    </div>
                    <div key={groupsArray.id}>

                    <GroupGrid
                        signActive={signActive}
                        setSignActive={setSignActive}
                        navActive={navActive}
                        setNavActive={setNavActive}
                        group_id={groupsArray.id}
                    />
                    </div>

                </ModalFunction>

            </div>

            )) : null}
        </div>
    );
};
export default GroupCard;
