import React, { useState, useMemo } from "react";

export default function StudentPayments() {
  const [payments, setPayments] = useState([
    { id: 1, name: "Amit Sharma", email: "amit@example.com", totalFee: 5000, paid: 5000, balance: 0, status: "Fully Paid", lastPayment: "2025-01-20", paymentHistory: ["2025-01-20: $5000"] },
    { id: 2, name: "Priya Verma", email: "priya@example.com", totalFee: 5000, paid: 2000, balance: 3000, status: "Partial", lastPayment: "2025-02-05", paymentHistory: ["2025-02-05: $2000"] },
    { id: 3, name: "Rohit Singh", email: "rohit@example.com", totalFee: 4500, paid: 4500, balance: 0, status: "Fully Paid", lastPayment: "2025-01-10", paymentHistory: ["2025-01-10: $4500"] },
    { id: 4, name: "Sana Khan", email: "sana@example.com", totalFee: 6000, paid: 0, balance: 6000, status: "Unpaid", lastPayment: "N/A", paymentHistory: [] },
    { id: 5, name: "Vikas Yadav", email: "vikas@example.com", totalFee: 5000, paid: 5000, balance: 0, status: "Fully Paid", lastPayment: "2024-12-15", paymentHistory: ["2024-12-15: $5000"] },
    { id: 6, name: "Neha Gupta", email: "neha@example.com", totalFee: 5500, paid: 2500, balance: 3000, status: "Partial", lastPayment: "2025-02-01", paymentHistory: ["2025-02-01: $1500", "2025-01-15: $1000"] },
    { id: 7, name: "Ankit Mehra", email: "ankit@example.com", totalFee: 7000, paid: 7000, balance: 0, status: "Fully Paid", lastPayment: "2025-01-25", paymentHistory: ["2025-01-25: $3500", "2025-01-10: $3500"] },
    { id: 8, name: "Simran Kaur", email: "simran@example.com", totalFee: 4000, paid: 1000, balance: 3000, status: "Partial", lastPayment: "2025-01-05", paymentHistory: ["2025-01-05: $1000"] },
    { id: 9, name: "Karthik Nair", email: "karthik@example.com", totalFee: 5000, paid: 5000, balance: 0, status: "Fully Paid", lastPayment: "2025-02-08", paymentHistory: ["2025-02-08: $5000"] },
    { id: 10, name: "Jasmin Ali", email: "jasmin@example.com", totalFee: 6500, paid: 0, balance: 6500, status: "Unpaid", lastPayment: "N/A", paymentHistory: [] },
    { id: 11, name: "Arun Kumar", email: "arun@example.com", totalFee: 8000, paid: 4000, balance: 4000, status: "Partial", lastPayment: "2025-01-12", paymentHistory: ["2025-01-12: $2000", "2025-01-01: $2000"] },
    { id: 12, name: "Pooja Patel", email: "pooja@example.com", totalFee: 5000, paid: 5000, balance: 0, status: "Fully Paid", lastPayment: "2025-02-02", paymentHistory: ["2025-02-02: $5000"] },
    { id: 13, name: "Rahul Mishra", email: "rahul@example.com", totalFee: 7500, paid: 7500, balance: 0, status: "Fully Paid", lastPayment: "2025-02-01", paymentHistory: ["2025-02-01: $3750", "2025-01-20: $3750"] },
    { id: 14, name: "Divya Sharma", email: "divya@example.com", totalFee: 5500, paid: 1000, balance: 4500, status: "Partial", lastPayment: "2025-01-28", paymentHistory: ["2025-01-28: $1000"] },
    { id: 15, name: "Kunal Roy", email: "kunal@example.com", totalFee: 9000, paid: 0, balance: 9000, status: "Unpaid", lastPayment: "N/A", paymentHistory: [] }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewingStudent, setViewingStudent] = useState(null);

  // Calculate stats
  const stats = useMemo(() => {
    const totalCollection = payments.reduce((sum, p) => sum + p.totalFee, 0);
    const totalPaid = payments.reduce((sum, p) => sum + p.paid, 0);
    const totalBalance = payments.reduce((sum, p) => sum + p.balance, 0);
    const fullyPaid = payments.filter(p => p.status === "Fully Paid").length;
    const partial = payments.filter(p => p.status === "Partial").length;
    const unpaid = payments.filter(p => p.status === "Unpaid").length;

    return { totalCollection, totalPaid, totalBalance, fullyPaid, partial, unpaid };
  }, [payments]);

  const filteredPayments = payments.filter(p => {
    const nameMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus === "all" || p.status === filterStatus;
    return nameMatch && statusMatch;
  });

  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === filteredPayments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPayments.map(p => p.id));
    }
  };

  const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* 🔥 ADMIN HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">💰 Payments Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage collections • Track balances • Generate receipts</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => {/* Send reminders to selected */}}
            disabled={selectedIds.length === 0}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg disabled:cursor-not-allowed"
          >
            📧 Reminders ({selectedIds.length})
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg"
          >
            ➕ Add Payment
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-5 bg-white rounded-2xl shadow-sm border">
        <input
          placeholder="🔍 Search by name/email..."
          className="border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Fully Paid">Fully Paid</option>
          <option value="Partial">Partial</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={selectedIds.length === filteredPayments.length && filteredPayments.length > 0}
            onChange={toggleAll}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span>Select All ({selectedIds.length}/{filteredPayments.length})</span>
        </div>
      </div>

      {/* 🔥 DYNAMIC STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="text-sm opacity-90">Total Revenue</div>
          <div className="text-2xl font-bold mt-1">{formatCurrency(stats.totalCollection)}</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="text-sm opacity-90">Collected</div>
          <div className="text-2xl font-bold mt-1">{formatCurrency(stats.totalPaid)}</div>
          <div className="text-xs mt-1 opacity-90">{((stats.totalPaid/stats.totalCollection)*100).toFixed(1)}%</div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="text-sm opacity-90">Pending</div>
          <div className="text-2xl font-bold mt-1">{formatCurrency(stats.totalBalance)}</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="text-sm opacity-90">Fully Paid</div>
          <div className="text-2xl font-bold mt-1">{stats.fullyPaid}</div>
        </div>
      </div>

      {/* 🔥 COMPACT PAYMENT CARDS */}
      <div className="space-y-3">
        {filteredPayments.map((payment) => (
          <div 
            key={payment.id}
            className={`group flex items-center p-4 rounded-xl border shadow-sm hover:shadow-xl transition-all border-l-4 ${
              payment.status === "Fully Paid" ? "border-green-400 bg-green-50/50" :
              payment.status === "Partial" ? "border-yellow-400 bg-yellow-50/50" :
              "border-red-400 bg-red-50/50"
            }`}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selectedIds.includes(payment.id)}
              onChange={() => toggleSelection(payment.id)}
              className="w-5 h-5 text-blue-600 rounded mr-4 flex-shrink-0"
            />

            {/* Student Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-lg text-gray-700">
                  {payment.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900 text-sm truncate">{payment.name}</h3>
                <p className="text-xs text-gray-500 truncate">{payment.email}</p>
              </div>
            </div>

            {/* Financial Progress */}
            <div className="flex flex-col items-end mr-6 text-right">
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(payment.paid)}</div>
              <div className="text-xs text-gray-500">of {formatCurrency(payment.totalFee)}</div>
              <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    payment.status === "Fully Paid" ? "bg-green-500" :
                    payment.status === "Partial" ? "bg-yellow-500" : "bg-gray-300"
                  }`}
                  style={{width: `${(payment.paid/payment.totalFee)*100}%`}}
                />
              </div>
              <div className={`text-xs font-bold mt-1 px-2 py-1 rounded-full ${
                payment.balance > 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              }`}>
                {formatCurrency(payment.balance)}
              </div>
            </div>

            {/* Status & Last Payment */}
            <div className="flex flex-col items-center mr-4 text-center">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                payment.status === "Fully Paid" ? "bg-green-100 text-green-800" :
                payment.status === "Partial" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                {payment.status}
              </span>
              <span className="text-xs text-gray-500 mt-1">{payment.lastPayment}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => setViewingStudent(payment)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                👁️ View
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all">
                💳 Receipt
              </button>
            </div>
          </div>
        ))}

        {filteredPayments.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-500">Try adjusting search or filter options</p>
          </div>
        )}
      </div>

      {/* 🔥 STUDENT PAYMENT MODAL */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-8 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                  <p className="text-gray-600">#{viewingStudent.id.toString().padStart(3, '0')} • {viewingStudent.name}</p>
                </div>
                <button 
                  onClick={() => setViewingStudent(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">💰 Financial Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Total Fee</span>
                      <span className="font-bold text-xl">{formatCurrency(viewingStudent.totalFee)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Paid Amount</span>
                      <span className="font-bold text-xl text-green-600">{formatCurrency(viewingStudent.paid)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b-2 border-red-200 bg-red-50/50 p-3 rounded-xl">
                      <span className="font-semibold text-gray-800">Balance Due</span>
                      <span className="font-bold text-2xl text-red-600">{formatCurrency(viewingStudent.balance)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">📋 Payment History</h3>
                  <div className="space-y-2">
                    {viewingStudent.paymentHistory.length > 0 ? (
                      viewingStudent.paymentHistory.map((entry, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                          <span className="text-sm">{entry}</span>
                          <div className="w-20 bg-green-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-full" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No payments recorded
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t flex gap-3 justify-end">
              <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-all">
                Send Reminder
              </button>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
