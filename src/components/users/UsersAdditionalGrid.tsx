import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import "./ModalCreate.min.css";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {HookData} from "../input/inputVariables";
import axios from "axios";

type AddGridGridData = {
    headerName?: string;
    field?: string;
    checkboxSelection?: boolean;
    headerCheckboxSelection?: boolean;
    rowGroupPanelShow?: string;
};

type AddResponseData = {
    id?: number | null;
    name: string | null;
    surname: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
};

const users: AddResponseData = {
    id : null,
    name : null,
    surname : null,
    country : null,
    city : null,
    address : null,
};

const UsersAdditionalGrid = ({...props}: HookData) => {
    function changeState () {
        if (props.signActive) {
            props.setSignActive(false);
        }
        if (props.navActive) {
            props.setNavActive(false);
        }
    }
    
    const gridRef = useRef<AgGridReact>(null);
    
    const [columnDefs, setColumnDefs] = useState<AddGridGridData[]>([
        {headerName : "Name", field : "name", checkboxSelection : true, headerCheckboxSelection : true},
        {headerName : "Surname", field : "surname"},
        {headerName : "Country", field : "country"},
        {headerName : "City", field : "city"},
        {headerName : "Address", field : "address"},
    ]);
    
    const [rowData, setRowData] = useState<AddGridGridData[]>();
    
    const defaultColDef = useMemo(
        () => ({
            sortable : true,
            floatingFilter : true,
            resizable : true,
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
    
    const onPaginationChange = useCallback((pageSize: number) => {
        gridRef.current?.api.paginationSetPageSize(pageSize);
    }, []);
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
            <div className="ag-theme-alpine grid--additional" style={{height : "350px", marginTop : "40px"}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
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
