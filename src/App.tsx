import { Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import Excel from "./excel";
import ExcelEmbed from "./ExcelEmbed";
import Navbar from "./components/Navbar";

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
        </Routes>
      </div>

    </div>
  );
}