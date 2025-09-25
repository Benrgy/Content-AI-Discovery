import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { StrictMode } from "react"; // Import StrictMode directly

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);