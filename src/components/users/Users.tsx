import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Users.css";
import "./ModalCreate.min.css";
import React, {useState, useMemo, useEffect, useRef, useCallback} from "react";
import {CreateUserGridData, HookData} from "../input/inputVariables";
import ModalFunction from "../modal-function/ModalFunction";
import UsersAdditionalGrid from "./UsersAdditionalGrid";
import {useAppSelector} from "../../Hook";
import {useAppDispatch} from "../../Hook";
import {createUser, editGridUser, getUsers} from "../../store/auth/opetations";
import {ValuesData} from "../input/inputVariables";
import {deleteUser as deleteUserAction} from "../../store/auth/opetations";
import {useFormik} from "formik";
import {ModalCreateSchema} from "../input/ModalCreateValidation";
import Input from "../input/Input";
import Select from "../input/Select";

type GridData = {
    headerName?: string;
    field?: string;
    checkboxSelection?: boolean;
    headerCheckboxSelection?: boolean;
    rowGroupPanelShow?: string;
};


const Users = ({...props}: HookData) => {
    const [addGridActive, setAddGridActive] = useState(false);
    const [adminData, setAdminData] = useState<any>([
        {
            name : "",
            surname : "",
            email : "",
            phone_number : "",
            role : "",
            avatar : "",
            country : "",
            city : "",
            address : "",
        }
    ]);
    
    
    const [hidePassword, setHidePassword] = useState(false);
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : {
            name : "",
            surname : "",
            email : "",
            country : "",
            city : "",
            password : "",
            address : "",
            role : "",
            phone_number : "3 (554) 123-4517",
        },
        validationSchema : ModalCreateSchema,
        onSubmit : async (values: CreateUserGridData) => {
        },
    });
    const dispatch = useAppDispatch();
    const usersArray = useAppSelector((state) => state.auth.users);
    const userRole = useAppSelector((state) => state.auth.user.role);
    const user = useAppSelector((state) => state.auth.user);
    const userValues: ValuesData = {
        name : null,
        surname : null,
        email : null,
        country : null,
        city : null,
        password : null,
        address : null,
        role : null,
        phone_number : "098765434",
    };
    
    const [createActive, setCreateActive] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);
    const [detailsActive, setDetailsActive] = useState(false);
    const [editUserActive, setEditUserActive] = useState(false);
    
    
    async function onSubmitEditUser (values: CreateUserGridData) {
        const getSelectedNodes = gridRef.current?.api.getSelectedNodes();
        if (getSelectedNodes) {
            getSelectedNodes.forEach((selectedData) => {
                dispatch(editGridUser({...values, id : selectedData.data.id}));
            });
        }
    }
    
    async function onSubmitCreateUser (values: CreateUserGridData) {
        if (values.role == "owner") {
            dispatch(createUser({...values, administrator_id : user.id}));
            
        } else {
            dispatch(createUser(values));
        }
        enableAddGrid();
    }
    
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
        {headerName : "Name", field : "name", checkboxSelection : true, headerCheckboxSelection : true},
        {headerName : "Surname", field : "surname"},
        {headerName : "Email", field : "email"},
        {headerName : "Role", field : "role"},
        {headerName : "Country", field : "country"},
        {headerName : "City", field : "city"},
        {headerName : "Address", field : "address"},
        {headerName : "Created at", field : "created_at"},
        {headerName : "Updated at", field : "updated_at"},
    ]);
    
    const [rowData, setRowData] = useState<GridData[]>();
    const [selectedData, setSelectedData] = useState<any>([
        {
            name : "",
            surname : "",
            email : "",
            phone_number : "",
            role : "",
            avatar : "",
            country : "",
            city : "",
            address : "",
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
    
    const deleteUser = useCallback(() => {
        const getSelectedNodes = gridRef.current?.api.getSelectedNodes();
        if (getSelectedNodes) {
            getSelectedNodes.forEach((selectedData) => {
                dispatch(deleteUserAction(selectedData.data.id));
            });
        }
    }, []);
    
    
    const onPaginationChange = useCallback((pageSize: number) => {
        gridRef.current?.api.paginationSetPageSize(pageSize);
    }, []);
    
    const getSelectedRows = useCallback(() => {
        const selectedRows = gridRef.current?.api.getSelectedRows();
        
        if (selectedRows) {
            const updatedSelectedData = selectedRows.map((selectedData) => ({
                name : selectedData.name,
                surname : selectedData.surname,
                email : selectedData.email,
                phone_number : selectedData.phone_number,
                role : selectedData.role,
                avatar : selectedData.avatar,
                country : selectedData.country,
                city : selectedData.city,
                address : selectedData.address,
            }));
            setSelectedData(updatedSelectedData);
        }
    }, []);
    
    useEffect(() => {
        if (userRole == "admin" || userRole == "regional_admin") {
            dispatch(getUsers())
                .then(() => {
                    if (Array.isArray(usersArray)) {
                        console.log(usersArray);
                        setRowData(usersArray);
                        
                        const filteredUser = usersArray.filter(
                            (data) => data.role == "regional_admin");
                        
                        
                        const updatedFilteredUser = filteredUser.map((selectedData) => ({
                            name : selectedData.name,
                            surname : selectedData.surname,
                            email : selectedData.email,
                            phone_number : selectedData.phone_number,
                            role : selectedData.role,
                            avatar : selectedData.avatar,
                            country : selectedData.country,
                            city : selectedData.city,
                            address : selectedData.address,
                        }));
                        setAdminData(updatedFilteredUser);
                    }
                });
        }
    }, []);
    
    function openModal (title: string) {
        if (title == "User Creation") {
            setCreateActive(true);
        }
        if (title == "Edit user") {
            setEditUserActive(true);
        }
    }
    
    const enableAddGrid = () => {
        if (values.role == "owner") {
            setAddGridActive(true);
        }
    };
    
    
    return userRole !== "regional_admin" && userRole !== "admin" ? (
            <div
                className={userRole === "regional_admin" || userRole === "admin" ? "warn_message" : "warn_message disabled"}
                onClick={() => changeState()}
            >
                You don't have permission to see this page
            </div>
        ) :
        (
            <div className={userRole == "regional_admin" || "admin" ? "users-grid" : "users-grid disabled"}
                 onClick={() => changeState()}>
                <ModalFunction
                    active={createActive}
                    setActive={setCreateActive}
                    activeClassName={"modal__content active"}
                    className={"modal__content"}
                >
                    <div>
                        <div className="modal__top">
                            
                            <h3 className="form-wrapper-modal__title">User Creation</h3>
                            <span className="cross__wrapper" onClick={() => setCreateActive(false)}>
                                <img src="icons/system-uicons_cross.svg" alt="cross"/>
                            </span>
                        
                        </div>
                        
                        <div className="form-wrapper-modal">
                            <div className="form-wrapper-warn__message">
                                <p className="warn_message-info">If you are a regional admin you can create user
                                    only
                                    with the same country and city</p>
                                <p className="warn_message-info">Only regional admin can create an owner</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="signUp__form--modal">
                                    <div className="left__form--modal">
                                        <div className=" form__firstname ">
                                            <Input
                                                id={"name"}
                                                name={"name"}
                                                type={"text"}
                                                placeholder={"Firstname"}
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
                                                id={"surname"}
                                                name={"surname"}
                                                type={"text"}
                                                placeholder={"Lastname"}
                                                className={"form lastName"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.surname}
                                                touched={touched.surname}
                                                errors={errors.surname}
                                            />
                                        </div>
                                        
                                        <div className=" form__password ">
                                            <Input
                                                id={"password"}
                                                name={"password"}
                                                type={hidePassword ? "text" : "password"}
                                                placeholder={"Password"}
                                                className={"form password"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                touched={touched.password}
                                                errors={errors.password}
                                            />
                                            <span
                                                className={hidePassword ? "hiding__icon-modal disabled" :
                                                    "hiding__icon-modal"}
                                                onClick={() => setHidePassword((prev) => !prev)}
                                            >
                                                <img src="img/mdi_eye.jpg" alt="eye"/>

                                            </span>
                                        
                                        </div>
                                        
                                        <div className=" form__town ">
                                            <Input
                                                id={"city"}
                                                name={"city"}
                                                type={"text"}
                                                placeholder={"Town"}
                                                className={"form town"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.city}
                                                touched={touched.city}
                                                errors={errors.city}
                                            />
                                        </div>
                                        <div className=" form__select--desktop ">
                                            <Select
                                                id={"role"}
                                                name={"role"}
                                                type={"text"}
                                                placeholder={"Role"}
                                                className={"form role"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.role}
                                                touched={touched.role}
                                                errors={errors.role}
                                            >
                                                <option value="" disabled defaultValue={"Role"}
                                                        className="date-pagination__option">
                                                    Role
                                                </option>
                                                <option value="customer" className="date-pagination__option">
                                                    Customer
                                                </option>
                                                <option value="owner" className="date-pagination__option">
                                                    Owner
                                                </option>
                                                <option value="regional_admin" className="date-pagination__option">
                                                    Regional admin
                                                </option>
                                                <option value="admin" className="date-pagination__option">
                                                    Admin
                                                </option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="buttons">
                                    <button className="cancel__button" onClick={() => setCreateActive(false)}>
                                        Cancel
                                    </button>
                                    
                                    <button className="submit__button-modal" type="submit"
                                            onClick={() => onSubmitCreateUser(values)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="form-wrapper-modal--mobile ">
                            <div className="form-wrapper-warn__message">
                                <p className="warn_message-info">If you are a regional admin you can create user
                                    only
                                    with the same country and city</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="signUp__form--modal">
                                    <div className=" form__firstname ">
                                        <Input
                                            id={"name"}
                                            name={"name"}
                                            type={"text"}
                                            placeholder={"Firstname"}
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
                                            id={"surname"}
                                            name={"surname"}
                                            type={"text"}
                                            placeholder={"Lastname"}
                                            className={"form-modal lastName"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.surname}
                                            touched={touched.surname}
                                            errors={errors.surname}
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
                                    
                                    <div className=" form__password-modal ">
                                        <Input
                                            id={"password"}
                                            name={"password"}
                                            type={hidePassword ? "text" : "password"}
                                            placeholder={"Password"}
                                            className={"form-modal password"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            touched={touched.password}
                                            errors={errors.password}
                                        />
                                        <span
                                            className={hidePassword ? "hiding__icon-modal disabled" :
                                                "hiding__icon-modal"}
                                            onClick={() => setHidePassword((prev) => !prev)}
                                        >
                                            <img src="img/mdi_eye.jpg" alt="eye"/>
                                        </span>
                                    
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
                                            placeholder={"Town"}
                                            className={"form-modal town"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.city}
                                            touched={touched.city}
                                            errors={errors.city}
                                        />
                                    </div>
                                    
                                    <div className=" form__select ">
                                        <Select
                                            id={"role"}
                                            name={"role"}
                                            type={"text"}
                                            placeholder={"Role"}
                                            className={"form-modal role"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.role}
                                            touched={touched.role}
                                            errors={errors.role}
                                        >
                                            <option value="" disabled defaultValue={"Role"}
                                                    className="date-pagination__option">
                                                Role
                                            </option>
                                            <option value="customer" className="date-pagination__option">
                                                Customer
                                            </option>
                                            <option value="owner" className="date-pagination__option">
                                                Owner
                                            </option>
                                            <option value="regional_admin" className="date-pagination__option">
                                                Regional admin
                                            </option>
                                            <option value="admin" className="date-pagination__option">
                                                Admin
                                            </option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="cancel__button" onClick={() => setCreateActive(false)}>
                                        Cancel
                                    </button>
                                    
                                    <button className="submit__button-modal" type="submit"
                                            onClick={() => onSubmitCreateUser(values)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                
                </ModalFunction>
                
                <ModalFunction
                    active={deleteActive}
                    setActive={setDeleteActive}
                    activeClassName={" modal-delete active"}
                    className={"modal-delete"}
                >
                    <p className="modal-delete__text">Are you sure you want to delete?</p>
                    <div className="buttons-delete">
                        <button className="cancel__button cancel__button-delete"
                                onClick={() => setDeleteActive(false)}>
                            Cancel
                        </button>
                        
                        <button className="submit__button-modal submit__button-modal-delete" onClick={deleteUser}>
                            OK
                        </button>
                    </div>
                </ModalFunction>
                
                <ModalFunction
                    active={editUserActive}
                    setActive={setEditUserActive}
                    activeClassName={"modal__content active"}
                    className={"modal__content"}
                >
                    <div>
                        <div className="modal__top">
                            <h3 className="form-wrapper-modal__title">Edit user</h3>
                            <span className="cross__wrapper" onClick={() => setEditUserActive(false)}>
                                <img src="icons/system-uicons_cross.svg" alt="cross"/>
                            </span>
                        
                        </div>
                        <div className="form-wrapper-modal ">
                            <div className="form-wrapper-warn__message">
                                <p className="warn_message-info">Owner and customer can only change password,address
                                    and
                                    phone number</p>
                                <p className="warn_message-info">Regional admin can`t change email,country,town and
                                    role </p>
                                <p className="warn_message-info">Admin can change everything</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="signUp__form--modal">
                                    <div className="left__form--modal">
                                        <div className=" form__firstname ">
                                            <Input
                                                id={"name"}
                                                name={"name"}
                                                type={"text"}
                                                placeholder={"Firstname"}
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
                                                id={"surname"}
                                                name={"surname"}
                                                type={"text"}
                                                placeholder={"Lastname"}
                                                className={"form lastName"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.surname}
                                                touched={touched.surname}
                                                errors={errors.surname}
                                            />
                                        </div>
                                        
                                        <div className=" form__password ">
                                            <Input
                                                id={"password"}
                                                name={"password"}
                                                type={hidePassword ? "text" : "password"}
                                                placeholder={"Password"}
                                                className={"form password"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                touched={touched.password}
                                                errors={errors.password}
                                            />
                                            <span
                                                className={hidePassword ? "hiding__icon-modal disabled" :
                                                    "hiding__icon-modal"}
                                                onClick={() => setHidePassword((prev) => !prev)}
                                            >
                                                <img src="img/mdi_eye.jpg" alt="eye"/>
                                            </span>
                                        
                                        </div>
                                        
                                        <div className=" form__town ">
                                            <Input
                                                id={"city"}
                                                name={"city"}
                                                type={"text"}
                                                placeholder={"Town"}
                                                className={"form town"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.city}
                                                touched={touched.city}
                                                errors={errors.city}
                                            />
                                        </div>
                                        <div className=" form__select--desktop ">
                                            <Select
                                                id={"role"}
                                                name={"role"}
                                                type={"text"}
                                                placeholder={"Role"}
                                                className={"form role"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.role}
                                                touched={touched.role}
                                                errors={errors.role}
                                            >
                                                <option value="" disabled defaultValue={"Role"}
                                                        className="date-pagination__option">
                                                    Role
                                                </option>
                                                <option value="customer" className="date-pagination__option">
                                                    Customer
                                                </option>
                                                <option value="owner" className="date-pagination__option">
                                                    Owner
                                                </option>
                                                <option value="regional_admin" className="date-pagination__option">
                                                    Regional admin
                                                </option>
                                                <option value="admin" className="date-pagination__option">
                                                    Admin
                                                </option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="buttons">
                                    <button className="cancel__button" onClick={() => setEditUserActive(false)}>
                                        Cancel
                                    </button>
                                    
                                    <button className="submit__button-modal" type="submit"
                                            onClick={() => onSubmitEditUser(values)}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="form-wrapper-modal--mobile ">
                            <div className="form-wrapper-warn__message">
                                <p className="warn_message-info">Owner and customer can only change password,address
                                    and
                                    phone number</p>
                                <p className="warn_message-info">Regional admin can`t change email,country,town and
                                    role</p>
                                <p className="warn_message-info">Admin can change everything</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="signUp__form--modal">
                                    <div className=" form__firstname ">
                                        <Input
                                            id={"name"}
                                            name={"name"}
                                            type={"text"}
                                            placeholder={"Firstname"}
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
                                            id={"surname"}
                                            name={"surname"}
                                            type={"text"}
                                            placeholder={"Lastname"}
                                            className={"form-modal lastName"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.surname}
                                            touched={touched.surname}
                                            errors={errors.surname}
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
                                    
                                    <div className=" form__password-modal ">
                                        <Input
                                            id={"password"}
                                            name={"password"}
                                            type={hidePassword ? "text" : "password"}
                                            placeholder={"Password"}
                                            className={"form-modal password"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            touched={touched.password}
                                            errors={errors.password}
                                        />
                                        <span
                                            className={hidePassword ? "hiding__icon-modal disabled" :
                                                "hiding__icon-modal"}
                                            onClick={() => setHidePassword((prev) => !prev)}
                                        >
                                            <img src="img/mdi_eye.jpg" alt="eye"/>
                                        </span>
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
                                            placeholder={"Town"}
                                            className={"form-modal town"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.city}
                                            touched={touched.city}
                                            errors={errors.city}
                                        />
                                    </div>
                                    
                                    <div className=" form__select ">
                                        <Select
                                            id={"role"}
                                            name={"role"}
                                            type={"text"}
                                            placeholder={"Role"}
                                            className={"form-modal role"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.role}
                                            touched={touched.role}
                                            errors={errors.role}
                                        >
                                            <option value="" disabled defaultValue={"Role"}
                                                    className="date-pagination__option">
                                                Role
                                            </option>
                                            <option value="customer" className="date-pagination__option">
                                                Customer
                                            </option>
                                            <option value="device_owner" className="date-pagination__option">
                                                Device owner
                                            </option>
                                            <option value="regional_admin" className="date-pagination__option">
                                                Regional admin
                                            </option>
                                            <option value="super_admin" className="date-pagination__option">
                                                Super admin
                                            </option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="cancel__button" onClick={() => setEditUserActive(false)}>
                                        Cancel
                                    </button>
                                    
                                    <button className="submit__button-modal" type="submit"
                                            onClick={() => onSubmitEditUser(values)}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalFunction>
                
                <ModalFunction
                    active={addGridActive}
                    setActive={setAddGridActive}
                    activeClassName={"modal__content active"}
                    className={"modal__content"}
                >
                    <div className="modal__top">
                        <h3 className="form-wrapper-modal__title">User`s info</h3>
                    </div>
                    <UsersAdditionalGrid
                        signActive={props.signActive}
                        setSignActive={props.setSignActive}
                        navActive={props.navActive}
                        setNavActive={props.setNavActive}
                    />
                </ModalFunction>
                
                <ModalFunction
                    active={detailsActive}
                    setActive={setDetailsActive}
                    activeClassName={"modal__content active"}
                    className={"modal__content"}
                >
                    {selectedData.map((data: any) => (
                        <div className="page-details__wrapper">
                            {data.role !== "owner" ? (
                                <div className="page-container">
                                    <p className="page-details-text">About user</p>
                                    <div className="page-details__wrap">
                                        <div className="page-details__icon">
                                            <img className="page-details__img" src={data.avatar} alt="avatar"/>
                                        </div>
                                        <div className="page-details">
                                            <div className="page-details__data">
                                                <div className="personal-details__titles">
                                                    <p className="personal-details__title">Name</p>
                                                    <p className="personal-details__title">Surname</p>
                                                    <p className="personal-details__title">Email</p>
                                                    <p className="personal-details__title ">Phone number</p>
                                                    <p className="personal-details__title">Country</p>
                                                    <p className="personal-details__title">Town</p>
                                                    <p className="personal-details__title">Address</p>
                                                </div>
                                                <div className="personal-details__information">
                                                    <p className="personal-details__info">{data.name}</p>
                                                    <p className="personal-details__info">{data.surname}</p>
                                                    <p className="personal-details__info personal-details__desktop-email">{data.email}</p>
                                                    <p className="personal-details__info personal-details__mobile-email">{data.email}</p>
                                                    <p className="personal-details__info">{data.phone_number}</p>
                                                    <p className="personal-details__info">{data.country}</p>
                                                    <p className="personal-details__info">{data.city}</p>
                                                    <p className="personal-details__info ">{data.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                
                                
                                <div className="page-details__first-container">
                                    <div className="page-details__container">
                                        <div className="page-details__first-wrapper">
                                            <p className="page-details-second-text">About user</p>
                                            <div className="page-details__first-icon">
                                                <img className="page-details__first-img" src={data.avatar}
                                                     alt="avatar"/>
                                            </div>
                                            <div className="page-details__first-data">
                                                <div className="personal-details__titles">
                                                    <p className="personal-details__title">Name</p>
                                                    <p className="personal-details__title">Surname</p>
                                                    <p className="personal-details__title">Email</p>
                                                    <p className="personal-details__title ">Phone number</p>
                                                    <p className="personal-details__title">Country</p>
                                                    <p className="personal-details__title">Town</p>
                                                    <p className="personal-details__title">Address</p>
                                                </div>
                                                
                                                <div className="personal-details__information">
                                                    <p className="personal-details__info">{data.name}</p>
                                                    <p className="personal-details__info">{data.surname}</p>
                                                    <p className="personal-details__info personal-details__desktop-email">{data.email}</p>
                                                    <p className="personal-details__info personal-details__mobile-email">{data.email}</p>
                                                    <p className="personal-details__info">{data.phone_number}</p>
                                                    <p className="personal-details__info">{data.country}</p>
                                                    <p className="personal-details__info">{data.city}</p>
                                                    <p className="personal-details__info ">{data.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {adminData.map((addData: any) => (
                                            
                                            <div className="page-details__first-wrapper">
                                                <p className="page-details-text page-details-title page-details_media-text">
                                                    About regional administrator
                                                </p>
                                                <div className="page-details__first-icon">
                                                    <img className="page-details__first-img" src={addData.avatar}
                                                         alt="avatar"/>
                                                </div>
                                                <div className="page-details__first-data">
                                                    <div className="personal-details__titles">
                                                        <p className="personal-details__title">Name</p>
                                                        <p className="personal-details__title">Surname</p>
                                                        <p className="personal-details__title">Email</p>
                                                        <p className="personal-details__title ">Phone number</p>
                                                        <p className="personal-details__title">Country</p>
                                                        <p className="personal-details__title">Town</p>
                                                        <p className="personal-details__title">Address</p>
                                                    </div>
                                                    
                                                    <div className="personal-details__information">
                                                        <p className="personal-details__info">{addData.name}</p>
                                                        <p className="personal-details__info">{addData.surname}</p>
                                                        <p className="personal-details__info personal-details__desktop-email">{addData.email}</p>
                                                        <p className="personal-details__info personal-details__mobile-email">{addData.email}</p>
                                                        <p className="personal-details__info">{addData.phone_number}</p>
                                                        <p className="personal-details__info">{addData.country}</p>
                                                        <p className="personal-details__info">{addData.city}</p>
                                                        <p className="personal-details__info ">{addData.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                        <button className="users-grid__button" onClick={() => openModal("User Creation")}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_add.svg" alt="add user"/>
            </span>
                        </button>
                        <button className="users-grid__button" onClick={() => setDeleteActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_delete-outline.svg" alt="delete user"/>
            </span>
                        </button>
                        <button className="users-grid__button" onClick={() => openModal("Edit user")}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_edit-outline.svg" alt="edit user"/>
            </span>
                        </button>
                        <button className="users-grid__button" onClick={() => setDetailsActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/openmoji_details.svg" alt="user details"/>
            </span>
                        </button>
                    </div>
                </div>
                <div className="ag-theme-alpine" style={{height : "500px", marginTop : "40px"}}>
                    <AgGridReact
                        ref={gridRef}
                        columnDefs={columnDefs}
                        rowData={rowData}
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
export default Users;
