import { Link, useNavigate } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

type ResumeCardProps = {
  resume: Resume;
  onDelete: (resume: Resume) => void;
};

const ResumeCard = ({ resume, onDelete }: ResumeCardProps) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;
  const { fs } = usePuterStore();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [fs, imagePath]);

  return (
    <div className="resume-card animate-in fade-in duration-1000">
      <Link to={`/resume/${id}`} className="flex flex-col gap-6 sm:gap-8">
        <div className="resume-card-header">
          <div className="flex flex-col gap-2">
            {companyName && <h2 className="!text-black !text-xl sm:!text-2xl font-bold break-words">{companyName}</h2>}
            {jobTitle && <h3 className="text-sm sm:text-base break-words text-gray-500">{jobTitle}</h3>}
            {!companyName && !jobTitle && <h2 className="!text-black !text-xl sm:!text-2xl font-bold">Resume</h2>}
          </div>
          <div className="flex-shrink-0">
            <ScoreCircle score={feedback.overallScore} />
          </div>
        </div>

        {resumeUrl && (
          <div className="gradient-border animate-in fade-in duration-1000">
            <div className="w-full h-full">
              <img
                src={resumeUrl}
                alt="resume"
                className="w-full h-[220px] sm:h-[280px] lg:h-[240px] xl:h-[220px] object-cover object-top rounded-xl"
              />
            </div>
          </div>
        )}
      </Link>

      <div className="mt-auto pt-2 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate("/premium#plans")}
          className="bg-[#3b3b3f] text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#4a4a50] transition"
        >
          Improve ATS
        </button>

        <button
          onClick={() => onDelete(resume)}
          className="w-7 h-7 rounded-full bg-[#1c1c1f] border border-gray-700 hover:bg-[#2a2a2e] transition flex items-center justify-center"
          aria-label="Delete resume"
        >
          <img src="/icons/cross.svg" alt="delete" className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
