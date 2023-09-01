import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Devices.css";
import "./ModalCreate.min.css";
import { useState, useMemo } from "react";
import addUser from "../../icons/material-symbols_add.svg";
import deleteUser from "../../icons/material-symbols_delete-outline.svg";
import editUser from "../../icons/material-symbols_edit-outline.svg";
import userDetails from "../../icons/openmoji_details.svg";
import { HookData } from "../input/inputVariables";
import ModalFunction from "../modal-function/ModalFunction";
import ModalDevice from "../modal-function/ModalDevice";
import avatarIcon from "../../icons/carbon_user-avatar-filled-alt.svg";
import { DeviceFormData } from "../input/inputVariables";
import { EditUserSchema } from "../input/EditUserValidation";
import { useFormik } from "formik";
import Input from "../input/Input";
import cross from "../../icons/system-uicons_cross.svg";

type GridData = {
  headerName?: string;
  field?: string;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  rowGroupPanelShow?: string;
};

const Users = ({ ...props }: HookData) => {
  const formik = useFormik<DeviceFormData>({
    initialValues: {
      deviceName: "",
      deviceType: "",
      email: "",
      country: "",
      city: "",
      adress: "",
    },
    validationSchema: EditUserSchema,
    onSubmit: (values: DeviceFormData) => {
      console.log(values);
      onSubmit(values);
    },
  });

  async function onSubmit(values: DeviceFormData) {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }

  const [createActive, setCreateActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const [detailsActive, setDetailsActive] = useState(false);
  const [editUserActive, setEditUserActive] = useState(false);
  const [addGridActive, setAddGridActive] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [submitButton, setSubmitButton] = useState<boolean>(false);

  function changeState() {
    if (props.signActive) {
      props.setSignActive(false);
    }
    if (props.navActive) {
      props.setNavActive(false);
    }
  }
  const [gridApi, setGridApi] = useState<AgGridReact<GridData>>();
  const [columnDefs, setColumnDefs] = useState<GridData[]>([
    { headerName: "Serial number", field: "athlete", checkboxSelection: true, headerCheckboxSelection: true },
    { headerName: "Device type", field: "age" },
    { headerName: "Name", field: "country" },
    { headerName: "Owner email", field: "year" },
    { headerName: "Country", field: "date" },
    { headerName: "City", field: "sport" },
    { headerName: "Adress", field: "gold" },
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

  const onGridReady = (params: any) => {
    setGridApi(params);
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((result) => result.json())
      .then((result) => {
        params.api.applyTransaction({ add: result });
      });
  };

  const onPaginationChange = (pageSize: number) => {
    gridApi?.api.paginationSetPageSize(pageSize);
  };

  const getTargetValue = async (userRole: string) => {
    let role = userRole;
    enableAddGrid(role);
  };

  const enableAddGrid = async (role?: string) => {
    if (role == "Super admin") {
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
          <h3 className="form-wrapper-modal__title">Device Creation</h3>
          <span className="cross__wrapper" onClick={() => setCreateActive(false)}>
            <img src={cross} alt="cross" />
          </span>
        </div>

        <div className="form-wrapper-modal ">
          <form onSubmit={formik.handleSubmit}>
            <div className="signUp__form--modal">
              <div className="left__form--modal">
                <div className=" form__firstname ">
                  <Input
                    id={"deviceName"}
                    name={"deviceName"}
                    type={"text"}
                    placeholder={"Device Name"}
                    className={"form firstName"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.deviceName}
                    touched={formik.touched.deviceName}
                    errors={formik.errors.deviceName}
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
                    value={formik.values.adress}
                    touched={formik.touched.adress}
                    errors={formik.errors.adress}
                  />
                </div>
              </div>

              <div className="right__form--modal">
                <div className=" form__lastname">
                  <Input
                    id={"deviceType"}
                    name={"deviceType"}
                    type={"text"}
                    placeholder={"Device Type"}
                    className={"form lastName"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.deviceType}
                    touched={formik.touched.deviceType}
                    errors={formik.errors.deviceType}
                  />
                </div>

                <div className=" form__town ">
                  <Input
                    id={"city"}
                    name={"city"}
                    type={"text"}
                    placeholder={"City"}
                    className={"form town"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    touched={formik.touched.city}
                    errors={formik.errors.city}
                  />
                </div>
                <div className=" form__serialNumber ">
                  <Input
                    id={"serialNumber"}
                    name={"town"}
                    type={"text"}
                    placeholder={"Serial Number"}
                    className={"form serialNumber"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.serialNumber}
                    touched={formik.touched.serialNumber}
                    errors={formik.errors.serialNumber}
                  />
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
                  id={"deviceName"}
                  name={"deviceName"}
                  type={"text"}
                  placeholder={"Device Name"}
                  className={"form-modal firstName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deviceName}
                  touched={formik.touched.deviceName}
                  errors={formik.errors.deviceName}
                />
              </div>

              <div className=" form__lastname">
                <Input
                  id={"deviceType"}
                  name={"deviceType"}
                  type={"text"}
                  placeholder={"Device Type"}
                  className={"form-modal lastName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deviceType}
                  touched={formik.touched.deviceType}
                  errors={formik.errors.deviceType}
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
                  value={formik.values.adress}
                  touched={formik.touched.adress}
                  errors={formik.errors.adress}
                />
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
                  id={"city"}
                  name={"city"}
                  type={"text"}
                  placeholder={"City"}
                  className={"form-modal town"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  touched={formik.touched.city}
                  errors={formik.errors.city}
                />
              </div>
              <div className=" form__town ">
                <Input
                  id={"serialNumber"}
                  name={"serialNumber"}
                  type={"text"}
                  placeholder={"Serial Number"}
                  className={"form-modal town"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.serialNumber}
                  touched={formik.touched.serialNumber}
                  errors={formik.errors.serialNumber}
                />
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
        <ModalDevice active={editUserActive} setActive={setEditUserActive} />
      </ModalFunction>

      <ModalFunction
        active={addGridActive}
        setActive={setAddGridActive}
        activeClassName={"modal__content active"}
        className={"modal__content"}
      ></ModalFunction>

      <ModalFunction
        active={detailsActive}
        setActive={setDetailsActive}
        activeClassName={"modal__content active"}
        className={"modal__content"}
      >
        <p className="page-details-text">About device</p>
        <div className="page-details__wrapper">
          <div className="page-details__icon">
            <img className="page-details__img" src={avatarIcon} alt="avatar" />
          </div>
          <div className="page-details__data">
            <div className="personal-details__titles">
              <p className="personal-details__title">Serial number</p>
              <p className="personal-details__title">Device Type</p>
              <p className="personal-details__title">Name</p>
              <p className="personal-details__title ">Email</p>
              <p className="personal-details__title">Country</p>
              <p className="personal-details__title">City</p>
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
              <img className="users-grid__img" src={addUser} alt="add user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setDeleteActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src={deleteUser} alt="delete user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setEditUserActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src={editUser} alt="edit user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setDetailsActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src={userDetails} alt="user details" />
            </span>
          </button>
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ height: "500px", marginTop: "40px" }}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          animateRows={true}
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
