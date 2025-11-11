// Main Pages
export { default as Homepage } from "./Homepage";
export { default as AboutPage } from "./AboutPage";
export { default as BlogPage } from "./BlogPage";
export { default as ModelsPage } from "./models/ModelsPage";
export { default as CarsPage } from "./CarsPage";
export { default as CarDetailsPage } from "./CarDetailsPage";

// Authentication Pages
// export { default as LoginPage } from "./auth/LoginPage";
// export { default as SignupPage } from "./auth/SignupPage";
export { default as AuthPage } from "./auth/authPage";

//ModelsPage

export { default as VehicleInfoPage } from "./models/VehicleInfoPage";
export { default as CarReservePage } from "./CarReservePage";
export { default as DesignerDetailPage } from "./collections/DesignerDetailsPage"; // Note: I corrected the name
export { default as WorkshopCollectionPage } from "./collections/WorkshopCollectionPage";
export { default as WorkshopDetailPage } from "./collections/WorkshopDetailPage";
export { default as TicketSelectionPage } from "./events/TicketSelectionPage";
export { default as BookingSummaryPage } from "./events/BookingSummaryPage";

// Collections Pages
export { default as CollectionsPage } from "./collections/CollectionsPage";
export { default as DesignerCollectionPage } from "./collections/DesignerCollectionPage";
export { default as YBTCollectionPage } from "./collections/YBTCollectionPage";
export { default as TorqueTunerEditionPage } from "./collections/TorqueTunerEditionPage";
export { default as YBTCarsPage } from "./collections/YBTCarsPage";
export { default as YBTBikesPage } from "./collections/YBTBikesPage";
export { default as YBTCaravansPage } from "./collections/YBTCaravansPage";
export { default as YBTJetsPage } from "./collections/YBTJetsPage";

// Rentals Pages
export { default as RentalsPage } from "./rentals/RentalsPage";
export { default as RentalDetailsPage } from "./rentals/RentalDetailsPage";
export { default as RentalBookingPage } from "./rentals/RentalBookingPage";
export { default as RentalManagementPage } from "./rentals/RentalManagementPage";

// Auctions Pages
export { default as AuctionsPage } from "./auctions/AuctionsPage";
export { default as AuctionDetailsPage } from "./auctions/AuctionDetailsPage";
export { default as AuctionLivePage } from "./auctions/AuctionLivePage";

// Events Pages
export { default as EventsPage } from "./events/EventsPage";
export { default as EventDetailsPage } from "./events/EventDetailsPage";
export { default as BookingSuccessPage } from "./events/BookingSuccessPage";
export { default as BookingFailurePage } from "./events/BookingFailurePage";

// Merchandise Pages
export { default as MerchandisePage } from "./merchandise/MerchandisePage";

// User Pages
export { default as ProfilePage } from "./user/ProfilePage";
export { default as OrdersPage } from "./user/OrdersPage";
export { default as WishlistPage } from "./user/WishlistPage";
export { default as CheckoutPage } from "./user/CheckoutPage";

// Legal Pages
export { default as PrivacyPage } from "./legal/PrivacyPage";
export { default as ImprintPage } from "./legal/ImprintPage";
export { default as FAQPage } from "./legal/FAQPage";

// Admin Pages - REMOVED to prevent circular import
// export { AdminDashboard, CarManagement, UserManagement, AdminLogin, AnalyticsPage } from './admin';
