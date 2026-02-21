import { useMemo, useState } from "react";
import { Bot, Sparkles, SendHorizontal, Wand2, Code2, AlertTriangle } from "lucide-react";

function createActionMessage(title, summary, command, snippet) {
  return {
    role: "ai",
    title,
    content: summary,
    snippet,
    command,
  };
}

function buildTemplate(kind) {
  if (kind === "login") {
    return {
      type: "replace_project",
      payload: {
        activeFile: "main.js",
        files: {
          "index.html": {
            code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Form</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <main class="card">
      <h1>Welcome Back</h1>
      <form id="loginForm" novalidate>
        <label>Email</label>
        <input id="email" type="email" placeholder="name@company.com" required />
        <label>Password</label>
        <input id="password" type="password" minlength="8" required />
        <button type="submit">Sign In</button>
      </form>
      <p id="msg"></p>
    </main>
    <script src="./main.js"></script>
  </body>
</html>`,
          },
          "style.css": {
            code: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: "Segoe UI", system-ui, sans-serif;
  background: linear-gradient(140deg, #111827, #0f172a);
  color: #e2e8f0;
}
.card {
  width: min(420px, 92vw);
  background: #0b1222;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 24px;
}
label { display: block; margin-top: 12px; font-weight: 700; font-size: 12px; }
input {
  width: 100%;
  margin-top: 6px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
}
button {
  width: 100%;
  margin-top: 16px;
  padding: 11px;
  border: 0;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  font-weight: 700;
  cursor: pointer;
}`,
          },
          "main.js": {
            code: `const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!email.value || !password.value) {
    msg.textContent = "Please fill all fields";
    msg.style.color = "#f87171";
    return;
  }
  if (password.value.length < 8) {
    msg.textContent = "Password must be 8+ characters";
    msg.style.color = "#f87171";
    return;
  }
  msg.textContent = "Login validated successfully";
  msg.style.color = "#4ade80";
  console.log("Login submitted for", email.value);
});`,
          },
        },
      },
    };
  }

  if (kind === "qa") {
    return {
      type: "insert_snippet",
      payload: {
        snippet: `\n// Q&A helper function\nfunction answerQuestion(question, answer) {\n  return { question, answer, at: new Date().toISOString() };\n}\nconsole.log(answerQuestion("What is a hook?", "A React feature for state and lifecycle in function components."));`,
      },
    };
  }

  return {
    type: "insert_snippet",
    payload: {
      snippet: `\n// Performance helper\nconst debounce = (fn, delay = 250) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};`,
    },
  };
}

function answerFromVideo(prompt, activeVideo) {
  const title = activeVideo?.title || "this lesson";
  const desc = activeVideo?.description || "core web development concepts";
  if (!prompt) return "";
  return `Based on ${title}: ${desc}. If you want, I can also generate a runnable demo in IDE for this topic.`;
}

function autoFixFromCompilerState(compilerState) {
  const firstError = compilerState?.errors?.[0];
  if (!firstError) {
    return {
      ok: false,
      content: "No compiler error found yet. Run COMPILE first, then ask for fix.",
    };
  }

  const file = compilerState?.activeFile || "main.js";
  const currentCode = compilerState?.files?.[file]?.code || "";
  const message = String(firstError.message || "");
  let nextCode = currentCode;
  let summary = "Prepared a safe patch based on the latest compiler error.";

  if (message.includes("Unexpected end of input")) {
    nextCode = `${currentCode}\n}`;
    summary = "Detected incomplete block. Added a closing brace at file end.";
  } else if (message.includes("missing ) after argument list")) {
    nextCode = `${currentCode}\n)`;
    summary = "Detected missing parenthesis. Added a closing `)` at file end.";
  } else {
    nextCode = `// DevAI note: manual review suggested for this error\n${currentCode}`;
    summary = "Could not safely infer exact syntax fix, so I added a review marker for guided debugging.";
  }

  return {
    ok: true,
    content: summary,
    command: {
      type: "replace_file",
      payload: {
        file,
        code: nextCode,
      },
    },
    snippet: `// Error: ${message}\n// File: ${file}`,
  };
}

export default function DevAi({ activeVideo, onEditorAction, compilerState }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      title: "DevAI Ready",
      content: "Ask Q&A or use quick actions. I can directly apply runnable code to IDE.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const suggestions = useMemo(
    () => [
      { label: "Create login form", kind: "login" },
      { label: "Fix last compiler error", kind: "fix" },
      { label: "Add Q&A helper", kind: "qa" },
      { label: "Optimize performance", kind: "perf" },
      { label: "Explain current lesson", kind: "explain" },
    ],
    [],
  );

  const applyCommand = (command) => {
    if (command && onEditorAction) onEditorAction(command);
  };

  const askAI = async (preset) => {
    const prompt = (preset ?? question).trim();
    if (!prompt) return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setLoading(true);

    const lower = prompt.toLowerCase();
    if (lower.includes("login")) {
      const command = buildTemplate("login");
      setMessages((prev) => [
        ...prev,
        createActionMessage(
          "Login form generated",
          "Complete 3-file login form prepared with validation and submit flow.",
          command,
          "Template includes index.html + style.css + main.js",
        ),
      ]);
      setLoading(false);
      setQuestion("");
      return;
    }

    if (lower.includes("q&a") || lower.includes("qa")) {
      const command = buildTemplate("qa");
      setMessages((prev) => [
        ...prev,
        createActionMessage(
          "Q&A helper ready",
          "I prepared a snippet for question/answer data handling.",
          command,
          command.payload.snippet,
        ),
      ]);
      setLoading(false);
      setQuestion("");
      return;
    }

    if (lower.includes("fix") && lower.includes("error")) {
      const result = autoFixFromCompilerState(compilerState);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          title: result.ok ? "Compiler fix prepared" : "No error found",
          content: result.content,
          command: result.command,
          snippet: result.snippet,
        },
      ]);
      setLoading(false);
      setQuestion("");
      return;
    }

    if (lower.includes("optimize")) {
      const command = buildTemplate("perf");
      setMessages((prev) => [
        ...prev,
        createActionMessage(
          "Performance snippet prepared",
          "Debounce utility is ready to reduce unnecessary heavy calls.",
          command,
          command.payload.snippet,
        ),
      ]);
      setLoading(false);
      setQuestion("");
      return;
    }

    if (lower.includes("explain") || lower.includes("what") || lower.includes("how") || lower.includes("why")) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          title: "Lesson Q&A",
          content: answerFromVideo(prompt, activeVideo),
        },
      ]);
      setLoading(false);
      setQuestion("");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/devai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: prompt,
          videoTitle: activeVideo?.title,
          videoDescription: activeVideo?.description,
          transcript: activeVideo?.transcript,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "ai", title: "DevAI Answer", content: data.reply || "No response received." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          title: "Offline fallback",
          content:
            "Backend DevAI unreachable. You can still use quick actions above to generate and apply runnable code.",
        },
      ]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gradient-to-b from-[#0a1325] to-[#070d1a]">
      <div className="flex items-center gap-2 mb-3">
        <Bot size={16} className="text-blue-400" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">DevAI Assistant</p>
      </div>

      {compilerState?.errors?.length > 0 && (
        <div className="mb-3 p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs flex items-start gap-2">
          <AlertTriangle size={14} className="mt-0.5" />
          <span>
            Latest compiler error: {String(compilerState.errors[0].message || "Unknown error")}
          </span>
        </div>
      )}

      <div className="flex gap-2 mb-3 flex-wrap">
        {suggestions.map((s) => (
          <button
            key={s.label}
            onClick={() => askAI(s.label)}
            className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}`}
            className={`p-3 rounded-xl text-sm border ${
              msg.role === "user"
                ? "bg-blue-600 text-white border-blue-500 ml-8"
                : "bg-slate-900 text-slate-200 border-slate-700"
            }`}
          >
            {msg.title && (
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-blue-300">
                <Sparkles size={12} />
                {msg.title}
              </div>
            )}
            <p>{msg.content}</p>
            {msg.snippet && (
              <pre className="mt-2 p-2 rounded bg-[#020617] text-slate-200 text-xs overflow-x-auto border border-slate-800">
                {msg.snippet}
              </pre>
            )}
            {msg.command && (
              <button
                onClick={() => applyCommand(msg.command)}
                className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              >
                <Wand2 size={13} />
                Apply to IDE
              </button>
            )}
          </div>
        ))}
        {loading && <div className="text-sm text-slate-400 animate-pulse">DevAI is thinking...</div>}
      </div>

      <div className="mt-3 text-[10px] text-slate-500 flex items-center gap-1">
        <Code2 size={12} />
        Natural language commands: "Create login form", "Fix last compiler error", "Add Q&A helper", "Explain this lesson"
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask DevAI..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-100"
          onKeyDown={(e) => {
            if (e.key === "Enter") askAI();
          }}
        />
        <button
          onClick={() => askAI()}
          className="bg-blue-600 px-3.5 rounded-lg text-white inline-flex items-center justify-center hover:bg-blue-500"
        >
          <SendHorizontal size={15} />
        </button>
      </div>
    </div>
  );
}
