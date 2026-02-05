import React from "react";
import "./App.css";
import Layout from './component/layout/Layout'
import { Route, Routes } from "react-router-dom";
import Admin from "./component/pages/admin/dashboard/Admin";
import Courses from "./component/pages/admin/courses/Courses";

export default function App() {
  return (
    <>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Admin />} />
           <Route path="/courses" element={<Courses />} />
        </Route>
      </Routes>
    </>
  );
}
