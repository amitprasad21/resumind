import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

type ResumeCardProps = {
  resume: Resume;
  onDelete: (resume: Resume) => void;
};

const ResumeCard = ({ resume, onDelete }: ResumeCardProps) => {
  const { companyName, jobTitle, imagePath } = resume;
  const { fs } = usePuterStore();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");
  const score = resume.feedback?.ATS?.score || 0;
  const scoreColor = score > 74 ? "text-green-400" : score > 49 ? "text-yellow-400" : "text-red-400";

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      setResumeUrl(URL.createObjectURL(blob));
    };

    loadResume();
  }, [fs, imagePath]);

  return (
    <div className="bg-[#111114] border border-gray-800 rounded-2xl p-4 h-[420px] w-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-xs text-gray-400">{companyName || "Company"}</p>
          <h3 className="text-sm font-semibold text-white mt-1">{jobTitle || "Role"}</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-xs font-semibold ${scoreColor}`}>
            {score}
          </div>
          <button
            onClick={() => onDelete(resume)}
            className="w-7 h-7 rounded-full bg-[#1c1c1f] border border-gray-700 hover:bg-[#2a2a2e] transition flex items-center justify-center"
            aria-label="Delete resume"
          >
            <img src="/icons/cross.svg" alt="delete" className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden min-h-0 mb-4">
        {resumeUrl ? (
          <img src={resumeUrl} className="w-full h-full object-cover" alt="resume" />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      <button
        onClick={() => navigate("/premium#plans")}
        className="mt-auto mx-auto w-auto min-w-[130px] bg-[#2f2f33] text-gray-100 border border-gray-600 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#434349] transition"
      >
        Improve ATS
      </button>
    </div>
  );
};

export default ResumeCard;
