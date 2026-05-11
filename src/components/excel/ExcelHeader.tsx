import { getColumnName } from "../../utils/excelUtils";

type Props = {
  sheet: any;
  columnWidths: Record<number, number>;

  insertColumn: (
    columnIndex: number
  ) => void;

  startResizeColumn: (
    e: React.MouseEvent,
    colIndex: number
  ) => void;
};

export default function ExcelHeader({
  sheet,
  columnWidths,
  insertColumn,
  startResizeColumn,
}: Props) {
  return (
    <thead>
      <tr>
        <th className="border bg-gray-300 w-14 h-10 sticky top-0 left-0 z-20"></th>

        {sheet.rows[0]?.map(
          (_: any, colIndex: number) => (
            <th
              key={colIndex}
              className="border bg-gray-300 sticky top-0 z-10 relative"
              style={{
                width:
                  columnWidths[colIndex] ||
                  140,

                minWidth:
                  columnWidths[colIndex] ||
                  140,
              }}
            >
              <div className="flex justify-between items-center px-2 h-10">
                <span>
                  {getColumnName(colIndex)}
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
  );
}