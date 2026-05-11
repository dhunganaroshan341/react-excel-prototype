import { useState } from "react";
import * as XLSX from "xlsx";

export default function LocalExcelViewer() {
  const [excelData, setExcelData] = useState([]);
  const [sheetName, setSheetName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const binaryStr = evt.target.result;

      // Read workbook
      const workbook = XLSX.read(binaryStr, {
        type: "binary",
      });

      // First sheet
      const firstSheet = workbook.SheetNames[0];

      setSheetName(firstSheet);

      const worksheet = workbook.Sheets[firstSheet];

      // Convert to array format
      const data = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      });

      setExcelData(data);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="text-lg font-semibold">
          Excel Preview
        </h1>

        <p className="text-sm text-gray-500">
          Upload and preview .xlsx file
        </p>
      </div>

      {/* Upload */}
      <div className="p-4 bg-white border-b">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="border p-2 rounded"
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-4">
        {excelData.length > 0 ? (
          <div className="bg-white rounded shadow overflow-auto">
            <div className="p-3 border-b font-medium">
              Sheet: {sheetName}
            </div>

            <table className="min-w-full border-collapse">
              <tbody>
                {excelData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border px-3 py-2 text-sm whitespace-nowrap"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500">
            No Excel file loaded
          </div>
        )}
      </div>
    </div>
  );
}