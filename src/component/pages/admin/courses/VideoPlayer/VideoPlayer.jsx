import React, { useState, useRef } from 'react';
import TopNav from './TopNav';
import MediaContent from './MediaContent';
import SidebarTools from './SidebarTools';

const VideoPlayer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarTab, setSidebarTab] = useState('compiler');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editorAction, setEditorAction] = useState(null);
  const [compilerState, setCompilerState] = useState({
    activeFile: "main.js",
    files: {},
    errors: [],
    logs: [],
    isCompiling: false,
  });
  
  const videoRef = useRef(null);

  const courseData = {
    title: "Mastering Full-Stack Web Development 2026",
    progress: 68,
    curriculum: [
      {
        id: 1,
        title: "01. Advanced React Patterns",
        duration: "15:20",
        completed: true,
        xp: 150,
        description: "Build reusable composition patterns, custom hooks, and scalable UI architecture.",
        transcript: "React composition, custom hooks, render patterns and reusability.",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
        resources: [{ name: "React Patterns Notes.pdf", size: "1.4 MB", url: "#" }],
      },
      {
        id: 2,
        title: "02. Building Scalable Node APIs",
        duration: "22:45",
        completed: true,
        xp: 200,
        description: "Build clean REST APIs with routing, validation, auth middleware, and service layers.",
        transcript: "Node API architecture, controllers, services, middleware, validation and security.",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&q=80",
        resources: [{ name: "API Design Checklist.pdf", size: "1.2 MB", url: "#" }],
      },
      {
        id: 3,
        title: "03. MongoDB Aggregation Pipelines",
        duration: "18:10",
        completed: false,
        xp: 250,
        description: "Understand match/group/project/lookups and create analytics-grade aggregation pipelines.",
        transcript: "Aggregation pipelines with practical MongoDB examples, lookups and optimization tips.",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        resources: [{ name: "Aggregation Cheat Sheet.pdf", size: "980 KB", url: "#" }],
      },
    ]
  };

  const [activeVideo, setActiveVideo] = useState(courseData.curriculum[2]);

  const addNote = (note) => {
    const text = note?.text ?? currentNote;
    if (!text?.trim()) return;
    const seconds = Number.isFinite(note?.seconds)
      ? note.seconds
      : videoRef.current
        ? videoRef.current.currentTime
        : 0;
    const time = note?.time ?? new Date(seconds * 1000).toISOString().slice(14, 19);
    setNotes((prev) => [{ id: Date.now(), text: text.trim(), time, seconds }, ...prev]);
  };

  const handleEditorAction = (action) => {
    setSidebarTab('compiler');
    setEditorAction({ ...action, id: Date.now() });
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
          setNotes={setNotes}
        />

        <SidebarTools 
          sidebarTab={sidebarTab}
          setSidebarTab={setSidebarTab}
          isFocusMode={isFocusMode}
          setIsFocusMode={setIsFocusMode}
          editorAction={editorAction}
          onCompilerStateChange={setCompilerState}
          onEditorAction={handleEditorAction}
          curriculum={courseData.curriculum}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          compilerState={compilerState}
        />
      </main>
    </div>
  );
};

export default VideoPlayer;
