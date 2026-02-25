import React from "react";
import "./App.css";
import Layout from "./component/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Admin from "./component/pages/admin/dashboard/Admin";
import Certificate from "./component/pages/admin/certificate/Certificate";
import Analytics from "./component/pages/admin/Analytics/Analytics";
import Instructorid from "./component/pages/admin/instrouctor/Instructor";
import CourseAdd from "./component/pages/admin/courses/CourseAdd";
import Course from "./component/pages/admin/courses/Course";
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
import PlayList from "./component/pages/admin/courses/PlayList";
import CourseCategoriesFullstack from "./component/pages/admin/courses/CourseCategoriesFullstack";
// import VideoPlayer from "./component/pages/admin/courses/VideoPlayer";
import ScrollToTop from "./component/jsx/ScrollToTop";
import SubscriptionPlans from "./component/pages/admin/courses/SubscriptionPlans";
import VideoPlayer from "./component/pages/admin/courses/VideoPlayer/VideoPlayer";
import Settings from "./component/pages/admin/settings/Setting";
import StudentForm from "./component/pages/admin/students/StudentForm";
import FloatThemeButton from "./component/common/FloatThemeButton";
import FloatAIChatButton from "./component/common/FloatAIChatButton";
import HelpCenter from "./component/pages/admin/help/HelpCenter";
import Chats from "./component/pages/admin/chats/Chats";
import AddBatches from "./component/pages/admin/courses/batches/AddBatches";
import Batches from "./component/pages/admin/courses/batches/Batches";
import Payments from "./component/pages/admin/payments/Payments";
import Role from "./component/pages/admin/settings/role/Role";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <FloatAIChatButton />
      <FloatThemeButton />

      <Routes>
        <Route path="/admin/Course/video/player" element={<VideoPlayer />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/courses/add" element={<CourseAdd />} />
          <Route path="/admin/addbatches" element={<AddBatches />} />
          <Route path="/admin/batches" element={<Batches />} />

          <Route
            path="/admin/courses/SubscriptionPlans"
            element={<SubscriptionPlans />}
          />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/role" element={<Role />} />

          <Route path="/admin/courses" element={<Course />} />
          <Route
            path="/admin/Categories"
            element={<CourseCategoriesFullstack />}
          /> {/* <Route path="/admin/categories" element={<CourseCategories />} /> */}
          <Route path="/admin/certificates" element={<Certificate />} />
          <Route path="/admin/students/id" element={<Students />} />
          <Route path="/admin/students/form" element={<StudentForm />} />
          <Route path="/admin/instructors" element={<Instructorid />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route
            path="/admin/students/payments"
            element={<StudentPayments />}
          />
          <Route
            path="/admin/instructors/profile"
            element={<InstrouctorProlife />}
          />
          <Route path="/admin/reports" element={<Reports />} />


          <Route
            path="/admin/schedulepage/eventmodal"
            element={<EventModal />}
          />
          <Route path="/admin/schedule/dayview" element={<DayView />} />
          <Route path="/admin/schedule/monthview" element={<MonthView />} />
          <Route path="/admin/schedule/weekview" element={<WeekView />} />
          <Route path="/admin/schedule" element={<Schedule />} />
          <Route path="/admin/helpcenter" element={<HelpCenter />} />
          <Route path="/admin/chats" element={<Chats />} />
                <Route path="/admin/PAYMENT" element={<Payments />} />

          <Route path="/admin/courses/playlist" element={<PlayList />} />
        </Route>
      </Routes>
    </>
  );
}
