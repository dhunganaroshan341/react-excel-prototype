import { Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import Excel from "./excel";
import ExcelEmbed from "./ExcelEmbed";
import Navbar from "./components/Navbar";
import ExcelUpload from "./ExcelUpload";
import SimpleExcelUpload from "./SimpleExcelUpload";
import MultiSheetExcelUPload from "./MultiSheetExcelUpload";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Global Navbar */}
      <Navbar />

      {/* Pages */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/excel" element={<Excel />} />
          <Route path="/excel-embed" element={<ExcelEmbed />} />
          <Route path="/excel-embed" element={<ExcelEmbed />} />
          <Route path="/simple-excel-upload" element={<SimpleExcelUpload />} />
          <Route path="/excel-upload" element={<ExcelUpload />} />
          <Route path="/multi-sheet-excel-upload" element={<MultiSheetExcelUPload />} />
        </Routes>
      </div>

    </div>
  );
}