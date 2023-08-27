import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Users.css";
import "./ModalCreate.min.css";
import { useState, useMemo } from "react";
import addUser from "../../icons/material-symbols_add.svg";
import deleteUser from "../../icons/material-symbols_delete-outline.svg";
import editUser from "../../icons/material-symbols_edit-outline.svg";
import userDetails from "../../icons/openmoji_details.svg";
import { HookData } from "../input/inputVariables";
import ModalFunction from "../modal-function/ModalFunction";
import ModalProfile from "../modal-function/ModalProfile";
import avatarIcon from "../../icons/carbon_user-avatar-filled-alt.svg";

type GridData = {
  headerName?: string;
  field?: string;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  rowGroupPanelShow?: string;
};

const Users = ({ ...props }: HookData) => {
  const [createActive, setCreateActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const [detailsActive, setDetailsActive] = useState(false);

  function changeState() {
    if (props.signActive) {
      props.setSignActive(false);
    }
    if (props.navActive) {
      props.setNavActive(false);
    }
  }
  const [gridApi, setGridApi] = useState<AgGridReact<GridData>>();
  const [columnDefs] = useState<GridData[]>([
    { headerName: "Name", field: "athlete", checkboxSelection: true, headerCheckboxSelection: true },
    { headerName: "Surname", field: "age" },
    { headerName: "Email", field: "country" },
    { headerName: "Role", field: "year" },
    { headerName: "Country", field: "date" },
    { headerName: "City", field: "sport" },
    { headerName: "Adress", field: "gold" },
    { headerName: "Created at", field: "silver" },
    { headerName: "Updated at", field: "total" },
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
          className={"modal__content"}
        >
          <div className=" form__select--desktop ">
            <select name="pagination" className="form select">
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
            </select>
          </div>
          <div className=" form__select ">
            <select name="pagination" className="form-modal select ">
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
            </select>
          </div>
        </ModalProfile>
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
        active={detailsActive}
        setActive={setDetailsActive}
        activeClassName={"modal__content active"}
        className={"modal__content"}
      >
        <p className="page-details-text">About user</p>
        <div className="page-details__wrapper">
          <div className="page-details__icon">
            <img className="page-details__img" src={avatarIcon} alt="avatar" />
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
          <button className="users-grid__button">
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
