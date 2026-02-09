import { useState } from "react";
import {
  CreditCard,
  Wallet,
  DollarSign,
  CheckCircle,
  Tag,
  ShieldCheck,
  Loader2,
  XCircle,
  Sparkles
} from "lucide-react";

export default function StudentPayment() {

  /* ---------------- STATES ---------------- */
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  /* ---------------- PRICE LOGIC ---------------- */
  const basePrice = 120;
  const discount = promoApplied ? 20 : 0;
  const total = basePrice - discount;

  /* ---------------- HELPERS ---------------- */
  const detectBrand = () => {
    if (card.number.startsWith("4")) return "VISA";
    if (card.number.startsWith("5")) return "MASTERCARD";
    if (card.number.startsWith("3")) return "AMEX";
    return "CARD";
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  /* ============================================================ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-6">

      {/* SUCCESS MODAL */}
      {success && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm text-center animate-pop">
            <CheckCircle className="mx-auto text-green-500" size={70} />
            <h2 className="text-2xl font-bold mt-4">Payment Successful!</h2>
            <p className="text-gray-500 mt-2">
              You are now enrolled in the course 🎉
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 grid md:grid-cols-2 overflow-hidden">

        {/* LEFT */}
        <div className="p-10 text-white">

          {/* HEADER */}
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-2">
            Secure Checkout <Sparkles className="text-yellow-400" />
          </h2>
          <p className="text-gray-300 mb-8">
            Finish your purchase and start learning today
          </p>

          {/* COURSE */}
          <div className="flex gap-4 items-center bg-white/10 p-4 rounded-xl mb-8 hover:bg-white/20 transition">
            <img
              src="https://images.unsplash.com/photo-1587620962725-abab7fe55159"
              className="w-24 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">
                Full-Stack Web Development
              </h3>
              <p className="text-sm text-gray-300">
                Lifetime Access • Certificate • Projects
              </p>
            </div>
          </div>

          {/* METHODS */}
          <h4 className="font-semibold mb-3">Payment Method</h4>

          <div className="grid grid-cols-3 gap-4 mb-8">

            <MethodButton
              active={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
              icon={<CreditCard />}
              label="Card"
            />

            <MethodButton
              active={paymentMethod === "paypal"}
              onClick={() => setPaymentMethod("paypal")}
              icon={<DollarSign />}
              label="Paypal"
            />

            <MethodButton
              active={paymentMethod === "wallet"}
              onClick={() => setPaymentMethod("wallet")}
              icon={<Wallet />}
              label="Wallet"
            />
          </div>

          {/* CARD PREVIEW */}
          {paymentMethod === "card" && (
            <div className="mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 p-5 rounded-xl shadow-lg">
              <p className="text-sm opacity-80">{detectBrand()}</p>
              <p className="text-xl tracking-widest mt-2">
                {card.number || "#### #### #### ####"}
              </p>
              <div className="flex justify-between mt-4 text-sm">
                <span>{card.name || "CARD HOLDER"}</span>
                <span>{card.expiry || "MM/YY"}</span>
              </div>
            </div>
          )}

          {/* CARD FORM */}
          {paymentMethod === "card" && (
            <div className="grid md:grid-cols-2 gap-4 mb-8 animate-fade">

              <Input
                label="Card Number"
                value={card.number}
                onChange={(e) =>
                  setCard({ ...card, number: e.target.value })
                }
              />

              <Input
                label="Cardholder Name"
                value={card.name}
                onChange={(e) =>
                  setCard({ ...card, name: e.target.value })
                }
              />

              <Input
                label="Expiry"
                value={card.expiry}
                onChange={(e) =>
                  setCard({ ...card, expiry: e.target.value })
                }
              />

              <Input
                label="CVV"
                value={card.cvv}
                onChange={(e) =>
                  setCard({ ...card, cvv: e.target.value })
                }
              />

            </div>
          )}

          {/* PROMO */}
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-indigo-500 outline-none"
              />
            </div>

            <button
              onClick={() =>
                promoCode === "LEARN20"
                  ? setPromoApplied(true)
                  : setPromoApplied(false)
              }
              className="bg-indigo-600 hover:bg-indigo-500 px-5 rounded-lg"
            >
              Apply
            </button>
          </div>

          {promoApplied && (
            <p className="text-green-400 flex items-center gap-2 mb-4">
              <CheckCircle size={16} /> Promo Applied!
            </p>
          )}

          {/* PAY BUTTON */}
          <button
            disabled={loading}
            onClick={handlePay}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.03] transition-all font-semibold text-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Processing...
              </>
            ) : (
              `Pay $${total} & Enroll`
            )}
          </button>

          {/* SECURITY */}
          <p className="text-xs text-gray-400 mt-4 flex justify-center gap-2">
            <ShieldCheck size={14} /> 256-bit SSL Secure Payment
          </p>

        </div>

        {/* RIGHT */}
        <div className="bg-white p-10">

          <h3 className="text-xl font-bold mb-6">Order Summary</h3>

          <div className="space-y-3 text-gray-600">

            <Row label="Course Price" value={`$${basePrice}`} />
            <Row label="Discount" value={`-$${discount}`} green />

            <hr />

            <Row label="Total" value={`$${total}`} bold />

          </div>

          {/* BENEFITS */}
          <div className="mt-8 space-y-3 text-sm text-gray-500">

            <p>✔ Lifetime Access</p>
            <p>✔ Certificate of Completion</p>
            <p>✔ Downloadable Resources</p>
            <p>✔ 30-Day Money-Back Guarantee</p>

          </div>

        </div>

      </div>

      {/* ANIMATIONS */}
      <style>{`
        .animate-fade{
          animation: fade .4s ease;
        }
        .animate-pop{
          animation: pop .4s ease;
        }
        @keyframes fade{
          from{opacity:0;transform:translateY(10px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes pop{
          from{opacity:0;transform:scale(.8)}
          to{opacity:1;transform:scale(1)}
        }
      `}</style>

    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function MethodButton({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition
      ${active
        ? "bg-indigo-600 border-indigo-500 scale-105 shadow-lg"
        : "bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-300">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-indigo-500 outline-none"
      />
    </div>
  );
}

function Row({ label, value, green, bold }) {
  return (
    <div
      className={`flex justify-between 
      ${green && "text-green-600"}
      ${bold && "text-lg font-semibold text-gray-900"}
      `}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
