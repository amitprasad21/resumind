import type { Route } from "./+types/premium";
import Navbar from "~/components/Navbar";
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
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center px-6 py-24 bg-gradient-to-br from-[#f5f6fa] to-[#e4e7f0]">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900">
            Professional Resume Optimization Plans
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Choose a package to target an 80+ ATS score with expert support.
          </p>
        </div>

        <div id="plans" className="mt-10 md:mt-16 max-w-5xl w-full">
          <PremiumPlans
            company={PREMIUM_COMPANY}
            role={PREMIUM_ROLE}
            atsScore={PREMIUM_ATS}
            handleWhatsApp={handleWhatsApp}
          />
        </div>

      </main>
    </>
  );
}
