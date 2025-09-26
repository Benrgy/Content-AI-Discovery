"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "@/router/routes"; // Updated import path
import Layout from "./components/Layout";
// Removed Providers import as it's now in main.tsx

const App = () => (
  // Removed Providers wrapper as it's now in main.tsx
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;