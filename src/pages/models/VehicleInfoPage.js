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
  MapPin,
  Palette,
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

            <DetailsSection style={{ marginTop: "2rem" }}>
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
          </ImageSection>

          {/* =================== Booking Section =================== */}
          <BookingSection>
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
                    color="#fbbf24"
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

            <VehicleBookingForm
              category={category}
              vehicleId={vehicle.id}
              user={user}
              token={token}
            />
          </BookingSection>
        </VehicleHeader>

        {/* =================== Features & Policies =================== */}
        <VehicleDetails>
          <DetailsContent>
            <DetailsSection>
              <SectionTitle>Features & Amenities</SectionTitle>
              <FeatureList>
                {dummyVehicle.features?.map((feature, index) => (
                  <FeatureItem key={index}>
                    <CheckCircle size={16} color="#22c55e" />
                    {feature}
                  </FeatureItem>
                ))}
              </FeatureList>
            </DetailsSection>
          </DetailsContent>

          <PolicySection>
            <PolicyTitle>
              <Shield size={20} style={{ marginRight: "0.5rem" }} />
              Reserving Policies
            </PolicyTitle>
            <PolicyList>
              <PolicyItem>Valid driving license required</PolicyItem>
              <PolicyItem>Minimum age: 25 years</PolicyItem>
              <PolicyItem>Security deposit: ₹50,000</PolicyItem>
              <PolicyItem>Fuel: Return with same level</PolicyItem>
              <PolicyItem>Insurance included</PolicyItem>
              <PolicyItem>24/7 roadside assistance</PolicyItem>
              <PolicyItem>Free cancellation up to 24 hours</PolicyItem>
              <PolicyItem>Additional driver: ₹500/day</PolicyItem>
              <PolicyItem>Late return: ₹500/hour</PolicyItem>
              <PolicyItem>Smoking prohibited</PolicyItem>
            </PolicyList>
          </PolicySection>
        </VehicleDetails>
      </Container>
    </PageWrapper>
  );
};

export default VehicleInfoPage;
const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: ${(props) =>
    props.filtersVisible ? "300px 1fr" : "1fr"};
  gap: ${(props) => (props.filtersVisible ? "3rem" : "0")};
  transition: all 0.3s ease;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// ========== Headings & Titles ==========
const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const VehicleTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const PolicyTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

// ========== Vehicle Layout ==========
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

const VehicleDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const DetailsContent = styled.div``;

const DetailsSection = styled.section`
  margin-bottom: 2rem;

  &:first-child {
    margin-top: 0;
  }
`;

const Description = styled.p`
  color: #ccc;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

// ========== Image Section ==========
const ImageSection = styled.div``;

const MainImage = styled.div`
  height: 400px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  border-radius: 10px;
  margin-bottom: 1rem;
  position: relative;
`;

const ImageBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const Thumbnail = styled.div`
  height: 80px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? "#fff" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

// ========== Feature Section ==========
const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #2a2a2a;
`;

const FeatureItem = styled.div`
  background-color: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  & > svg {
    color: #00bfff;
    flex-shrink: 0;
  }

  & > div {
    display: flex;
    flex-direction: column;
  }

  & span {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
  }

  & strong {
    font-size: 1rem;
    color: #e0e0e0;
  }
`;

// ========== Specs Section ==========
const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SpecItem = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 1rem;
  text-align: center;
`;

const SpecIcon = styled.div`
  color: #22c55e;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
`;

const SpecLabel = styled.div`
  font-size: 0.8rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
`;

const SpecValue = styled.div`
  font-weight: 600;
  color: #fff;
`;

// ========== Booking Section ==========
const BookingSection = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 120px;
`;

// ========== Buttons & Links ==========

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  text-decoration: none;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

// ========== Policy Section ==========
const PolicySection = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
`;

const PolicyList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PolicyItem = styled.li`
  color: #ccc;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "•";
    color: #22c55e;
    position: absolute;
    left: 0;
  }
`;

// ========== Rating & Location ==========
const VehicleRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const RatingText = styled.span`
  color: #ccc;
  font-size: 0.9rem;
`;

const VehicleLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ImageBadge = styled.span`
  background: rgba(34, 197, 94, 0.9);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 20px;
`;
