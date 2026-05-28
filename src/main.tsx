import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import "@midas-ds/components/default.css";
import "@midas-ds/layout/default.css";
import App from "./App.tsx";
import PixelToRem from "./pages/PixelToRem.tsx";
import TokenFinder from "./pages/TokenFinder.tsx";
import Home from "./pages/Home.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="/" index element={<Home />} />
          <Route path="/pixeltorem" element={<PixelToRem />} />
          <Route path="/tokenfinder" element={<TokenFinder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
