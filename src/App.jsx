// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Fooder";
import FirstPage from "./pages/FirstPage";
import AboutPage from "./pages/AboutPage";
import QuickOrderPage from "./pages/QuickOrderPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import ContactPage from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingPolicy from "./pages/ShippingPolicy";
import AdminPage from "./pages/AdminPage";
import ScrollToTop from "./components/ScrollToTop";
import FloatingButtons from "./components/FloatingButtons";
import { colors } from "./colors";

// Small component that decides whether to show Footer
function ConditionalFooter() {
  const location = useLocation();

  // Hide footer on the root path (QuickOrderPage) and admin path
  if (location.pathname === "/" || location.pathname === "/admin") {
    return null;
  }

  return <Footer />;
}

// Small component that decides whether to show FloatingButtons
function ConditionalFloatingButtons() {
  const location = useLocation();

  // Only hide on admin path
  if (location.pathname === "/admin") {
    return null;
  }

  return <FloatingButtons />;
}

// Small component that decides whether to show Header
function ConditionalHeader() {
  const location = useLocation();

  // Hide header on admin path
  if (location.pathname === "/admin") {
    return null;
  }

  return <Header />;
}

function App() {
  return (
    <Router>
      <ConditionalHeader />

      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/home" element={<QuickOrderPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <ConditionalFooter />
      {/* Conditional floating buttons - hidden on QuickOrderPage */}
      <ConditionalFloatingButtons />
    </Router>
  );
}

export default App;
