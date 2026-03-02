import { Link, useNavigate } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;
  const { fs } = usePuterStore();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");
  const score = resume.feedback?.ATS?.score || 0;

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

      {score < 75 && (
        <button
          onClick={() => navigate(`/resume/${resume.id}`)}
          className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Improve ATS Score →
        </button>
      )}
    </div>
  );
};

export default ResumeCard;
