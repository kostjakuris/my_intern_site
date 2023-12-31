import React from "react";
import "../users/ModalCreate.min.css";
import {useState, useMemo, useRef, useCallback} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {HookData} from "../input/inputVariables";

type AddGridGridData = {
    headerName?: string;
    field?: string;
    checkboxSelection?: boolean;
    headerCheckboxSelection?: boolean;
    rowGroupPanelShow?: string;
};

const GroupGrid = ({...props}: HookData) => {

    function changeState () {
        if (props.signActive) {
            props.setSignActive(false);
        }
        if (props.navActive) {
            props.setNavActive(false);
        }
    }


    const gridRef = useRef<AgGridReact>(null);

    const [columnDefs] = useState<AddGridGridData[]>([
        {
            headerName : "Serial number",
            field : "serial_number",
            checkboxSelection : true,
            headerCheckboxSelection : true
        },
        {headerName : "Device type", field : "device_type"},
        {headerName : "Name", field : "name"},
        {headerName : "Owner email", field : "owner_email"},
        {headerName : "Country", field : "country"},
        {headerName : "City", field : "city"},
        {headerName : "Address", field : "address"},
    ]);


    const defaultColDef = useMemo(
        () => ({
            sortable : true,
            floatingFilter : true,
            resizable : true,
        }),
        []
    );


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
                    rowData={props.rowData}
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

export default GroupGrid;