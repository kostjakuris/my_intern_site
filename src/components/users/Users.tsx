import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Users.css";
import { useState, useMemo } from "react";
import addUser from "../../icons/material-symbols_add.svg";
import deleteUser from "../../icons/material-symbols_delete-outline.svg";
import editUser from "../../icons/material-symbols_edit-outline.svg";
import userDetails from "../../icons/openmoji_details.svg";
import { HookData } from "../input/inputVariables";

type GridData = {
  headerName?: string;
  field?: string;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  rowGroupPanelShow?: string;
};

const Users = ({ ...props }: HookData) => {
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
      enableRowGroup: true,
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
          <button className="users-grid__button">
            <span className="users-grid__span">
              <img className="users-grid__img" src={addUser} alt="add user" />
            </span>
          </button>
          <button className="users-grid__button">
            <span className="users-grid__span">
              <img className="users-grid__img" src={deleteUser} alt="delete user" />
            </span>
          </button>
          <button className="users-grid__button">
            <span className="users-grid__span">
              <img className="users-grid__img" src={editUser} alt="edit user" />
            </span>
          </button>
          <button className="users-grid__button">
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
