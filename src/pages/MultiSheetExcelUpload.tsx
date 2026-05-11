import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelExperiment() {
  const [sheets, setSheets] = useState<any[]>([]);
  const [activeSheet, setActiveSheet] = useState(0);

  // =========================
  // Upload Excel
  // =========================
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const data = await file.arrayBuffer();

    const workbook = XLSX.read(data);

    const parsedSheets = workbook.SheetNames.map(
      (sheetName) => {
        const worksheet =
          workbook.Sheets[sheetName];

        const json = XLSX.utils.sheet_to_json(
          worksheet,
          {
            header: 1,
            defval: "",
          }
        );

        return {
          name: sheetName,
          rows: json,
        };
      }
    );

    setSheets(parsedSheets);
    setActiveSheet(0);
  };

  // =========================
  // Cell Update
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
  // Add Column
  // =========================
  const addColumn = (insertAt: number) => {
    const updated = [...sheets];

    updated[activeSheet].rows =
      updated[activeSheet].rows.map(
        (row: any[]) => {
          const newRow = [...row];

          newRow.splice(insertAt, 0, "");

          return newRow;
        }
      );

    setSheets(updated);
  };

  // =========================
  // Add Row
  // =========================
  const addRow = () => {
    const updated = [...sheets];

    const colCount =
      updated[activeSheet].rows[0]?.length || 1;

    updated[activeSheet].rows.push(
      Array(colCount).fill("")
    );

    setSheets(updated);
  };

  // =========================
  // Export Excel
  // =========================
  const handleDownload = () => {
    if (!sheets.length) return;

    const workbook = XLSX.utils.book_new();

    sheets.forEach((sheet) => {
      const worksheet = XLSX.utils.aoa_to_sheet(
        sheet.rows
      );

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        sheet.name
      );
    });

    XLSX.writeFile(workbook, "edited.xlsx");
  };

  const sheet = sheets[activeSheet];

  return (
    <div className="p-6">
      {/* Upload */}
      <div className="flex gap-3 items-center">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleUpload}
        />

        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Export Excel
        </button>

        <button
          onClick={addRow}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Row
        </button>
      </div>

      {/* Sheet Tabs */}
      {sheets.length > 0 && (
        <div className="flex gap-2 mt-4">
          {sheets.map((s, index) => (
            <button
              key={index}
              onClick={() =>
                setActiveSheet(index)
              }
              className={`px-3 py-1 border rounded ${
                activeSheet === index
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {/* Excel Table */}
      {sheet && (
        <div className="mt-6 overflow-auto border bg-white">
          <table className="border-collapse">
            <tbody>
              {sheet.rows.map(
                (row: any[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map(
                      (
                        cell: any,
                        cellIndex: number
                      ) => (
                        <td
                          key={cellIndex}
                          className={`border min-w-[140px] ${
                            rowIndex === 0
                              ? "bg-gray-200 font-bold"
                              : ""
                          }`}
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
                            className="w-full px-3 py-2 outline-none bg-transparent"
                          />
                        </td>
                      )
                    )}

                    {/* Add Column Button */}
                    <td className="border">
                      <button
                        onClick={() =>
                          addColumn(row.length)
                        }
                        className="px-2 text-blue-600"
                      >
                        +
                      </button>
                    </td>
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