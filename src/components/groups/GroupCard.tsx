import React, {useCallback, useEffect, useState} from "react";
import "./Groups.css";
import ModalFunction from "../modal-function/ModalFunction";
import GroupGrid from "./GroupGrid";
import {HookData} from "../input/inputVariables";
import {mobxStore} from "../../store/auth/mobx";
import {observer} from "mobx-react-lite";


const GroupCardComponent = ({groupData, navActive, setNavActive, signActive, setSignActive}: HookData) => {
    const [groupDetailsActive, setGroupDetailsActive] = useState(false);
    const [openActive, setOpenActive] = useState(false);
    const [addRowData, setAddRowData] = useState<any[] | undefined>();
    const [rowData, setRowData] = useState<any[] | undefined>();
    
    
    function changeMenu () {
        if (openActive) {
            setOpenActive(false);
        }
    }
    
    useEffect(() => {
        if (Array.isArray(mobxStore.devices) && Array.isArray(groupData)) {
            const devicesCounts = groupData.map((group) => {
                const filteredDevices = mobxStore.devices.filter((device) => device.group_id === group.id);
                return filteredDevices.length;
            });
            
            
            setAddRowData(devicesCounts);
        }
    }, [groupData, mobxStore.devices]);
    
    const filteredDevices = useCallback((id: number) => {
        const updatedRowData: any[] = [];
        if (Array.isArray(mobxStore.devices) && Array.isArray(groupData)) {
            const filteredDevices = mobxStore.devices.filter((device) => device.group_id === id);
            updatedRowData.push(...filteredDevices);
            setRowData(updatedRowData);
        }
    }, []);
    
    return (
        <div className="groups__wrapper">
            {groupData ? groupData.map((data, index) => (
                <div key={data.id} className="groups__card" onClick={() => changeMenu()}>
                    
                    <div className="groups__card-top">
                        <div className="groups__card-name">{data.name}
                        </div>
                        
                        <div className="groups__card-menu">
                            <span key={data.id}
                                  className={"groups__card-delete active"}
                                  onClick={() => mobxStore.deleteGroup(data.id)}>
                                    <img src="icons/material-symbols_delete-outline.svg" alt="delete"/>
                            </span>
                        </div>
                    </div>
                    
                    <div className="groups__card-devices">
                        {addRowData ? addRowData[index] : 0} Devices
                    </div>
                    
                    <div className="groups__card-button" onClick={() => filteredDevices(data.id)}>
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
                        <div>
                            
                            <GroupGrid
                                rowData={rowData}
                                groupDevices={addRowData}
                                signActive={signActive}
                                setSignActive={setSignActive}
                                navActive={navActive}
                                setNavActive={setNavActive}
                                groupData={groupData}
                            />
                        </div>
                    
                    </ModalFunction>
                
                </div>
            
            )) : null}
        </div>
    );
};
export const GroupCard = observer(GroupCardComponent);
