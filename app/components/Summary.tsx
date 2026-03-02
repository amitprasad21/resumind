import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

type CategoryProps = {
  title: string;
  score: number;
  targetId: string;
};

const Category = ({ title, score, targetId }: CategoryProps) => {
  const textColor = score > 70 ? "text-green-600" : score > 49 ? "text-yellow-600" : "text-red-600";

  return (
    <div
      className="resume-summary cursor-pointer hover:bg-gray-100 transition rounded-xl"
      onClick={() =>
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    >
      <div className="category">
        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-xl sm:text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-xl sm:text-2xl self-end sm:self-auto">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-5 sm:gap-8">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <Category title="Tone & Style" score={feedback.toneAndStyle.score} targetId="tone-section" />
      <Category title="Content" score={feedback.content.score} targetId="content-section" />
      <Category title="Structure" score={feedback.structure.score} targetId="structure-section" />
      <Category title="Skills" score={feedback.skills.score} targetId="skills-section" />
    </div>
  );
};

export default Summary;
