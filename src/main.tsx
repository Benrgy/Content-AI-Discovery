import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import Providers from "./components/Providers";
import "./globals.css";

console.log("main.tsx: Starting application");

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("main.tsx: Root element not found");
  throw new Error("Root element not found");
}

console.log("main.tsx: Creating root");
createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);