import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route index element={<Create />} />
        <Route path="/crud-fakeapi" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
