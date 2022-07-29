import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import List from "../views/List";
import Add from "../views/Add";
import Home from "../views/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<List />} />
        <Route path="add" element={<Add />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
};

export default Router;
