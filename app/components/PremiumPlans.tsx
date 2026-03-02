import { useState } from "react";

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
    features: [
      "80+ ATS Score",
      "LinkedIn Optimization",
      "LinkedIn Growth Strategy",
      "1:1 Consultation",
      "3–5 Hours Delivery",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: 1299,
    features: [
      "90+ ATS Score Target",
      "Deep Resume Rewrite",
      "Advanced Keyword Mapping",
      "LinkedIn Optimization",
      "Priority Delivery (2–3 hrs)",
    ],
  },
];

type PremiumPlansProps = {
  company: string;
  role: string;
  atsScore: number;
  handleWhatsApp: (planName: string, price: number, company: string, role: string, atsScore: number) => void;
};

const SWIPE_THRESHOLD = 60;

export default function PremiumPlans({ company, role, atsScore, handleWhatsApp }: PremiumPlansProps) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setStartX(event.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startX === null) return;
    setDragOffset(event.clientX - startX);
  };

  const handlePointerUp = () => {
    if (dragOffset < -SWIPE_THRESHOLD && index < plans.length - 1) {
      setIndex((prev) => prev + 1);
    }

    if (dragOffset > SWIPE_THRESHOLD && index > 0) {
      setIndex((prev) => prev - 1);
    }

    setStartX(null);
    setDragOffset(0);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 overflow-hidden select-none">
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => startX !== null && handlePointerUp()}
      >
        {plans.map((plan) => (
          <article key={plan.name} className="min-w-full bg-white shadow-xl rounded-2xl p-6 border border-gray-200 relative">
            {plan.popular && (
              <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <h3 className="text-xl font-semibold text-black">{plan.name}</h3>
            <p className="text-3xl font-bold mt-2">₹{plan.price}</p>
            <p className="text-xs text-red-500 font-semibold mt-1">Limited daily slots (Only 5 per day)</p>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {plan.features.map((feature) => (
                <li key={feature}>✔ {feature}</li>
              ))}
            </ul>

            <button
              onClick={() => handleWhatsApp(plan.name, plan.price, company, role, atsScore)}
              className="mt-6 w-full primary-button !rounded-lg"
            >
              Get Optimized Now
            </button>
          </article>
        ))}
      </div>

      <div className="text-center mt-4 text-sm text-gray-500">Swipe left / right →</div>
    </div>
  );
}
