import { Star, Award, Zap, Wrench } from "lucide-react";

export const collections = [
  {
    id: 1,
    title: "YBT Collection",
    subtitle: "Signature Automotive Excellence",
    description:
      "Our flagship collection featuring exclusive cars and bikes with YOUNG BOY TOYZ signature modifications and luxury enhancements.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    icon: <Star size={24} />,
    route: "/collections/ybt",
    features: [
      "Signature YBT modifications",
      "Exclusive cars and bikes",
      "Premium customizations",
      "Limited edition designs",
      "Luxury performance upgrades",
    ],
  },
  {
    id: 2,
    title: "Designer Collection",
    subtitle: "Curated by Master Craftsmen",
    description:
      "Exclusive designs by India's top automotive designers, featuring unique styling and bespoke modifications.",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    icon: <Award size={24} />,
    route: "/collections/designer",
    features: [
      "Top Indian designers",
      "Bespoke styling solutions",
      "Unique design concepts",
      "Artistic modifications",
      "Designer signature series",
    ],
  },
  {
    id: 3,
    title: "Torque Tuner Edition",
    subtitle: "Performance Engineering Excellence",
    description:
      "High-performance modifications focused on power, torque, and dynamic driving experience with cutting-edge technology.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
    icon: <Zap size={24} />,
    route: "/collections/torque-tuner",
    features: [
      "Performance tuning",
      "Engine modifications",
      "Turbo & supercharger upgrades",
      "Sport suspension systems",
      "Racing-grade components",
    ],
  },
];

export const stats = [
  { number: "13+", label: "Unique Collections" },
  { number: "1000+", label: "Vehicles Modified" },
  { number: "25+", label: "Years Experience" },
  { number: "100%", label: "Client Satisfaction" },
];

// {
//     id: 4,
//     title: "Custom Workshops",
//     subtitle: "Tailored Automotive Solutions",
//     description:
//       "Specialized workshops offering custom fabrication, restoration, and unique modification services for discerning clients.",
//     image:
//       "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     icon: <Wrench size={24} />,
//     route: "/collections/workshops",
//     features: [
//       "Custom fabrication",
//       "Restoration services",
//       "Specialized workshops",
//       "Unique modifications",
//       "Bespoke solutions",
//     ],
//   }
