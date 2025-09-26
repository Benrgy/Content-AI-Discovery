import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import Providers from "./components/Providers";
import "./globals.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);