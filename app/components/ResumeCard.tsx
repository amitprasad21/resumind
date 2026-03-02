import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { companyName, jobTitle, imagePath } = resume;
  const { fs } = usePuterStore();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");
  const score = resume.feedback?.ATS?.score || 0;

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

        <div className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-xs font-semibold text-white">
          {score}
        </div>
      </div>

      <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden min-h-0 mb-4">
        {resumeUrl ? (
          <img src={resumeUrl} className="w-full h-full object-cover" alt="resume" />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      {score < 75 && (
        <button
          onClick={() => navigate("/premium")}
          className="mt-auto mx-auto w-auto min-w-[128px] bg-gray-200 text-black border border-gray-300 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-300 transition"
        >
          Improve ATS
        </button>
      )}
    </div>
  );
};

export default ResumeCard;
