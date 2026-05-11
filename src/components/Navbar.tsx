import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  const base =
    "px-4 py-2 text-sm rounded-md transition";

  const active = "bg-green-600 text-white";
  const inactive = "text-gray-600 hover:bg-gray-100";

  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left brand */}
        <div className="font-semibold text-gray-800">
          MAW System
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          
          <Link
            to="/"
            className={`${base} ${
              isActive("/") ? active : inactive
            }`}
          >
            Projects
          </Link>

          <Link
            to="/excel"
            className={`${base} ${
              isActive("/excel") ? active : inactive
            }`}
          >
            Excel Grid
          </Link>

          <Link
            to="/excel-embed"
            className={`${base} ${
              isActive("/excel-embed") ? active : inactive
            }`}
          >
            Excel Embed
          </Link>
          <Link
            to="/simple-excel-upload"
            className={`${base} ${
              isActive("/simple-excel-upload") ? active : inactive
            }`}
          >
           Simple Excel Upload
          </Link>
          <Link
            to="/excel-upload"
            className={`${base} ${
              isActive("/excel-upload") ? active : inactive
            }`}
          >
            Excel Upload
          </Link>
          <Link
            to="/multi-sheet-excel-upload"
            className={`${base} ${
              isActive("/multi-sheet-excel-upload") ? active : inactive
            }`}
          >
            Multi Upload
          </Link>
           <Link
            to="/advance-sheet"
            className={`${base} ${
              isActive("/advance-sheet") ? active : inactive
            }`}
          >
            Advance Sheet
          </Link>
          <Link
            to="/excel-experiment"
            className={`${base} ${
              isActive("/excel-experiment") ? active : inactive
            }`}
          >
            Excel Experiment
          </Link>

        </div>

      </div>
    </div>
  );
}