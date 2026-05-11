type Props = {
  handleUpload: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  exportExcel: () => void;
};

export default function ExcelToolbar({
  handleUpload,
  exportExcel,
}: Props) {
  return (
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
  );
}