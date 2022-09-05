import React from "react";
import Landing from "./components/Landing";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/laptopinfo" element={<LaptopInfo />} />
      </Routes>
    </>
  );
}
