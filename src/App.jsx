// src/App.jsx
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Fooder";
import FirstPage from "./pages/FirstPage";
import FloatingButtons from "./components/FloatingButtons";

// Lazy-load secondary routes to keep initial bundle ultra-light and fast
const AboutPage = lazy(() => import("./pages/AboutPage"));
const QuickOrderPage = lazy(() => import("./pages/QuickOrderPage"));
const NewArrivalsPage = lazy(() => import("./pages/NewArrivalsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));

// Small component that decides whether to show Footer
function ConditionalFooter() {
  const location = useLocation();

  // Hide footer on the root path (QuickOrderPage) and admin path
  if (location.pathname === "/" || location.pathname.toLowerCase().startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}

// Small component that decides whether to show FloatingButtons
function ConditionalFloatingButtons() {
  const location = useLocation();

  // Only hide on admin path
  if (location.pathname.toLowerCase().startsWith("/admin")) {
    return null;
  }

  return <FloatingButtons />;
}

// Small component that decides whether to show Header
function ConditionalHeader() {
  const location = useLocation();

  // Hide header on admin path
  if (location.pathname.toLowerCase().startsWith("/admin")) {
    return null;
  }

  return <Header />;
}

function App() {
  return (
    <Router>
      {/* Accessible Skip to Content Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <ConditionalHeader />

      {/* Semantic Main Landmark */}
      <Box component="main" id="main-content" tabIndex={-1} sx={{ outline: "none", minHeight: "60vh" }}>
        <Suspense fallback={<Box sx={{ minHeight: "50vh" }} />}>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<QuickOrderPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </Box>

      <ConditionalFooter />
      {/* Conditional floating buttons */}
      <ConditionalFloatingButtons />
    </Router>
  );
}

export default App;
