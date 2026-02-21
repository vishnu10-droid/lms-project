import React from 'react';
import { Terminal, Sidebar, Bot, CheckCircle } from 'lucide-react';
import CodeEditor from './CodeEditor';
import DevAi from './DevAi';

const SidebarTools = ({ 
  sidebarTab, setSidebarTab, isFocusMode, setIsFocusMode, 
  editorAction, onEditorAction, onCompilerStateChange, compilerState,
  curriculum, activeVideo, setActiveVideo 
}) => {
  return (
    <div className={`transition-all duration-500 bg-[#0f172a] border-l border-slate-800/60 flex flex-col ${isFocusMode ? 'w-full' : 'w-full lg:w-[500px]'}`}>
      
      {/* TAB NAVIGATION */}
      <div className="flex bg-[#0f172a] p-1 border-b border-slate-800">
        {[
          { id: 'compiler', icon: Terminal, label: 'IDE' },
          { id: 'curriculum', icon: Sidebar, label: 'Course' },
          { id: 'ai', icon: Bot, label: 'DevAI' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSidebarTab(tab.id)}
            className={`flex-1 py-3 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all rounded-lg ${
              sidebarTab === tab.id ? 'bg-blue-600/10 text-blue-400' : 'text-slate-500 hover:bg-slate-800/50'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
        {isFocusMode && (
          <button onClick={() => setIsFocusMode(false)} className="px-4 text-slate-400 hover:text-white transition-colors">
            Exit Focus
          </button>
        )}
      </div>

      {/* DYNAMIC CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {sidebarTab === 'compiler' && (
          <CodeEditor 
            editorAction={editorAction}
            onCompilerStateChange={onCompilerStateChange}
          />
        )}

        {sidebarTab === 'curriculum' && (
          <div className="flex-1 overflow-y-auto">
            {curriculum.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveVideo(item)}
                className={`w-full flex items-center gap-4 p-5 text-left border-b border-slate-800/30 transition-all ${
                  activeVideo.id === item.id ? 'bg-blue-600/5 border-l-2 border-blue-500' : 'hover:bg-slate-800/30'
                }`}
              >
                {item.completed ? (
                  <CheckCircle size={16} className="text-emerald-500" />
                ) : (
                  <span className="text-xs font-bold text-slate-500">{index + 1}</span>
                )}
                <div className="flex-1">
                  <p className={`text-sm font-bold ${activeVideo.id === item.id ? 'text-blue-400' : 'text-slate-300'}`}>{item.title}</p>
                  <span className="text-[10px] text-slate-500 uppercase">{item.duration} • {item.xp} XP</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {sidebarTab === 'ai' && (
          <DevAi
            activeVideo={activeVideo}
            onEditorAction={onEditorAction}
            compilerState={compilerState}
          />
        )}
      </div>
    </div>
  );
};

export default SidebarTools;
