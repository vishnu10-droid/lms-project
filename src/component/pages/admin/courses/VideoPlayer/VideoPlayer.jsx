import React, { useState, useRef } from 'react';
import TopNav from './TopNav';
import MediaContent from './MediaContent';
import SidebarTools from './SidebarTools';

const VideoPlayer = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarTab, setSidebarTab] = useState('compiler');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [code, setCode] = useState(`// Task: Create a function that greets the user\nfunction welcome(name) {\n  return "Welcome to DevMastery, " + name + "!";\n}\n\nconsole.log(welcome("Student"));`);
  const [output, setOutput] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  
  const videoRef = useRef(null);

  const courseData = {
    title: "Mastering Full-Stack Web Development 2026",
    progress: 68,
    curriculum: [
      { id: 1, title: "01. Advanced React Patterns", duration: "15:20", completed: true, xp: 150 },
      { id: 2, title: "02. Building Scalable Node APIs", duration: "22:45", completed: true, xp: 200 },
      { id: 3, title: "03. MongoDB Aggregation Pipelines", duration: "18:10", completed: false, xp: 250 },
    ]
  };

  const [activeVideo, setActiveVideo] = useState(courseData.curriculum[2]);

  // --- LOGIC ---
  const runCode = () => {
    setOutput(["Compiling environment...", "Running main.js...", "> Output: Welcome to DevMastery, Student!", "> Process finished with exit code 0"]);
  };

  const addNote = () => {
    if (!currentNote.trim()) return;
    const timestamp = videoRef.current ? Math.floor(videoRef.current.currentTime) : 0;
    const timeString = new Date(timestamp * 1000).toISOString().substr(14, 5);
    setNotes([{ id: Date.now(), text: currentNote, time: timeString }, ...notes]);
    setCurrentNote("");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col overflow-hidden">
      <TopNav progress={courseData.progress} />
      
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <MediaContent 
          videoRef={videoRef}
          activeVideo={activeVideo}
          isFocusMode={isFocusMode}
          setIsFocusMode={setIsFocusMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          notes={notes}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          addNote={addNote}
        />

        <SidebarTools 
          sidebarTab={sidebarTab}
          setSidebarTab={setSidebarTab}
          isFocusMode={isFocusMode}
          setIsFocusMode={setIsFocusMode}
          code={code}
          setCode={setCode}
          runCode={runCode}
          output={output}
          curriculum={courseData.curriculum}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
        />
      </main>
    </div>
  );
};

export default VideoPlayer;