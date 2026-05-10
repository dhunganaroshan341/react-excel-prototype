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

        </div>

      </div>
    </div>
  );
}