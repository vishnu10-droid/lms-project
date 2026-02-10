import React, { useState } from 'react';
import { Settings as SettingsIcon, Users, BookOpen, Bell, BarChart3 } from 'lucide-react';

function Settings() {  // Named function (no export here)
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    platformName: 'Modern LMS',
    language: 'English',
    timezone: 'IST',
    maxEnrollments: 100,
    autoEnroll: true,
    emailNotify: true,
    pushNotify: false
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveSettings = (section) => {
    console.log(`Saving ${section} settings:`, formData);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-1">
        <div className="flex -space-x-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium rounded-2xl transition-all duration-200 group relative flex-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-2xl scale-[1.02] z-10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : ''}`} />
                {tab.label}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl -z-10 blur-xl opacity-50" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Platform Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
                <SettingsIcon className="w-6 h-6" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">Platform Settings</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Platform Name</label>
                <input
                  name="platformName"
                  value={formData.platformName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Default Language</label>
                <select name="language" value={formData.language} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Timezone</label>
                <select name="timezone" value={formData.timezone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500">
                  <option>UTC</option>
                  <option>IST</option>
                  <option>EST</option>
                </select>
              </div>
              <button onClick={() => saveSettings('general')} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                Save General Settings
              </button>
            </div>
          </div>

          {/* User Roles */}
          <div className="lg:col-span-2 xl:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl text-white">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">User Roles</h3>
            </div>
            <div className="space-y-4">
              {[
                { role: 'Admin', permissions: 'Full Access', color: 'blue' },
                { role: 'Instructor', permissions: 'Manage Courses', color: 'green' },
                { role: 'Learner', permissions: 'Read Only', color: 'gray' }
              ].map((item) => (
                <div key={item.role} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.role}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.permissions}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${item.color}-100 text-${item.color}-800`}>Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl text-white mr-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Course Configuration</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Max Enrollments</label>
              <input
                name="maxEnrollments"
                type="number"
                value={formData.maxEnrollments}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-indigo-500/10 text-lg"
              />
            </div>
            <label className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-indigo-400 md:col-span-2">
              <input
                name="autoEnroll"
                type="checkbox"
                checked={formData.autoEnroll}
                onChange={handleInputChange}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Auto-enrollment</span>
            </label>
          </div>
          <button onClick={() => saveSettings('courses')} className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg">
            Save Course Settings
          </button>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-8">
              <Bell className="w-8 h-8 mr-3 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Email Notifications</h3>
            </div>
            <label className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 rounded-xl border border-orange-200">
              <input
                name="emailNotify"
                type="checkbox"
                checked={formData.emailNotify}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">Enrollment Confirmation</span>
            </label>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              Push Notifications
            </h3>
            <label className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 rounded-xl border border-blue-200">
              <input
                name="pushNotify"
                type="checkbox"
                checked={formData.pushNotify}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">Real-time Updates</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
export default Settings; 