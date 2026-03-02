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
  const [undoSeconds, setUndoSeconds] = useState(0);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const clearUndoTimers = () => {
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
      undoTimerRef.current = null;
    }

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  };

  const handleDelete = async (resume: Resume) => {
    clearUndoTimers();

    setResumes((prev) => prev.filter((item) => item.id !== resume.id));
    setDeletedResume(resume);
    setUndoSeconds(7);
    await kv.delete(`resume:${resume.id}`);

    countdownIntervalRef.current = setInterval(() => {
      setUndoSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    undoTimerRef.current = setTimeout(() => {
      clearUndoTimers();
      setDeletedResume(null);
      setUndoSeconds(0);
    }, 7000);
  };

  const handleUndoDelete = async () => {
    if (!deletedResume) return;

    clearUndoTimers();
    await kv.set(`resume:${deletedResume.id}`, JSON.stringify(deletedResume));
    setResumes((prev) => [deletedResume, ...prev]);
    setDeletedResume(null);
    setUndoSeconds(0);
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
              Undo ({undoSeconds}s)
            </button>
          </div>
        )}

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-base sm:text-lg font-semibold">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
