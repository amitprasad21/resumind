import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

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
  const [deletedResume, setDeletedResume] = useState<Resume | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleDelete = async (resume: Resume) => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);

    setResumes((prev) => prev.filter((item) => item.id !== resume.id));
    setDeletedResume(resume);
    await kv.delete(`resume:${resume.id}`);

    undoTimerRef.current = setTimeout(() => {
      setDeletedResume(null);
      undoTimerRef.current = null;
    }, 5000);
  };

  const handleUndoDelete = async () => {
    if (!deletedResume) return;

    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
      undoTimerRef.current = null;
    }

    await kv.set(`resume:${deletedResume.id}`, JSON.stringify(deletedResume));
    setResumes((prev) => [deletedResume, ...prev]);
    setDeletedResume(null);
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-8 sm:py-12">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {deletedResume && (
          <div className="w-full max-w-md bg-black text-white px-4 py-3 rounded-xl flex items-center justify-between">
            <p className="text-sm">Resume deleted</p>
            <button onClick={handleUndoDelete} className="text-sm font-semibold underline">
              Undo (5s)
            </button>
          </div>
        )}

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="w-full">
            <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-4 w-full pb-2">
              {resumes.map((resume) => (
                <div key={resume.id} className="snap-center shrink-0 w-[280px]">
                  <ResumeCard resume={resume} onDelete={handleDelete} />
                </div>
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
      </section>
    </main>
  );
}
