const ScoreCircle = ({ score }: { score?: number }) => {
  const safeScore = typeof score === "number" ? score : 0;

  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = safeScore / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // 🎨 Dynamic Colors
  let strokeColor = "";

  if (score === undefined || score === null) {
    strokeColor = "url(#defaultGrad)";
  } else if (safeScore >= 80) {
    strokeColor = "#22c55e"; // Green
  } else if (safeScore >= 60) {
    strokeColor = "#eab308"; // Yellow
  } else {
    strokeColor = "#ef4444"; // Red
  }

  return (
    <div className="relative w-[84px] h-[84px] sm:w-[92px] sm:h-[92px]">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Default gradient */}
        <defs>
          <linearGradient id="defaultGrad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF97AD" />
            <stop offset="100%" stopColor="#5171FF" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={strokeColor}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Score Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-semibold text-xs sm:text-sm">
          {score !== undefined ? `${safeScore}/100` : "--"}
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;