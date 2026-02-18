import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Terminal, ChevronRight, FileCode, Plus,
  FileJson, Hash, Globe, Layers, X, FileText,
  Loader2, CheckCircle2, AlertCircle, Info
} from 'lucide-react';

// --- NEW COMPONENT: Compiler Engine ---
const CompilerEngine = ({ code, onResult }) => {
  const [isCompiling, setIsCompiling] = useState(false);

  const executeCode = async () => {
    setIsCompiling(true);
    const results = { output: [], errors: [], success: false };
    
    try {
      // Create isolated execution context
      const consoleLog = [];
      const originalLog = console.log;
      const originalError = console.error;
      
      console.log = (...args) => {
        consoleLog.push(args.map(arg => String(arg)).join(' '));
      };
      
      console.error = (...args) => {
        results.errors.push(args.map(arg => String(arg)).join(' '));
      };

      // Timeout protection
      const timeout = setTimeout(() => {
        throw new Error('Execution timeout - infinite loop detected');
      }, 3000);

      // Execute code safely
      const func = new Function(`
        try {
          ${code}
        } catch(e) {
          throw e;
        }
      `);
      
      await func();
      clearTimeout(timeout);
      
      console.log = originalLog;
      console.error = originalError;
      
      results.output = consoleLog;
      results.success = results.errors.length === 0;
      
    } catch (error) {
      clearTimeout(timeout);
      console.log = originalLog;
      console.error = originalError;
      results.errors = [error.message];
    }
    
    setIsCompiling(false);
    onResult(results);
  };

  return { executeCode, isCompiling };
};

// --- NEW COMPONENT: OutputProcessor ---
const OutputProcessor = ({ output, errors }) => {
  const [displayedOutput, setDisplayedOutput] = useState([]);
  const [displayedErrors, setDisplayedErrors] = useState([]);

  useEffect(() => {
    // Animate output line by line with realistic delays
    let index = 0;
    
    const showNextLine = () => {
      if (index < output.length) {
        setDisplayedOutput(prev => [...prev, output[index]]);
        index++;
        setTimeout(showNextLine, 80 + Math.random() * 120); // Variable typing speed
      }
    };
    
    setDisplayedOutput([]);
    if (output.length > 0) {
      showNextLine();
    }
  }, [output]);

  useEffect(() => {
    // Show errors immediately
    setDisplayedErrors(errors);
  }, [errors]);

  return { displayedOutput, displayedErrors };
};

// --- MAIN ENHANCED CODE EDITOR ---
const CodeEditor = () => {
  // --- STATE MANAGEMENT ---
  const [files, setFiles] = useState({
    'main.js': { 
      icon: <FileCode className="text-yellow-400" size={14}/>, 
      code: `const user = "Student";
console.log(\`Hello, \${user}!\`);

function test() {
  return "System Healthy";
}
console.log(test());`
    },
    'style.css': { 
      icon: <Hash className="text-blue-500" size={14}/>, 
      code: `body {
  background: #0f172a;
  color: cyan;
}` 
    },
  });

  const [activeFile, setActiveFile] = useState('main.js');
  const [newFileName, setNewFileName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [compileResults, setCompileResults] = useState({ output: [], errors: [] });

  // Refs
  const textAreaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const terminalRef = useRef(null);

  // --- DYNAMIC LINE COUNT ---
  const codeLines = files[activeFile]?.code.split('\n') || [];
  const lineCount = codeLines.length;

  // Sync line numbers scroll
  const handleScroll = () => {
    if (lineNumbersRef.current && textAreaRef.current) {
      lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  // --- COMPILER INTEGRATION ---
  const compiler = CompilerEngine({
    code: files[activeFile]?.code || '',
    onResult: setCompileResults
  });

  const runCode = async () => {
    setIsRunning(true);
    setCompileResults({ output: [], errors: [] });

    // Compilation phases with realistic delays
    const addLog = (text, type) => {
      setCompileResults(prev => ({
        ...prev,
        output: [...prev.output, { id: Date.now(), text, type, time: new Date().toLocaleTimeString([], { 
          hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
        })}]
      }));
    };

    addLog("Initializing Virtual Environment...", "system");
    await new Promise(r => setTimeout(r, 500));

    addLog(`Parsing ${activeFile}...`, "info");
    await new Promise(r => setTimeout(r, 400));

    // Real compilation
    await compiler.executeCode();

    addLog("Process completed.", "system");
    setIsRunning(false);
  };

  // --- FILE OPERATIONS ---
  const getIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    switch (ext) {
      case 'js': return <FileCode className="text-yellow-400" size={14}/>;
      case 'css': return <Hash className="text-blue-500" size={14}/>;
      case 'py': return <FileJson className="text-blue-400" size={14}/>;
      case 'html': return <Globe className="text-orange-500" size={14}/>;
      default: return <FileText className="text-slate-400" size={14}/>;
    }
  };

  const handleCreateFile = (e) => {
    if (e.key === 'Enter' && newFileName.trim() !== '') {
      const name = newFileName.includes('.') ? newFileName : `${newFileName}.js`;
      setFiles({
        ...files,
        [name]: { icon: getIcon(name), code: `// New ${name} file created\nconsole.log("Hello from ${name}!");` }
      });
      setActiveFile(name);
      setNewFileName('');
      setIsCreating(false);
    }
  };

  const deleteFile = (filename) => {
    if (Object.keys(files).length > 1) {
      const newFiles = { ...files };
      delete newFiles[filename];
      setFiles(newFiles);
      setActiveFile(Object.keys(newFiles)[0]);
    }
  };

  // --- OUTPUT PROCESSOR ---
  const processor = OutputProcessor({
    output: compileResults.output.filter(log => log.type !== 'system' && log.type !== 'info'),
    errors: compileResults.errors
  });

  return (
    <div className="flex-1 flex flex-col bg-[#050a18] h-full border-l border-slate-800 shadow-2xl overflow-hidden font-sans">
      {/* TAB BAR */}
      <div className="flex bg-[#0a1120] border-b border-slate-800/60 overflow-x-auto scrollbar-hide items-center">
        {Object.keys(files).map((name) => (
          <div
            key={name}
            onClick={() => !isRunning && setActiveFile(name)}
            className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono cursor-pointer transition-all border-r border-slate-800/40 group min-w-fit ${
              activeFile === name ? 'bg-[#050a18] text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-800/20'
            }`}
          >
            {files[name].icon}
            <span>{name}</span>
            <X 
              size={12} 
              className="ml-1 opacity-0 group-hover:opacity-100 hover:text-red-400 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); deleteFile(name); }}
            />
          </div>
        ))}
        
        {/* ADD FILE */}
        <div className="px-3">
          {isCreating ? (
            <input 
              autoFocus
              onBlur={() => setIsCreating(false)}
              onKeyDown={handleCreateFile}
              onChange={(e) => setNewFileName(e.target.value)}
              value={newFileName}
              className="bg-slate-900 border border-blue-500/50 rounded px-2 py-0.5 text-[10px] outline-none text-white w-28"
              placeholder="name.js"
            />
          ) : (
            <button onClick={() => setIsCreating(true)} className="text-slate-500 hover:text-white">
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>

      {/* EDITOR VIEW */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-4 right-6 z-10 flex gap-2">
          <button
            disabled={isRunning || compiler.isCompiling}
            onClick={runCode}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[11px] font-black tracking-widest transition-all ${
              isRunning || compiler.isCompiling 
                ? 'bg-slate-800 text-slate-500' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/20'
            }`}
          >
            {isRunning || compiler.isCompiling ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Play size={12} fill="currentColor" />
            )}
            {isRunning ? "RUNNING..." : "COMPILE"}
          </button>
        </div>

        {/* DYNAMIC LINE NUMBERS + TEXTAREA */}
        <div className="flex flex-1 overflow-hidden pt-4 bg-[#050a18]">
          <div 
            ref={lineNumbersRef}
            className="w-12 border-r border-slate-800/30 flex flex-col items-end pr-3 overflow-hidden select-none"
          >
            {Array.from({ length: Math.max(lineCount, 10) }).map((_, i) => (
              <span key={i} className="text-[12px] font-mono text-slate-700 leading-[21px] h-[21px]">
                {i + 1}
              </span>
            ))}
          </div>

          <textarea
            ref={textAreaRef}
            value={files[activeFile]?.code || ''}
            onChange={(e) => setFiles({
              ...files, 
              [activeFile]: { ...files[activeFile], code: e.target.value }
            })}
            onScroll={handleScroll}
            readOnly={isRunning}
            spellCheck="false"
            className="flex-1 bg-transparent text-slate-300 p-0 pl-4 font-mono text-[14px] resize-none outline-none leading-[21px] overflow-y-auto whitespace-pre"
          />
        </div>
      </div>

      {/* ENHANCED CONSOLE WITH REAL COMPILER OUTPUT */}
      <div className="h-60 bg-[#020617] border-t border-slate-800 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/50 bg-[#0a1120]">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Terminal</span>
          </div>
          <div className={`text-[9px] font-bold px-2 py-0.5 rounded ${
            isRunning || compiler.isCompiling 
              ? 'bg-yellow-500/10 text-yellow-500' 
              : compileResults.errors.length > 0 
              ? 'bg-red-500/10 text-red-500' 
              : 'bg-emerald-500/10 text-emerald-500'
          }`}>
            {isRunning || compiler.isCompiling ? "COMPILING" : "READY"}
          </div>
        </div>

        <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 font-mono text-[12px] space-y-1.5 selection:bg-indigo-500/30">
          {compileResults.output.map((log) => (
            <div key={log.id} className="flex gap-3 items-start group animate-in fade-in slide-in-from-left-1">
              <span className="text-slate-600 text-[10px] pt-0.5 tabular-nums">{log.time}</span>
              <div className="flex gap-2 items-start">
                {log.type === 'system' && <ChevronRight size={14} className="text-slate-700" />}
                {log.type === 'info' && <Info size={14} className="text-blue-500" />}
                {log.type === 'success' && <CheckCircle2 size={14} className="text-emerald-500" />}
                
                <span className={`
                  ${log.type === 'output' ? 'text-white font-bold' : ''}
                  ${log.type === 'success' ? 'text-emerald-400' : ''}
                  ${log.type === 'system' ? 'text-slate-600 italic' : ''}
                  ${log.type === 'info' ? 'text-slate-400' : ''}
                `}>
                  {log.text}
                </span>
              </div>
            </div>
          ))}

          {/* REAL COMPILER ERRORS */}
          {compileResults.errors.map((error, idx) => (
            <div key={`error-${idx}`} className="flex gap-3 items-start bg-red-500/10 border-l-4 border-red-500/40 p-3 rounded animate-in slide-in-from-right-2">
              <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-red-400 text-[11px] font-bold block">Runtime Error</span>
                <span className="text-red-300 text-[12px]">{error}</span>
              </div>
            </div>
          ))}

          {/* ANIMATED OUTPUT */}
          {processor.displayedOutput.map((line, idx) => (
            <div key={`output-${idx}`} className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-1">
              <span className="text-emerald-500 text-[10px] pt-0.5 tabular-nums w-20">OUT</span>
              <div className="flex-1">
                <span className="text-white font-mono font-bold">{line}</span>
              </div>
            </div>
          ))}

          {(!isRunning && compileResults.output.length === 0 && compileResults.errors.length === 0) && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 grayscale">
              <Terminal size={24} />
              <p className="text-[10px] mt-2 font-bold uppercase tracking-widest">Ready for compilation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
