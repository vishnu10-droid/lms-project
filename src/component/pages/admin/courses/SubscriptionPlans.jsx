import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function SubscriptionPlans() {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      name: "Basic",
      price: 0,
      highlight: false,
      features: [
        { text: "Recorded Videos (Selected)", available: true },
        { text: "Limited Learning Material", available: true },
        { text: "Access to Free Courses Only", available: true },
        { text: "Downloadable Resources", available: true },
        { text: "Certificates", available: true },
        { text: "Community Support Only", available: true },
        { text: "No Projects", available: false },
        { text: "No Mentor", available: false },
        { text: "No Live Classes", available: false },
      ],
    },
    {
      name: "Professional",
      price: 25,
      highlight: true,
      features: [
        { text: "All Courses + Advanced Workshops", available: true },
        { text: "Personalized Study Plan", available: true },
        { text: "Mentor Support (Shared/Group)", available: true },
        { text: "Downloadable Resources", available: true },
        { text: "24/7 Platform Access", available: true },
        { text: "Quizzes & Assessments", available: true },
        { text: "Certificate", available: true },
        { text: "Unlimited Projects", available: true },
        { text: "All Courses + Advanced Workshops", available: false },
        { text: "Annual Learning Pass", available: false },
      ],
    },
    {
      name: "Enterprise",
      price: 100,
      highlight: false,
      features: [
        { text: "Live Classes & Masterclasses", available: true },
        { text: "Priority Support & VIP Access", available: true },
        { text: "24/7 Platform Access", available: true },
        { text: "VIP Access to Events", available: true },
        { text: "Dedicated Mentor / Instructor", available: true },
        { text: "Downloadable Resources", available: true },
        { text: "Skill Level & Career Roadmap", available: true },
        { text: "Annual Learning Pass", available: true },
        { text: "Unlimited Projects", available: true },
        { text: "All Courses + Advanced Workshops", available: true },
        { text: "Quizzes & Assessments", available: true },
        { text: "Personalized Study Plan", available: true },
        { text: "Certificate", available: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-6 animate-fadeIn">
      
      {/* Billing Toggle */}
      <div className="text-center mb-6 animate-slideDown">
        <h2 className="text-3xl font-bold">
          Empower Your{" "}
          <span className="text-indigo-600">Learning Journey</span>
        </h2>
        <p className="text-gray-600 mt-2">Choose a plan that fits your goals</p>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
              billing === "monthly"
                ? "bg-indigo-600 text-white border-indigo-600 scale-105"
                : "bg-white text-gray-600 hover:scale-105"
            }`}
          >
            Pay Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
              billing === "yearly"
                ? "bg-indigo-600 text-white border-indigo-600 scale-105"
                : "bg-white text-gray-600 hover:scale-105"
            }`}
          >
            Pay Yearly
          </button>

          <span className="text-indigo-600 text-sm animate-pulse">Save 25%</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">

        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-8 rounded-3xl border shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-pop ${
              plan.highlight
                ? "bg-indigo-700 text-white scale-105 shadow-xl animate-glow"
                : "bg-white text-gray-900"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-2 ${
                plan.highlight ? "text-white" : "text-gray-800"
              }`}
            >
              {plan.name}
            </h3>

            {/* Price */}
            <p className="text-4xl font-extrabold mb-6">
              ${billing === "monthly" ? plan.price : plan.price * 12}
              <span className="text-base font-medium">
                /{billing === "monthly" ? "Month" : "Year"}
              </span>
            </p>

            {/* Button */}
            <button
              className={`w-full py-3 rounded-xl font-bold mb-6 transition-all duration-300 ${
                plan.highlight
                  ? "bg-white text-indigo-700 hover:bg-gray-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Get Started Now
            </button>

            {/* Features */}
            <ul className="space-y-3 animate-slideUp">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  {f.available ? (
                    <CheckCircle
                      size={18}
                      className={plan.highlight ? "text-white" : "text-indigo-600"}
                    />
                  ) : (
                    <XCircle
                      size={18}
                      className={plan.highlight ? "text-gray-300" : "text-gray-400"}
                    />
                  )}
                  <span
                    className={
                      f.available
                        ? ""
                        : plan.highlight
                        ? "text-gray-300"
                        : "text-gray-500"
                    }
                  >
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Animation CSS */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.6s ease-in-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-in-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-in-out; }
        .animate-pop { animation: popIn 0.5s ease-in-out; }
        .animate-glow { animation: glow 2.5s infinite ease-in-out; }

        @keyframes glow {
          0% { box-shadow: 0 0 10px rgba(99,102,241,0.3); }
          50% { box-shadow: 0 0 25px rgba(99,102,241,0.7); }
          100% { box-shadow: 0 0 10px rgba(99,102,241,0.3); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes popIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
