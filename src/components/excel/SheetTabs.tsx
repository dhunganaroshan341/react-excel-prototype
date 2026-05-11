type Props = {
  sheets: any[];
  activeSheet: number;
  setActiveSheet: (index: number) => void;
};

export default function SheetTabs({
  sheets,
  activeSheet,
  setActiveSheet,
}: Props) {
  return (
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
  );
}