import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Users.css";
import "./ModalCreate.min.css";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { HookData } from "../input/inputVariables";
import ModalFunction from "../modal-function/ModalFunction";
import ModalProfile from "../modal-function/ModalProfile";
import { FormData } from "../input/inputVariables";
import { EditUserSchema } from "../input/EditUserValidation";
import { useFormik } from "formik";
import UsersAdditionalGrid from "./UsersAdditionalGrid";
import Input from "../input/Input";
import Select from "../input/Select";

type GridData = {
  headerName?: string;
  field?: string;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  rowGroupPanelShow?: string;
};

const Users = ({ ...props }: HookData) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      country: "",
      city: "",
      password: "",
      address: "",
      role: "",
    },
    validationSchema: EditUserSchema,
    onSubmit: (values: FormData, actions) => {
      console.log(values);
      createOneUser();
      onSubmit();
      actions.resetForm();
    },
  });

  const [createActive, setCreateActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const [detailsActive, setDetailsActive] = useState(false);
  const [editUserActive, setEditUserActive] = useState(false);
  const [addGridActive, setAddGridActive] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

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
    { headerName: "Adress", field: "adress" },
    { headerName: "Created at", field: "created_at" },
    { headerName: "Updated at", field: "updated_at" },
  ]);
  function onSubmit() {
    let newUser = {
      name: formik.values.name,
      surname: formik.values.surname,
      email: formik.values.email,
      role: formik.values.role,
      country: formik.values.country,
      city: formik.values.city,
      adress: formik.values.address,
      created_at: formik.values.address,
      updated_at: formik.values.address,
    };
    enableAddGrid();
    return newUser;
  }

  let values = [...new Array(0)].map(() => onSubmit());
  const [rowData, setRowData] = useState(values);

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
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const createOneUser = useCallback(() => {
    const newUser = onSubmit();
    values = [newUser, ...values];
    setRowData(values);
  }, []);

  const onPaginationChange = useCallback((pageSize: number) => {
    gridRef.current?.api.paginationSetPageSize(pageSize);
  }, []);

  const enableAddGrid = async () => {
    if (formik.values.role == "Super admin") {
      setAddGridActive(true);
    }
  };

  return (
    <div className="users-grid" onClick={() => changeState()}>
      <ModalFunction
        active={createActive}
        setActive={setCreateActive}
        activeClassName={"modal__content active"}
        className={"modal__content"}
      >
        <div className="modal__top">
          <h3 className="form-wrapper-modal__title">User Creation</h3>
          <span className="cross__wrapper" onClick={() => setCreateActive(false)}>
            <img src="icons/system-uicons_cross.svg" alt="cross" />
          </span>
        </div>

        <div className="form-wrapper-modal ">
          <form onSubmit={formik.handleSubmit}>
            <div className="signUp__form--modal">
              <div className="left__form--modal">
                <div className=" form__firstname ">
                  <Input
                    id={"firstname"}
                    name={"firstname"}
                    type={"text"}
                    placeholder={"Firstname"}
                    className={"form firstName"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    touched={formik.touched.name}
                    errors={formik.errors.name}
                  />
                </div>

                <div className=" form__email ">
                  <Input
                    id={"email"}
                    name={"email"}
                    type={"email"}
                    placeholder={"Email"}
                    className={"form email"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    touched={formik.touched.email}
                    errors={formik.errors.email}
                  />
                </div>

                <div className=" form__country ">
                  <Input
                    id={"country"}
                    name={"country"}
                    type={"text"}
                    placeholder={"Country"}
                    className={"form country"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                    touched={formik.touched.country}
                    errors={formik.errors.country}
                  />
                </div>

                <div className=" form__adress ">
                  <Input
                    id={"adress"}
                    name={"adress"}
                    type={"text"}
                    placeholder={"Adress"}
                    className={"form adress"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    touched={formik.touched.address}
                    errors={formik.errors.address}
                  />
                </div>
              </div>

              <div className="right__form--modal">
                <div className=" form__lastname">
                  <Input
                    id={"lastname"}
                    name={"lastname"}
                    type={"text"}
                    placeholder={"Lastname"}
                    className={"form lastName"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.surname}
                    touched={formik.touched.surname}
                    errors={formik.errors.surname}
                  />
                </div>

                <div className=" form__password ">
                  <Input
                    id={"password"}
                    name={"password"}
                    type={hidePassword ? "text" : "password"}
                    placeholder={"Password"}
                    className={"form password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    touched={formik.touched.password}
                    errors={formik.errors.password}
                  />
                  <span
                    className={hidePassword ? "hiding__icon-modal disabled" : "hiding__icon-modal"}
                    onClick={() => setHidePassword((prev) => !prev)}
                  >
                    <img src="img/mdi_eye.jpg" alt="eye" />
                  </span>
                </div>

                <div className=" form__town ">
                  <Input
                    id={"town"}
                    name={"town"}
                    type={"text"}
                    placeholder={"Town"}
                    className={"form town"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    touched={formik.touched.city}
                    errors={formik.errors.city}
                  />
                </div>

                <div className=" form__select--desktop ">
                  <Select
                    id={"role"}
                    name={"role"}
                    type={"text"}
                    placeholder={"Role"}
                    className={"form role"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                    touched={formik.touched.role}
                    errors={formik.errors.role}
                  >
                    <option value="" disabled selected className="date-pagination__option">
                      Role
                    </option>
                    <option value="Customer" className="date-pagination__option">
                      Customer
                    </option>
                    <option value="Device owner" className="date-pagination__option">
                      Device owner
                    </option>
                    <option value="Regional admin" className="date-pagination__option">
                      Regional admin
                    </option>
                    <option value="Super admin" className="date-pagination__option">
                      Super admin
                    </option>
                  </Select>
                </div>
              </div>
            </div>

            <div className="buttons">
              <button className="cancel__button">Cancel</button>

              <button className="submit__button-modal" type="submit" onClick={() => enableAddGrid}>
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="form-wrapper-modal--mobile ">
          <form onSubmit={formik.handleSubmit}>
            <div className="signUp__form--modal">
              <div className=" form__firstname ">
                <Input
                  id={"firstname"}
                  name={"firstname"}
                  type={"text"}
                  placeholder={"Firstname"}
                  className={"form-modal firstName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  touched={formik.touched.name}
                  errors={formik.errors.name}
                />
              </div>

              <div className=" form__lastname">
                <Input
                  id={"lastname"}
                  name={"lastname"}
                  type={"text"}
                  placeholder={"Lastname"}
                  className={"form-modal lastName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surname}
                  touched={formik.touched.surname}
                  errors={formik.errors.surname}
                />
              </div>

              <div className=" form__email-modal ">
                <Input
                  id={"email"}
                  name={"email"}
                  type={"email"}
                  placeholder={"Email"}
                  className={"form-modal email"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  touched={formik.touched.email}
                  errors={formik.errors.email}
                />
              </div>

              <div className=" form__adress-modal ">
                <Input
                  id={"adress"}
                  name={"adress"}
                  type={"text"}
                  placeholder={"Adress"}
                  className={"form-modal adress"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  touched={formik.touched.address}
                  errors={formik.errors.address}
                />
              </div>

              <div className=" form__password-modal ">
                <Input
                  id={"password"}
                  name={"password"}
                  type={hidePassword ? "text" : "password"}
                  placeholder={"Password"}
                  className={"form-modal password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  touched={formik.touched.password}
                  errors={formik.errors.password}
                />
                <span
                  className={hidePassword ? "hiding__icon-modal disabled" : "hiding__icon-modal"}
                  onClick={() => setHidePassword((prev) => !prev)}
                >
                  <img src="img/mdi_eye.jpg" alt="eye" />
                </span>
              </div>

              <div className=" form__country ">
                <Input
                  id={"country"}
                  name={"country"}
                  type={"text"}
                  placeholder={"Country"}
                  className={"form-modal country"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  touched={formik.touched.country}
                  errors={formik.errors.country}
                />
              </div>

              <div className=" form__town ">
                <Input
                  id={"town"}
                  name={"town"}
                  type={"text"}
                  placeholder={"Town"}
                  className={"form-modal town"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  touched={formik.touched.city}
                  errors={formik.errors.city}
                />
              </div>

              <div className=" form__select ">
                <Select
                  id={"role"}
                  name={"role"}
                  type={"text"}
                  placeholder={"Role"}
                  className={"form-modal role"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  touched={formik.touched.role}
                  errors={formik.errors.role}
                >
                  <option value="" disabled selected className="date-pagination__option">
                    Role
                  </option>
                  <option value="Customer" className="date-pagination__option">
                    Customer
                  </option>
                  <option value="Device owner" className="date-pagination__option">
                    Device owner
                  </option>
                  <option value="Regional admin" className="date-pagination__option">
                    Regional admin
                  </option>
                  <option value="Super admin" className="date-pagination__option">
                    Super admin
                  </option>
                </Select>
              </div>
            </div>
            <div className="buttons">
              <button className="cancel__button" onClick={() => setCreateActive(false)}>
                Cancel
              </button>

              <button className="submit__button-modal" type="submit">
                Save
              </button>
            </div>
          </form>
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
        <ModalProfile
          active={editUserActive}
          setActive={setEditUserActive}
          activeClassName={"modal__content active"}
        ></ModalProfile>
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
        <p className="page-details-text">About user</p>
        <div className="page-details__wrapper">
          <div className="page-details__icon">
            <img className="page-details__img" src="icons/carbon_user-avatar-filled-alt.svg" alt="avatar" />
          </div>
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
              <p className="personal-details__info">Valentin</p>
              <p className="personal-details__info">Kravchenko</p>
              <p className="personal-details__info personal-details__desktop-email">example@gmail.com</p>
              <p className="personal-details__info personal-details__mobile-email">example @gmail.com</p>
              <p className="personal-details__info">069567830</p>
              <p className="personal-details__info">Ukraine</p>
              <p className="personal-details__info">Zaporozhye</p>
              <p className="personal-details__info ">Zaporojskaya street 16</p>
            </div>
          </div>
        </div>

        {/* <div className="page-details__container">
          <div className="page-details__first-wrapper">
            <p className="page-details-text page-details_media-text">About user</p>
            <div className="page-details__first-icon page-details__second-icon">
              <img className="page-details__first-img" src={avatarIcon} alt="avatar" />
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
                <p className="personal-details__info">Valentin</p>
                <p className="personal-details__info">Kravchenko</p>
                <p className="personal-details__info personal-details__desktop-email">example@gmail.com</p>
                <p className="personal-details__info personal-details__mobile-email">example @gmail.com</p>
                <p className="personal-details__info">069567830</p>
                <p className="personal-details__info">Ukraine</p>
                <p className="personal-details__info">Zaporozhye</p>
                <p className="personal-details__info ">Zaporojskaya street 16</p>
              </div>
            </div>
          </div>
          <div className="page-details__first-wrapper">
            <p className="page-details-text page-details-title page-details_media-text">About regional administrator</p>
            <div className="page-details__first-icon">
              <img className="page-details__first-img" src={avatarIcon} alt="avatar" />
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
                <p className="personal-details__info">Valentin</p>
                <p className="personal-details__info">Kravchenko</p>
                <p className="personal-details__info personal-details__desktop-email">example@gmail.com</p>
                <p className="personal-details__info personal-details__mobile-email">example @gmail.com</p>
                <p className="personal-details__info">069567830</p>
                <p className="personal-details__info">Ukraine</p>
                <p className="personal-details__info">Zaporozhye</p>
                <p className="personal-details__info ">Zaporojskaya street 16</p>
              </div>
            </div>
          </div>
        </div> */}
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
          rowData={rowData}
          animateRows={true}
          columnDefs={columnDefs}
          rowSelection="multiple"
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};
export default Users;
