type Props = {
  value: any;
  rowIndex: number;
  cellIndex: number;
  width: number;
  isHeader: boolean;

  updateCell: (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => void;
};

export default function ExcelCell({
  value,
  rowIndex,
  cellIndex,
  width,
  isHeader,
  updateCell,
}: Props) {
  return (
    <td
      className={`border ${
        isHeader
          ? "bg-yellow-100 font-bold"
          : ""
      }`}
      style={{
        width,
        minWidth: width,
      }}
    >
      <textarea
        value={value}
        onChange={(e) => {
          updateCell(
            rowIndex,
            cellIndex,
            e.target.value
          );

          e.target.style.height = "auto";

          e.target.style.height =
            e.target.scrollHeight + "px";
        }}
        className="w-full px-3 py-2 outline-none bg-transparent resize-none overflow-hidden"
      />
    </td>
  );
}