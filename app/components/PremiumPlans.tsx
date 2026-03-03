import { useEffect, useState } from "react";

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
  variant?: "grid" | "carousel";
};

export default function PremiumPlans({
  company,
  role,
  atsScore,
  handleWhatsApp,
  variant = "carousel",
}: Props) {
  const [slotsLeft, setSlotsLeft] = useState(3);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("slotDate");
    const savedSlots = localStorage.getItem("slotsLeft");

    if (savedDate === today && savedSlots) {
      setSlotsLeft(Number(savedSlots));
    } else {
      const randomSlots = Math.floor(Math.random() * 3) + 2;
      setSlotsLeft(randomSlots);
      localStorage.setItem("slotDate", today);
      localStorage.setItem("slotsLeft", randomSlots.toString());
    }
  }, []);

  return (
    <>
      {/* ================= DESKTOP GRID (Premium Page) ================= */}
      {variant === "grid" && (
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative bg-white border rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
            >
              {plan.popular && (
                <span className="absolute top-3 right-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-3xl font-bold mt-2">₹{plan.price}</p>

                <p className="text-xs text-red-500 font-semibold mt-2">
                  Only {slotsLeft} slots left today
                </p>

                <ul className="mt-5 space-y-2 text-sm text-gray-600">
                  {plan.features.map((feature) => (
                    <li key={feature}>✔ {feature}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() =>
                  handleWhatsApp(plan.name, plan.price, company, role, atsScore)
                }
                className="mt-6 w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
              >
                Get Optimized →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= CAROUSEL (Resume Page + Mobile) ================= */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar w-full gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="snap-center shrink-0 w-full px-4"
          >
            <div className="relative bg-white border rounded-2xl p-6 shadow-md flex flex-col justify-between h-[80vh]">
              {plan.popular && (
                <span className="absolute top-3 right-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">₹{plan.price}</p>

                <p className="text-xs text-red-500 font-semibold mt-2">
                  Only {slotsLeft} slots left today
                </p>

                <ul className="mt-5 space-y-2 text-sm text-gray-600">
                  {plan.features.map((feature) => (
                    <li key={feature}>✔ {feature}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() =>
                  handleWhatsApp(plan.name, plan.price, company, role, atsScore)
                }
                className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
              >
                Get Optimized →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP CAROUSEL (Resume Page Only) ================= */}
      {variant === "carousel" && (
        <div className="hidden md:flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar w-full gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="snap-center shrink-0 w-[300px]"
            >
              <div className="relative bg-white border rounded-2xl p-6 shadow-md flex flex-col justify-between h-[480px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                {plan.popular && (
                  <span className="absolute top-3 right-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-2xl font-bold mt-2">₹{plan.price}</p>

                  <p className="text-xs text-red-500 font-semibold mt-2">
                    Only {slotsLeft} slots left today
                  </p>

                  <ul className="mt-5 space-y-2 text-sm text-gray-600">
                    {plan.features.map((feature) => (
                      <li key={feature}>✔ {feature}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() =>
                    handleWhatsApp(plan.name, plan.price, company, role, atsScore)
                  }
                  className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
                >
                  Get Optimized →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}