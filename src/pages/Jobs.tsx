import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock3,
  ArrowUpRight,
  Search,
} from "lucide-react";

/* =========================
   TYPES
========================= */

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Job = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  location: string;
  employment_type: string;
  status: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const JobsPage: React.FC = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<"all" | number>("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH CATEGORIES
  ========================= */

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/job-categories"
      );

      const data: ApiResponse<Category[]> = await res.json();

      setCategories(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     FETCH JOBS
  ========================= */

  const fetchJobs = async (category: "all" | number) => {
    try {
      setLoading(true);

      let url = "http://127.0.0.1:8000/api/v1/jobs";

      if (category !== "all") {
        url += `?category_id=${category}`;
      }

      const res = await fetch(url);

      const data: ApiResponse<Job[]> = await res.json();

      setJobs(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INIT
  ========================= */

  useEffect(() => {
    fetchCategories();
    fetchJobs("all");
  }, []);

  /* =========================
     CATEGORY CHANGE
  ========================= */

  const handleCategoryChange = (
    category: "all" | number
  ) => {
    setSelectedCategory(category);
    fetchJobs(category);
  };

  /* =========================
     FILTER SEARCH
  ========================= */

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      job.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-black">

      {/* TOP STRIP */}
      <div className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-xs uppercase tracking-[0.25em]">

          <span>The Career Journal</span>

          <span>Daily Opportunities</span>

        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="border-b-4 border-black">

        <div className="max-w-7xl mx-auto px-6 py-10 text-center">

          <p className="uppercase tracking-[0.35em] text-xs mb-3">
            International Edition
          </p>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Employment
            <br />
            Bulletin
          </h1>

          <p className="mt-6 text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover engineering, design, product,
            marketing and operational roles from
            growing digital teams.
          </p>

        </div>
      </div>

      {/* SEARCH */}
      <div className="border-b border-black bg-white">

        <div className="max-w-7xl mx-auto px-6 py-5">

          <div className="relative max-w-xl mx-auto">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search title or location..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full border border-black bg-white pl-12 pr-4 py-4 text-sm uppercase tracking-wide outline-none focus:ring-0"
            />

          </div>

        </div>

      </div>

      {/* CATEGORY NAV */}
      <div className="border-b border-black bg-[#f3efe7]">

        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-3">

          <button
            onClick={() =>
              handleCategoryChange("all")
            }
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border border-black transition
              ${
                selectedCategory === "all"
                  ? "bg-black text-white"
                  : "bg-white hover:bg-black hover:text-white"
              }`}
          >
            All Sections
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                handleCategoryChange(cat.id)
              }
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border border-black transition
                ${
                  selectedCategory === cat.id
                    ? "bg-black text-white"
                    : "bg-white hover:bg-black hover:text-white"
                }`}
            >
              {cat.name}
            </button>
          ))}

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* LOADING */}
        {loading ? (
          <div className="text-center text-lg uppercase tracking-widest">
            Loading Bulletin...
          </div>
        ) : filteredJobs.length === 0 ? (

          /* EMPTY */
          <div className="border border-black bg-white p-10 text-center">

            <h2 className="text-2xl font-black uppercase">
              No Openings Found
            </h2>

            <p className="mt-3 text-gray-600">
              Try changing your category or search.
            </p>

          </div>

        ) : (

          /* NEWSPAPER GRID */
          <div className="grid lg:grid-cols-3 gap-8">

            {filteredJobs.map((job, index) => (

              <article
                key={job.id}
                onClick={() =>
                  navigate(`/jobs/${job.slug}`)
                }
                className={`cursor-pointer border border-black bg-white p-6 transition hover:bg-black hover:text-white group
                  
                  ${
                    index === 0
                      ? "lg:col-span-2 lg:row-span-2"
                      : ""
                  }
                `}
              >

                {/* CATEGORY */}
                <div className="flex justify-between items-center border-b border-black pb-3">

                  <span className="text-[11px] uppercase tracking-[0.25em] font-bold">
                    {job.category.name}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                  />

                </div>

                {/* TITLE */}
                <h2
                  className={`
                    uppercase tracking-tight font-black leading-none mt-5

                    ${
                      index === 0
                        ? "text-4xl md:text-5xl"
                        : "text-2xl"
                    }
                  `}
                >
                  {job.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-5 text-sm leading-loose text-gray-700 group-hover:text-gray-200">
                  {job.short_description}
                </p>

                {/* META */}
                <div className="mt-8 pt-5 border-t border-black flex flex-col gap-3 text-xs uppercase tracking-[0.18em]">

                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 size={14} />
                    <span>{job.employment_type}</span>
                  </div>

                </div>

                {/* STATUS */}
                <div className="mt-6">

                  <span className="border border-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
                    {job.status}
                  </span>

                </div>

              </article>

            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;