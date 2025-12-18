import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SchoolOverview } from "@/components/SchoolOverview";
import { Gallery } from "@/components/Gallery";

// Import new home page sections
import {
  TrustAuthority,
  AcademicExcellence,
  InfrastructureFacilities,
  FacultyStudentCare,
  HolisticDevelopment,
  Testimonials,
  AdmissionCTA
} from "@/components/home";

import AcademicsPage from "@/pages/AcademicsPage";
import TeachingMethodologyPage from "@/pages/academics/TeachingMethodologyPage";
import CurriculumPage from "@/pages/academics/CurriculumPage";
import FacilitiesPage from "@/pages/FacilitiesPage";
import AboutUsPage from "@/pages/AboutUsPage";
import GalleryPage from "@/pages/GalleryPage";
import AchievementsPage from "@/pages/AchievementsPage";
import ResultsPage from "@/pages/achievements/ResultsPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import SportsActivityPage from "@/pages/activities/SportsActivityPage";
import CulturalActivityPage from "@/pages/activities/CulturalActivityPage";
import ClubsActivityPage from "@/pages/activities/ClubsActivityPage";
import TestPage from "@/pages/TestPage";
import SchoolCalendarPage from "@/pages/SchoolCalendarPage";
import TeachingStaffPage from "@/pages/TeachingStaffPage";
import SwimmingActivityPage from "@/pages/activities/SwimmingActivityPage";
import HorseRidingActivityPage from "@/pages/activities/HorseRidingActivityPage";
import ContactPage from "@/pages/ContactPage";
import AdmissionLandingPage from "@/pages/AdmissionLandingPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import { ScrollToTop } from "@/components/ScrollToTop";

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

// Redesigned Home Page Component with all new sections
function LandingPage() {
  return (
    <>
      {/* 1. HERO / ABOVE-THE-FOLD SECTION */}
      <HeroSection />

      {/* 2. TRUST & AUTHORITY SECTION */}
      <TrustAuthority />

      {/* 3. SCHOOL OVERVIEW / LEGACY */}
      <SchoolOverview />

      {/* 4. ACADEMIC EXCELLENCE */}
      <AcademicExcellence />

      {/* 5. INFRASTRUCTURE & FACILITIES */}
      <InfrastructureFacilities />

      {/* 6. FACULTY & STUDENT CARE */}
      <FacultyStudentCare />

      {/* 7. HOLISTIC DEVELOPMENT */}
      <HolisticDevelopment />

      {/* 8. SOCIAL PROOF - TESTIMONIALS */}
      <Testimonials />

      {/* 9. LIFE AT INDUS - GALLERY */}
      <Gallery />

      {/* 10. ADMISSION & LEAD GENERATION */}
      <AdmissionCTA />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Navbar & Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/academics/methodology" element={<TeachingMethodologyPage />} />
          <Route path="/academics/curriculum" element={<CurriculumPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/academics/teaching-staff" element={<TeachingStaffPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/academics/calendar" element={<SchoolCalendarPage />} />
          <Route path="/activities/sports" element={<SportsActivityPage />} />
          <Route path="/activities/cultural" element={<CulturalActivityPage />} />
          <Route path="/activities/clubs" element={<ClubsActivityPage />} />
          <Route path="/activities/swimming" element={<SwimmingActivityPage />} />
          <Route path="/activities/horse-riding" element={<HorseRidingActivityPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/achievements/results" element={<ResultsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>

        {/* Admin Routes (No Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Standalone Pages (No Navbar) */}
        <Route path="/admission" element={<AdmissionLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
