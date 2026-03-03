import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumeItems = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumeItems?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, [kv]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />

      <section className="main-section pb-32 lg:pb-0">
        <div className="page-heading py-8 sm:py-12">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="w-full">
            {/* Mobile Slider */}
            <div className="lg:hidden flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth w-full">
              {resumes.map((resume) => (
                <div key={resume.id} className="snap-center shrink-0 w-full px-2">
                  <ResumeCard resume={resume} />
                </div>
              ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-6 w-full">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="primary-button w-fit text-base sm:text-lg font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}

    {/* ================= RESPONSIVE BOTTOM CTA ================= */}

<div className="mt-16 mb-12 lg:mt-24 lg:mb-20 flex justify-center">
  <Link
    to="/premium"
    className="
      px-8 py-3
      lg:px-12 lg:py-4
      bg-white text-black
      rounded-full
      text-sm lg:text-base
      font-semibold
      shadow-md
      border border-gray-200
      transition-all duration-300 ease-out
      hover:-translate-y-1
      hover:shadow-xl
      hover:bg-gray-100
      active:scale-95
    "
  >
    Get Your Resume Optimized →
  </Link>
</div>

      </section>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </main>
  );
}