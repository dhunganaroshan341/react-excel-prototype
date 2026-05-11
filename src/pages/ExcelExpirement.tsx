import ExcelGrid from "../components/excel/ExcelGrid";
import ExcelToolbar from "../components/excel/ExcelToolbar";
import SheetTabs from "../components/excel/SheetTabs";

import useExcelSheet from "../hooks/useExcelSheet";

export default function ExcelExperiment() {
  const {
    sheets,
    activeSheet,
    setActiveSheet,
    handleUpload,
    updateCell,
    insertRow,
    insertColumn,
    exportExcel,
    columnWidths,
    rowHeights,
    startResizeColumn,
    startResizeRow,
  } = useExcelSheet();

  const sheet = sheets[activeSheet];

  return (
    <div className="p-6">
      <ExcelToolbar
        handleUpload={handleUpload}
        exportExcel={exportExcel}
      />

      <SheetTabs
        sheets={sheets}
        activeSheet={activeSheet}
        setActiveSheet={
          setActiveSheet
        }
      />

      {sheet && (
        <ExcelGrid
          sheet={sheet}
          columnWidths={columnWidths}
          rowHeights={rowHeights}
          updateCell={updateCell}
          insertRow={insertRow}
          insertColumn={insertColumn}
          startResizeColumn={
            startResizeColumn
          }
          startResizeRow={
            startResizeRow
          }
        />
      )}
    </div>
  );
}