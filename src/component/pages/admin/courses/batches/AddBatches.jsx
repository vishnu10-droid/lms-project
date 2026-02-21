import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Users, BookOpen, Clock } from 'lucide-react';

const AddBatches = () => {
  const [batchData, setBatchData] = useState({
    batchName: '',
    course: '',
    startDate: '',
    maxSeats: '',
    instructor: '',
    schedule: []
  });

  const [modules, setModules] = useState([{ id: 1, title: '', duration: '' }]);

  const addModule = () => {
    setModules([...modules, { id: Date.now(), title: '', duration: '' }]);
  };

  const removeModule = (id) => {
    setModules(modules.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Create New Batch</h1>
          <p className="text-indigo-100 text-sm">Schedule and organize your upcoming learning cohort.</p>
        </div>

        <form className="p-6 md:p-10 space-y-8">
          
          {/* Section 1: Basic Information */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold">
              <BookOpen size={20} />
              <h2>General Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Batch Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Fullstack Web Dev - Fall 2026"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Select Course</label>
                <select className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white">
                  <option>React Mastery</option>
                  <option>UI/UX Design Fundamentals</option>
                  <option>Data Science Bootcamp</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Logistics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Calendar size={14} /> Start Date
              </label>
              <input type="date" className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Users size={14} /> Max Capacity
              </label>
              <input type="number" placeholder="30" className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Clock size={14} /> Duration (Weeks)
              </label>
              <input type="number" placeholder="12" className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3: Dynamic Module List */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                <Plus size={20} />
                <h2>Batch Curriculum / Modules</h2>
              </div>
              <button 
                type="button"
                onClick={addModule}
                className="text-sm bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-indigo-100 transition"
              >
                + Add Module
              </button>
            </div>

            <div className="space-y-3">
              {modules.map((module, index) => (
                <div key={module.id} className="flex gap-4 items-end animate-in fade-in slide-in-from-top-2">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                    <input 
                      placeholder={`Module ${index + 1} Title`}
                      className="bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none py-1"
                    />
                    <input 
                      placeholder="Duration (e.g. 2 hours)"
                      className="bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none py-1"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeModule(module.id)}
                    className="p-3 text-red-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <button className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
              Publish Batch
            </button>
            <button className="px-8 py-4 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition">
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBatches;