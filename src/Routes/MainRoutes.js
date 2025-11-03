import { lazy } from "react";
import { Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import * as Pages from "../pages";
import ContactSection from "../components/common/ContactSection";
import BookingConfirmationPage from "../pages/events/BookingConfirmationPage";

const Homepage = lazy(() => import("../pages/Homepage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));

const MainRoutes = (
  <>
    {/* Routes that use the main header and footer */}
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Homepage />} />
      <Route path="/auth" element={<Pages.AuthPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="cars" element={<Pages.CarsPage />} />
      <Route path="models" element={<Pages.ModelsPage />} />
      <Route path="blog" element={<Pages.BlogPage />} />
      <Route path=":category/:idAndSlug" element={<Pages.VehicleInfoPage />} />
      <Route
        path="reserve/:category/:vehicleId"
        element={<Pages.CarReservePage />}
      />
      <Route path="contact" element={<ContactSection />} />

      {/* Collections Routes */}
      <Route path="collections" element={<Pages.CollectionsPage />} />
      <Route path="collections/ybt" element={<Pages.YBTCollectionPage />} />
      <Route path="collections/ybt-cars" element={<Pages.YBTCarsPage />} />
      <Route path="collections/ybt-bikes" element={<Pages.YBTBikesPage />} />
      <Route
        path="collections/designer"
        element={<Pages.DesignerCollectionPage />}
      />
      <Route
        path="collections/designer/:slug"
        element={<Pages.DesignerDetailPage />}
      />
      <Route
        path="collections/torque-tuner"
        element={<Pages.TorqueTunerEditionPage />}
      />
      <Route
        path="collections/workshops"
        element={<Pages.WorkshopCollectionPage />}
      />
      <Route
        path="collections/workshop/:slug"
        element={<Pages.WorkshopDetailPage />}
      />

      {/* Rentals Routes */}
      <Route path="rentals" element={<Pages.RentalsPage />} />
      <Route path="rentals/:id" element={<Pages.RentalDetailsPage />} />
      <Route path="rentals/:id/book" element={<Pages.RentalBookingPage />} />
      <Route path="rentals/manage" element={<Pages.RentalManagementPage />} />

      {/* Auctions Routes */}
      <Route path="auctions" element={<Pages.AuctionsPage />} />
      <Route path="auctions/:id" element={<Pages.AuctionDetailsPage />} />
      <Route path="auctions/:id/live" element={<Pages.AuctionLivePage />} />

      {/* Events Routes */}
      <Route path="events" element={<Pages.EventsPage />} />
      <Route path="events/:slug" element={<Pages.EventDetailsPage />} />

      {/* Merchandise Routes */}
      <Route path="merchandise" element={<Pages.MerchandisePage />} />

      {/* User Routes (Protected routes will be handled by your component) */}
      <Route path="profile" element={<Pages.ProfilePage />} />
      <Route path="wishlist" element={<Pages.WishlistPage />} />
      <Route path="checkout" element={<Pages.CheckoutPage />} />
      <Route path="orders" element={<Pages.OrdersPage />} />

      {/* Legal Routes */}
      <Route path="faq" element={<Pages.FAQPage />} />
      <Route path="privacy" element={<Pages.PrivacyPage />} />
      <Route path="imprint" element={<Pages.ImprintPage />} />
    </Route>

    {/* Standalone routes without the MainLayout (e.g., booking process) */}
    <Route path="/book/:slug" element={<Pages.TicketSelectionPage />} />
    <Route path="/book/:slug/summary" element={<Pages.BookingSummaryPage />} />
    <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
  </>
);

export default MainRoutes;
