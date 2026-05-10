import { useState } from "react";
import ExcelJS from "exceljs";

export default function ExcelExperiment() {
  const [sheets, setSheets] = useState<any[]>([]);
  const [activeSheet, setActiveSheet] = useState<number>(0);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const allSheets: any[] = [];

    workbook.worksheets.forEach((worksheet) => {
      const tempRows: any[] = [];

      worksheet.eachRow((row) => {
        const rowData: any[] = [];

        row.eachCell((cell, colNumber) => {
          rowData.push({
            value: cell.value,

            style: {
              bold: cell.font?.bold || false,

              color: cell.font?.color?.argb,

              bg:
                cell.fill &&
                "fgColor" in cell.fill
                  ? cell.fill.fgColor?.argb
                  : null,

              align: cell.alignment?.horizontal,

              width:
                worksheet.getColumn(colNumber).width,
            },
          });
        });

        tempRows.push(rowData);
      });

      const mergedRanges = Object.keys(
        worksheet._merges
      );

      allSheets.push({
        name: worksheet.name,
        rows: tempRows,
        merges: mergedRanges,
      });
    });

    setSheets(allSheets);
    setActiveSheet(0);
  };
const handleDownload = async () => {
  if (!sheets.length) {
    alert("No Excel file loaded");
    return;
  }

  const currentSheet = sheets[activeSheet];

  if (!currentSheet) {
    alert("Invalid sheet selected");
    return;
  }

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(
    currentSheet.name || "Sheet1"
  );

  currentSheet.rows.forEach((row: any) => {
    const newRow = worksheet.addRow(
      row.map((cell: any) => cell.value)
    );

    newRow.eachCell((cell, colNumber) => {
      const original = row[colNumber - 1]?.style;

      if (original?.bold) {
        cell.font = { bold: true };
      }
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${currentSheet.name || "export"}.xlsx`;
  a.click();

  window.URL.revokeObjectURL(url);
};
  const sheet = sheets[activeSheet];

  return (
    <div className="p-6">
      {/* Upload */}
      <input
        type="file"
        accept=".xlsx"
        onChange={handleUpload}
      />
      <button
  onClick={handleDownload}
  className="px-3 py-1 bg-green-600 text-white rounded mt-4"
>
  Export Excel
</button>

      {/* Sheet Tabs */}
      {sheets.length > 0 && (
        <div className="flex gap-2 mt-4">
          {sheets.map((s, index) => (
            <button
              key={index}
              onClick={() => setActiveSheet(index)}
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

      {/* Table */}
      {sheet && (
        <div className="mt-6 overflow-auto border">
          <table className="border-collapse">
            <tbody>
              {sheet.rows.map((row: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      className="border px-3 py-2"
                      style={{
                        fontWeight: cell.style.bold
                          ? "bold"
                          : "normal",

                        backgroundColor: cell.style.bg
                          ? `#${cell.style.bg.slice(2)}`
                          : "white",

                        color: cell.style.color
                          ? `#${cell.style.color.slice(2)}`
                          : "black",

                        textAlign:
                          cell.style.align || "left",

                        minWidth: `${
                          (cell.style.width || 10) * 8
                        }px`,
                      }}
                    >
                      {cell.value?.toString?.() || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Debug merges */}
      {sheet && (
        <div className="mt-4">
          <h2 className="font-bold">Merged Cells</h2>
          <pre>
            {JSON.stringify(sheet.merges, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}