import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PatientDashboard from "./pages/PatientDashboard";
import ResearchDashboard from "./pages/ResearchDashboard";

import AuthPage from "./pages/AuthPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0C2D4A] text-gray-800 dark:text-gray-100 transition-colors duration-500">
      <Navbar />

      {/* ✅ ScrollToTop ensures page starts from top on route change */}
      <ScrollToTop />

      <main className="flex-grow mt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
         
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/research" element={<ResearchDashboard />} />
        
          <Route path="/authpage" element={<AuthPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
