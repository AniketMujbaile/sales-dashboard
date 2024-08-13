import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function TableComponent({ data, columns }) {
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const paginationPageSize = 8;

  return (
    <div className="ag-theme-alpine w-full h-[500px]">
      <AgGridReact
        columnDefs={columns}
        rowData={data}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout='autoHeight'
      />
    </div>
  );
}

export default TableComponent;