import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import ScoreCircle from "~/components/ScoreCircle";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;
  const { fs } = usePuterStore();
  const navigate = useNavigate();

  const [resumeUrl, setResumeUrl] = useState("");

  const score = feedback?.ATS?.score ?? 0;

  /* ================= LOAD IMAGE ================= */
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
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-[420px] transition hover:shadow-xl">

      {/* Floating Score */}
      <div className="absolute top-4 right-4 z-20">
        <ScoreCircle score={feedback?.overallScore} />
      </div>

      {/* Clickable Top Section */}
      <div
        onClick={() => navigate(`/resume/${id}`)}
        className="cursor-pointer flex flex-col h-[80%]"
      >
        {/* Title Section (20%) */}
        <div className="p-4 h-[20%] flex flex-col justify-center">
          {companyName || jobTitle ? (
            <>
              {companyName && (
                <h2 className="text-lg font-semibold truncate">
                  {companyName}
                </h2>
              )}
              {jobTitle && (
                <p className="text-sm text-gray-500 truncate">
                  {jobTitle}
                </p>
              )}
            </>
          ) : (
            <h2 className="text-lg font-semibold">Resume</h2>
          )}
        </div>

        {/* Image Section (60%) */}
        <div className="h-[60%] px-4 pb-4">
          {resumeUrl && (
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-full object-cover rounded-xl"
            />
          )}
        </div>
      </div>

      {/* Bottom Button (100%) */}
      <div className="h-[20%] flex items-center px-4 pb-4">

        <button
          onClick={() => navigate("/premium")}
          className="
            w-full
            bg-black text-white
            py-2 rounded-xl
            text-sm font-medium
            transition-all duration-300
            hover:-translate-y-1
            hover:bg-gray-800
          "
        >
          Improve ATS →
        </button>

      </div>

    </div>
  );
};

export default ResumeCard;