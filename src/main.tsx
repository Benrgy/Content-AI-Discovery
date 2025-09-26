import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import Providers from "./components/Providers.tsx"; // Import Providers
import { StrictMode } from "react"; // Import StrictMode directly

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);