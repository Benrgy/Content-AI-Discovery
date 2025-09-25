import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
// StrictMode is now handled by the Providers component, so no direct import needed here.

createRoot(document.getElementById("root")!).render(
  <App /> // App is now wrapped by Providers, which includes StrictMode
);