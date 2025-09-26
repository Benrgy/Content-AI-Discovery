"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "@/router/routes";
import Layout from "./components/Layout";

const App = () => (
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