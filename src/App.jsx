import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";
const App = () => {
  return (
    <Routes>
      <Route index element={<Create />} />
      <Route path="/" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default App;
