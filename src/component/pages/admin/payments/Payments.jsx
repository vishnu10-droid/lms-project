import { useState } from "react";
import {
  CreditCard,
  Wallet,
  DollarSign,
  CheckCircle,
  Tag,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export default function ElearningPayment() {
  const [method, setMethod] = useState("card");
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);
  const [success, setSuccess] = useState(false);

  const coursePrice = 149;
  const discount = applied ? 20 : 0;
  const total = coursePrice - discount;

  const applyPromo = () => {
    if (promo === "LEARN20") setApplied(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT - COURSE INFO */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold">Complete React Mastery</h2>
            <p className="text-indigo-100 mt-2">
              Build real-world projects & become job-ready
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span>Course Price</span>
                <span>${coursePrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-300">-${discount}</span>
              </div>

              <div className="border-t border-indigo-400 pt-4 flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-indigo-200 text-sm">
            <ShieldCheck size={18} />
            100% Secure Payment
          </div>
        </div>

        {/* RIGHT - PAYMENT FORM */}
        <div className="p-10">

          {!success ? (
            <>
              <h3 className="text-2xl font-semibold mb-6">Choose Payment Method</h3>

              {/* PAYMENT METHODS */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { id: "card", label: "Card", icon: CreditCard },
                  { id: "wallet", label: "Wallet", icon: Wallet },
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "paypal", label: "PayPal", icon: DollarSign },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMethod(item.id)}
                    className={`border rounded-xl p-4 flex items-center gap-3 transition
                    ${
                      method === item.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "hover:border-indigo-300"
                    }`}
                  >
                    <item.icon className="text-indigo-600" />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* CARD DETAILS */}
              {method === "card" && (
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="input"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="input" />
                    <input type="text" placeholder="CVV" className="input" />
                  </div>
                </div>
              )}

              {/* PROMO CODE */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="input flex-1"
                />
                <button
                  onClick={applyPromo}
                  className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700"
                >
                  <Tag size={18} />
                </button>
              </div>

              {/* PAY BUTTON */}
              <button
                onClick={() => setSuccess(true)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Pay ${total}
              </button>
            </>
          ) : (
            /* SUCCESS SCREEN */
            <div className="flex flex-col items-center justify-center h-full text-center">
              <CheckCircle size={80} className="text-green-500 mb-4" />
              <h2 className="text-2xl font-bold">Payment Successful!</h2>
              <p className="text-gray-500 mt-2">
                You now have full access to the course 🎉
              </p>

              <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg">
                Go To Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #ddd;
          padding: 12px;
          border-radius: 10px;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
        }
      `}</style>
    </div>
  );
}
