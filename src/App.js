import React from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

// Context Providers
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";

// Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ContactSection from "./components/common/ContactSection";

// Pages
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import CarsPage from "./pages/CarsPage";
import ModelsPage from "./pages/models/ModelsPage";
import BlogPage from "./pages/BlogPage";

// Auth Pages
// import LoginPage from "./pages/auth/LoginPage";
// import SignupPage from "./pages/auth/SignupPage";
import { AuthPage, CarDetailsPage } from "./pages";

// Collections Pages
import CollectionsPage from "./pages/collections/CollectionsPage";
import YBTCollectionPage from "./pages/collections/YBTCollectionPage";
import YBTCarsPage from "./pages/collections/YBTCarsPage";
import YBTBikesPage from "./pages/collections/YBTBikesPage";
import DesignerCollectionPage from "./pages/collections/DesignerCollectionPage";
import GSDesignsPage from "./pages/collections/GSDesignsPage";
import RollingHavenPage from "./pages/collections/RollingHavenPage";
import TorqueTunerEditionPage from "./pages/collections/TorqueTunerEditionPage";
import CustomWorkshopsPage from "./pages/collections/CustomWorkshopsPage";
import DCDesignsPage from "./pages/collections/DCDesignsPage";
import HeritageRestorationPage from "./pages/collections/HeritageRestorationPage";
import LuxuryNomadPage from "./pages/collections/LuxuryNomadPage";
import MotormindDesignsPage from "./pages/collections/MotormindDesignsPage";
import PrecisionCraftWorkshopPage from "./pages/collections/PrecisionCraftWorkshopPage";
import VelocityCustomsPage from "./pages/collections/VelocityCustomsPage";
import WanderlustCaravansPage from "./pages/collections/WanderlustCaravansPage";

// Rentals Pages
import RentalsPage from "./pages/rentals/RentalsPage";
import RentalDetailsPage from "./pages/rentals/RentalDetailsPage";
import RentalBookingPage from "./pages/rentals/RentalBookingPage";
import RentalManagementPage from "./pages/rentals/RentalManagementPage";

// Auctions Pages
import AuctionsPage from "./pages/auctions/AuctionsPage";
import AuctionDetailsPage from "./pages/auctions/AuctionDetailsPage";
import AuctionLivePage from "./pages/auctions/AuctionLivePage";

// Events Pages
import EventsPage from "./pages/events/EventsPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";

// Merchandise Pages
import MerchandisePage from "./pages/merchandise/MerchandisePage";

// User Pages
import ProfilePage from "./pages/user/ProfilePage";
import WishlistPage from "./pages/user/WishlistPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import OrdersPage from "./pages/user/OrdersPage";

// Legal Pages
import FAQPage from "./pages/legal/FAQPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import ImprintPage from "./pages/legal/ImprintPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CarManagement from "./pages/admin/CarManagement";
import UserManagement from "./pages/admin/UserManagement";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import CarReservePage from "./pages/CarReservePage";
import VehicleInfoPage from "./pages/models/VehicleInfoPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import BikeManagement from "./pages/admin/bikeManagement";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <GlobalStyle />
          <div className="App">
            <Routes>
              <Route path="/admin" element={<AdminLoginPage />} />
              {/* Admin Routes */}

              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/cars"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <CarManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/bikes"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <BikeManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />

              {/* Auth Routes */}
              {/* <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} /> */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Main App Routes */}
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Homepage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Header />
                    <AboutPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/cars"
                element={
                  <>
                    <Header />
                    <CarsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/models"
                element={
                  <>
                    <Header />
                    <ModelsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/:category/:idAndSlug"
                element={
                  <>
                    <Header />
                    {/* <CarDetailsPage /> */}
                    <VehicleInfoPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/reserve/:id"
                element={
                  <>
                    <Header />
                    <CarReservePage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blog"
                element={
                  <>
                    <Header />
                    <BlogPage />
                    <Footer />
                  </>
                }
              />

              {/* Collections Routes */}
              <Route
                path="/collections"
                element={
                  <>
                    <Header />
                    <CollectionsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/ybt"
                element={
                  <>
                    <Header />
                    <YBTCollectionPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/ybt-cars"
                element={
                  <>
                    <Header />
                    <YBTCarsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/ybt-bikes"
                element={
                  <>
                    <Header />
                    <YBTBikesPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/designer"
                element={
                  <>
                    <Header />
                    <DesignerCollectionPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/gs-designs"
                element={
                  <>
                    <Header />
                    <GSDesignsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/rolling-haven"
                element={
                  <>
                    <Header />
                    <RollingHavenPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/torque-tuner"
                element={
                  <>
                    <Header />
                    <TorqueTunerEditionPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/custom-workshops"
                element={
                  <>
                    <Header />
                    <CustomWorkshopsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/dc-designs"
                element={
                  <>
                    <Header />
                    <DCDesignsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/heritage-restoration"
                element={
                  <>
                    <Header />
                    <HeritageRestorationPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/luxury-nomad"
                element={
                  <>
                    <Header />
                    <LuxuryNomadPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/motormind-designs"
                element={
                  <>
                    <Header />
                    <MotormindDesignsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/precision-craft"
                element={
                  <>
                    <Header />
                    <PrecisionCraftWorkshopPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/velocity-customs"
                element={
                  <>
                    <Header />
                    <VelocityCustomsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/collections/wanderlust-caravans"
                element={
                  <>
                    <Header />
                    <WanderlustCaravansPage />
                    <Footer />
                  </>
                }
              />

              {/* Rentals Routes */}
              <Route
                path="/rentals"
                element={
                  <>
                    <Header />
                    <RentalsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/rentals/:id"
                element={
                  <>
                    <Header />
                    <RentalDetailsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/rentals/:id/book"
                element={
                  <>
                    <Header />
                    <RentalBookingPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/rentals/manage"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <RentalManagementPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                }
              />

              {/* Auctions Routes */}
              <Route
                path="/auctions"
                element={
                  <>
                    <Header />
                    <AuctionsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/auctions/:id"
                element={
                  <>
                    <Header />
                    <AuctionDetailsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/auctions/:id/live"
                element={
                  <>
                    <Header />
                    <AuctionLivePage />
                    <Footer />
                  </>
                }
              />

              {/* Events Routes */}
              <Route
                path="/events"
                element={
                  <>
                    <Header />
                    <EventsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/events/:id"
                element={
                  <>
                    <Header />
                    <EventDetailsPage />
                    <Footer />
                  </>
                }
              />

              {/* Merchandise Routes */}
              <Route
                path="/merchandise"
                element={
                  <>
                    <Header />
                    <MerchandisePage />
                    <Footer />
                  </>
                }
              />

              {/* User Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <ProfilePage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <WishlistPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <CheckoutPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <OrdersPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                }
              />

              {/* Legal Routes */}
              <Route
                path="/faq"
                element={
                  <>
                    <Header />
                    <FAQPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/privacy"
                element={
                  <>
                    <Header />
                    <PrivacyPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/imprint"
                element={
                  <>
                    <Header />
                    <ImprintPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Header />
                    <ContactSection />
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000;
    color: #fff;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
