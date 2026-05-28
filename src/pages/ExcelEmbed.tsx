import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ExcelEmbed() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH FILES FROM LARAVEL API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/graph/files")
      .then((res) => res.json())
      .then((data) => {
        const list = data.data || [];
        setFiles(list);
        setActiveFile(list[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🟢 EXCEL EMBED (MICROSOFT OFFICE ONLINE)
  // const getEmbedUrl = (url) => {
  //   if (!url) return "";
  //   return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  // };

  // 🟢 OPEN IN EXCEL ONLINE
  const openInExcel = () => {
    window.open(activeFile.web_url, "_blank");
  };

  // 🟢 DOWNLOAD FILE
  const downloadFile = () => {
    window.open(activeFile.download_url, "_blank");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading files...
      </div>
    );
  }

  if (!activeFile) {
    return (
      <div className="h-screen flex items-center justify-center">
        No files found
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">

      {/* HEADER */}
      <div className="px-4 py-2 bg-white border-b flex justify-between items-center">

        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Excel System
          </h1>
          <p className="text-xs text-gray-500">
            Microsoft Graph + SharePoint Excel Viewer
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
            onClick={downloadFile}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            Download
          </button>

        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-1">

        {/* SIDEBAR FILE LIST */}
        <div className="w-64 bg-white border-r p-2 overflow-y-auto">

          <div className="text-xs text-gray-500 mb-2">
            Files
          </div>

          {files.map((file) => (
            <div
              key={file.id}
              onClick={() => setActiveFile(file)}
              className={`p-2 rounded cursor-pointer text-sm ${
                activeFile.id === file.id
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              📄 {file.name}
            </div>
          ))}
        </div>

        {/* EXCEL VIEWER */}
        <div className="flex-1">

         <iframe
  src={activeFile.embed_url}
  className="w-full h-full border-none"
  title="Excel Viewer"
/>

        </div>

      </div>
    </div>
  );
}