# YOUNG BOY TOYZ - Luxury Automotive Customization Website

A complete replica of the YOUNG BOY TOYZ luxury automotive customization website, built with modern React technologies. This project showcases high-end vehicle modifications, luxury car collections, and premium automotive services.

## 🚗 Features

### Core Features

- **Responsive Design** - Fully responsive across all devices
- **Luxury UI/UX** - Premium design aesthetic matching the original YOUNG BOY TOYZ brand
- **Car Collection** - Extensive catalog of luxury vehicle modifications
- **Advanced Filtering** - Filter by brand, model, type, and category
- **Search Functionality** - Real-time search across all vehicles
- **Interactive Navigation** - Smooth scrolling and intuitive menu system

### Technical Features

- **React 18** - Latest React with hooks and concurrent features
- **Styled Components** - CSS-in-JS styling solution
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Single-page application routing
- **Modern JavaScript** - ES6+ features and modern development practices

### Pages & Components

- **Homepage** - Hero section, featured cars, brand showcase, contact form
- **Cars Collection** - Filterable grid of all vehicles with search
- **Individual Car Cards** - Detailed car information and images
- **Contact Section** - Professional contact form with validation
- **Cookie Consent** - GDPR-compliant cookie management
- **Responsive Header** - Fixed navigation with mobile menu
- **Footer** - Complete site navigation and newsletter signup

## 🛠️ Technology Stack

- **Frontend**: React 18, Styled Components, Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Build Tool**: Create React App
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd young-boy-toyz-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.js       # Navigation header
│   ├── CarCard.js      # Individual car display card
│   ├── FeaturedCars.js # Homepage featured section
│   ├── ContactSection.js # Contact form
│   ├── Footer.js       # Site footer
│   └── CookieConsent.js # Cookie management
├── pages/              # Main page components
│   ├── Homepage.js     # Landing page
│   └── CarsPage.js     # Cars collection page
├── data/               # Static data
│   └──
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🎨 Design Features

### Visual Design

- **Dark Theme** - Sophisticated black and white color scheme
- **Luxury Typography** - Playfair Display for headings, Inter for body text
- **Gradient Overlays** - Subtle gradients for depth and premium feel
- **Glass Morphism** - Modern backdrop blur effects
- **Smooth Animations** - Framer Motion for elegant transitions

### User Experience

- **Intuitive Navigation** - Easy-to-use menu system
- **Fast Loading** - Optimized performance and lazy loading
- **Mobile First** - Responsive design for all screen sizes
- **Accessibility** - Keyboard navigation and screen reader support
- **Progressive Enhancement** - Works without JavaScript enabled

## 🚗 Car Collection

The website features an extensive collection of luxury vehicle modifications including:

### Brands Supported

- Ferrari
- Lamborghini
- Porsche
- Mercedes-Benz
- BMW
- Bentley
- Rolls-Royce
- McLaren
- Aston Martin
- Maserati
- Bugatti
- Tesla

### Modification Types

- **Atelier** - Custom one-off creations
- **Wide Body Kits** - Aggressive styling packages
- **Full Body Kits** - Complete vehicle transformations
- **Soft Kits** - Subtle enhancement packages
- **Limited Editions** - Exclusive small-batch modifications

## 🔧 Customization

### Adding New Cars

1. Edit `src/admin`
2. Add new car objects with required fields:
   ```javascript
   {
     id: unique_id,
     name: "Car Name",
     brand: "Brand",
     model: "Model",
     type: "Modification Type",
     date: "YYYY-MM-DD",
     description: "Description",
     price: "Price",
     image: "image_path",
     features: ["feature1", "feature2"],
     category: "Category"
   }
   ```

### Styling Modifications

- Edit styled-components in respective component files
- Modify colors, fonts, and spacing in global styles
- Update brand colors in the design system

### Adding New Pages

1. Create new component in `src/pages/`
2. Add route in `src/App.js`
3. Update navigation in `src/components/Header.js`

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deployment Options

- **Netlify** - Connect GitHub repo for automatic deployments
- **Vercel** - Zero-config deployment platform
- **GitHub Pages** - Free hosting for static sites
- **AWS S3** - Scalable cloud hosting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. All YOUNG BOY TOYZ branding and content rights belong to their respective owners.

## 🙏 Acknowledgments

- Original design inspiration from youngboytoy.com
- React team for the excellent framework
- Styled Components for the styling solution
- Framer Motion for animation capabilities
- Lucide React for beautiful icons

---

**Note**: This is a replica/educational project and is not affiliated with the official Young Boy Toy company.
