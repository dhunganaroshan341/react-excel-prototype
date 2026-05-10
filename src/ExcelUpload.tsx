import { useState } from "react";
import ExcelJS from "exceljs";

export default function ExcelExperiment() {
  const [rows, setRows] = useState<any[]>([]);
  const [merges, setMerges] = useState<any[]>([]);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.worksheets[0];

    const tempRows: any[] = [];

    worksheet.eachRow((row, rowNumber) => {
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

    // merged cells
    const mergedRanges = Object.keys(
      worksheet._merges
    );

    setMerges(mergedRanges);

    setRows(tempRows);

    console.log("MERGES:", mergedRanges);
    console.log("ROWS:", tempRows);
  };

  return (
    <div className="p-6">
      <input
        type="file"
        accept=".xlsx"
        onChange={handleUpload}
      />

      <div className="mt-6 overflow-auto border">
        <table className="border-collapse">
          <tbody>
            {rows.map((row, rowIndex) => (
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
                    {cell.value?.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h2 className="font-bold">
          Merged Cells
        </h2>

        <pre>
          {JSON.stringify(merges, null, 2)}
        </pre>
      </div>
    </div>
  );
}