import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import PremiumPlans from "~/components/PremiumPlans";
import { trackPlanClick } from "~/lib/track";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [company, setCompany] = useState("Target Company");
  const [role, setRole] = useState("Target Role");

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [auth.isAuthenticated, id, isLoading, navigate]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume) as Resume & {
        companyName?: string;
        jobTitle?: string;
      };

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      setResumeUrl(
        URL.createObjectURL(
          new Blob([resumeBlob], { type: "application/pdf" })
        )
      );

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      setImageUrl(URL.createObjectURL(imageBlob));

      setFeedback(data.feedback);
      setCompany(data.companyName || "Target Company");
      setRole(data.jobTitle || "Target Role");
    };

    loadResume();
  }, [fs, id, kv]);

  const atsScore = feedback?.ATS.score || 0;

  const handleWhatsApp = (
    planName: string,
    price: number,
    selectedCompany: string,
    selectedRole: string,
    score: number
  ) => {
    trackPlanClick(planName, selectedCompany, selectedRole, score);

    const message = `Hi, I am interested in ${planName} (₹${price})
Company: ${selectedCompany}
Role: ${selectedRole}
Current ATS Score: ${score}`;

    const url = `https://wa.me/917029139659?text=${encodeURIComponent(
      message
    )}`;

    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="!pt-0">
      {/* NAVIGATION */}
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img
            src="/icons/back.svg"
            alt="back"
            className="w-2.5 h-2.5"
          />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        {/* LEFT SIDE - RESUME PREVIEW */}
        <section className="hidden lg:flex feedback-section bg-[url('/images/bg-small.svg')] bg-cover lg:h-[100vh] lg:sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border h-full max-h-[90vh] w-full lg:w-fit">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        {/* RIGHT SIDE - FEEDBACK */}
        <section className="feedback-section pb-24">
          <h2 className="text-3xl sm:text-4xl !text-black font-bold">
            Resume Review
          </h2>

          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />

              <ATS
                score={atsScore}
                suggestions={feedback.ATS.tips || []}
              />

              <Details feedback={feedback} />

              {/* LOW SCORE ALERT */}
              {atsScore < 75 && (
                <div className="mt-4 bg-red-50 border border-red-200 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-red-600">
                    ⚠ Your resume may not pass ATS screening.
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Increase your chances with an optimized resume
                    tailored for {company} – {role}.
                  </p>

                  <button
                    onClick={() =>
                      document
                        .getElementById("premium-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="mt-4 bg-black text-white px-6 py-2 rounded-lg"
                  >
                    View Optimization Plans →
                  </button>
                </div>
              )}

              {atsScore < 60 && (
                <div className="text-center">
                  <p className="text-red-600 font-semibold">
                    🚨 High Risk of Rejection
                  </p>
                </div>
              )}

              {/* PREMIUM PLANS */}
              <div id="premium-section" className="mt-6">
                <PremiumPlans
                  company={company}
                  role={role}
                  atsScore={atsScore}
                  handleWhatsApp={handleWhatsApp}
                />
              </div>

              {/* FOOTER CTA */}
              <div className="mt-6 border-t pt-8 text-center">
                <h3 className="text-lg font-semibold">
                  🚀 Need Expert Resume Optimization?
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
                  Get expert resume optimization tailored to your
                  target company and job role, delivered within 3–5
                  hours.
                </p>

                <Link
                  to="/premium"
                  className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  View Professional Plans
                </Link>
              </div>
            </div>
          ) : (
            <img
              src="/images/resume-scan-2.gif"
              className="w-full"
            />
          )}
        </section>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 z-50">
        <Link
          to="/premium#plans"
          className="w-full block text-center bg-black text-white py-3 rounded-full text-sm font-medium"
        >
          Get 80+ ATS Score – ₹499 →
        </Link>
      </div>

    </main>
  );
};

export default Resume;
