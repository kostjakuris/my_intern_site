import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Devices.css";
import "./ModalCreate.min.css";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {DeviceFormData, HookData} from "../input/inputVariables";
import ModalFunction from "../modal-function/ModalFunction";
import {useFormik} from "formik";
import Input from "../input/Input";
import {CreateDeviceSchema} from "../input/CreateDeviceValidation";
import {mobxStore} from "../../store/auth/mobx";
import {observer} from "mobx-react-lite";

type GridData = {
    headerName?: string;
    field?: string;
    checkboxSelection?: boolean;
    headerCheckboxSelection?: boolean;
    rowGroupPanelShow?: string;
};


const DevicesComponent = ({...props}: HookData) => {
    
    const {values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset} = useFormik<DeviceFormData>({
        initialValues : {
            name : "",
            device_type : "",
            email : "",
            country : "",
            city : "",
            address : "",
            serial_number : "",
        },
        validationSchema : CreateDeviceSchema,
        onSubmit : async () => {
        
        },
    });
    
    const [createDeviceActive, setCreateDeviceActive] = useState(false);
    const [deleteDeviceActive, setDeleteDeviceActive] = useState(false);
    const [deviceDetailsActive, setDeviceDetailsActive] = useState(false);
    const [editDeviceActive, setEditDeviceActive] = useState(false);
    
    function changeState () {
        if (props.signActive) {
            props.setSignActive(false);
        }
        if (props.navActive) {
            props.setNavActive(false);
        }
    }
    
    const gridRef = useRef<AgGridReact>(null);
    const [columnDefs] = useState<GridData[]>([
        {
            headerName : "Serial number", field : "serial_number", checkboxSelection : true,
            headerCheckboxSelection : true
        },
        {headerName : "Device type", field : "device_type"},
        {headerName : "Name", field : "name"},
        {headerName : "Owner email", field : "owner_email"},
        {headerName : "Country", field : "country"},
        {headerName : "City", field : "city"},
        {headerName : "Address", field : "address"},
    ]);
    
    const [rowData, setRowData] = useState<any[]>();
    const [selectedDevice, setSelectedDevice] = useState<any[]>([
        {
            id : null,
            serial_number : null,
            device_type : null,
            name : null,
            email : null,
            country : null,
            city : null,
            address : null,
        },
    ]);
    
    const defaultColDef = useMemo(
        () => ({
            sortable : true,
            filter : true,
            flex : 1,
            floatingFilter : true,
            resizable : true,
        }),
        []
    );
    
    
    const onPaginationChange = useCallback((pageSize: number) => {
        gridRef.current?.api.paginationSetPageSize(pageSize);
    }, []);
    
    const getSelectedRows = useCallback(() => {
        const selectedRows = gridRef.current?.api.getSelectedRows();
        
        if (selectedRows) {
            const updatedSelectedData = selectedRows.map((selectedData) => ({
                id : selectedData.id,
                serial_number : selectedData.serial_number,
                device_type : selectedData.device_type,
                name : selectedData.name,
                email : selectedData.email,
                country : selectedData.country,
                city : selectedData.city,
                address : selectedData.address,
            }));
            setSelectedDevice(updatedSelectedData);
        }
    }, []);
    
    const deleteDevice = useCallback(() => {
        const getSelectedNodes = gridRef.current?.api.getSelectedNodes();
        if (getSelectedNodes) {
            getSelectedNodes.forEach((selectedData) => {
                mobxStore.deleteDevice(selectedData.data.id)
                    .then(() => mobxStore.getDevices().then(() => setRowData(mobxStore.devices)));
            });
        }
    }, []);
    
    const onSubmitCreateDevice = useCallback(async (values: DeviceFormData) => {
        await mobxStore.createDevice(values)
            .then(() => mobxStore.getDevices().then(() => setRowData(mobxStore.devices)));
        handleReset(values);
        
    }, []);
    
    const onSubmitEditDevice = useCallback(async (values: DeviceFormData) => {
        const getSelectedNodes = gridRef.current?.api.getSelectedNodes();
        if (getSelectedNodes) {
            getSelectedNodes.forEach((selectedData) => {
                mobxStore.editDevice({...values, id : selectedData.data.id})
                    .then(() => mobxStore.getDevices().then(() => setRowData(mobxStore.devices)));
                handleReset(values);
            });
        }
    }, []);
    
    function openDeviceModal (title: string) {
        if (title == "Device Creation") {
            setCreateDeviceActive(true);
        }
        if (title == "Edit Device") {
            setEditDeviceActive(true);
        }
    }
    
    useEffect(() => {
        if (mobxStore.user.role !== "customer") {
            mobxStore.getDevices().then(() => {
                if (Array.isArray(mobxStore.devices)) {
                    setRowData(mobxStore.devices);
                }
            });
        }
    }, [mobxStore.deleteDevice, mobxStore.createDevice, mobxStore.editDevice]);
    
    return mobxStore.user.role == "customer" ? (
        <div className="warn_message" onClick={() => changeState()}>You don`t have any permissions to see this
            page</div>
    ) : (
        <div className="users-grid" onClick={() => changeState()}>
            <ModalFunction
                active={createDeviceActive}
                setActive={setCreateDeviceActive}
                activeClassName={"modal__content active"}
                className={"modal__content"}
            >
                <div className="modal__top">
                    <h3 className="form-wrapper-modal__title">Device Creation</h3>
                    <span className="cross__wrapper" onClick={() => setCreateDeviceActive(false)}>
                        <img src="icons/system-uicons_cross.svg" alt="cross"/>
                    </span>
                
                </div>
                
                <div className="form-wrapper-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="signUp__form--modal">
                            <div className="left__form--modal">
                                <div className=" form__firstname ">
                                    <Input
                                        id={"name"}
                                        name={"name"}
                                        type={"text"}
                                        placeholder={"Device Name"}
                                        className={"form firstName"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        touched={touched.name}
                                        errors={errors.name}
                                    />
                                </div>
                                
                                <div className=" form__email ">
                                    <Input
                                        id={"email"}
                                        name={"email"}
                                        type={"email"}
                                        placeholder={"Email"}
                                        className={"form email"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        touched={touched.email}
                                        errors={errors.email}
                                    />
                                </div>
                                
                                <div className=" form__country ">
                                    <Input
                                        id={"country"}
                                        name={"country"}
                                        type={"text"}
                                        placeholder={"Country"}
                                        className={"form country"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.country}
                                        touched={touched.country}
                                        errors={errors.country}
                                    />
                                </div>
                                
                                <div className=" form__adress ">
                                    <Input
                                        id={"address"}
                                        name={"address"}
                                        type={"text"}
                                        placeholder={"Address"}
                                        className={"form adress"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}
                                        touched={touched.address}
                                        errors={errors.address}
                                    />
                                </div>
                            </div>
                            
                            <div className="right__form--modal">
                                <div className=" form__lastname">
                                    <Input
                                        id={"device_type"}
                                        name={"device_type"}
                                        type={"text"}
                                        placeholder={"Device Type"}
                                        className={"form lastName"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.device_type}
                                        touched={touched.device_type}
                                        errors={errors.device_type}
                                    />
                                </div>
                                
                                <div className=" form__town ">
                                    <Input
                                        id={"city"}
                                        name={"city"}
                                        type={"text"}
                                        placeholder={"City"}
                                        className={"form town"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                        touched={touched.city}
                                        errors={errors.city}
                                    />
                                </div>
                                <div className=" form__serialNumber ">
                                    <Input
                                        id={"serial_number"}
                                        name={"serial_number"}
                                        type={"text"}
                                        placeholder={"Serial Number"}
                                        className={"form serialNumber"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.serial_number}
                                        touched={touched.serial_number}
                                        errors={errors.serial_number}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="buttons">
                            <button className="cancel__button">Cancel</button>
                            
                            <button className="submit__button-modal" type="submit"
                                    onClick={() => onSubmitCreateDevice(values)}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="form-wrapper-modal--mobile ">
                    <form onSubmit={handleSubmit}>
                        <div className="signUp__form--modal">
                            <div className=" form__firstname ">
                                <Input
                                    id={"name"}
                                    name={"name"}
                                    type={"text"}
                                    placeholder={"Device Name"}
                                    className={"form-modal firstName"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    touched={touched.name}
                                    errors={errors.name}
                                />
                            </div>
                            
                            <div className=" form__lastname">
                                <Input
                                    id={"device_type"}
                                    name={"device_type"}
                                    type={"text"}
                                    placeholder={"Device Type"}
                                    className={"form-modal lastName"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.device_type}
                                    touched={touched.device_type}
                                    errors={errors.device_type}
                                />
                            </div>
                            
                            <div className=" form__email-modal ">
                                <Input
                                    id={"email"}
                                    name={"email"}
                                    type={"email"}
                                    placeholder={"Email"}
                                    className={"form-modal email"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    touched={touched.email}
                                    errors={errors.email}
                                />
                            </div>
                            
                            <div className=" form__adress-modal ">
                                <Input
                                    id={"address"}
                                    name={"address"}
                                    type={"text"}
                                    placeholder={"Address"}
                                    className={"form-modal adress"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    touched={touched.address}
                                    errors={errors.address}
                                />
                            </div>
                            
                            <div className=" form__country ">
                                <Input
                                    id={"country"}
                                    name={"country"}
                                    type={"text"}
                                    placeholder={"Country"}
                                    className={"form-modal country"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    touched={touched.country}
                                    errors={errors.country}
                                />
                            </div>
                            
                            <div className=" form__town ">
                                <Input
                                    id={"city"}
                                    name={"city"}
                                    type={"text"}
                                    placeholder={"City"}
                                    className={"form-modal town"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    touched={touched.city}
                                    errors={errors.city}
                                />
                            </div>
                            <div className=" form__town ">
                                <Input
                                    id={"serial_number"}
                                    name={"serialNumber"}
                                    type={"text"}
                                    placeholder={"Serial Number"}
                                    className={"form-modal town"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.serial_number}
                                    touched={touched.serial_number}
                                    errors={errors.serial_number}
                                />
                            </div>
                        </div>
                        
                        <div className="buttons">
                            <button className="cancel__button" onClick={() => setCreateDeviceActive(false)}>
                                Cancel
                            </button>
                            
                            <button className="submit__button-modal" type="submit"
                                    onClick={() => onSubmitCreateDevice(values)}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </ModalFunction>
            
            <ModalFunction
                active={deleteDeviceActive}
                setActive={setDeleteDeviceActive}
                activeClassName={" modal-delete active"}
                className={"modal-delete"}
            >
                <p className="modal-delete__text">Are you sure you want to delete?</p>
                <div className="buttons-delete">
                    <button className="cancel__button cancel__button-delete"
                            onClick={() => setDeleteDeviceActive(false)}>
                        Cancel
                    </button>
                    
                    <button className="submit__button-modal submit__button-modal-delete" onClick={deleteDevice}>
                        OK
                    </button>
                </div>
            </ModalFunction>
            
            <ModalFunction
                active={editDeviceActive}
                setActive={setEditDeviceActive}
                activeClassName={"modal__content active"}
                className={"modal__content"}
            >
                <div className="modal__top">
                    <h3 className="form-wrapper-modal__title">Edit Device</h3>
                    <span className="cross__wrapper" onClick={() => setEditDeviceActive(false)}>
                        <img src="icons/system-uicons_cross.svg" alt="cross"/>
                    </span>
                
                </div>
                
                <div className="form-wrapper-modal ">
                    <form onSubmit={handleSubmit}>
                        <div className="signUp__form--modal">
                            <div className="left__form--modal">
                                <div className=" form__firstname ">
                                    <Input
                                        id={"name"}
                                        name={"name"}
                                        type={"text"}
                                        placeholder={"Device Name"}
                                        className={"form firstName"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        touched={touched.name}
                                        errors={errors.name}
                                    />
                                </div>
                                
                                <div className=" form__email ">
                                    <Input
                                        id={"email"}
                                        name={"email"}
                                        type={"email"}
                                        placeholder={"Email"}
                                        className={"form email"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        touched={touched.email}
                                        errors={errors.email}
                                    />
                                </div>
                                
                                <div className=" form__country ">
                                    <Input
                                        id={"country"}
                                        name={"country"}
                                        type={"text"}
                                        placeholder={"Country"}
                                        className={"form country"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.country}
                                        touched={touched.country}
                                        errors={errors.country}
                                    />
                                </div>
                                
                                <div className=" form__adress ">
                                    <Input
                                        id={"address"}
                                        name={"address"}
                                        type={"text"}
                                        placeholder={"Address"}
                                        className={"form adress"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}
                                        touched={touched.address}
                                        errors={errors.address}
                                    />
                                </div>
                            </div>
                            
                            <div className="right__form--modal">
                                <div className=" form__lastname">
                                    <Input
                                        id={"device_type"}
                                        name={"device_type"}
                                        type={"text"}
                                        placeholder={"Device Type"}
                                        className={"form lastName"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.device_type}
                                        touched={touched.device_type}
                                        errors={errors.device_type}
                                    />
                                </div>
                                
                                <div className=" form__town ">
                                    <Input
                                        id={"city"}
                                        name={"city"}
                                        type={"text"}
                                        placeholder={"City"}
                                        className={"form town"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                        touched={touched.city}
                                        errors={errors.city}
                                    />
                                </div>
                                <div className=" form__serialNumber ">
                                    <Input
                                        id={"serial_number"}
                                        name={"serial_number"}
                                        type={"text"}
                                        placeholder={"Serial Number"}
                                        className={"form serialNumber"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.serial_number}
                                        touched={touched.serial_number}
                                        errors={errors.serial_number}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="buttons">
                            <button className="cancel__button">Cancel</button>
                            
                            <button className="submit__button-modal" type="submit"
                                    onClick={() => onSubmitEditDevice(values)}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="form-wrapper-modal--mobile ">
                    <form onSubmit={handleSubmit}>
                        <div className="signUp__form--modal">
                            <div className=" form__firstname ">
                                <Input
                                    id={"name"}
                                    name={"name"}
                                    type={"text"}
                                    placeholder={"Device Name"}
                                    className={"form-modal firstName"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    touched={touched.name}
                                    errors={errors.name}
                                />
                            </div>
                            
                            <div className=" form__lastname">
                                <Input
                                    id={"device_type"}
                                    name={"device_type"}
                                    type={"text"}
                                    placeholder={"Device Type"}
                                    className={"form-modal lastName"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.device_type}
                                    touched={touched.device_type}
                                    errors={errors.device_type}
                                />
                            </div>
                            
                            <div className=" form__email-modal ">
                                <Input
                                    id={"email"}
                                    name={"email"}
                                    type={"email"}
                                    placeholder={"Email"}
                                    className={"form-modal email"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    touched={touched.email}
                                    errors={errors.email}
                                />
                            </div>
                            
                            <div className=" form__adress-modal ">
                                <Input
                                    id={"address"}
                                    name={"address"}
                                    type={"text"}
                                    placeholder={"Address"}
                                    className={"form-modal adress"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    touched={touched.address}
                                    errors={errors.address}
                                />
                            </div>
                            
                            <div className=" form__country ">
                                <Input
                                    id={"country"}
                                    name={"country"}
                                    type={"text"}
                                    placeholder={"Country"}
                                    className={"form-modal country"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    touched={touched.country}
                                    errors={errors.country}
                                />
                            </div>
                            
                            <div className=" form__town ">
                                <Input
                                    id={"city"}
                                    name={"city"}
                                    type={"text"}
                                    placeholder={"City"}
                                    className={"form-modal town"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    touched={touched.city}
                                    errors={errors.city}
                                />
                            </div>
                            <div className=" form__town ">
                                <Input
                                    id={"serial_number"}
                                    name={"serial_number"}
                                    type={"text"}
                                    placeholder={"Serial Number"}
                                    className={"form-modal town"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.serial_number}
                                    touched={touched.serial_number}
                                    errors={errors.serial_number}
                                />
                            </div>
                        </div>
                        
                        <div className="buttons">
                            <button className="cancel__button">Cancel</button>
                            
                            <button className="submit__button-modal" type="submit"
                                    onClick={() => onSubmitEditDevice(values)}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </ModalFunction>
            
            <ModalFunction
                active={deviceDetailsActive}
                setActive={setDeviceDetailsActive}
                activeClassName={"modal__content active"}
                className={"modal__content"}
            >
                <p className="page-details-text">About device</p>
                {selectedDevice.map((data: any) => (
                    <div className="page-details__wrapper">
                        <div className="page-details__icon">
                            <img className="page-details__img" src="/img/image 5.jpg" alt="avatar"/>
                        </div>
                        <div className="page-details__data">
                            <div className="personal-details__titles">
                                <p className="personal-details__title">Serial number</p>
                                <p className="personal-details__title">Device Type</p>
                                <p className="personal-details__title">Name</p>
                                <p className="personal-details__title ">Email</p>
                                <p className="personal-details__title">Country</p>
                                <p className="personal-details__title">City</p>
                                <p className="personal-details__title">Address</p>
                            </div>
                            
                            <div className="personal-details__information">
                                <p className="personal-details__info">{data.serial_number}</p>
                                <p className="personal-details__info">{data.device_type}</p>
                                <p className="personal-details__info personal-details__desktop-email">{data.email}</p>
                                <p className="personal-details__info personal-details__mobile-email">{data.email}</p>
                                <p className="personal-details__info">{data.name}</p>
                                <p className="personal-details__info">{data.country}</p>
                                <p className="personal-details__info">{data.city}</p>
                                <p className="personal-details__info ">{data.address}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </ModalFunction>
            
            <div className="grid-function">
                <div className="grid__dropdown">
                    <span className="dropdown__label">Data Size</span>
                    <select
                        name="pagination"
                        className="data-pagination"
                        onChange={(e) => onPaginationChange(Number(e.target.value))}
                    >
                        <option value="10" className="date-pagination__option">
                            10 Rows
                        </option>
                        <option value="25" className="date-pagination__option">
                            25 Rows
                        </option>
                        <option value="50" className="date-pagination__option">
                            50 Rows
                        </option>
                        <option value="100" className="date-pagination__option">
                            100 Rows
                        </option>
                    </select>
                </div>
                <div className="grid-buttons">
                    <button className="users-grid__button" onClick={() => openDeviceModal("Device Creation")}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_add.svg" alt="add user"/>
            </span>
                    </button>
                    <button className="users-grid__button" onClick={() => setDeleteDeviceActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_delete-outline.svg" alt="delete user"/>
            </span>
                    </button>
                    <button className="users-grid__button" onClick={() => openDeviceModal("Edit Device")}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_edit-outline.svg" alt="edit user"/>
            </span>
                    </button>
                    <button className="users-grid__button" onClick={() => setDeviceDetailsActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/openmoji_details.svg" alt="user details"/>
            </span>
                    </button>
                </div>
            </div>
            <div className="ag-theme-alpine" style={{height : "500px", marginTop : "40px"}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection="multiple"
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    onRowSelected={getSelectedRows}
                />
            </div>
        </div>
    );
};
export const Devices = observer(DevicesComponent);
