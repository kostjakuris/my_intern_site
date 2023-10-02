import React from "react";
import "./Groups.css";
import {useState, useEffect} from "react";
import ModalFunction from "../modal-function/ModalFunction";
import GroupGrid from "./GroupGrid";
import {HookData} from "../input/inputVariables";
import {useAppSelector} from "../../Hook";
import {useAppDispatch} from "../../Hook";
import {deleteGroup, editGroup} from "../../store/auth/opetations";


const GroupCard = ({groupData, navActive, setNavActive, signActive, setSignActive}: HookData) => {
    const [groupDetailsActive, setGroupDetailsActive] = useState(false);
    const [openActive, setOpenActive] = useState(false);
    const groupsArray = useAppSelector((state) => state.auth.groups);
    const dispatch = useAppDispatch();
    const [addRowData, setAddRowData] = useState<any[] | undefined>();
    const groupDevicesArray = useAppSelector((state) => state.auth.devices);
    const [deleteGroupActive, setDeleteGroupActive] = useState(false);


    function changeMenu () {
        if (openActive) {
            setOpenActive(false);
        }
    }

    useEffect(() => {
        if (Array.isArray(groupDevicesArray) && Array.isArray(groupData)) {
            const devicesCounts = groupData.map((group) => {
                const filteredDevices = groupDevicesArray.filter((device) => device.group_id === group.id);
                return filteredDevices.length;
            });

            setAddRowData(devicesCounts);
        }
    }, [groupData, groupDevicesArray]);
    console.log(groupDevicesArray.group_id);

    return (
        <div className="groups__wrapper">
            {groupData ? groupData.map((data, index) => (
                <div key={data.id} className="groups__card" onClick={() => changeMenu()}>

                    <div className="groups__card-top">
                        <div className="groups__card-name">{data.name}
                        </div>

                        <div className="groups__card-menu">
                        <span key={data.id} className="groups__card-open"
                              onClick={() => setOpenActive((prev) => !prev)}>
                            <img src="icons/charm_menu-kebab.svg" alt="menu"/>
                        </span>

                            <span className={openActive ? "groups__card-edit active" : "groups__card-edit"}
                                  onClick={() => dispatch(editGroup(data.id))}>
                                <img src="icons/Edit.svg" alt="edit"/>
                            </span>
                            <span className={openActive ? "groups__card-delete active" : "groups__card-delete"}
                                  onClick={() => dispatch(deleteGroup(data.id))}>
                            <img src="icons/material-symbols_delete-outline.svg" alt="delete"/>
                        </span>
                        </div>
                    </div>

                    <div className="groups__card-devices">
                        {addRowData ? addRowData[index] : 0} Devices
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
                        {Array.isArray(groupDevicesArray) ? groupDevicesArray.group_id == data.id ?
                                <div>

                                    <div className="modal__top">
                                        <h3 className="form-wrapper-modal__title">User`s info</h3>
                                    </div>
                                    <div>

                                        <GroupGrid
                                            groupDevices={addRowData}
                                            signActive={signActive}
                                            setSignActive={setSignActive}
                                            navActive={navActive}
                                            setNavActive={setNavActive}
                                            groupData={groupData}
                                        />
                                    </div>
                                </div>
                                : null
                            : null}
                    </ModalFunction>

                </div>

            )) : null}
        </div>
    );
};
export default GroupCard;
