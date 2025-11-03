import { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaUserCheck,
  FaInfoCircle,
  FaCar,
  FaShieldAlt,
  FaAward,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";
import VehicleBookingForm from "../components/forms/BookingForm";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const CarReservePage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState(1);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayContent, setOverlayContent] = useState({});
  const [showForm, setShowForm] = useState(false);

  const { vehicleId, category } = useParams();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const {
    data: carDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["carDetails", vehicleId, category],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/${category}/${vehicleId}`);
      console.log("this is response in reserve page ", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json(); // 1. Get the full JSON result
      return result.data;
    },
    enabled: !!vehicleId,
    placeholderData: {
      brand: "Loading...",
      title: "Loading...",
      ybtPrice: 0,
      registrationYear: "....",
      kmsDriven: "...",
      fuelType: "...",
      carType: "...",
      thumbnail: "https://via.placeholder.com/300",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit booking.");
      }
      return response.json();
    },
    onSuccess: () => {
      alert("Booking submitted successfully! 🎉");
      setIsOverlayVisible(false);
      setShowForm(false);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleFormSubmit = (formData) => {
    const selectedOption = reservationOptions.find(
      (opt) => opt.id === selectedOptionId
    );
    bookingMutation.mutate({
      ...formData,
      reservationType: selectedOption.id,
      vehicleId: vehicleId,
    });
  };

  if (!vehicleId) {
    return (
      <PageWrapper>Invalid URL. Please provide a vehicle ID. 🤔</PageWrapper>
    );
  }

  if (isLoading) {
    return <PageWrapper>Loading car details... ⏳</PageWrapper>;
  }

  if (isError) {
    return <PageWrapper>Error: {error.message} 😞</PageWrapper>;
  }

  const price10Percent = (carDetails.ybtPrice * 0.1).toLocaleString("en-IN");
  const price100Percent = carDetails.ybtPrice.toLocaleString("en-IN");

  const reservationOptions = [
    {
      id: 1,
      text: "Quick Reserve - 24 Hours",
      price: "₹2,00,000",
      badge: "MOST POPULAR",
      icon: <FaCar />,
      info: {
        title: "Pay ₹2,00,000 & Reserve Car for 24 hrs",
        description:
          "We will reserve your dream car for the next 24 hours. All you need to do is pay 2 lacs now & you can come back and purchase the car anytime within the period. In case you fail to purchase the car, we will refund the payment.",
      },
      formIntro: {
        title: "Pay ₹2,00,000 & Reserve Car for 24 hrs",
        description:
          "We will reserve your dream car for the next 24 hours. All you need to do is pay 2 lacs now & you can come back and purchase the car anytime within the period. In case you fail to purchase the car, we will refund the payment.",
      },
    },
    {
      id: 2,
      text: "Smart Booking - 10% Down",
      price: `₹${price10Percent}`,
      badge: "FLEXIBLE",
      icon: <FaAward />,
      info: {
        title: `Pay ₹${price10Percent} & Get Confirmed Booking`,
        description:
          "All you need to do is pay 10% of the total amount and you can make the rest of the payment at a later stage and the car will be yours!",
      },
      formIntro: {
        title: `Pay ₹${price10Percent} & Get Confirmed Booking`,
        description:
          "All you need to do is pay 10% of the total amount and you can make the rest of the payment at a later stage and the car will be yours!",
      },
    },
    {
      id: 3,
      text: "Instant Ownership - Full Payment",
      price: `₹${price100Percent}`,
      badge: "HOME DELIVERY",
      icon: <FaShieldAlt />,
      info: {
        title: `Pay ₹${price100Percent} & Get Car Delivered Home`,
        description:
          "All you need to do is pay 100% amount and you will get a call from our sales representative for information on TCS, Insurance, RC Transfer and Logistic charge!",
      },
      formIntro: {
        title: `Pay ₹${price100Percent} & Get Car Delivered Home`,
        description:
          "All you need to do is pay 100% amount and you will get a call from our sales representative for information on TCS, Insurance, RC Transfer and Logistic charge!",
      },
    },
  ];

  const handleInfoClick = (option) => {
    setOverlayContent(option.info);
    setIsOverlayVisible(true);
  };

  const handleOkClick = () => {
    const selectedOption = reservationOptions.find(
      (opt) => opt.id === selectedOptionId
    );
    setOverlayContent(selectedOption.formIntro);
    setShowForm(true);
  };

  const handleReserveClick = () => {
    const selectedOption = reservationOptions.find(
      (opt) => opt.id === selectedOptionId
    );
    setOverlayContent(selectedOption.info);
    setIsOverlayVisible(true);
    setShowForm(false);
  };

  return (
    <PageWrapper>
      <BackgroundElements>
        <BackgroundBlob delay="0s" />
        <BackgroundBlob delay="1s" />
        <BackgroundBlob delay="2s" />
      </BackgroundElements>

      <ContentWrapper>
        <MaxWidthContainer>
          {/* Header Section */}
          <HeaderSection>
            <MainTitle>Book Your Dream Car Now</MainTitle>
          </HeaderSection>

          {/* Main Content Grid */}
          <MainGrid>
            {/* Car Details Card */}
            <CarDetailsSection>
              <CarCard>
                {/* Car Image */}
                <CarImageContainer>
                  <CarImage src={carDetails.thumbnail} alt={carDetails.title} />
                  <ImageOverlay />
                  <ImageBadge>
                    <span>{carDetails.badges}</span>
                  </ImageBadge>
                </CarImageContainer>

                {/* Car Details */}
                <CarInfo>
                  <CarTitleSection>
                    <CarTitle>
                      {carDetails.brand} {carDetails.title}
                    </CarTitle>
                    <CarPrice>
                      ₹{carDetails.ybtPrice.toLocaleString("en-IN")}
                    </CarPrice>
                  </CarTitleSection>

                  {/* Specs Grid */}
                  <SpecsGrid>
                    <SpecItem>
                      <SpecIcon>🗓️</SpecIcon>
                      <SpecDetails>
                        {" "}
                        <SpecLabel>Year</SpecLabel>
                        <SpecValue>{carDetails.registrationYear}</SpecValue>
                      </SpecDetails>
                    </SpecItem>
                    <SpecItem>
                      <SpecIcon>⚡</SpecIcon>
                      <SpecDetails>
                        {" "}
                        <SpecLabel>Mileage</SpecLabel>
                        <SpecValue>{carDetails.kmsDriven} km</SpecValue>
                      </SpecDetails>
                    </SpecItem>
                    <SpecItem>
                      <SpecIcon>⛽</SpecIcon>
                      <SpecDetails>
                        {" "}
                        <SpecLabel>Fuel</SpecLabel>
                        <SpecValue>{carDetails.fuelType}</SpecValue>
                      </SpecDetails>
                    </SpecItem>
                    <SpecItem>
                      <SpecIcon>🚗</SpecIcon>
                      <SpecDetails>
                        {" "}
                        <SpecLabel>Type</SpecLabel>
                        <SpecValue>{carDetails.carType}</SpecValue>
                      </SpecDetails>
                    </SpecItem>
                  </SpecsGrid>

                  {/* Trust Indicators */}
                </CarInfo>
              </CarCard>
            </CarDetailsSection>

            {/* Reservation Options */}
            <ReservationSection>
              <TrustSection>
                <TrustItem>
                  <FaUserCheck style={{ color: "#a855f7" }} />
                  <span>10K+ Happy Customers</span>
                </TrustItem>
                <TrustItem>
                  <FaBuilding style={{ color: "#a855f7" }} />
                  <span>Asia's Biggest Studio</span>
                </TrustItem>
                <TrustItem>
                  <FaShieldAlt style={{ color: "#a855f7" }} />
                  <span>151 Quality Checks</span>
                </TrustItem>
                <TrustItem>
                  <FaCar style={{ color: "#a855f7" }} />
                  <span>50+ Luxury Brands</span>
                </TrustItem>
              </TrustSection>
              <SectionHeader>
                <SectionTitle>Choose Your Reservation Plan</SectionTitle>
              </SectionHeader>

              <OptionsContainer>
                {reservationOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    active={selectedOptionId === option.id}
                    onClick={() => setSelectedOptionId(option.id)}
                  >
                    {option.badge && <OptionBadge>{option.badge}</OptionBadge>}

                    <OptionContent>
                      <SelectionCircle active={selectedOptionId === option.id}>
                        {selectedOptionId === option.id && <FaCheckCircle />}
                      </SelectionCircle>

                      <OptionDetails>
                        <OptionHeader>
                          <OptionIcon>{option.icon}</OptionIcon>
                          <OptionTitle>{option.text}</OptionTitle>
                        </OptionHeader>
                        <OptionPrice>{option.price}</OptionPrice>
                      </OptionDetails>

                      <InfoButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInfoClick(option);
                        }}
                      >
                        <FaInfoCircle />
                      </InfoButton>
                    </OptionContent>
                  </OptionCard>
                ))}
              </OptionsContainer>

              <ReserveButton onClick={handleReserveClick}>
                Reserve This Luxury Car
              </ReserveButton>
            </ReservationSection>
          </MainGrid>
        </MaxWidthContainer>
      </ContentWrapper>

      {/* Overlay Modal */}
      {isOverlayVisible && (
        <Overlay
          onClick={() => {
            setIsOverlayVisible(false);
            setShowForm(false);
          }}
        >
          <OverlayContent onClick={(e) => e.stopPropagation()}>
            {!showForm ? (
              <>
                <OverlayTitle>{overlayContent.title}</OverlayTitle>
                <OverlayDescription>
                  {overlayContent.description}
                </OverlayDescription>
                <OverlayButton onClick={handleOkClick}>
                  Ok, Got It
                </OverlayButton>
              </>
            ) : (
              <>
                {/* Now, `overlayContent` holds the formIntro data */}
                <OverlayTitle>{overlayContent.title}</OverlayTitle>
                <OverlayDescription>
                  {overlayContent.description}
                </OverlayDescription>
                <VehicleBookingForm
                  onClose={() => {
                    setIsOverlayVisible(false);
                    setShowForm(false);
                  }}
                  onSubmit={handleFormSubmit}
                />
              </>
            )}
          </OverlayContent>
        </Overlay>
      )}
    </PageWrapper>
  );
};

export default CarReservePage;

/* --- STYLED COMPONENTS --- */
const pulse = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #000;
  color: white;
  position: relative;
  overflow: hidden;
`;

const BackgroundElements = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const BackgroundBlob = styled.div`
  position: absolute;
  width: 384px;
  height: 384px;
  border-radius: 50%;
  mix-blend-mode: multiply;
  filter: blur(1rem);
  animation: ${pulse} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay};

  &:nth-child(1) {
    top: 25%;
    left: 25%;
    background: #e53935; /* Red Blob */
  }

  &:nth-child(2) {
    top: 75%;
    right: 25%;
    background: #ff5722; /* Orange-Red Blob */
  }

  &:nth-child(3) {
    bottom: 25%;
    left: 50%;
    background: #ff0000; /* Pure Red Blob */
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  padding: 1rem;
  padding-top: 5rem;

  @media (min-width: 768px) {
    padding: 2rem;
    padding-top: 5rem;
  }
`;

const MaxWidthContainer = styled.div`
  max-width: 1792px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const MainTitle = styled.h1`
  font-size: 1.5rem !important;
  font-weight: 700;
  background: linear-gradient(
    to right,
    #ffffff,
    #ff6b6b,
    #e53935
  ); /* Red Gradient */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`;

const MainGrid = styled.div`
  display: grid;
  gap: 3rem;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CarDetailsSection = styled.div`
  order: 2;

  @media (min-width: 1024px) {
    order: 1;
  }
`;

const CarCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const CarImageContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;

  &:hover img {
    transform: scale(1.1);
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 16rem;
  object-fit: cover;
  transition: transform 0.7s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
`;

const ImageBadge = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 9999px;

  span {
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarTitleSection = styled.div``;

const CarTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CarPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(to right, #ef4444, #f87171); /* Red Gradient */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const SpecItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex; /* <-- ADD this line */
  align-items: center; /* <-- ADD this line */
`;

const SpecIcon = styled.div`
  font-size: 1.5rem; /* Increased size for better visibility inline */
  margin-right: 0.75rem; /* <-- CHANGE from margin-bottom to margin-right */
`;

const SpecDetails = styled.div`
  /* <-- NEW component */
  display: flex;
  flex-direction: column;
`;

const SpecLabel = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
`;

const SpecValue = styled.div`
  font-weight: 600;
  font-size: 1rem; /* Adjust font size to fit well */
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  svg {
    font-size: 1.5rem;
  }

  span {
    font-size: 0.875rem;
    color: #d1d5db;
  }
`;

const TrustSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  ${TrustItem} svg {
    color: #ef4444; /* Deep Red for Icons */
  }
`;

const ReservationSection = styled.div`
  order: 1;

  @media (min-width: 1024px) {
    order: 2;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OptionCard = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${(props) => (props.active ? "scale(1.02)" : "scale(1)")};

  &:hover {
    transform: scale(1.01);
  }
`;

const OptionBadge = styled.div`
  position: absolute;
  top: -0.5rem;
  left: 1.5rem;
  background: linear-gradient(to right, #ff7171, #e53935); /* Red Badge */
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 10;
`;

const OptionContent = styled.div`
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  ${(props) =>
    props.active
      ? `
    background: linear-gradient(to right, rgba(255, 0, 0, 0.2), rgba(255, 69, 0, 0.2)); /* Red Active Background */
    border-color: #ef4444; /* Deep Red Border */
    box-shadow: 0 25px 50px -12px rgba(239, 68, 68, 0.25);
  `
      : `
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);

    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }
  `}
`;

const SelectionCircle = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-top: 0.25rem;
  flex-shrink: 0;

  ${(props) =>
    props.active
      ? `
    border-color: #ef4444; /* Deep Red Border */
    background: #ef4444; /* Deep Red Background */
    color: white;
  `
      : `
    border-color: rgba(255, 255, 255, 0.3);
  `}

  svg {
    font-size: 0.875rem;
  }
`;

const OptionDetails = styled.div`
  flex: 1;
`;

const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const OptionIcon = styled.div`
  color: #ef4444; /* Deep Red Icon */
  font-size: 1.25rem;
`;

const OptionTitle = styled.h4`
  font-weight: 700;
  font-size: 1.125rem;
`;

const OptionPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  color: #f87171; /* Light Red Price */
  margin-bottom: 0.75rem;
`;
const InfoButton = styled.button`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #9ca3af;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ReserveButton = styled.button`
  width: 100%;
  background: linear-gradient(to right, #dc2626, #b91c1c); /* Red Gradient */
  color: white;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  &:hover {
    transform: scale(1.02);
    background: linear-gradient(
      to right,
      #991b1b,
      #c51c1c
    ); /* Darker Red Gradient */
    box-shadow: 0 25px 50px -12px rgba(220, 38, 38, 0.4);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease;
`;

const OverlayContent = styled.div`
  background: #1a1a1a;
  border: 2px solid #333;
  border-radius: 24px;
  padding: 2rem;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  position: relative;
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center bottom;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }

  &::after {
    display: none;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem 1rem;
    max-width: none;
  }
`;

const OverlayTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem 0;
  text-align: center;
  letter-spacing: -0.025em;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      #ef4444,
      /* Deep Red */ #b91c1c,
      /* Dark Red */ transparent
    );
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const OverlayDescription = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.01em;
  margin: 1rem 0;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 1rem 0;
  }
`;

const OverlayButton = styled.button`
  width: 100%;
  background: linear-gradient(
    135deg,
    #ef4444 0%,
    #b91c1c 100%
  ); /* Red Gradient */
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: none;
  letter-spacing: 0.025em;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #b91c1c 0%, #ef4444 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(239, 68, 68, 0.4),
      0 6px 12px rgba(0, 0, 0, 0.3);

    &::before {
      left: 100%;
    }

    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-1px);
    transition: transform 0.1s ease;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.875rem 1.5rem;
  }
`;

/* --- UNUSED CODE --- */

/**
 * The following code blocks and components are commented out because they represent an
 * alternative design or previous version of the UI.
 * They are not currently in use by the main `CarReservePage` component.
 */

// import { BsBuildings } from "react-icons/bs";
// import {
//   IoShieldCheckmarkOutline,
//   IoCarSportOutline,
//   IoCheckmarkCircle,
// } from "react-icons/io5";
// import { FaTimes, FaStar } from "react-icons/fa";

// const float = keyframes`
//   0%, 100% { transform: translateY(0px); }
//   50% { transform: translateY(-20px); }
// `;
// const ModalContent = styled.div`
//   background: rgba(15, 23, 42, 0.95);
//   border: 1px solid rgba(255, 255, 255, 0.1);
//   border-radius: 1.5rem;
//   padding: 2rem;
//   max-width: 42rem;
//   width: 100%;
//   box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//   animation: ${slideUp} 0.4s ease;
// `;
// const ModalHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: 1.5rem;
// `;
// const ModalTitle = styled.h3`
//   font-size: 1.5rem;
//   font-weight: 700;
// `;
// const CloseButton = styled.button`
//   padding: 0.5rem;
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   color: #9ca3af;
//   border-radius: 50%;
//   transition: all 0.2s ease;
//   &:hover {
//     background: rgba(255, 255, 255, 0.1);
//   }
// `;
// const ModalDescription = styled.p`
//   color: #d1d5db;
//   font-size: 1.125rem;
//   line-height: 1.75;
//   margin-bottom: 2rem;
// `;
// const ModalButton = styled.button`
//   width: 100%;
//   background: linear-gradient(to right, #7c3aed, #2563eb);
//   color: white;
//   font-weight: 700;
//   padding: 0.75rem 1.5rem;
//   border-radius: 0.75rem;
//   border: none;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   &:hover {
//     background: linear-gradient(to right, #6d28d9, #1d4ed8);
//   }
// `;
// const FormContainer = styled.div`
//   background: rgba(255, 255, 255, 0.05);
//   border-radius: 1rem;
//   padding: 1.5rem;
//   border: 1px solid rgba(255, 255, 255, 0.1);
//   text-align: center;
// `;
// const FormIcon = styled.div`
//   font-size: 2.5rem;
//   margin-bottom: 1rem;
// `;
// const FormTitle = styled.h4`
//   font-size: 1.25rem;
//   font-weight: 700;
//   margin-bottom: 0.5rem;
// `;
// const FormSubtitle = styled.p`
//   color: #9ca3af;
//   margin-bottom: 1.5rem;
// `;
// const SubmitButton = styled.button`
//   background: #059669;
//   color: white;
//   font-weight: 700;
//   padding: 0.5rem 1.5rem;
//   border-radius: 0.75rem;
//   border: none;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   &:hover {
//     background: #047857;
//   }
// `;

// {/* <PageWrapper>
//       <MainContainer>
//         <CarCard>
//           <CarTitle>
//             {carDetails.brand} {carDetails.title}
//           </CarTitle>
//           <CarPrice>₹{carDetails.ybtPrice.toLocaleString("en-IN")}</CarPrice>
//           <Divider />
//           <StatsGrid>
//             <StatItem>
//               <StatLabel>Reg. Year</StatLabel>
//               <StatValue>{carDetails.registrationYear}</StatValue>
//             </StatItem>
//             <StatItem>
//               <StatLabel>Kms Driven</StatLabel>
//               <StatValue>{carDetails.kmsDriven}</StatValue>
//             </StatItem>
//             <StatItem>
//               <StatLabel>Fuel Type</StatLabel>
//               <StatValue>{carDetails.fuelType}</StatValue>
//             </StatItem>
//             <StatItem>
//               <StatLabel>Vehicle Type</StatLabel>
//               <StatValue>{carDetails.carType || "N/A"}</StatValue>
//             </StatItem>
//           </StatsGrid>
//           <ImageContainer>
//             <CarImage src={carDetails.thumbnail} alt={carDetails.title} />
//           </ImageContainer>
//         </CarCard>
//         <RightColumn>
//           <MainHeading>Reserve Your Own Luxury</MainHeading>
//           <SubHeading>Brand Trusted by the Elites</SubHeading>
//           <FeaturesContainer>
//             <FeatureItem>
//               <FaUserCheck /> 10000+ Satisfied Customers
//             </FeatureItem>
//             <FeatureItem>
//               <BsBuildings /> Asia's Biggest Studio
//             </FeatureItem>
//             <FeatureItem>
//               <IoShieldCheckmarkOutline /> 151 Quality Checkpoints
//             </FeatureItem>
//             <FeatureItem>
//               <IoCarSportOutline /> 50 Luxury Car Brands
//             </FeatureItem>
//           </FeaturesContainer>
//           <PromptText>
//             Please select how you'd like to reserve your car.
//           </PromptText>
//           <OptionsContainer>
//             {reservationOptions.map((option) => (
//               <OptionButton
//                 key={option.id}
//                 active={selectedOptionId === option.id}
//                 onClick={() => setSelectedOptionId(option.id)}
//               >
//                 <CheckCircle active={selectedOptionId === option.id}>
//                   {selectedOptionId === option.id && <IoCheckmarkCircle />}
//                 </CheckCircle>
//                 <OptionText>{option.text}</OptionText>
//                 <InfoButton
//                   active={selectedOptionId === option.id}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleInfoClick(option);
//                   }}
//                 >
//                   <FaInfoCircle />
//                 </InfoButton>
//               </OptionButton>
//             ))}
//           </OptionsContainer>
//           <ReserveButton
//             onClick={handleReserveClick}
//             disabled={bookingMutation.isPending}
//           >
//             {bookingMutation.isPending ? "Reserving..." : "Reserve This Car"}
//           </ReserveButton>
//         </RightColumn>
//       </MainContainer>
//       {isOverlayVisible && (
//         <Overlay
//           onClick={() => {
//             setIsOverlayVisible(false);
//             setShowForm(false);
//           }}
//         >
//           <OverlayContent onClick={(e) => e.stopPropagation()}>
//             {!showForm ? (
//               <>
//                 <OverlayTitle>{overlayContent.title}</OverlayTitle>
//                 <OverlayDescription>
//                   {overlayContent.description}
//                 </OverlayDescription>
//                 <OverlayButton onClick={handleOkClick}>Ok, Got It</OverlayButton>
//               </>
//             ) : (
//               <>
//                 <OverlayTitle>{overlayContent.title}</OverlayTitle>
//                 <OverlayDescription>
//                   {overlayContent.description}
//                 </OverlayDescription>
//                 <VehicleBookingForm
//                   onClose={() => {
//                     setIsOverlayVisible(false);
//                     setShowForm(false);
//                   }}
//                   onSubmit={handleFormSubmit}
//                 />
//               </>
//             )}
//           </OverlayContent>
//         </Overlay>
//       )}
//     </PageWrapper> */}

// const slideUp = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(30px) scale(0.95);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0) scale(1);
//   }
// `;

// const float = keyframes`
//   0%, 100% { transform: translateY(0px); }
//   50% { transform: translateY(-20px); }
// `;

// const PremiumBadge = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   background: linear-gradient(to right, #7c3aed, #2563eb);
//   padding: 0.5rem 1.5rem;
//   border-radius: 9999px;
//   font-size: 0.875rem;
//   font-weight: 500;
//   margin-bottom: 1.5rem;
// `;

// const PageWrapper = styled.div`
//   padding: 100px 2rem;
//   min-height: 100vh;
//   background: #0d0d0d;
//   color: #fff;
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
//     Arial, sans-serif;
// `;
// const MainContainer = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   display: grid;
//   grid-template-columns: 450px 1fr;
//   gap: 3rem;
//   align-items: flex-start;
//   @media (max-width: 1200px) {
//     grid-template-columns: 1fr;
//     gap: 4rem;
//   }
// `;
// const CarCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   background: #1c1c1c;
//   border-radius: 8px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
//   padding: 1rem;
// `;
// const CarPrice = styled.h2`
//   font-size: 1.8rem;
//   font-weight: 600;
//   margin: 0;
// `;
// const CarTitle = styled.h1`
//   font-size: 1.5rem;
//   font-weight: 500;
//   line-height: 1.4;
//   margin: 0.5rem 0 0 0;
//   text-transform: uppercase;
// `;
// const Divider = styled.hr`
//   border: 0;
//   border-top: 1px solid #333;
//   margin: 1rem 0;
// `;
// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 0.25rem;
// `;
// const StatItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 0.25rem;
// `;
// const StatLabel = styled.span`
//   color: #a0a0a0;
//   font-size: 1rem;
//   margin-bottom: 0.1rem;
//   text-transform: uppercase;
// `;
// const StatValue = styled.span`
//   font-size: 0.9rem;
//   font-weight: 600;
// `;
// const CarImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   object-position: center;
// `;
// const RightColumn = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// const MainHeading = styled.h1`
//   font-size: 2.2rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   margin: 0;
// `;
// const SubHeading = styled.p`
//   font-size: 0.9rem;
//   color: #b0b0b0;
//   margin: 0.5rem 0 0 0;
// `;
// const FeaturesContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 2rem;
//   padding-bottom: 3rem;
//   border-bottom: 1px solid #333;
//   flex-wrap: wrap;
//   gap: 1rem;
// `;
// const FeatureItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   color: #d0d0d0;
//   font-size: 0.9rem;
//   svg {
//     font-size: 1.5rem;
//   }
// `;
// const PromptText = styled.p`
//   margin-top: 1.5rem;
//   margin-bottom: 1.5rem;
//   color: #d0d0d0;
// `;
// const OptionsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 1.5rem;
//   width: 100%;
//   padding: 0.5rem 0;
// `;
// const OptionButton = styled.button`
//   position: relative;
//   background: ${(props) =>
//     props.active
//       ? "linear-gradient(135deg, #222 0%, #333 100%)"
//       : "rgba(255, 255, 255, 0.08)"};
//   color: #fff;
//   border: ${(props) =>
//     props.active
//       ? "2px solid transparent"
//       : "2px solid rgba(255, 255, 255, 0.12)"};
//   border-radius: 16px;
//   padding: 1.5rem 1.25rem;
//   text-align: left;
//   cursor: pointer;
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   font-size: 1rem;
//   display: flex;
//   align-items: center;
//   min-height: 80px;
//   overflow: hidden;
//   position: relative;
//   box-shadow: ${(props) =>
//     props.active
//       ? "0 10px 25px rgba(0, 0, 0, 0.6), 0 5px 10px rgba(0, 0, 0, 0.3)"
//       : "0 4px 15px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)"};
//   transform: translateY(0);
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: ${(props) =>
//       props.active
//         ? "transparent"
//         : "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))"};
//     border-radius: inherit;
//     pointer-events: none;
//   }
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: ${(props) =>
//       props.active
//         ? "0 15px 35px rgba(0, 0, 0, 0.7), 0 8px 15px rgba(0, 0, 0, 0.4)"
//         : "0 8px 25px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)"};
//     border-color: ${(props) =>
//       props.active ? "transparent" : "rgba(200, 200, 200, 0.3)"};
//   }
//   &:active {
//     transform: translateY(-1px);
//   }
// `;
// const CheckCircle = styled.div`
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   border: 2px solid
//     ${(props) => (props.active ? "#fff" : "rgba(255, 255, 255, 0.2)")};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 1.25rem;
//   flex-shrink: 0;
//   position: relative;
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   background: ${(props) =>
//     props.active
//       ? "#fff"
//       : "transparent"};
//   &::before {
//     content: "";
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     border-radius: 50%;
//     background: ${(props) =>
//       props.active
//         ? "radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 70%)"
//         : "transparent"};
//     transition: all 0.3s ease;
//   }
//   svg {
//     color: ${(props) =>
//       props.active ? "#000" : "transparent"};
//     font-size: 1.3rem;
//     filter: ${(props) =>
//       props.active ? "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" : "none"};
//     transition: all 0.3s ease;
//     z-index: 1;
//   }
// `;
// const OptionText = styled.span`
//   flex-grow: 1;
//   font-weight: 600;
//   font-size: 1.05rem;
//   line-height: 1.4;
//   letter-spacing: 0.025em;
//   position: relative;
//   z-index: 1;
//   text-shadow: ${(props) =>
//     props.active ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none"};
// `;
// const InfoButton = styled.button`
//   position: absolute;
//   top: 8px;
//   right: 8px;
//   width: 32px;
//   height: 32px;
//   background: rgba(255, 255, 255, 0.1);
//   border: none;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   z-index: 2;
//   &::before {
//     display: none;
//   }
//   &::after {
//     content: "";
//     position: absolute;
//     inset: 0;
//     background: ${(props) =>
//       props.active ? "rgba(255, 255, 255, 0.15)" : "transparent"};
//     border-radius: inherit;
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }
//   svg {
//     font-size: 1rem;
//     color: ${(props) => (props.active ? "#fff" : "rgba(255, 255, 255, 0.6)")};
//     transition: all 0.3s ease;
//     filter: none;
//     z-index: 1;
//   }
//   &:hover {
//     background: ${(props) =>
//       props.active ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.15)"};
//     &::after {
//       opacity: 1;
//     }
//     svg {
//       transform: scale(1.1);
//       color: ${(props) =>
//         props.active ? "#fff" : "rgba(255, 255, 255, 0.8)"};
//     }
//   }
//   &:active {
//     transform: scale(0.95);
//   }
// `;
// const ReserveButton = styled.button`
//   background: #fff;
//   color: #000;
//   border: none;
//   padding: 1.25rem;
//   font-size: 1rem;
//   font-weight: bold;
//   text-transform: uppercase;
//   letter-spacing: 1.5px;
//   border-radius: 8px;
//   cursor: pointer;
//   margin-top: 1.5rem;
//   width: 100%;
//   transition: opacity 0.2s ease;
//   &:hover {
//     opacity: 0.9;
//   }
// `;
// const ImageContainer = styled.div`
//   width: 100%;
//   height: 350px;
//   border-radius: 8px;
//   margin-top: 1rem;
//   overflow: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(13, 13, 13, 0.95);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
//   padding: 2rem;
//   animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   @keyframes fadeIn {
//     from {
//       opacity: 0;
//     }
//     to {
//       opacity: 1;
//     }
//   }
// `;
