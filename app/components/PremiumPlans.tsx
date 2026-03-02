import { useEffect, useState } from "react";

const plans = [
  {
    name: "Basic",
    price: 399,
    features: [
      "80+ ATS Score",
      "Role/Company Optimized",
      "3–5 Hours Delivery",
      "1:1 Consultation",
    ],
  },
  {
    name: "Pro",
    price: 699,
    popular: true,
    features: [
      "80+ ATS Score",
      "LinkedIn Optimization",
      "LinkedIn Strategy",
      "3–5 Hours Delivery",
    ],
  },
  {
    name: "Premium",
    price: 1299,
    features: [
      "90+ ATS Score Target",
      "Deep Resume Rewrite",
      "Priority Delivery (2–3 hrs)",
    ],
  },
];

type Props = {
  company: string;
  role: string;
  atsScore: number;
  handleWhatsApp: (
    planName: string,
    price: number,
    company: string,
    role: string,
    atsScore: number
  ) => void;
};

type Plan = (typeof plans)[number];

function PlanCard({
  plan,
  company,
  role,
  atsScore,
  slotsLeft,
  handleWhatsApp,
}: {
  plan: Plan;
  company: string;
  role: string;
  atsScore: number;
  slotsLeft: number;
  handleWhatsApp: Props["handleWhatsApp"];
}) {
  return (
    <div className="w-full bg-white border rounded-2xl p-6 relative shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {plan.popular && (
        <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-semibold">{plan.name}</h3>
      <p className="text-3xl font-bold mt-2">₹{plan.price}</p>
      <p className="text-xs text-red-500 font-semibold mt-1">
        Only {slotsLeft} slots left today
      </p>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {plan.features.map((feature) => (
          <li key={feature}>✔ {feature}</li>
        ))}
      </ul>

      <button
        onClick={() => handleWhatsApp(plan.name, plan.price, company, role, atsScore)}
        className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Get Optimized →
      </button>
    </div>
  );
}

export default function PremiumPlans({
  company,
  role,
  atsScore,
  handleWhatsApp,
}: Props) {
  const [slotsLeft, setSlotsLeft] = useState(3);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("slotDate");
    const savedSlots = localStorage.getItem("slotsLeft");

    if (savedDate === today && savedSlots) {
      setSlotsLeft(Number(savedSlots));
      return;
    }

    const randomSlots = Math.floor(Math.random() * 3) + 2;
    setSlotsLeft(randomSlots);
    localStorage.setItem("slotDate", today);
    localStorage.setItem("slotsLeft", randomSlots.toString());
  }, []);

  return (
    <div className="w-full">
      <div className="hidden md:grid md:grid-cols-3 gap-8 w-full">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            company={company}
            role={role}
            atsScore={atsScore}
            slotsLeft={slotsLeft}
            handleWhatsApp={handleWhatsApp}
          />
        ))}
      </div>

      <div className="md:hidden mt-12">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-2">
          {plans.map((plan) => (
            <div key={plan.name} className="snap-center min-w-[88%]">
              <PlanCard
                plan={plan}
                company={company}
                role={role}
                atsScore={atsScore}
                slotsLeft={slotsLeft}
                handleWhatsApp={handleWhatsApp}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
        <button
          onClick={() => handleWhatsApp("Pro", 699, company, role, atsScore)}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold"
        >
          Get 80+ ATS Score – ₹699 →
        </button>
      </div>
    </div>
  );
}
