import React from "react";
import "./App.css";
import Layout from './component/layout/Layout'
import { Route, Routes } from "react-router-dom";
import Admin from "./component/pages/admin/dashboard/Admin";

export default function App() {
  return (
    <>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}
