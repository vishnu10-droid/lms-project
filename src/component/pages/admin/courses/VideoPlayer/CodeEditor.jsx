import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Code2,
  Eraser,
  Eye,
  FileCode,
  FileJson,
  FileText,
  Globe,
  Hash,
  Info,
  Loader2,
  Play,
  Plus,
  TerminalSquare,
  Wand2,
  X,
} from "lucide-react";

function now() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function detectExt(filename) {
  const parts = filename.split(".");
  return (parts[parts.length - 1] || "").toLowerCase();
}

function parseJsError(err) {
  const stack = String(err?.stack || "");
  const msg = String(err?.message || err || "Unknown error");
  const match = stack.match(/<anonymous>:(\d+):(\d+)/);
  const line = match ? Math.max(1, Number(match[1]) - 1) : null;
  const column = match ? Number(match[2]) : null;
  return { message: msg, line, column, raw: stack };
}

function getIcon(filename) {
  const ext = detectExt(filename);
  if (ext === "js" || ext === "ts") return <FileCode className="text-yellow-400" size={14} />;
  if (ext === "json") return <FileJson className="text-emerald-400" size={14} />;
  if (ext === "css") return <Hash className="text-blue-500" size={14} />;
  if (ext === "html") return <Globe className="text-orange-400" size={14} />;
  return <FileText className="text-slate-400" size={14} />;
}

function basicFormatJs(input) {
  const lines = input.replace(/\t/g, "  ").split("\n");
  let indent = 0;
  const out = lines.map((line) => {
    const trimmed = line.trimEnd();
    const left = trimmed.trimStart();
    if (left.startsWith("}") || left.startsWith("];") || left.startsWith("),")) {
      indent = Math.max(0, indent - 1);
    }
    const formatted = `${"  ".repeat(indent)}${left}`;
    if (left.endsWith("{")) indent += 1;
    return formatted;
  });
  return out.join("\n");
}

function injectProject(indexHtml, css, js) {
  const styleTag = `<style id="devai-style">\n${css}\n</style>`;
  const runtimeHook = `
<script>
(() => {
  const source = "devai-preview";
  const serialize = (value) => {
    if (typeof value === "string") return value;
    try { return JSON.stringify(value); } catch { return String(value); }
  };
  const send = (type, payload) => parent.postMessage({ source, type, payload }, "*");
  ["log", "info", "warn", "error"].forEach((level) => {
    const original = console[level].bind(console);
    console[level] = (...args) => {
      send("console", { level, args: args.map(serialize) });
      original(...args);
    };
  });
  window.addEventListener("error", (event) => {
    send("error", {
      message: event.message,
      line: event.lineno,
      column: event.colno
    });
  });
})();
</script>`;
  const appScript = `<script id="devai-script">\n${js}\n</script>`;

  let html = indexHtml || "<!doctype html><html><head></head><body></body></html>";
  if (html.includes("</head>")) html = html.replace("</head>", `${styleTag}\n</head>`);
  else html = `${styleTag}\n${html}`;
  if (html.includes('<script src="./main.js"></script>')) {
    html = html.replace('<script src="./main.js"></script>', `${runtimeHook}\n${appScript}`);
  } else if (html.includes("</body>")) {
    html = html.replace("</body>", `${runtimeHook}\n${appScript}\n</body>`);
  } else {
    html = `${html}\n${runtimeHook}\n${appScript}`;
  }
  return html;
}

const starterFiles = {
  "index.html": {
    code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DevAI Playground</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div class="card">
      <h1>DevAI Playground</h1>
      <p>Edit <code>main.js</code> and click COMPILE.</p>
      <button id="cta">Run Greeting</button>
      <pre id="result"></pre>
    </div>
    <script src="./main.js"></script>
  </body>
</html>`,
  },
  "style.css": {
    code: `:root {
  color-scheme: dark;
}
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: "Segoe UI", system-ui, sans-serif;
  background: radial-gradient(circle at 20% 20%, #1e293b, #020617 55%);
  color: #e2e8f0;
}
.card {
  width: min(520px, 92vw);
  border: 1px solid #334155;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.7);
}
button {
  background: #2563eb;
  color: white;
  border: 0;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 700;
  cursor: pointer;
}`,
  },
  "main.js": {
    code: `const result = document.getElementById("result");
const button = document.getElementById("cta");

function welcome(name) {
  return "Welcome to DevMastery, " + name + "!";
}

button.addEventListener("click", () => {
  const message = welcome("Student");
  result.textContent = message;
  console.log(message);
});`,
  },
};

export default function CodeEditor({ editorAction, onCompilerStateChange }) {
  const [files, setFiles] = useState(starterFiles);
  const [activeFile, setActiveFile] = useState("main.js");
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [logs, setLogs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [lastCodeSnapshot, setLastCodeSnapshot] = useState("");
  const [previewDoc, setPreviewDoc] = useState("");
  const [outputTab, setOutputTab] = useState("terminal");
  const textRef = useRef(null);
  const lineRef = useRef(null);

  const code = files[activeFile]?.code || "";
  const lines = useMemo(() => code.split("\n"), [code]);
  const lineCount = Math.max(10, lines.length);

  const pushLog = (text, type = "info") => {
    setLogs((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, text, type, time: now() },
    ]);
  };

  useEffect(() => {
    const onMessage = (event) => {
      if (event?.data?.source !== "devai-preview") return;
      if (event.data.type === "console") {
        const level = event.data.payload?.level;
        const args = event.data.payload?.args || [];
        const text = args.join(" ");
        if (level === "error") pushLog(text, "error");
        else if (level === "warn") pushLog(text, "warn");
        else pushLog(text, "output");
      }
      if (event.data.type === "error") {
        const err = event.data.payload || {};
        setErrors((prev) => [
          ...prev,
          {
            message: err.message || "Runtime error",
            line: err.line ?? null,
            column: err.column ?? null,
          },
        ]);
        pushLog(
          `Preview runtime error${err.line ? ` (line ${err.line}${err.column ? `:${err.column}` : ""})` : ""}`,
          "error",
        );
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!editorAction?.id) return;
    if (editorAction.type === "replace_project" && editorAction.payload?.files) {
      setFiles(editorAction.payload.files);
      const first = editorAction.payload.activeFile || Object.keys(editorAction.payload.files)[0];
      setActiveFile(first);
      pushLog("DevAI applied a full project template.", "success");
      return;
    }
    if (editorAction.type === "insert_snippet" && editorAction.payload?.snippet) {
      setFiles((prev) => ({
        ...prev,
        [activeFile]: { code: `${prev[activeFile]?.code || ""}\n${editorAction.payload.snippet}` },
      }));
      pushLog(`Snippet inserted in ${activeFile}.`, "success");
      return;
    }
    if (editorAction.type === "replace_file" && editorAction.payload?.file && typeof editorAction.payload?.code === "string") {
      const target = editorAction.payload.file;
      setFiles((prev) => ({
        ...prev,
        [target]: { code: editorAction.payload.code },
      }));
      setActiveFile(target);
      pushLog(`DevAI patched ${target}.`, "success");
      return;
    }
    if (editorAction.type === "open_file" && editorAction.payload?.file && files[editorAction.payload.file]) {
      setActiveFile(editorAction.payload.file);
    }
  }, [editorAction]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!onCompilerStateChange) return;
    onCompilerStateChange({
      activeFile,
      files,
      errors,
      logs,
      isCompiling,
    });
  }, [activeFile, files, errors, logs, isCompiling, onCompilerStateChange]);

  const updateCode = (next) => {
    setFiles((prev) => ({
      ...prev,
      [activeFile]: { code: next },
    }));
  };

  const handleCreateFile = (e) => {
    if (e.key !== "Enter" || !newFileName.trim()) return;
    const name = newFileName.includes(".") ? newFileName.trim() : `${newFileName.trim()}.js`;
    if (files[name]) {
      setIsCreatingFile(false);
      setNewFileName("");
      return;
    }
    setFiles((prev) => ({ ...prev, [name]: { code: `// ${name}\n` } }));
    setActiveFile(name);
    setIsCreatingFile(false);
    setNewFileName("");
    pushLog(`Created ${name}`, "success");
  };

  const deleteFile = (name) => {
    const keys = Object.keys(files);
    if (keys.length <= 1) return;
    const next = { ...files };
    delete next[name];
    setFiles(next);
    if (activeFile === name) setActiveFile(Object.keys(next)[0]);
    pushLog(`Deleted ${name}`, "info");
  };

  const formatCurrentFile = () => {
    const ext = detectExt(activeFile);
    if (!["js", "ts"].includes(ext)) {
      pushLog("Formatter currently supports JS/TS files.", "info");
      return;
    }
    updateCode(basicFormatJs(code));
    pushLog(`Formatted ${activeFile}`, "success");
  };

  const clearOutput = () => {
    setLogs([]);
    setErrors([]);
    setLastCodeSnapshot("");
  };

  const applyQuickFix = () => {
    if (!errors.length) return;
    const first = errors[0];
    if (String(first.message).includes("Unexpected end of input")) {
      updateCode(`${code}\n}`);
      pushLog("Applied quick fix: appended closing brace.", "success");
      return;
    }
    pushLog("No auto-fix available for this error.", "info");
  };

  const compile = async () => {
    setIsCompiling(true);
    setLogs([]);
    setErrors([]);
    setOutputTab("terminal");
    setLastCodeSnapshot(code);
    const ext = detectExt(activeFile);

    pushLog("Booting sandbox runtime...", "system");
    pushLog(`Validating ${activeFile}...`, "info");
    await new Promise((r) => setTimeout(r, 180));

    try {
      const html = files["index.html"]?.code || "";
      const css = files["style.css"]?.code || "";
      const js = files["main.js"]?.code || "";

      if (html || css || js) {
        const doc = injectProject(html, css, js);
        setPreviewDoc(doc);
        pushLog("Build succeeded.", "success");
        pushLog("Preview refreshed with latest project files.", "success");
        setOutputTab("preview");
        return;
      }

      if (!["js", "ts"].includes(ext)) {
        pushLog(`No runtime attached for .${ext}.`, "info");
        return;
      }

      const output = [];
      const fakeConsole = {
        log: (...args) => output.push(args.map((a) => String(a)).join(" ")),
        error: (...args) => output.push(args.map((a) => String(a)).join(" ")),
      };

      const fn = new Function("console", code);
      fn(fakeConsole);
      pushLog("Build succeeded.", "success");
      output.forEach((line) => pushLog(line, "output"));
      if (!output.length) pushLog("Process finished with exit code 0.", "system");
    } catch (err) {
      const parsed = parseJsError(err);
      setErrors([parsed]);
      const where = parsed.line ? ` (line ${parsed.line}${parsed.column ? `:${parsed.column}` : ""})` : "";
      pushLog(`Compilation failed${where}`, "error");
      pushLog(parsed.message, "error");
    } finally {
      setIsCompiling(false);
    }
  };

  const handleEditorScroll = () => {
    if (lineRef.current && textRef.current) {
      lineRef.current.scrollTop = textRef.current.scrollTop;
    }
  };

  const handleEditorKeyDown = (e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    const next = `${code.slice(0, start)}  ${code.slice(end)}`;
    updateCode(next);
    requestAnimationFrame(() => {
      if (textRef.current) {
        textRef.current.selectionStart = textRef.current.selectionEnd = start + 2;
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050a18] h-full border-l border-slate-800 shadow-2xl overflow-hidden font-sans">
      <div className="flex bg-[#0a1120] border-b border-slate-800/60 overflow-x-auto scrollbar-hide items-center">
        {Object.keys(files).map((name) => (
          <div
            key={name}
            onClick={() => !isCompiling && setActiveFile(name)}
            className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono cursor-pointer transition-all border-r border-slate-800/40 group min-w-fit ${
              activeFile === name ? "bg-[#050a18] text-blue-400 border-b-2 border-blue-500" : "text-slate-500 hover:bg-slate-800/20"
            }`}
          >
            {getIcon(name)}
            <span>{name}</span>
            <X
              size={12}
              className="ml-1 opacity-0 group-hover:opacity-100 hover:text-red-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(name);
              }}
            />
          </div>
        ))}

        <div className="px-3 ml-auto flex items-center gap-2">
          <button
            disabled={isCompiling}
            onClick={formatCurrentFile}
            className="text-slate-400 hover:text-white transition-colors"
            title="Auto format"
          >
            <Wand2 size={14} />
          </button>
          {isCreatingFile ? (
            <input
              autoFocus
              onBlur={() => setIsCreatingFile(false)}
              onKeyDown={handleCreateFile}
              onChange={(e) => setNewFileName(e.target.value)}
              value={newFileName}
              className="bg-slate-900 border border-blue-500/50 rounded px-2 py-0.5 text-[10px] outline-none text-white w-28"
              placeholder="name.js"
            />
          ) : (
            <button onClick={() => setIsCreatingFile(true)} className="text-slate-500 hover:text-white">
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-4 right-6 z-10 flex gap-2">
          <button
            disabled={isCompiling}
            onClick={compile}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[11px] font-black tracking-widest transition-all ${
              isCompiling ? "bg-slate-800 text-slate-500" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/20"
            }`}
          >
            {isCompiling ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />}
            {isCompiling ? "COMPILING..." : "COMPILE"}
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden pt-4 bg-[#050a18]">
          <div ref={lineRef} className="w-12 border-r border-slate-800/30 flex flex-col items-end pr-3 overflow-hidden select-none">
            {Array.from({ length: lineCount }).map((_, i) => (
              <span key={i} className="text-[12px] font-mono text-slate-700 leading-[21px] h-[21px]">
                {i + 1}
              </span>
            ))}
          </div>

          <textarea
            ref={textRef}
            value={code}
            onChange={(e) => updateCode(e.target.value)}
            onScroll={handleEditorScroll}
            onKeyDown={handleEditorKeyDown}
            readOnly={isCompiling}
            spellCheck="false"
            className="flex-1 bg-transparent text-slate-300 p-0 pl-4 font-mono text-[14px] resize-none outline-none leading-[21px] overflow-y-auto whitespace-pre"
          />
        </div>
      </div>

      <div className="h-64 bg-[#020617] border-t border-slate-800 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/50 bg-[#0a1120]">
          <div className="flex items-center gap-2">
            <Info size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Output Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOutputTab("terminal")}
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${outputTab === "terminal" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}
            >
              <TerminalSquare size={12} className="inline mr-1" />
              Terminal
            </button>
            <button
              onClick={() => setOutputTab("preview")}
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${outputTab === "preview" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}
            >
              <Eye size={12} className="inline mr-1" />
              Preview
            </button>
            <button
              onClick={clearOutput}
              className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white"
            >
              <Eraser size={12} className="inline mr-1" />
              Clear
            </button>
            <div
              className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                isCompiling ? "bg-yellow-500/10 text-yellow-500" : errors.length ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
              }`}
            >
              {isCompiling ? "COMPILING" : errors.length ? "FAILED" : "READY"}
            </div>
          </div>
        </div>

        {outputTab === "terminal" ? (
          <div className="flex-1 overflow-y-auto p-4 font-mono text-[12px] space-y-1.5 selection:bg-indigo-500/30">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 items-start">
                <span className="text-slate-600 text-[10px] pt-0.5 tabular-nums">{log.time}</span>
                <div className="flex gap-2 items-start">
                  {log.type === "success" && <CheckCircle2 size={14} className="text-emerald-500" />}
                  {log.type === "error" && <AlertCircle size={14} className="text-red-400" />}
                  {log.type === "warn" && <AlertCircle size={14} className="text-amber-400" />}
                  {!["success", "error", "warn"].includes(log.type) && <Info size={14} className="text-slate-500" />}
                  <span
                    className={`${
                      log.type === "output"
                        ? "text-white font-bold"
                        : log.type === "success"
                          ? "text-emerald-400"
                          : log.type === "error"
                            ? "text-red-300"
                            : log.type === "warn"
                              ? "text-amber-300"
                              : "text-slate-400"
                    }`}
                  >
                    {log.text}
                  </span>
                </div>
              </div>
            ))}

            {errors.map((err, idx) => (
              <div key={`err-${idx}`} className="bg-red-500/10 border-l-4 border-red-500/40 p-3 rounded">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-red-300 font-bold text-[11px]">
                    {err.line ? `Syntax Error (line ${err.line}${err.column ? `:${err.column}` : ""})` : "Runtime Error"}
                  </span>
                  <button
                    onClick={applyQuickFix}
                    className="text-[10px] px-2 py-1 rounded bg-red-600/30 text-red-200 hover:bg-red-600/50"
                  >
                    Quick Fix
                  </button>
                </div>
                <p className="text-red-200 mt-1">{err.message}</p>
              </div>
            ))}

            {!logs.length && !errors.length && !isCompiling && (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <Code2 size={24} />
                <p className="text-[10px] mt-2 font-bold uppercase tracking-widest">Compile to generate logs</p>
              </div>
            )}

            {lastCodeSnapshot && !isCompiling && !errors.length && (
              <div className="text-[10px] text-slate-600 pt-2">Snapshot saved for this run.</div>
            )}
          </div>
        ) : (
          <div className="flex-1 bg-white">
            {previewDoc ? (
              <iframe
                title="devai-preview"
                srcDoc={previewDoc}
                sandbox="allow-scripts allow-modals"
                className="w-full h-full border-0"
              />
            ) : (
              <div className="h-full bg-slate-950 text-slate-400 flex items-center justify-center text-sm">
                Compile once to load preview
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
