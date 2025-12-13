import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SchoolOverview } from "@/components/SchoolOverview";
import { Infrastructure } from "@/components/Infrastructure";
import { Achievements } from "@/components/Achievements";
import { Gallery } from "@/components/Gallery";

import AcademicsPage from "@/pages/AcademicsPage";
import FacilitiesPage from "@/pages/FacilitiesPage";
import AboutUsPage from "@/pages/AboutUsPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

// Layout for public pages (includes Navbar and Footer)
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// Home Page Component
function LandingPage() {
  return (
    <>
      <HeroSection />
      <SchoolOverview />
      <Infrastructure />
      <Achievements />
      <Gallery />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar & Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Route>

        {/* Admin Routes (No Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
