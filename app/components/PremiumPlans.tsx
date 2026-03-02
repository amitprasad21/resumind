import { useEffect, useState, type TouchEvent } from "react";

const plans = [
  {
    name: "Basic",
    price: 299,
    features: [
      "80+ ATS Score",
      "Role/Company Optimized",
      "10–12 Hours Delivery",
      "1:1 Consultation",
    ],
  },
  {
    name: "Pro",
    price: 499,
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
    price: 999,
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
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 border relative w-full">
      {plan.popular && (
        <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-semibold">{plan.name}</h3>
      <p className="text-3xl font-bold mt-2">₹{plan.price}</p>
      <p className="text-xs text-red-500 font-semibold mt-1">Only {slotsLeft} slots left today</p>

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
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (startX === null) return;

    const diff = e.changedTouches[0].clientX - startX;

    if (diff < -80 && index < plans.length - 1) {
      setIndex((prev) => prev + 1);
    }

    if (diff > 80 && index > 0) {
      setIndex((prev) => prev - 1);
    }

    setStartX(null);
  };

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
    <div className="w-full max-w-5xl mx-auto">
      <div className="hidden md:grid md:grid-cols-3 gap-8 items-stretch justify-items-center">
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

      <div
        className="md:hidden relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {plans.map((plan) => (
            <div key={plan.name} className="w-full flex-shrink-0 px-6">
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
    </div>
  );
}
