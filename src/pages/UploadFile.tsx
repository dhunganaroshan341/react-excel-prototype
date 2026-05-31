import { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    setLoading(true);
    setResponse(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/graph/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        
      <h2 className="text-lg font-semibold mb-4 border-b flex items-center gap-2">
  Upload Excel File
</h2>
        {/* FILE INPUT */}
  <ArrowUpTrayIcon className="w-6 h-6 text-blue-500" />
  <div>


        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full cursor-pointer"
        />


        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
   </div>

        {/* RESPONSE */}
        {response && (
          <div className="mt-4 text-sm">
            {response.success ? (
              <p className="text-green-600">
                ✔ Uploaded successfully
              </p>
            ) : (
              <p className="text-red-600">
                ❌ Upload failed
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}