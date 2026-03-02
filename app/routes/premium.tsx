import { Link } from "react-router";
import Navbar from "~/components/Navbar";
import PremiumPlans from "~/components/PremiumPlans";

export const meta = () => [
  { title: "Resumind | Premium Plans" },
  { name: "description", content: "Premium ATS optimization plans" },
];

const PREMIUM_COMPANY = "Your Target Company";
const PREMIUM_ROLE = "Your Target Role";
const PREMIUM_ATS = 0;

export default function PremiumPage() {
  const handleWhatsApp = (planName: string, price: number, company: string, role: string, atsScore: number) => {
    const message = `Hi, I am interested in ${planName} (₹${price})\nCompany: ${company}\nRole: ${role}\nCurrent ATS Score: ${atsScore}`;
    const url = `https://wa.me/917029139659?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-8 sm:py-10">
          <h1>Professional Resume Optimization Plans</h1>
          <h2>Choose a package to target an 80+ ATS score with expert support.</h2>
        </div>

        <PremiumPlans
          company={PREMIUM_COMPANY}
          role={PREMIUM_ROLE}
          atsScore={PREMIUM_ATS}
          handleWhatsApp={handleWhatsApp}
        />

        <Link to="/upload" className="primary-button w-fit px-6 sm:px-8 mt-4">
          Analyze Another Resume
        </Link>
      </section>
    </main>
  );
}
