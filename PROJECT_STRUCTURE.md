# 🏗️ YBT Website - Project Structure

## 📁 Directory Organization

```
src/
├── 📄 App.js                     # Main application component
├── 📄 index.js                   # Application entry point
│
├── 📂 pages/                     # Page components organized by feature
│   ├── 📄 index.js              # Central export for all pages
│   ├── 📄 Homepage.js           # Landing page
│   ├── 📄 AboutPage.js          # About us page
│   ├── 📄 BlogPage.js           # Blog listing
│   ├── 📄 ModelsPage.js         # Vehicle models
│   ├── 📄 CarsPage.js           # Cars listing
│   ├── 📄 CarDetailsPage.js     # Individual car details
│   │
│   ├── 📂 auth/                 # Authentication pages
│   │   ├── 📄 LoginPage.js
│   │   └── 📄 SignupPage.js
│   │
│   ├── 📂 collections/          # Collections and sub-collections
│   │   ├── 📄 CollectionsPage.js
│   │   ├── 📄 YBTCollectionPage.js
│   │   ├── 📄 YBTCarsPage.js
│   │   ├── 📄 YBTBikesPage.js
│   │   ├── 📄 DesignerCollectionPage.js
│   │   ├── 📄 GSDesignsPage.js
│   │   ├── 📄 DCDesignsPage.js
│   │   ├── 📄 MotormindDesignsPage.js
│   │   ├── 📄 VelocityCustomsPage.js
│   │   ├── 📄 TorqueTunerEditionPage.js
│   │   ├── 📄 CustomWorkshopsPage.js
│   │   ├── 📄 PrecisionCraftWorkshopPage.js
│   │   ├── 📄 HeritageRestorationPage.js
│   │   ├── 📄 RollingHavenPage.js
│   │   ├── 📄 LuxuryNomadPage.js
│   │   └── 📄 WanderlustCaravansPage.js
│   │
│   ├── 📂 rentals/              # Vehicle rental system
│   │   ├── 📄 RentalsPage.js
│   │   ├── 📄 RentalDetailsPage.js
│   │   ├── 📄 RentalBookingPage.js
│   │   └── 📄 RentalManagementPage.js
│   │
│   ├── 📂 auctions/             # Auction system
│   │   ├── 📄 AuctionsPage.js
│   │   ├── 📄 AuctionDetailsPage.js
│   │   └── 📄 AuctionLivePage.js
│   │
│   ├── 📂 events/               # Events and shows
│   │   ├── 📄 EventsPage.js
│   │   └── 📄 EventDetailsPage.js
│   │
│   ├── 📂 merchandise/          # Merchandise store
│   │   └── 📄 MerchandisePage.js
│   │
│   ├── 📂 user/                 # User account pages
│   │   ├── 📄 ProfilePage.js
│   │   ├── 📄 OrdersPage.js
│   │   ├── 📄 WishlistPage.js
│   │   └── 📄 CheckoutPage.js
│   │
│   ├── 📂 legal/                # Legal and informational pages
│   │   ├── 📄 PrivacyPage.js
│   │   ├── 📄 ImprintPage.js
│   │   └── 📄 FAQPage.js
│   │
│   └── 📂 admin/                # Admin pages (future)
│
├── 📂 components/               # Reusable UI components
│   ├── 📄 index.js             # Central export for components
│   │
│   ├── 📂 layout/              # Layout components
│   │   ├── 📄 Header.js
│   │   └── 📄 Footer.js
│   │
│   ├── 📂 common/              # Common/shared components
│   │   ├── 📄 Cart.js
│   │   ├── 📄 ContactSection.js
│   │   └── 📄 CookieConsent.js
│   │
│   ├── 📂 cards/               # Card components
│   │   ├── 📄 CarCard.js
│   │   └── 📄 FeaturedCars.js
│   │
│   └── 📂 forms/               # Form components (future)
│
├── 📂 contexts/                # React Context providers
│   ├── 📄 AuthContext.js
│   ├── 📄 CartContext.js
│   └── 📄 WishlistContext.js
│
├── 📂 data/                    # Static data and mock data
│   └── 📄
│
├── 📂 hooks/                   # Custom React hooks (future)
│
├── 📂 utils/                   # Utility functions
│   └── 📄 index.js
│
├── 📂 constants/               # Application constants
│   └── 📄 index.js
│
├── 📂 styles/                  # Global styles and themes (future)
│
└── 📂 assets/                  # Static assets
    ├── 📂 images/
    └── 📂 icons/
```

## 🎯 Organization Benefits

### **1. Feature-Based Organization**

- **Pages grouped by functionality**: Auth, Collections, Rentals, etc.
- **Easier navigation** and maintenance
- **Logical separation** of concerns

### **2. Component Hierarchy**

- **Layout components**: Header, Footer
- **Common components**: Shared across features
- **Card components**: Reusable card designs
- **Form components**: Reusable form elements

### **3. Centralized Exports**

- **Index files** in major directories for cleaner imports
- **Single import statements** instead of multiple imports
- **Better IDE support** with auto-completion

### **4. Scalability**

- **Easy to add new features** in appropriate directories
- **Clear separation** between different application areas
- **Consistent naming conventions**

## 📋 Import Examples

### Before (Messy)

```javascript
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RentalsPage from "./pages/RentalsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
```

### After (Clean)

```javascript
import { Homepage, LoginPage, RentalsPage } from "./pages";
import { Header, Footer, Cart } from "./components";
```

## 🔧 Development Guidelines

### **Adding New Pages**

1. Create page in appropriate feature directory
2. Add export to `pages/index.js`
3. Add route to `App.js`

### **Adding New Components**

1. Create component in appropriate category
2. Add export to `components/index.js`
3. Import from centralized location

### **File Naming Conventions**

- **PascalCase** for component files: `ComponentName.js`
- **camelCase** for utility files: `utilityName.js`
- **kebab-case** for asset files: `image-name.jpg`

## 🚀 Future Enhancements

### **Planned Additions**

- **Custom hooks** directory for reusable logic
- **API service** layer for backend communication
- **Global styles** and theme management
- **Testing** directory structure
- **Build optimization** configurations

### **Potential Features**

- **Admin dashboard** pages
- **API integration** utilities
- **Form validation** components
- **Loading and error** components
- **SEO optimization** utilities

## 📊 File Statistics

| Directory     | Files | Purpose                |
| ------------- | ----- | ---------------------- |
| `pages/`      | 40+   | Application pages      |
| `components/` | 7     | Reusable UI components |
| `contexts/`   | 3     | State management       |
| `utils/`      | 1     | Helper functions       |
| `constants/`  | 1     | App-wide constants     |

This organized structure makes the YBT website more maintainable, scalable, and developer-friendly! 🎉
