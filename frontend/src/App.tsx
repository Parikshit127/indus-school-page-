import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { SchoolOverview } from "@/components/SchoolOverview";
import { Infrastructure } from "@/components/Infrastructure";
import { Achievements } from "@/components/Achievements";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SchoolOverview />
      <Infrastructure />
      <Achievements />
      <Gallery />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
