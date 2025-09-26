import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import Providers from "./components/Providers.tsx";
import "./globals.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there's a div with id='root' in your HTML.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);