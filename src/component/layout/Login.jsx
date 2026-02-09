import React, { useState } from 'react';
import { User, Lock, Briefcase, Eye, EyeOff, ArrowRight, ShieldCheck, GraduationCap, Laptop } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    post: 'Student', // Default role
    password: ''
  });

  const roleConfigs = {
    Admin: { color: 'text-rose-600', bg: 'bg-rose-50', icon: <ShieldCheck size={20} /> },
    Student: { color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <GraduationCap size={20} /> },
    Instructor: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <Laptop size={20} /> }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in as:", formData.post, formData.name);
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] p-4 font-sans">
      {/* Main Container */}
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Brand & Visuals */}
        <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <GraduationCap size={32} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter italic">EDUMASTER</h1>
            </div>
            
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Empowering the <br /> 
              <span className="text-indigo-200">Next Generation</span> <br /> 
              of Learners.
            </h2>
            <p className="text-indigo-100 font-medium opacity-80">
              Access your personalized dashboard, manage courses, and track progress with one click.
            </p>
          </div>

          <div className="relative z-10 mt-12 p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20">
            <p className="text-sm italic opacity-90">
              "Education is the most powerful weapon which you can use to change the world."
            </p>
            <p className="text-xs font-bold mt-2 uppercase tracking-widest text-indigo-200">— Nelson Mandela</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h3 className="text-3xl font-black text-slate-900">Welcome Back</h3>
            <p className="text-slate-500 font-medium mt-2">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Username / Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Post Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Account Type</label>
              <div className="relative">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${roleConfigs[formData.post].color}`}>
                  {roleConfigs[formData.post].icon}
                </div>
                <select 
                  value={formData.post}
                  onChange={(e) => setFormData({...formData, post: e.target.value})}
                  className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-bold appearance-none cursor-pointer text-slate-700"
                >
                  <option value="Admin">Administrator</option>
                  <option value="Student">Student User</option>
                  <option value="Instructor">Course Instructor</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Briefcase size={18} />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all mt-4"
            >
              SIGN IN
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8 font-medium">
            New to the platform? <button className="text-indigo-600 font-bold hover:underline">Create an account</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;