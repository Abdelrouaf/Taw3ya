import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import SiteLayout from "./components/layout/SiteLayout.jsx";
import QuranPage from "./pages/QuranPage.jsx";
import AzkarPage from "./pages/AzkarPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route path="/" element={<QuranPage />} />
          <Route path="/azkar" element={<AzkarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  </React.StrictMode>,
);
