import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
const App = () => {
  return (
    <Routes>
      <Route index element={<Create />} />
      <Route path="/crud-fakeapi" element={<Create />} />
    </Routes>
  );
};

export default App;
