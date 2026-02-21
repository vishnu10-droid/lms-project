import React, { useState } from "react";
import {
  Search,
  Download,
  Eye,
  X,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  DollarSign,
  AlertCircle,
} from "lucide-react";

const gateways = ["All", "Stripe", "Razorpay", "PayPal"];
const statusList = ["All", "Completed", "Pending", "Failed", "Refunded"];

const transactions = Array.from({ length: 20 }, (_, i) => ({
  id: `TXN-${String(8001 + i).padStart(6, "0")}`,
  student: [
    "Sarah Chen",
    "Marcus Johnson",
    "Priya Patel",
    "David Kim",
    "Emma Wilson",
    "James Rodriguez",
    "Aisha Mohamed",
    "Tyler Brooks",
    "Yuki Tanaka",
    "Fatima Al-Rashid",
    "Noah Williams",
    "Isabella Garcia",
    "Ethan Brown",
    "Olivia Martinez",
    "Liam Anderson",
    "Sophia Taylor",
    "Benjamin Thomas",
    "Mia Jackson",
    "Mason White",
    "Charlotte Harris",
  ][i],
  course: [
    "ML Fundamentals",
    "React Patterns",
    "Data Science",
    "UI/UX Mastery",
    "Node.js Micro",
    "iOS Dev",
    "Python Basics",
    "Cloud Arch",
    "Cybersecurity",
    "Blockchain Dev",
    "GraphQL API",
    "DevOps CI/CD",
    "Vue.js 3",
    "Django REST",
    "Flutter Dev",
    "MongoDB Expert",
    "Redis Caching",
    "WebAssembly",
    "Rust Systems",
    "Go Microservices",
  ][i],
  amount: [199, 149, 299, 129, 179, 219, 99, 249, 189, 239, 159, 139, 119, 169, 229, 209, 189, 259, 279, 199][i],
  gateway: ["Stripe", "Razorpay", "PayPal", "Stripe", "Stripe"][i % 5],
  status: ["Completed", "Completed", "Completed", "Pending", "Failed", "Refunded"][i % 6],
  date: new Date(2025, 0, 10 + i * 2).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
  refId: `REF-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
}));

const statusIcon = {
  Completed: <CheckCircle className="w-3.5 h-3.5 text-green-500" />,
  Pending: <Clock className="w-3.5 h-3.5 text-orange-500" />,
  Failed: <XCircle className="w-3.5 h-3.5 text-red-500" />,
  Refunded: <RefreshCw className="w-3.5 h-3.5 text-slate-400" />,
};

const statusStyle = {
  Completed:
    "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/40 px-2 py-0.5 rounded-full text-xs font-semibold",
  Pending:
    "bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-900/40 px-2 py-0.5 rounded-full text-xs font-semibold",
  Failed:
    "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/40 px-2 py-0.5 rounded-full text-xs font-semibold",
  Refunded:
    "bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold",
};

const gwStyle = {
  Stripe: "text-[#635bff] bg-[#635bff]/10",
  Razorpay: "text-[#3395ff] bg-[#3395ff]/10",
  PayPal: "text-[#003087] bg-[#003087]/10",
};

const summaryCards = [
  { label: "Total Revenue", value: "$38,420", change: "+12%", icon: DollarSign, positive: true },
  { label: "Transactions", value: "20", change: "+8%", icon: CreditCard, positive: true },
  { label: "Pending", value: "$1,940", change: "3 txns", icon: Clock, positive: false },
  { label: "Refunded", value: "$448", change: "2 txns", icon: RefreshCw, positive: false },
];

const isAdmin = true;

export default function Payments() {
  const [search, setSearch] = useState("");
  const [gatewayFilter, setGatewayFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [refundConfirm, setRefundConfirm] = useState(false);

  const filtered = transactions.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch =
      t.student.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.course.toLowerCase().includes(q);
    const matchGw = gatewayFilter === "All" || t.gateway === gatewayFilter;
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchGw && matchStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Payment Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Track transactions, refunds and gateway performance</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
          <Download className="w-4 h-4" /> Export Data
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <div key={c.label} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                <c.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <span className={`text-xs font-bold ${c.positive ? "text-green-600 dark:text-green-300" : "text-slate-400 dark:text-slate-500"}`}>
                {c.change}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{c.label}</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, ID or course..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition-all text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            {gateways.map((g) => (
              <button
                key={g}
                onClick={() => setGatewayFilter(g)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  gatewayFilter === g
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            {statusList.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  statusFilter === s
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Transaction ID</th>
                <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Student</th>
                <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Course</th>
                <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Gateway</th>
                <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Date</th>
                <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/60 transition-colors group">
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md border border-indigo-100 dark:border-indigo-900/40">
                      {txn.id}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">{txn.student}</td>
                  <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400 truncate max-w-[150px]">{txn.course}</td>
                  <td className="px-4 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">${txn.amount}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-md ${gwStyle[txn.gateway]}`}>
                      {txn.gateway}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`${statusStyle[txn.status]} flex items-center gap-1.5 w-fit shadow-sm`}>
                      {statusIcon[txn.status]} {txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">{txn.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedTxn(txn)}
                      className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/40">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing <span className="text-slate-900 dark:text-slate-100">{filtered.length}</span> of {transactions.length} transactions
          </p>
        </div>
      </div>

      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[2px]">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all scale-100">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="font-bold text-slate-800 dark:text-slate-100">Transaction Details</h2>
              <button
                onClick={() => {
                  setSelectedTxn(null);
                  setRefundConfirm(false);
                }}
                className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
              >
                <X className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 p-4 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
                  {selectedTxn.student
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{selectedTxn.student}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{selectedTxn.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-slate-900 dark:text-slate-100">${selectedTxn.amount}</p>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-tighter italic opacity-70">
                    {selectedTxn.gateway}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Transaction ID", value: selectedTxn.id },
                  { label: "Reference ID", value: selectedTxn.refId },
                  { label: "Payment Date", value: selectedTxn.date },
                  { label: "Status", value: selectedTxn.status, type: "status" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-500 dark:text-slate-400">{row.label}</span>
                    {row.type === "status" ? (
                      <span className={statusStyle[row.value]}>{row.value}</span>
                    ) : (
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {isAdmin && selectedTxn.status === "Completed" && (
                <div className="mt-8">
                  {!refundConfirm ? (
                    <button
                      onClick={() => setRefundConfirm(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-900 border-2 border-red-100 dark:border-red-900/40 text-red-600 dark:text-red-300 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm"
                    >
                      <RefreshCw className="w-4 h-4" /> Initialize Refund
                    </button>
                  ) : (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-bold">Confirm Full Refund?</p>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-300 leading-relaxed">
                        This will return <strong>${selectedTxn.amount}</strong> to the customer's original payment method.
                      </p>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setRefundConfirm(false)}
                          className="flex-1 py-2 text-xs font-bold text-slate-500 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTxn(null);
                            setRefundConfirm(false);
                          }}
                          className="flex-1 py-2 text-xs font-bold bg-red-600 text-white rounded-lg shadow-lg shadow-red-200 dark:shadow-red-900/40 hover:bg-red-700 transition-all"
                        >
                          Confirm Refund
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
