import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "@midas-ds/components/default.css";
import "@midas-ds/layout/default.css";
import App from "./App.tsx";
import PixelToRem from "./pages/PixelToRem.tsx";
import TokenFinder from "./pages/TokenFinder.tsx";
import Dashboard from "./pages/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" index element={<Dashboard />} />
          <Route path="/pixeltorem" element={<PixelToRem />} />
          <Route path="/tokenfinder" element={<TokenFinder />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
