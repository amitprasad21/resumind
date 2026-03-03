import type { Route } from "./+types/premium";
import { Link } from "react-router";
import PremiumPlans from "~/components/PremiumPlans";
import { trackPlanClick } from "~/lib/track";

export const meta = ({}: Route.MetaArgs) => [
  { title: "Resumind | Premium Plans" },
  { name: "description", content: "Premium ATS optimization plans" },
];

const PREMIUM_COMPANY = "Your Target Company";
const PREMIUM_ROLE = "Your Target Role";
const PREMIUM_ATS = 0;

export default function PremiumPage() {
  const handleWhatsApp = (
    planName: string,
    price: number,
    company: string,
    role: string,
    atsScore: number
  ) => {
    trackPlanClick(planName, company, role, atsScore);

    const message = `Hi, I am interested in ${planName} (₹${price})\nCompany: ${company}\nRole: ${role}\nCurrent ATS Score: ${atsScore}`;
    const url = `https://wa.me/917029139659?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen px-6 py-16 bg-gradient-to-br from-[#f5f6fa] to-[#e4e7f0]">

      <Link
  to="/"
  className="
    fixed top-6 left-6 z-50
    w-10 h-10
    flex items-center justify-center
    bg-white/90 backdrop-blur
    border border-gray-200
    rounded-full
    shadow-md
    transition-all duration-300
    hover:-translate-y-1
    hover:shadow-lg
    hover:bg-white
  "
>
  <img src="/icons/home.svg" alt="home" className="w-4 h-4" />
</Link>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          Professional Resume Optimization Plans
        </h1>

        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Choose a package to target an 80+ ATS score with expert support.
        </p>
      </div>

      {/* Plans */}
      <div className="mt-10 md:mt-16 max-w-5xl w-full mx-auto">
        <PremiumPlans
          company={PREMIUM_COMPANY}
          role={PREMIUM_ROLE}
          atsScore={PREMIUM_ATS}
          handleWhatsApp={handleWhatsApp}
          variant="grid"
        />
      </div>

    </main>
  );
}