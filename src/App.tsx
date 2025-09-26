"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "@/router/routes";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;