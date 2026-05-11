import { Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Excel from "./pages/AdvanceSheet";
import ExcelEmbed from "./pages/ExcelEmbed";
import Navbar from "./components/Navbar";
import ExcelUpload from "./pages/ExcelUpload";
import SimpleExcelUpload from "./pages/SimpleExcelUpload";
import MultiSheetExcelUPload from "./pages/MultiSheetExcelUpload";
import AdvanceSheet from "./pages/AdvanceSheet";
import ExcelExperiment from "./pages/ExcelExpirement";

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
          <Route path="/advance-sheet" element={<AdvanceSheet />} />
          <Route path="/excel-experiment" element={<ExcelExperiment />} />
        </Routes>
      </div>

    </div>
  );
}