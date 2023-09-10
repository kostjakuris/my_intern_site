import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Users.css";
import "./ModalCreate.min.css";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { HookData } from "../input/inputVariables";
import { AddGridData } from "../input/inputVariables";
import ModalFunction from "../modal-function/ModalFunction";
import ModalProfile from "../modal-function/ModalProfile";
import UsersAdditionalGrid from "./UsersAdditionalGrid";
import axios from "axios";
import { useAppSelector } from "../../Hook";
import { useAppDispatch } from "../../Hook";
import { createUser } from "../../store/auth/opetations";
import { ValuesData } from "../input/inputVariables";

type GridData = {
  headerName?: string;
  field?: string;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  rowGroupPanelShow?: string;
};

type ResponseData = {
  id?: number | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  role: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  created_at: string | null;
  updated_at: string | null;
};

const Users = ({ ...props }: HookData, { ...propses }: AddGridData) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.auth.user);
  const users: ResponseData = {
    id: null,
    name: null,
    surname: null,
    email: null,
    role: null,
    country: null,
    city: null,
    address: null,
    created_at: null,
    updated_at: null,
  };

  const userValues: ValuesData = {
    name: null,
    surname: null,
    email: null,
    country: null,
    city: null,
    password: null,
    address: null,
    role: null,
    phone_number: "098765434",
  };

  const setName = (value: string) => (userValues.name = value);
  const setSurname = (value: string) => (userValues.surname = value);
  const setEmail = (value: string) => (userValues.email = value);
  const setCountry = (value: string) => (userValues.country = value);
  const setCity = (value: string) => (userValues.city = value);
  const setPassword = (value: string) => (userValues.password = value);
  const setAddress = (value: string) => (userValues.address = value);
  const setRole = (value: string) => (userValues.role = value);

  const [createActive, setCreateActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const [detailsActive, setDetailsActive] = useState(false);
  const [editUserActive, setEditUserActive] = useState(false);

  function changeState() {
    if (props.signActive) {
      props.setSignActive(false);
    }
    if (props.navActive) {
      props.setNavActive(false);
    }
  }

  const gridRef = useRef<AgGridReact>(null);

  const [columnDefs, setColumnDefs] = useState<GridData[]>([
    { headerName: "Name", field: "name", checkboxSelection: true, headerCheckboxSelection: true },
    { headerName: "Surname", field: "surname" },
    { headerName: "Email", field: "email" },
    { headerName: "Role", field: "role" },
    { headerName: "Country", field: "country" },
    { headerName: "City", field: "city" },
    { headerName: "Address", field: "address" },
    { headerName: "Created at", field: "created_at" },
    { headerName: "Updated at", field: "updated_at" },
  ]);
  async function onCreateUserSubmit() {
    await dispatch(createUser(userValues));
  }

  const [rowData, setRowData] = useState<GridData[]>();
  const [selectedData, setSelectedData] = useState<any>([
    {
      name: "",
      surname: "",
      email: "",
      phone_number: "",
      role: "",
      avatar: "",
      country: "",
      city: "",
      address: "",
    },
  ]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
      floatingFilter: true,
      resizable: true,
    }),
    []
  );

  useEffect(() => {
    axios
      .get("http://intern-project-backend.atwebpages.com/api/users")
      .then((response) => {
        if (Array.isArray(response.data.users)) {
          setRowData(response.data.users);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // const createOneUser = useCallback(() => {
  //   const newUser = onSubmit();
  //   values = [newUser, ...values];
  //   setRowData(values);
  // }, []);

  const onPaginationChange = useCallback((pageSize: number) => {
    gridRef.current?.api.paginationSetPageSize(pageSize);
  }, []);

  const getSelectedRows = useCallback(() => {
    const selectedRows = gridRef.current?.api.getSelectedRows();

    if (selectedRows) {
      const updatedSelectedData = selectedRows.map((selectedData) => ({
        name: selectedData.name,
        surname: selectedData.surname,
        email: selectedData.email,
        phone_number: selectedData.phone_number,
        role: selectedData.role,
        avatar: selectedData.avatar,
        country: selectedData.country,
        city: selectedData.city,
        address: selectedData.address,
      }));
      setSelectedData(updatedSelectedData);
    }
  }, []);

  return (
    <div className="users-grid" onClick={() => changeState()}>
      <ModalFunction
        active={createActive}
        setActive={setCreateActive}
        activeClassName={"modal__content active"}
        className={"modal__content"}
      >
        <ModalProfile
          active={createActive}
          setActive={setCreateActive}
          activeClassName={"modal__content active"}
          title={"User creation"}
          setName={setName}
          setSurname={setName}
          setEmail={setName}
          setCountry={setName}
          setCity={setName}
          setPassword={setName}
          setAddress={setName}
          setRole={setRole}
          onCreateUserSubmit={onCreateUserSubmit}
        ></ModalProfile>
      </ModalFunction>

      <ModalFunction
        active={deleteActive}
        setActive={setDeleteActive}
        activeClassName={" modal-delete active"}
        className={"modal-delete"}
      >
        <p className="modal-delete__text">Are you sure you want to delete?</p>
        <div className="buttons-delete">
          <button className="cancel__button cancel__button-delete" onClick={() => setDeleteActive(false)}>
            Cancel
          </button>

          <button className="submit__button-modal submit__button-modal-delete">OK</button>
        </div>
      </ModalFunction>

      <ModalFunction
        active={editUserActive}
        setActive={setEditUserActive}
        activeClassName={"modal__content active"}
        className={"modal__content"}
      >
        {/* <ModalProfile
          active={editUserActive}
          setActive={setEditUserActive}
          activeClassName={"modal__content active"}
          title={"Edit user"}
        ></ModalProfile> */}
      </ModalFunction>

      <ModalFunction
        active={propses.addGridActive}
        setActive={propses.setAddGridActive}
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
                    <img className="page-details__img" src={data.avatar} alt="avatar" />
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
                        <p className="personal-details__title">Adress</p>
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
                      <img className="page-details__first-img" src={data.avatar} alt="avatar" />
                    </div>
                    <div className="page-details__first-data">
                      <div className="personal-details__titles">
                        <p className="personal-details__title">Name</p>
                        <p className="personal-details__title">Surname</p>
                        <p className="personal-details__title">Email</p>
                        <p className="personal-details__title ">Phone number</p>
                        <p className="personal-details__title">Country</p>
                        <p className="personal-details__title">Town</p>
                        <p className="personal-details__title">Adress</p>
                      </div>

                      <div className="personal-details__information">
                        <p className="personal-details__info">{data.name}</p>
                        <p className="personal-details__info">{data.surname}</p>
                        <p className="personal-details__info personal-details__desktop-email">{data.email}</p>
                        <p className="personal-details__info personal-details__mobile-email">{data.email}</p>
                        <p className="personal-details__info">{data.phone_number}</p>
                        <p className="personal-details__info">{data.country}</p>
                        <p className="personal-details__info">{data.town}</p>
                        <p className="personal-details__info ">{data.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="page-details__first-wrapper">
                    <p className="page-details-text page-details-title page-details_media-text">
                      About regional administrator
                    </p>
                    <div className="page-details__first-icon">
                      <img className="page-details__first-img" src={data.avatar} alt="avatar" />
                    </div>
                    <div className="page-details__first-data">
                      <div className="personal-details__titles">
                        <p className="personal-details__title">Name</p>
                        <p className="personal-details__title">Surname</p>
                        <p className="personal-details__title">Email</p>
                        <p className="personal-details__title ">Phone number</p>
                        <p className="personal-details__title">Country</p>
                        <p className="personal-details__title">Town</p>
                        <p className="personal-details__title">Adress</p>
                      </div>

                      <div className="personal-details__information">
                        <p className="personal-details__info">{data.name}</p>
                        <p className="personal-details__info">{data.surname}</p>
                        <p className="personal-details__info personal-details__desktop-email">{data.email}</p>
                        <p className="personal-details__info personal-details__mobile-email">{data.email}</p>
                        <p className="personal-details__info">{data.phone_number}</p>
                        <p className="personal-details__info">{data.country}</p>
                        <p className="personal-details__info">{data.town}</p>
                        <p className="personal-details__info ">{data.address}</p>
                      </div>
                    </div>
                  </div>
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
          <button className="users-grid__button" onClick={() => setCreateActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_add.svg" alt="add user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setDeleteActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_delete-outline.svg" alt="delete user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setEditUserActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_edit-outline.svg" alt="edit user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setDetailsActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/openmoji_details.svg" alt="user details" />
            </span>
          </button>
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ height: "500px", marginTop: "40px" }}>
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
