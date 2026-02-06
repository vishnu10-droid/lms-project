import React from "react";
import "./App.css";
import Layout from "./component/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Admin from "./component/pages/admin/dashboard/Admin";
import Courses from "./component/pages/admin/courses/CourseList";
import CoursePreview from "./component/pages/admin/courses/CoursePreview";
import CoursesList from "./component/pages/admin/courses/CourseList";
import Certificate from "./component/pages/admin/certificate/Certificate";
import Users from "./component/pages/user/Users";
import Students from "./component/pages/user/Students";
import InstructorProfile from "./component/pages/user/Instructor";
import Analytics from "./component/pages/admin/Analytics/Analytics";
import Enrollments from "./component/pages/Enrollment/Enrollments";
import Messages from "./component/pages/message/Messages";
import Notifications from "./component/pages/Notification/Notifications";
import Settings from "./component/pages/Setting/Settings";


export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Admin />} />
           <Route path="/courses" element={<Courses/>} />
           <Route path="/courses/live" element={<CoursePreview />} />
           <Route path="/courselist" element={<CoursesList />} />
            <Route path="/certificates" element={<Certificate />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/students" element={<Students />} />
                <Route path="/users/instructors" element={<InstructorProfile />} />
                 <Route path="/analytics" element={<Analytics />} />
                 <Route path="/enrollments" element={<Enrollments />} />
                 <Route path="/messages" element={<Messages />} />
                 <Route path="/notifications" element={<Notifications />} />
                 <Route path="/settings" element={<Settings />} />

        </Route>
      </Routes>
    </>
  );
}
