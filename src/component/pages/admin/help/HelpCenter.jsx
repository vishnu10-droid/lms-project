import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, MessageCircle, HelpCircle, Video, ArrowRight, Send, CheckCircle2, X } from 'lucide-react';

const HelpCenter = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const [categories, setCategories] = useState([]);
  const [faqData, setFaqData] = useState([]);

  const { scrollY } = useScroll();
  // Parallax effect for background shapes
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    // Simulating API Data Fetch
    setTimeout(() => {
      setCategories([
        { id: 1, title: "Getting Started", icon: <BookOpen />, count: "12 Articles", color: "from-blue-600 to-cyan-500" },
        { id: 2, title: "Video Tutorials", icon: <Video />, count: "24 Videos", color: "from-purple-600 to-pink-500" },
        { id: 3, title: "Account & Billing", icon: <HelpCircle />, count: "8 Articles", color: "from-orange-500 to-red-500" },
        { id: 4, title: "Community Forum", icon: <MessageCircle />, count: "2k+ Members", color: "from-emerald-500 to-teal-600" },
      ]);
      setFaqData([
        { q: "How to sync progress across devices?", a: "Your progress is saved to the cloud in real-time. Just log in with the same account on any device." },
        { q: "Can I get a refund for a course?", a: "We offer a 30-day money-back guarantee if you have completed less than 20% of the content." },
        { q: "Where are my certificates?", a: "Navigate to Dashboard > Certificates to download your verified PDFs." }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    /* The outer div uses transition-colors to make the theme switch smooth */
    <div className="relative min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden font-sans">
      
      {/* --- REAL PARALLAX DECORATION --- */}
      <motion.div 
        style={{ y: backgroundY }} 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
            LMS Help Desk
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-emerald-400">help you today?</span>
          </h1>
          
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Search for courses, troubleshooting..." 
              className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-lg"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* --- DYNAMIC GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {loading ? [1,2,3,4].map(n => <div key={n} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-900 animate-pulse" />) :
            categories.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -10 }}
                className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-6 shadow-lg`}>
                  {React.cloneElement(cat.icon, { size: 28, className: "text-white" })}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{cat.count}</p>
                <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400">
                  Explore <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))
          }
        </div>

        {/* --- FAQ SECTION --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-xl border border-slate-100 dark:border-slate-800"
        >
          <h2 className="text-3xl font-extrabold mb-10 text-center">Top Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <details key={i} className="group border-b border-slate-100 dark:border-slate-800 pb-4">
                <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  {faq.q}
                  <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-blue-500 pl-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </motion.div>

        {/* --- FLOATING TICKET TRIGGER --- */}
        <div className="fixed bottom-8 right-8 z-50">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl font-bold transition-shadow"
          >
            <MessageCircle size={20} /> <span className="hidden md:inline">Need more help?</span>
          </motion.button>
        </div>

        {/* --- TICKET MODAL --- */}
        <AnimatePresence>
          {isFormOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative border border-slate-200 dark:border-slate-800"
              >
                <button onClick={() => {setIsFormOpen(false); setFormStatus('idle');}} className="absolute top-8 right-8 text-slate-400 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>

                {formStatus === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-slate-500 dark:text-slate-400">We've logged your ticket and will reply via email shortly.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black mb-2">Contact Support</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">Fill out the form below and we'll help you out.</p>
                    <form onSubmit={handleTicketSubmit} className="space-y-6">
                      <input required type="text" className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner" placeholder="Subject" />
                      <textarea required rows="4" className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner" placeholder="How can we help?"></textarea>
                      <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      >
                        {formStatus === 'submitting' ? "Sending Request..." : "Submit Ticket"} <Send size={18} />
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default HelpCenter;