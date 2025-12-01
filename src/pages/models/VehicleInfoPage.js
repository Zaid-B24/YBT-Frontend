import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  ArrowLeft,
  CheckCircle,
  Cog,
  Fuel,
  Gauge,
  Palette,
  RotateCw,
  UserCircle,
  Users,
  Zap,
  PlayCircle,
} from "lucide-react";
import { FaDoorOpen } from "react-icons/fa";
import { LuGitCommitHorizontal, LuGitCommitVertical } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { VehicleInfoPageSkeleton } from "../../components/cards/VehicleInfoPageSkeleton";
import { useAuth } from "../../contexts/AuthContext";
import LockedContent from "../../components/common/Locked";
import { motion } from "framer-motion";
import { BiRupee } from "react-icons/bi";

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
  const navigate = useNavigate();
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

  const mediaGallery = useMemo(() => {
    if (!vehicle) return [];

    // Get images based on category key
    const rawImages = vehicle[getImageProp(category)] || [];
    const rawVideos = vehicle.videoUrls || [];

    const imageMedia = rawImages.map((url) => ({
      type: "image",
      url: url,
      thumbnail: url, // Image is its own thumbnail
    }));

    const videoMedia = rawVideos.map((url) => ({
      type: "video",
      url: url,
      // Use the first image as the poster/thumbnail for the video, or a placeholder
      thumbnail: rawImages[0] || "/placeholder.png",
    }));

    return [...imageMedia, ...videoMedia];
  }, [vehicle, category]);

  const [selectedMediaState, setSelectedMediaState] = useState(null);
  const currentMedia = selectedMediaState || mediaGallery[0];
  if (isLoading) return <VehicleInfoPageSkeleton />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!vehicle) return <div>Vehicle not found</div>;

  // Derived specs data
  const specList = ALL_SPECS_CONFIG.filter((spec) =>
    getNestedValue(vehicle, spec.key)
  ).map((spec) => ({
    ...spec,
    value: getNestedValue(vehicle, spec.key),
  }));

  if (isLoading) return <VehicleInfoPageSkeleton />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!vehicle) return <div>Vehicle not found</div>;

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
              {currentMedia && (
                <MediaContainer>
                  {currentMedia.type === "image" ? (
                    <DisplayedImage
                      key={currentMedia.url} // Key forces re-render for animation
                      src={resizeCloudinaryImage(currentMedia.url, {
                        width: 1200, // Higher res for main view
                        crop: "limit",
                      })}
                      alt="Vehicle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  ) : (
                    <DisplayedVideo
                      key={currentMedia.url}
                      src={currentMedia.url}
                      poster={currentMedia.thumbnail}
                      autoPlay
                      loop
                      muted
                      playsInline
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  {/* Badges Overlay (Only show on Images ideally, or both) */}
                  {currentMedia.type === "image" && (
                    <ImageBadges>
                      {vehicle.badges?.map((badge, index) => (
                        <ImageBadge key={index}>{badge}</ImageBadge>
                      ))}
                    </ImageBadges>
                  )}
                </MediaContainer>
              )}

              {/* --- 4. Thumbnails --- */}
              {mediaGallery.length > 1 && (
                <ThumbnailGrid>
                  {mediaGallery.map((mediaItem, index) => (
                    <ThumbnailWrapper
                      key={index}
                      active={currentMedia?.url === mediaItem.url}
                      onClick={() => setSelectedMediaState(mediaItem)}
                    >
                      {mediaItem.type === "video" && (
                        <VideoIndicator>
                          <PlayCircle size={20} color="#fff" />
                        </VideoIndicator>
                      )}
                      <ThumbnailImage
                        src={resizeCloudinaryImage(mediaItem.thumbnail, {
                          width: 150,
                          height: 100,
                          crop: "fill",
                        })}
                        alt={`Thumbnail ${index}`}
                      />
                    </ThumbnailWrapper>
                  ))}
                </ThumbnailGrid>
              )}
            </ImageSection>

            {/* Title, Rating, Location */}
            <VehicleInfo>
              <VehicleTitle>
                {vehicle.brand} {vehicle.title}
              </VehicleTitle>

              <VehiclePrice>
                <BiRupee /> {vehicle.sellingPrice}
              </VehiclePrice>

              <VehicleDetails>
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

            {vehicle.features && vehicle.features.length > 0 && (
              <DetailsSection>
                <SectionTitle>Features & Amenities</SectionTitle>
                <FeatureList>
                  {vehicle.features.map((feature, index) => (
                    <FeatureItem key={index}>
                      <CheckCircle size={16} color="#e1c841" /> {feature}
                    </FeatureItem>
                  ))}
                </FeatureList>
              </DetailsSection>
            )}
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

const VehiclePrice = styled.div``;

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

const MediaContainer = styled.div`
  width: 100%;
  height: 65vh; /* Fixed height looks better for car galleries */
  border-radius: 10px;
  overflow: hidden;
  background-color: #000;
  position: relative; /* For badges overlay */
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const DisplayedImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Changed to contain to see full car details */
  display: block;
`;

const DisplayedVideo = styled(motion.video)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ImageBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ThumbnailWrapper = styled.div`
  height: 80px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 2px solid
    ${(props) => (props.active ? "#ef4444" : "rgba(255, 255, 255, 0.1)")};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.active ? 1 : 0.7)};

  &:hover {
    border-color: #ef4444;
    opacity: 1;
    transform: translateY(-2px);
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// --- End Media Styles ---

// const DetailsSection = styled.section`
//   padding-top: 0.5rem;
//   border-top: 1px solid rgba(255, 255, 255, 0.05);
//   &:first-of-type {
//     border-top: none;
//   }
// `;

// const VehicleInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   padding-top: 1.5rem;
//   border-top: 1px solid rgba(255, 255, 255, 0.05);
// `;

// const SectionTitle = styled.h2`
//   font-family: "Playfair Display", serif;
//   font-size: 1.8rem;
//   font-weight: 400;
//   margin: 0;
// `;

// const VehicleTitle = styled.h1`
//   font-family: "Playfair Display", serif;
//   font-size: 2.2rem;
//   font-weight: 400;
//   margin: 0;
// `;

// const Description = styled.p`
//   color: #b3b3b3;
//   line-height: 1.7;
//   font-size: 1rem;
//   font-family: "Inter", sans-serif;
//   max-width: 70ch;
// `;

// const SpecsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//   gap: 1.5rem;
//   margin-top: 1rem;
// `;

// const SpecItem = styled.div`
//   background: #1a1a1a;
//   border: 1px solid #292929;
//   border-radius: 8px;
//   padding: 1.5rem;
//   text-align: center;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
//   }
// `;

// const SpecIcon = styled.div`
//   color: #e1c841;
//   margin-bottom: 0.8rem;
//   display: flex;
//   justify-content: center;
// `;

// const SpecLabel = styled.div`
//   font-size: 0.8rem;
//   color: #a3a3a3;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   margin-bottom: 0.3rem;
// `;

// const SpecValue = styled.div`
//   font-weight: 600;
//   color: #f2f2f2;
// `;

// const FeatureList = styled.ul`
//   list-style: none;
//   padding: 1rem;
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 1rem;
// `;

// const FeatureItem = styled.li`
//   background-color: #1a1a1a;
//   border: 1px solid #292929;
//   border-radius: 8px;
//   padding: 1rem;
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   color: #d9d9d9;
// `;

// const VehicleDetails = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
// `;

// const VehicleRating = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const RatingStars = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.2rem;
// `;

// const RatingText = styled.span`
//   color: #b3b3b3;
//   font-size: 0.9rem;
// `;

// const ReserveCar = styled.button`
//   background: linear-gradient(to right, #dc2626, #b91c1c);
//   color: #fff;
//   border: none;
//   border-radius: 50px;
//   padding: 0.75rem 1.5rem;
//   font-size: 1rem;
//   font-weight: bold;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   text-transform: uppercase;
//   letter-spacing: 1px;

//   &:hover {
//     background: linear-gradient(to right, #991b1b, #c51c1c);
//     transform: scale(1.05);
//   }

//   &:active {
//     transform: scale(0.98);
//   }
// `;
