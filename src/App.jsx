import React from "react";
import "./App.css";
import Layout from './component/layout/Layout'
import { Route, Routes } from "react-router-dom";
import Admin from "./component/pages/admin/dashboard/Admin";
<<<<<<< HEAD
import Courses from "./component/pages/admin/courses/CourseList";
import CoursePreview from "./component/pages/admin/courses/CoursePreview";
import CoursesList from "./component/pages/admin/courses/CourseList";
=======
import Course from "./component/pages/admin/courses/Course";
>>>>>>> ae36658bedd84ffcd1a6a798881832e50857c122

export default function App() {
  return (
    <>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Admin />} />
<<<<<<< HEAD
           <Route path="/courses" element={<Courses/>} />
           <Route path="/courses/live" element={<CoursePreview />} />
           <Route path="/courselist" element={<CoursesList />} />
=======
           <Route path="/rr" element={<Course />} />
>>>>>>> ae36658bedd84ffcd1a6a798881832e50857c122
        </Route>
      </Routes>
    </>
  );
}
