// =================== Imports ===================
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// Icons
import {
  ArrowLeft,
  CheckCircle,
  Cog,
  Fuel,
  Gauge,
  Palette,
  RotateCw,
  Star,
  UserCircle,
  Users,
  Zap,
} from "lucide-react";
import { FaDoorOpen } from "react-icons/fa";
import { LuGitCommitHorizontal, LuGitCommitVertical } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { VehicleInfoPageSkeleton } from "../../components/cards/VehicleInfoPageSkeleton";
import { useAuth } from "../../contexts/AuthContext";
import LockedContent from "../../components/common/Locked";

// Components

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};

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

const dummyVehicle = {
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

const resizeCloudinaryImage = (
  url,
  { width, height, crop = "scale", quality = "auto:best" }
) => {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }
  const parts = url.split("/upload/");
  if (parts.length !== 2) {
    return url;
  }

  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);

  return `${parts[0]}/upload/${transformations.join(",")}/${parts[1]}`;
};

// =================== Component ===================
const VehicleInfoPage = () => {
  const { category, idAndSlug } = useParams();
  console.log(category, idAndSlug, "These are recieved in params");
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const vehicleId = idAndSlug ? idAndSlug.split("-")[0] : null;

  const { isLoggedIn } = useAuth();

  const {
    data: vehicle,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vehicle", category, vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/${category}/${vehicleId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch vehicle");
      }
      const responseData = await res.json();
      return responseData.data;
    },
    enabled: !!vehicleId,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) return <VehicleInfoPageSkeleton />;
  if (isError) return <div>Error: {error.message}</div>;
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
      <FullWidthContainer>
        {/* Back Button */}
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back
        </BackButton>

        <VehicleHeader>
          {/* =================== Image + Details Section =================== */}
          <MainContent>
            <ImageSection>
              <MainImage
                image={
                  resizeCloudinaryImage(imageList[selectedImage], {
                    width: 800,
                    crop: "fit",
                  }) || "/placeholder.png"
                }
              >
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
                    image={
                      resizeCloudinaryImage(image, {
                        width: 150,
                        height: 100,
                        crop: "fill",
                      }) || "/placeholder.png"
                    }
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

              <VehicleDetails>
                <VehicleRating>
                  <RatingStars>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.floor(vehicle.rating)
                            ? "currentColor"
                            : "none"
                        }
                        color="#e1c841"
                      />
                    ))}
                  </RatingStars>
                  <RatingText>4.5 ({vehicle.reviewCount} reviews)</RatingText>
                </VehicleRating>
                <ReserveCar
                  onClick={() => navigate(`/reserve/${category}/${vehicleId}`)}
                >
                  Book This{" "}
                  {category === "bikes" || category === "cars"
                    ? category.slice(0, -1)
                    : category}{" "}
                  now
                </ReserveCar>
              </VehicleDetails>
            </VehicleInfo>

            <DetailsSection>
              <SectionTitle>About This Vehicle</SectionTitle>
              {isLoggedIn ? (
                <Description>{vehicle.description}</Description>
              ) : (
                <LockedContent />
              )}
            </DetailsSection>

            <DetailsSection>
              <SectionTitle>Specifications</SectionTitle>
              {isLoggedIn ? (
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
              ) : (
                <LockedContent />
              )}
            </DetailsSection>

            <DetailsSection>
              <SectionTitle>Features & Amenities</SectionTitle>
              <FeatureList>
                {vehicle.features?.map((feature, index) => (
                  <FeatureItem key={index}>
                    <CheckCircle size={16} color="#e1c841" />
                    {feature}
                  </FeatureItem>
                ))}
              </FeatureList>
            </DetailsSection>
          </MainContent>

          {/* =================== New Contact Section =================== */}
        </VehicleHeader>
      </FullWidthContainer>
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

const FullWidthContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1200px) {
    padding: 0 1rem;
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
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;
`;

const VehicleDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

// =================== Sections ===================
const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailsSection = styled.section`
  padding-top: 0.5rem;
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
  font-family: "Inter", sans-serif;
  max-width: 70ch;
`;

// =================== Image Gallery ===================
const MainImage = styled.div`
  height: 80vh; /* Changed from 500px to 60vh */
  /* Keep the rest of your styles the same */
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/contain no-repeat;
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
  background: linear-gradient(to right, #ffffff, #ff6b6b, #e53935);
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
  gap: 1.5rem;
`;

const Thumbnail = styled.div`
  height: 100px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/contain no-repeat;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? "#dc2626" : "transparent")};
  transition: all 0.3s ease;
  transform: ${(props) => (props.active ? "scale(1.05)" : "scale(1)")};

  &:hover {
    border-color: #dc2626;
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
  padding: 1rem;
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

const ReserveCar = styled.button`
  background: linear-gradient(to right, #dc2626, #b91c1c);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(to right, #991b1b, #c51c1c);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;
