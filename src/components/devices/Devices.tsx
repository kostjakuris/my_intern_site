import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Devices.css";
import "./ModalCreate.min.css";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { HookData } from "../input/inputVariables";
import ModalFunction from "../modal-function/ModalFunction";
import ModalDevice from "./ModalDevice";
import { DeviceFormData } from "../input/inputVariables";
import { useFormik } from "formik";
import Input from "../input/Input";
import { CreateDeviceSchema } from "../input/CreateDeviceValidation";
import { useAppDispatch } from "../../Hook";
import {createDevice, getDevices} from "../../store/auth/opetations";
import { deleteDevice as deleteDeviceAction } from "../../store/auth/opetations";
import { useAppSelector } from "../../Hook";

type GridData = {
  headerName?: string;
  field?: string;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  rowGroupPanelShow?: string;
};


const Devices = ({ ...props }: HookData) => {
  const userRole = useAppSelector((state) => state.auth.user.role);
  const devicesArray = useAppSelector((state) => state.auth.devices);
  const dispatch = useAppDispatch();

  const formik = useFormik<DeviceFormData>({
    initialValues: {
      name: "",
      device_type: "",
      email: "",
      country: "",
      city: "",
      address: "",
      serial_number: "",
    },
    validationSchema: CreateDeviceSchema,
    onSubmit: async (values: DeviceFormData) => {
      await dispatch(createDevice(values));
    },
  });

  const [createDeviceActive, setCreateDeviceActive] = useState(false);
  const [deleteDeviceActive, setDeleteDeviceActive] = useState(false);
  const [deviceDetailsActive, setDeviceDetailsActive] = useState(false);
  const [editDeviceActive, setEditDeviceActive] = useState(false);
  const [addGridActive, setAddGridActive] = useState(false);

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
    { headerName: "Serial number", field: "serial_number", checkboxSelection: true, headerCheckboxSelection: true },
    { headerName: "Device type", field: "device_type" },
    { headerName: "Name", field: "name" },
    { headerName: "Owner email", field: "owner_email" },
    { headerName: "Country", field: "country" },
    { headerName: "City", field: "city" },
    { headerName: "Address", field: "address" },
  ]);

  const [rowData, setRowData] = useState<GridData[]>();
  const [selectedDevice, setSelectedDevice] = useState<any[]>([
    {
      id: null,
      serial_number: null,
      device_type: null,
      name: null,
      email: null,
      country: null,
      city: null,
      address: null,
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
        if (userRole!=="customer") {
        dispatch(getDevices())
        if (Array.isArray(devicesArray)) {
          setRowData(devicesArray);
        }
        }
      }, []);




  const onPaginationChange = useCallback((pageSize: number) => {
    gridRef.current?.api.paginationSetPageSize(pageSize);
  }, []);

  const getSelectedRows = useCallback(() => {
    const selectedRows = gridRef.current?.api.getSelectedRows();

    if (selectedRows) {
      const updatedSelectedData = selectedRows.map((selectedData) => ({
        id: selectedData.id,
        serial_number: selectedData.serial_number,
        device_type: selectedData.device_type,
        name: selectedData.name,
        email: selectedData.email,
        country: selectedData.country,
        city: selectedData.city,
        address: selectedData.address,
      }));
      setSelectedDevice(updatedSelectedData);
    }
  }, []);

  const deleteDevice = useCallback(() => {
    const getSelectedNodes = gridRef.current?.api.getSelectedNodes();
    if (getSelectedNodes) {
      getSelectedNodes.forEach((selectedData) => {
        dispatch(deleteDeviceAction(selectedData.data.id));
      });
    }
  }, []);

  return userRole=="customer" ? (
      <div>You don`t have a permissions to see this page</div>
      ): (
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
            <img src="icons/system-uicons_cross.svg" alt="cross" />
          </span>
        </div>

        <div className="form-wrapper-modal ">
          <form onSubmit={formik.handleSubmit}>
            <div className="signUp__form--modal">
              <div className="left__form--modal">
                <div className=" form__firstname ">
                  <Input
                    id={"name"}
                    name={"name"}
                    type={"text"}
                    placeholder={"Device Name"}
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
                    id={"address"}
                    name={"address"}
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
                    id={"device_type"}
                    name={"device_type"}
                    type={"text"}
                    placeholder={"Device Type"}
                    className={"form lastName"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.device_type}
                    touched={formik.touched.device_type}
                    errors={formik.errors.device_type}
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
                    id={"serial_number"}
                    name={"serial_number"}
                    type={"text"}
                    placeholder={"Serial Number"}
                    className={"form serialNumber"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.serial_number}
                    touched={formik.touched.serial_number}
                    errors={formik.errors.serial_number}
                  />
                </div>
              </div>
            </div>

            <div className="buttons">
              <button className="cancel__button">Cancel</button>

              <button className="submit__button-modal" type="submit">
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
                  id={"name"}
                  name={"name"}
                  type={"text"}
                  placeholder={"Device Name"}
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
                  id={"device_type"}
                  name={"device_type"}
                  type={"text"}
                  placeholder={"Device Type"}
                  className={"form-modal lastName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.device_type}
                  touched={formik.touched.device_type}
                  errors={formik.errors.device_type}
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
                  id={"serial_number"}
                  name={"serialNumber"}
                  type={"text"}
                  placeholder={"Serial Number"}
                  className={"form-modal town"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.serial_number}
                  touched={formik.touched.serial_number}
                  errors={formik.errors.serial_number}
                />
              </div>
            </div>

            <div className="buttons">
              <button className="cancel__button" onClick={() => setCreateDeviceActive(false)}>
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
        active={deleteDeviceActive}
        setActive={setDeleteDeviceActive}
        activeClassName={" modal-delete active"}
        className={"modal-delete"}
      >
        <p className="modal-delete__text">Are you sure you want to delete?</p>
        <div className="buttons-delete">
          <button className="cancel__button cancel__button-delete" onClick={() => setDeleteDeviceActive(false)}>
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
        <ModalDevice active={editDeviceActive} setActive={setEditDeviceActive} selectedDevice={selectedDevice} />
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
              <img className="page-details__img" src={data.avatar} alt="avatar" />
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
          <button className="users-grid__button" onClick={() => setCreateDeviceActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_add.svg" alt="add user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setDeleteDeviceActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_delete-outline.svg" alt="delete user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setEditDeviceActive(true)}>
            <span className="users-grid__span">
              <img className="users-grid__img" src="icons/material-symbols_edit-outline.svg" alt="edit user" />
            </span>
          </button>
          <button className="users-grid__button" onClick={() => setDeviceDetailsActive(true)}>
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
export default Devices;
