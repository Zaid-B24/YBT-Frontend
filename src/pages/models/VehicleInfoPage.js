// =================== Imports ===================
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// Icons
import {
  ArrowLeft,
  CheckCircle,
  Cog,
  Fuel,
  Gauge,
  Mail,
  MapPin,
  Palette,
  Phone,
  RotateCw,
  Shield,
  Star,
  UserCircle,
  Users,
  Zap,
} from "lucide-react";
import { FaDoorOpen } from "react-icons/fa";
import { LuGitCommitHorizontal, LuGitCommitVertical } from "react-icons/lu";

// Components
import VehicleBookingForm from "../../components/forms/BookingForm";
import { useAuth } from "../../contexts/AuthContext";

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};

// =================== Config ===================
const ALL_SPECS_CONFIG = [
  { key: "engine", label: "Engine", Icon: Cog },
  { key: "kmsDriven", label: "Kms Driven", Icon: Gauge },
  { key: "peakPower", label: "Power", Icon: Zap },
  { key: "peakTorque", label: "Torque", Icon: RotateCw },
  { key: "exteriorColour", label: "Color", Icon: Palette },
  { key: "doors", label: "Doors", Icon: FaDoorOpen },
  { key: "driveType", label: "Drive Type", Icon: LuGitCommitHorizontal },
  { key: "transmission", label: "Transmission", Icon: LuGitCommitVertical },
  { key: "seatingCapacity", label: "Seating", Icon: Users },
  { key: "fuelType", label: "Fuel Type", Icon: Fuel },
  { key: "dealer.name", label: "Listed By", Icon: UserCircle },
];

// =================== Component ===================
const VehicleInfoPage = () => {
  const { category, idAndSlug } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Resolve correct image field based on category
  const getImageProp = (category) => {
    switch (category) {
      case "cars":
        return "carImages";
      case "bikes":
        return "bikeImages";
      case "motorhomes":
        return "motorhomeImages";
      default:
        return "";
    }
  };

  // Fetch vehicle details
  useEffect(() => {
    if (!idAndSlug) {
      return;
    }

    const vehicleId = idAndSlug.split("-")[0];

    const fetchVehicle = async () => {
      setLoading(true);
      setSelectedImage(0);

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/${category}/${vehicleId}`
        );
        console.log("THis is the resposne for finidng vehicle with id", res);
        if (!res.ok) throw new Error("Failed to fetch vehicle");

        const data = await res.json();
        console.log("this is the data received in info page", data);

        setVehicle(data);
      } catch (err) {
        console.error(err);
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [category, idAndSlug]);

  const dummyVehicle = {
    id: 1,
    title: "BMW M3 Competition",
    description:
      "Experience the thrill of German engineering with this high-performance sedan featuring twin-turbo power and precision handling. The BMW M3 Competition represents the pinnacle of sports sedan excellence, combining everyday usability with track-ready performance. Its aggressive styling, advanced aerodynamics, and meticulously tuned chassis deliver an uncompromising driving experience.",
    category: "Cars",
    brand: "BMW",
    location: "Mumbai",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
    badges: ["LUXURY", "PERFORMANCE"],
    rating: 4.8,
    reviewCount: 127,
    dailyPrice: "₹15,000",
    monthlyPrice: "₹3,50,000",
    specs: {
      engine: "3.0L Twin-Turbo I6",
      power: "503 HP",
      transmission: "8-Speed Auto",
      drivetrain: "RWD",
      fuelType: "Petrol",
      seating: "4 Passengers",
    },
    features: [
      "Adaptive M Suspension",
      "M Performance Exhaust",
      "Carbon Fiber Interior",
      "Premium Sound System",
      "Advanced Driver Assistance",
      "Sport Seats with Memory",
      "Wireless Charging",
      "Premium Leather Interior",
      "Adaptive LED Headlights",
      "M Sport Brakes",
      "Launch Control",
      "Multiple Driving Modes",
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (!vehicle) return <div>Vehicle not found</div>;

  // Derived data
  const specList = ALL_SPECS_CONFIG.filter((spec) =>
    getNestedValue(vehicle, spec.key)
  ).map((spec) => ({
    ...spec,
    value: getNestedValue(vehicle, spec.key),
  }));
  const imageList = vehicle[getImageProp(category)] || [];

  return (
    <PageWrapper>
      <Container>
        {/* Back Button */}
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Models
        </BackButton>

        <VehicleHeader>
          {/* =================== Image + Details Section =================== */}
          <MainContent>
            <ImageSection>
              <MainImage image={imageList[selectedImage] || "/placeholder.png"}>
                <ImageBadges>
                  {vehicle.badges?.map((badge, index) => (
                    <ImageBadge key={index}>{badge}</ImageBadge>
                  ))}
                </ImageBadges>
              </MainImage>

              <ThumbnailGrid>
                {imageList.map((image, index) => (
                  <Thumbnail
                    key={index}
                    image={image}
                    active={selectedImage === index}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </ThumbnailGrid>
            </ImageSection>

            {/* Title, Rating, Location */}
            <VehicleInfo>
              <VehicleTitle>
                {vehicle.brand} {vehicle.title}
              </VehicleTitle>

              <VehicleRating>
                <RatingStars>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={
                        i < Math.floor(vehicle.rating) ? "currentColor" : "none"
                      }
                      color="#e1c841"
                    />
                  ))}
                </RatingStars>
                <RatingText>
                  {vehicle.rating} ({vehicle.reviewCount} reviews)
                </RatingText>
              </VehicleRating>

              <VehicleLocation>
                <MapPin size={16} />
                Available in {vehicle.state}
              </VehicleLocation>
            </VehicleInfo>

            <DetailsSection>
              <SectionTitle>About This Vehicle</SectionTitle>
              <Description>{vehicle.description}</Description>
            </DetailsSection>

            <DetailsSection>
              <SectionTitle>Specifications</SectionTitle>
              <SpecsGrid>
                {specList.map(({ key, label, value, Icon }) => (
                  <SpecItem key={key}>
                    <SpecIcon>
                      <Icon size={20} />
                    </SpecIcon>
                    <SpecLabel>{label}</SpecLabel>
                    <SpecValue>{value}</SpecValue>
                  </SpecItem>
                ))}
              </SpecsGrid>
            </DetailsSection>

            <DetailsSection>
              <SectionTitle>Features & Amenities</SectionTitle>
              <FeatureList>
                {dummyVehicle.features?.map((feature, index) => (
                  <FeatureItem key={index}>
                    <CheckCircle size={16} color="#00a878" />
                    {feature}
                  </FeatureItem>
                ))}
              </FeatureList>
            </DetailsSection>
          </MainContent>

          {/* =================== New Contact Section =================== */}
        </VehicleHeader>
      </Container>
    </PageWrapper>
  );
};

export default VehicleInfoPage;

// =================== Styled Components ===================
const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background-color: #0d0d0d;
  color: #f2f2f2;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 1200px) {
    padding: 1rem;
  }
`;

const BackButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #b3b3b3;
  text-decoration: none;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f2f2f2;
  }
`;

const VehicleHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const SidePanel = styled.div`
  height: fit-content;
  position: sticky;
  top: 120px;
  @media (max-width: 1024px) {
    position: static;
  }
`;

// =================== Sections ===================
const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailsSection = styled.section`
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  &:first-of-type {
    border-top: none;
  }
`;

const VehicleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

// =================== Typography & Headings ===================
const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin: 0;
`;

const VehicleTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  font-weight: 400;
  margin: 0;
`;

const Description = styled.p`
  color: #b3b3b3;
  line-height: 1.7;
  font-size: 1rem;
`;

// =================== Image Gallery ===================
const MainImage = styled.div`
  height: 500px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ImageBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImageBadge = styled.span`
  background: rgba(0, 168, 120, 0.9);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 20px;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const Thumbnail = styled.div`
  height: 100px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? "#00a878" : "transparent")};
  transition: all 0.3s ease;
  transform: ${(props) => (props.active ? "scale(1.05)" : "scale(1)")};

  &:hover {
    border-color: #00a878;
    transform: scale(1.05);
  }
`;

// =================== Specs & Features ===================
const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SpecItem = styled.div`
  background: #1a1a1a;
  border: 1px solid #292929;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const SpecIcon = styled.div`
  color: #e1c841;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: center;
`;

const SpecLabel = styled.div`
  font-size: 0.8rem;
  color: #a3a3a3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
`;

const SpecValue = styled.div`
  font-weight: 600;
  color: #f2f2f2;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const FeatureItem = styled.li`
  background-color: #1a1a1a;
  border: 1px solid #292929;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #d9d9d9;
`;

const PolicyList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PolicyItem = styled.li`
  color: #b3b3b3;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "•";
    color: #00a878;
    position: absolute;
    left: 0;
  }
`;

// =================== Rating & Location ===================
const VehicleRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const RatingText = styled.span`
  color: #b3b3b3;
  font-size: 0.9rem;
`;

const VehicleLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b3b3b3;
`;

// =================== New Contact Card ===================
const ContactDealerCard = styled.div`
  background: #1a1a1a;
  border: 1px solid #292929;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
`;

const DealerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #292929;
  padding-bottom: 1.5rem;
`;

const DealerIcon = styled.div`
  color: #d9d9d9;
`;

const DealerName = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #f2f2f2;
`;

const DealerBio = styled.p`
  font-size: 0.9rem;
  color: #b3b3b3;
  line-height: 1.5;
`;

const ContactButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:first-of-type {
    background-color: #00a878;
    color: #fff;
    &:hover {
      background-color: #008761;
    }
  }

  &:last-of-type {
    background-color: transparent;
    border: 1px solid #00a878;
    color: #00a878;
    &:hover {
      background-color: rgba(0, 168, 120, 0.1);
    }
  }
`;
