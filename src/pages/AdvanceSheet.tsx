import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelExperiment() {
  const [sheets, setSheets] = useState<any[]>([]);
  const [activeSheet, setActiveSheet] =
    useState(0);

  // =========================
  // Column Widths
  // =========================
  const [columnWidths, setColumnWidths] =
    useState<Record<number, number>>({});

  // =========================
  // Row Heights
  // =========================
  const [rowHeights, setRowHeights] =
    useState<Record<number, number>>({});

  // =========================
  // Upload Excel
  // =========================
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer);

    const parsedSheets =
      workbook.SheetNames.map((name) => {
        const ws = workbook.Sheets[name];

        const rows =
          XLSX.utils.sheet_to_json(ws, {
            header: 1,
            defval: "",
          });

        return {
          name,
          rows,
        };
      });

    setSheets(parsedSheets);
    setActiveSheet(0);
  };

  // =========================
  // Update Cell
  // =========================
  const updateCell = (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => {
    const updated = [...sheets];

    updated[activeSheet].rows[rowIndex][
      cellIndex
    ] = value;

    setSheets(updated);
  };

  // =========================
  // Insert Row
  // =========================
  const insertRow = (rowIndex: number) => {
    const updated = [...sheets];

    const colCount =
      updated[activeSheet].rows[0]?.length ||
      1;

    updated[activeSheet].rows.splice(
      rowIndex,
      0,
      Array(colCount).fill("")
    );

    setSheets(updated);
  };

  // =========================
  // Insert Column
  // =========================
  const insertColumn = (
    columnIndex: number
  ) => {
    const updated = [...sheets];

    updated[activeSheet].rows =
      updated[activeSheet].rows.map(
        (row: any[]) => {
          const newRow = [...row];

          newRow.splice(columnIndex, 0, "");

          return newRow;
        }
      );

    setSheets(updated);
  };

  // =========================
  // Export Excel
  // =========================
  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();

    sheets.forEach((sheet) => {
      const ws = XLSX.utils.aoa_to_sheet(
        sheet.rows
      );

      XLSX.utils.book_append_sheet(
        workbook,
        ws,
        sheet.name
      );
    });

    XLSX.writeFile(workbook, "edited.xlsx");
  };

  // =========================
  // Excel Column Names
  // =========================
  const getColumnName = (
    index: number
  ) => {
    let name = "";
    let num = index;

    while (num >= 0) {
      name =
        String.fromCharCode(
          (num % 26) + 65
        ) + name;

      num = Math.floor(num / 26) - 1;
    }

    return name;
  };

  // =========================
  // Resize Column
  // =========================
  const startResizeColumn = (
    e: React.MouseEvent,
    colIndex: number
  ) => {
    e.preventDefault();

    const startX = e.clientX;

    const startWidth =
      columnWidths[colIndex] || 140;

    const onMouseMove = (
      moveEvent: MouseEvent
    ) => {
      const newWidth = Math.max(
        80,
        startWidth +
          (moveEvent.clientX - startX)
      );

      setColumnWidths((prev) => ({
        ...prev,
        [colIndex]: newWidth,
      }));
    };

    const onMouseUp = () => {
      window.removeEventListener(
        "mousemove",
        onMouseMove
      );

      window.removeEventListener(
        "mouseup",
        onMouseUp
      );
    };

    window.addEventListener(
      "mousemove",
      onMouseMove
    );

    window.addEventListener(
      "mouseup",
      onMouseUp
    );
  };

  // =========================
  // Resize Row
  // =========================
  const startResizeRow = (
    e: React.MouseEvent,
    rowIndex: number
  ) => {
    e.preventDefault();

    const startY = e.clientY;

    const startHeight =
      rowHeights[rowIndex] || 40;

    const onMouseMove = (
      moveEvent: MouseEvent
    ) => {
      const newHeight = Math.max(
        30,
        startHeight +
          (moveEvent.clientY - startY)
      );

      setRowHeights((prev) => ({
        ...prev,
        [rowIndex]: newHeight,
      }));
    };

    const onMouseUp = () => {
      window.removeEventListener(
        "mousemove",
        onMouseMove
      );

      window.removeEventListener(
        "mouseup",
        onMouseUp
      );
    };

    window.addEventListener(
      "mousemove",
      onMouseMove
    );

    window.addEventListener(
      "mouseup",
      onMouseUp
    );
  };

  const sheet = sheets[activeSheet];

  return (
    <div className="p-6">
      {/* Toolbar */}
      <div className="flex gap-3 mb-4">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleUpload}
        />

        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Export
        </button>
      </div>

      {/* Sheet Tabs */}
      <div className="flex gap-2 mb-4">
        {sheets.map((sheet, index) => (
          <button
            key={index}
            onClick={() =>
              setActiveSheet(index)
            }
            className={`px-3 py-1 rounded border ${
              activeSheet === index
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {sheet.name}
          </button>
        ))}
      </div>

      {/* Table */}
      {sheet && (
        <div className="overflow-auto border bg-white max-h-[80vh]">
          <table className="border-collapse">
            <thead>
              <tr>
                {/* Corner */}
                <th className="border bg-gray-300 w-14 h-10 sticky top-0 left-0 z-20">
                </th>

                {/* Column Headers */}
                {sheet.rows[0]?.map(
                  (
                    _: any,
                    colIndex: number
                  ) => (
                    <th
                      key={colIndex}
                      className="border bg-gray-300 sticky top-0 z-10 relative"
                      style={{
                        width:
                          columnWidths[
                            colIndex
                          ] || 140,
                        minWidth:
                          columnWidths[
                            colIndex
                          ] || 140,
                      }}
                    >
                      <div className="flex justify-between items-center px-2 h-10">
                        <span>
                          {getColumnName(
                            colIndex
                          )}
                        </span>

                        <button
                          onClick={() =>
                            insertColumn(
                              colIndex + 1
                            )
                          }
                          className="text-blue-600"
                        >
                          +
                        </button>
                      </div>

                      {/* Resize Handle */}
                      <div
                        onMouseDown={(e) =>
                          startResizeColumn(
                            e,
                            colIndex
                          )
                        }
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500"
                      />
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {sheet.rows.map(
                (
                  row: any[],
                  rowIndex: number
                ) => (
                  <tr
                    key={rowIndex}
                    style={{
                      height:
                        rowHeights[
                          rowIndex
                        ] || 40,
                    }}
                  >
                    {/* Row Header */}
                    <td className="border bg-gray-200 text-center font-medium sticky left-0 relative">
                      <div className="flex items-center justify-center gap-1">
                        {rowIndex + 1}

                        <button
                          onClick={() =>
                            insertRow(
                              rowIndex + 1
                            )
                          }
                          className="text-blue-600"
                        >
                          +
                        </button>
                      </div>

                      {/* Resize Handle */}
                      <div
                        onMouseDown={(e) =>
                          startResizeRow(
                            e,
                            rowIndex
                          )
                        }
                        className="absolute bottom-0 left-0 w-full h-1 cursor-row-resize hover:bg-blue-500"
                      />
                    </td>

                    {/* Cells */}
                    {row.map(
                      (
                        cell: any,
                        cellIndex: number
                      ) => (
                        <td
                          key={cellIndex}
                          className={`border ${
                            rowIndex === 0
                              ? "bg-yellow-100 font-bold"
                              : ""
                          }`}
                          style={{
                            width:
                              columnWidths[
                                cellIndex
                              ] || 140,
                            minWidth:
                              columnWidths[
                                cellIndex
                              ] || 140,
                          }}
                        >
                          <input
                            value={cell}
                            onChange={(e) =>
                              updateCell(
                                rowIndex,
                                cellIndex,
                                e.target.value
                              )
                            }
                            className="w-full h-full px-3 py-2 outline-none bg-transparent"
                          />
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}