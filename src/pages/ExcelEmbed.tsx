import { useNavigate } from "react-router-dom";

export default function ExcelEmbed() {
  const navigate = useNavigate();

  const excelUrl =
    "https://1drv.ms/x/c/081e36069fc65e7c/IQRwohLRuywSQrv0GobpAlr7AZ-_EwrTF3d2TIaVirkjNXI";

  const embedUrl = `${excelUrl}?wdAllowInteractivity=True`;
  const openInExcel = () => {
    window.open(excelUrl, "_blank");
  };
    const downloadExcel = () => {
    // forces download from OneDrive
    window.open(`${excelUrl}?download=1`, "_blank");
  };

  const refresh = () => {
    // simple reload (since iframe is cached)
    window.location.reload();
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">

      {/* Header */}
      <div className="px-4 py-2 bg-white border-b flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            BOQ Sheet
          </h1>
          <p className="text-xs text-gray-500">
            Preview (edit in Excel)
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/")}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={openInExcel}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            Open in Excel
          </button>
          
              <button
            onClick={downloadExcel}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            Download
          </button>

          <button
            onClick={refresh}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            Refresh
          </button>

          <button
            className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Sync
          </button>
        </div>
      </div>

      {/* Excel Preview */}
      <div className="flex-1">
        <iframe
          src={embedUrl}
          className="w-full h-full border-none"
          title="Excel Preview"
        />
      </div>
    </div>
  );
}