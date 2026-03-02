import { useEffect, useRef, useState } from "react";

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

export default function PremiumPlans({
  company,
  role,
  atsScore,
  handleWhatsApp,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [slotsLeft, setSlotsLeft] = useState(3);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

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
    <div className="relative mt-10 w-full pb-24 md:pb-0">
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 items-center justify-center z-10"
        aria-label="Scroll plans left"
      >
        ←
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 items-center justify-center z-10"
        aria-label="Scroll plans right"
      >
        →
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth md:px-12"
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="min-w-[280px] md:min-w-[320px] bg-white border rounded-2xl p-6 relative shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
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
              onClick={() =>
                handleWhatsApp(plan.name, plan.price, company, role, atsScore)
              }
              className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Get Optimized →
            </button>
          </div>
        ))}
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
