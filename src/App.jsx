import React from "react";
import "./App.css";
import Layout from "./component/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Admin from "./component/pages/admin/dashboard/Admin";
import Certificate from "./component/pages/admin/certificate/Certificate";
import Analytics from "./component/pages/admin/Analytics/Analytics";
import Notifications from "./component/pages/admin/Notification/Notifications";
import Settings from "./component/pages/admin/Setting/Settings";
import Payments from "./component/pages/admin/payments/Payments";
import Instructorid from "./component/pages/admin/instrouctor/Instructor";
import Studentid from "./component/pages/admin/students/Students";
import CourseAdd from "./component/pages/admin/courses/CourseAdd";
import Course from "./component/pages/admin/courses/Course";
import CourseCategories from "./component/pages/admin/courses/CourseCategories";
import StudentPayments from "./component/pages/admin/students/StudentPayments";
import InstrouctorProlife from "./component/pages/admin/instrouctor/InstrouctorProlife";
import Schedule from "./component/pages/admin/schedule/Schedule";
import Reports from "./component/pages/admin/reports/Reports";
import StudentList from "./component/pages/admin/students/Students";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Admin />} />
          <Route path="/admin/courses/add" element={<CourseAdd />} />
          <Route path="/admin/courses" element={<Course />} />
          <Route path="/admin/categories" element={<CourseCategories />} />
          <Route path="/admin/certificates" element={<Certificate />} />
          <Route path="/admin/students/id" element={<StudentList/>} />
          <Route path="/admin/instructors" element={<Instructorid />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/payment" element={<Payments />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route
            path="/admin/students/payments"
            element={<StudentPayments />}
          />
          <Route
            path="/admin/instructors/profile"
            element={<InstrouctorProlife />}
          />
          <Route path="/admin/schedule" element={<Schedule />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>
      </Routes>
    </>
  );
}
