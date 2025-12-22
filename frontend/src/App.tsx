import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";

// Import home page sections
import {
  AcademicExcellence,
  InfrastructureFacilities,
  Testimonials,
  AdmissionCTA,
  Highlights,
  HomeInfoSection
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
import NewsEventsPage from "@/pages/NewsEventsPage";
import NewsEventDetailPage from "@/pages/NewsEventDetailPage";
import AdmissionLandingPage from "@/pages/AdmissionLandingPage";
import AdmissionsPage from "@/pages/AdmissionsPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PopupBannerModal } from "@/components/PopupBannerModal";

// Layout for public pages (includes Navbar and Footer)
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden w-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// Redesigned Home Page Component
function LandingPage() {
  return (
    <>
      <PopupBannerModal />
      {/* 1. HERO / ABOVE-THE-FOLD SECTION */}
      <HeroSection />

      {/* 2. HIGHLIGHTS - LATEST HAPPENINGS */}
      <Highlights />

      {/* 2.5. HOME INFO SECTION (Infrastructure, Welcome, News) */}
      <HomeInfoSection />

      {/* 3. ACADEMIC EXCELLENCE */}
      <AcademicExcellence />

      {/* 3. INFRASTRUCTURE & FACILITIES */}
      <InfrastructureFacilities />

      {/* 4. SOCIAL PROOF - TESTIMONIALS */}
      <Testimonials />

      {/* 5. ADMISSION & LEAD GENERATION */}
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
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/news-events/:slug" element={<NewsEventDetailPage />} />
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
