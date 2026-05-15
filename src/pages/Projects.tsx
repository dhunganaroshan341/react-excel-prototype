import { useEffect, useState } from "react";
import axios from "axios";

type Project = {
  id: number;
  name: string;
  description: string;
  status: string;
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://project-management.peakora.tech/api/v1/projects"
      );

      setProjects(res.data.data); // 👈 IMPORTANT
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

return (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    
    {/* Header */}
    <div className="px-8 py-6 border-b bg-white">
      <h1 className="text-3xl font-bold text-gray-800">
        Project Overview
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Manage and track all active projects
      </p>
    </div>

    {/* Content */}
    <div className="px-8 py-6">
      
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          
          // status color logic
          const statusColor =
            project.status === "ongoing"
              ? "bg-green-100 text-green-700"
              : project.status === "completed"
              ? "bg-gray-200 text-gray-700"
              : project.status === "on-hold"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700";

          return (
            <div
              key={project.id}
              className="bg-white border rounded-lg p-4 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2">
                {project.name}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-1 rounded ${statusColor}`}
                >
                  {project.status}
                </span>

                <span className="text-xs text-gray-400">
                  ID: {project.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </div>
);
}