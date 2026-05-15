import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
} from "lucide-react";

import ApplyForm from "../components/ApplyForm";

/* =========================
   TYPES
========================= */

type Job = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  location: string;
  employment_type: string;
  status: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
};

/* =========================
   COMPONENT
========================= */

const JobDetail: React.FC = () => {
  const { slug } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  // APPLY MODAL STATE
  const [showApply, setShowApply] = useState(false);

  /* =========================
     FETCH JOB
  ========================= */

  const fetchJob = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/jobs/${slug}`
      );

      const data = await res.json();

      setJob(data.data);
    } catch (err) {
      console.error("Error fetching job", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [slug]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading editorial...
      </div>
    );
  }

  /* =========================
     NOT FOUND
  ========================= */

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Job not found
      </div>
    );
  }

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-white text-black">

      {/* HEADER */}
      <div className="border-b border-black px-6 py-4">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Career Bulletin
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* CATEGORY */}
        <span className="inline-block text-xs font-bold uppercase tracking-widest border border-black px-2 py-1 mb-4">
          {job.category.name}
        </span>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-black leading-tight uppercase tracking-tight">
          {job.title}
        </h1>

        {/* SHORT DESCRIPTION */}
        <p className="mt-6 text-lg text-gray-700 leading-relaxed border-l-4 border-black pl-4">
          {job.short_description}
        </p>

        {/* META */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm border-y border-black py-6">

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{job.employment_type}</span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase size={16} />
            <span>{job.status}</span>
          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-10 prose prose-lg max-w-none">

          <h2 className="text-2xl font-black uppercase mb-4">
            Job Description
          </h2>

          <p className="text-gray-800 leading-loose whitespace-pre-line">
            {job.description}
          </p>

        </div>
      </div>

      {/* APPLY BAR */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-black bg-white/95 backdrop-blur-md">

        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="text-sm">
            <p className="font-bold">
              Ready to apply?
            </p>

            <p className="text-gray-500 text-xs">
              Submit your application now
            </p>
          </div>

          <button
            onClick={() => setShowApply(true)}
            className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-900 transition"
          >
            Apply Now
            <ArrowRight size={16} />
          </button>

        </div>
      </div>

      {/* APPLY MODAL */}
      {showApply && (
        <ApplyForm
          jobId={job.id}
          onClose={() => setShowApply(false)}
          onSubmit={async (formData) => {
            try {
              const res = await fetch(
                 `http://127.0.0.1:8000/api/v1/jobs/${jobId}/apply`,
                {
                  method: "POST",
                  body: formData,
                }
              );

              const data = await res.json();

              console.log(data);

              alert("Application submitted!");

              setShowApply(false);

            } catch (err) {
              console.error(err);

              alert("Failed to submit application");
            }
          }}
        />
      )}

      {/* SPACING FOR FIXED BAR */}
      <div className="h-24"></div>

    </div>
  );
};

export default JobDetail;