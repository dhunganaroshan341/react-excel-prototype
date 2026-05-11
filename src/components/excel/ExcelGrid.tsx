import ExcelCell from "./ExcelCell";
import ExcelHeader from "./ExcelHeader";

type Props = {
  sheet: any;

  columnWidths: Record<number, number>;

  rowHeights: Record<number, number>;

  updateCell: any;

  insertRow: any;

  insertColumn: any;

  startResizeColumn: any;

  startResizeRow: any;
};

export default function ExcelGrid({
  sheet,
  columnWidths,
  rowHeights,
  updateCell,
  insertRow,
  insertColumn,
  startResizeColumn,
  startResizeRow,
}: Props) {
  return (
    <div className="overflow-auto border bg-white max-h-[80vh]">
      <table className="border-collapse">
        <ExcelHeader
          sheet={sheet}
          columnWidths={columnWidths}
          insertColumn={insertColumn}
          startResizeColumn={
            startResizeColumn
          }
        />

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
                    rowHeights[rowIndex] ||
                    40,
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
                    <ExcelCell
                      key={cellIndex}
                      value={cell}
                      rowIndex={rowIndex}
                      cellIndex={cellIndex}
                      width={
                        columnWidths[
                          cellIndex
                        ] || 140
                      }
                      isHeader={
                        rowIndex === 0
                      }
                      updateCell={
                        updateCell
                      }
                    />
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}