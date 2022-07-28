import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import List from "../views/List";
import Add from "../views/Add";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="add" element={<Add />} />
    </Routes>
  );
};

export default Router;