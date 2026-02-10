import React from "react";
import "./App.css";
import Layout from "./component/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Admin from "./component/pages/admin/dashboard/Admin";
import Certificate from "./component/pages/admin/certificate/Certificate";
import Analytics from "./component/pages/admin/Analytics/Analytics";
import Payments from "./component/pages/admin/payments/Payments";
import Instructorid from "./component/pages/admin/instrouctor/Instructor";
import CourseAdd from "./component/pages/admin/courses/CourseAdd";
import Course from "./component/pages/admin/courses/Course";
import CourseCategories from "./component/pages/admin/courses/CourseCategories";
import StudentPayments from "./component/pages/admin/students/StudentPayments";
import InstrouctorProlife from "./component/pages/admin/instrouctor/InstrouctorProlife";
import Schedule from "./component/pages/admin/schedule/Calendar";
import Reports from "./component/pages/admin/reports/Reports";
import EventModal from "./component/pages/admin/schedule/EventModal";
import DayView from "./component/pages/admin/schedule/DayView";
import MonthView from "./component/pages/admin/schedule/MonthView";
import WeekView from "./component/pages/admin/schedule/WeekView";
import Students from "./component/pages/admin/students/Students";
import AdminNotifications from "./component/pages/admin/Notification/Notifications";
import AdminProfile from "./component/pages/admin/dashboard/AdminProfile";
import Login from "./component/layout/Login";
import Settings from './component/pages/admin/settings/Setting';  // ✅ Works now
import PlayList from "./component/pages/admin/courses/PlayList";


export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Admin />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin/profile" element={<AdminProfile/>} />
          <Route path="/admin/courses/add" element={<CourseAdd />} />
          <Route path="/admin/courses" element={<Course />} />
          <Route path="/admin/categories" element={<CourseCategories />} />
          <Route path="/admin/certificates" element={<Certificate />} />
          <Route path="/admin/students/id" element={<Students/>} />
          <Route path="/admin/instructors" element={<Instructorid />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/payment" element={<Payments />} />
          <Route path="/admin/notifications" element={<AdminNotifications/>} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route
            path="/admin/students/payments"
            element={<StudentPayments />}
          />
          <Route
            path="/admin/instructors/profile"
            element={<InstrouctorProlife />}
          />
          <Route path="/admin/reports" element={<Reports />} />

          {/* Schedule */}
          
          <Route path="/admin/schedulepage/eventmodal" element={<EventModal />} />
          <Route path="/admin/schedule/dayview" element={<DayView />} />
          <Route path="/admin/schedule/monthview" element={<MonthView />} />
          <Route path="/admin/schedule/weekview" element={<WeekView />} />
          <Route path="/admin/schedule" element={<Schedule />} />
          <Route path="/admin/courses/playlist" element={<PlayList />} />

          <Route path="/admin/settings" element={<Settings/>} />





        </Route>
      </Routes>
    </>
  );
}
