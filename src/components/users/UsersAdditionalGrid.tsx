import React from "react";
import "./ModalCreate.min.css";
import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { EditUserSchema } from "../input/EditUserValidation";
import { useFormik } from "formik";
import { FormData } from "../input/inputVariables";
import { HookData } from "../input/inputVariables";

type AddGridGridData = {
  headerName?: string;
  field?: string;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  rowGroupPanelShow?: string;
};

const UsersAdditionalGrid = ({ ...props }: HookData) => {
  function changeState() {
    if (props.signActive) {
      props.setSignActive(false);
    }
    if (props.navActive) {
      props.setNavActive(false);
    }
  }
  const [gridApi, setGridApi] = useState<AgGridReact<AddGridGridData>>();
  const [columnDefs, setColumnDefs] = useState<AddGridGridData[]>([
    { headerName: "Name", field: "athlete", checkboxSelection: true, headerCheckboxSelection: true },
    { headerName: "Surname", field: "age" },
    { headerName: "Country", field: "date" },
    { headerName: "City", field: "sport" },
    { headerName: "Adress", field: "gold" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
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
    <div className="users-additional-grid" onClick={() => changeState()}>
      <div className="grid-function ">
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
      </div>
      <div className="ag-theme-alpine grid--additional" style={{ height: "350px", marginTop: "40px" }}>
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

export default UsersAdditionalGrid;
