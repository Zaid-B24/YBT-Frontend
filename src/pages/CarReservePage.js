import { useState } from "react";
import styled from "styled-components";
import { FaUserCheck, FaInfoCircle } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import {
  IoShieldCheckmarkOutline,
  IoCarSportOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import VehicleBookingForm from "../components/forms/BookingForm";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// 🎯 Define API endpoints here or import them from a separate file
const API_ENDPOINTS = {
  getCarDetails: "/api/car/123", // Replace with your actual endpoint
  submitBooking: "/api/booking", // Replace with your actual endpoint
};

const CarReservePage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState(1);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayContent, setOverlayContent] = useState({});
  const [showForm, setShowForm] = useState(false);

  const { vehicleId } = useParams();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const {
    data: carDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["carDetails", vehicleId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/cars/${vehicleId}`);
      console.log("this is response in reserve page ", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    // The `enabled` property is essential here.
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
      text: "Pay 2 Lacs & Reserve Car for 24 hrs",
      info: {
        title: "Reserve for 24 hours",
        description: "Pay ₹2,00,000 to reserve your dream car...",
      },
      formIntro: {
        title: `Pay ₹2,00,000 & Reserve Car for 24 hrs`,
        description: `We will reserve your dream car for the next 24 hours...`,
      },
    },
    {
      id: 2,
      text: "Pay 10% & Get Confirmed Booking",
      info: {
        title: "Confirmed Booking",
        description: `Pay ₹${price10Percent} of the car's price...`,
      },
      formIntro: {
        title: `Pay ₹${price10Percent} & Get Confirmed Booking`,
        description: `We will confirm your booking...`,
      },
    },
    {
      id: 3,
      text: "Pay 100% & Get Car Delivered Home",
      info: {
        title: "100% Payment & Home Delivery",
        description: `Pay the full price of ₹${price100Percent} now...`,
      },
      formIntro: {
        title: `Pay ₹${price100Percent} & Get Car Delivered Home`,
        description: `Get ready to unbox your dream car...`,
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
    handleInfoClick(selectedOption);
  };

  return (
    <PageWrapper>
      <MainContainer>
        <CarCard>
          <CarTitle>
            {carDetails.brand} {carDetails.title}
          </CarTitle>
          <CarPrice>₹{carDetails.ybtPrice.toLocaleString("en-IN")}</CarPrice>
          <Divider />
          <StatsGrid>
            <StatItem>
              <StatLabel>Reg. Year</StatLabel>
              <StatValue>{carDetails.registrationYear}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Kms Driven</StatLabel>
              <StatValue>{carDetails.kmsDriven}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Fuel Type</StatLabel>
              <StatValue>{carDetails.fuelType}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Vehicle Type</StatLabel>
              <StatValue>{carDetails.carType || "N/A"}</StatValue>
            </StatItem>
          </StatsGrid>
          <ImageContainer>
            <CarImage src={carDetails.thumbnail} alt={carDetails.title} />
          </ImageContainer>
        </CarCard>

        <RightColumn>
          <MainHeading>Reserve Your Own Luxury</MainHeading>
          <SubHeading>Brand Trusted by the Elites</SubHeading>
          <FeaturesContainer>
            <FeatureItem>
              <FaUserCheck /> 10000+ Satisfied Customers
            </FeatureItem>
            <FeatureItem>
              <BsBuildings /> Asia's Biggest Studio
            </FeatureItem>
            <FeatureItem>
              <IoShieldCheckmarkOutline /> 151 Quality Checkpoints
            </FeatureItem>
            <FeatureItem>
              <IoCarSportOutline /> 50 Luxury Car Brands
            </FeatureItem>
          </FeaturesContainer>
          <PromptText>
            Please select how you'd like to reserve your car.
          </PromptText>
          <OptionsContainer>
            {reservationOptions.map((option) => (
              <OptionButton
                key={option.id}
                active={selectedOptionId === option.id}
                onClick={() => setSelectedOptionId(option.id)}
              >
                <CheckCircle active={selectedOptionId === option.id}>
                  {selectedOptionId === option.id && <IoCheckmarkCircle />}
                </CheckCircle>
                <OptionText>{option.text}</OptionText>
                <InfoButton
                  active={selectedOptionId === option.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick(option);
                  }}
                >
                  <FaInfoCircle />
                </InfoButton>
              </OptionButton>
            ))}
          </OptionsContainer>
          <ReserveButton
            onClick={handleReserveClick}
            disabled={bookingMutation.isPending}
          >
            {bookingMutation.isPending ? "Reserving..." : "Reserve This Car"}
          </ReserveButton>
        </RightColumn>
      </MainContainer>
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
// Styled components remain unchanged from your original code.

const PageWrapper = styled.div`
  padding: 100px 2rem;
  min-height: 100vh;
  background: #0d0d0d;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

const MainContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 450px 1fr;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const CarCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #1c1c1c;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  padding: 1rem;
`;

const CarPrice = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
`;

const CarTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.4;
  margin: 0.5rem 0 0 0;
  text-transform: uppercase;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #333;
  margin: 1rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
`;

const StatLabel = styled.span`
  color: #a0a0a0;
  font-size: 1rem;
  margin-bottom: 0.1rem;
  text-transform: uppercase;
`;

const StatValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainHeading = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const SubHeading = styled.p`
  font-size: 0.9rem;
  color: #b0b0b0;
  margin: 0.5rem 0 0 0;
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #333;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #d0d0d0;
  font-size: 0.9rem;

  svg {
    font-size: 1.5rem;
  }
`;

const PromptText = styled.p`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  color: #d0d0d0;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  padding: 0.5rem 0;
`;

const OptionButton = styled.button`
  position: relative;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "rgba(255, 255, 255, 0.08)"};
  color: ${(props) => (props.active ? "#fff" : "#e2e8f0")};
  border: ${(props) =>
    props.active
      ? "2px solid transparent"
      : "2px solid rgba(255, 255, 255, 0.12)"};
  border-radius: 16px;
  padding: 1.5rem 1.25rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  display: flex;
  align-items: center;
  min-height: 80px;
  overflow: hidden;

  box-shadow: ${(props) =>
    props.active
      ? "0 10px 25px rgba(102, 126, 234, 0.3), 0 5px 10px rgba(0, 0, 0, 0.1)"
      : "0 4px 15px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)"};
  transform: translateY(0);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.active
        ? "transparent"
        : "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))"};
    border-radius: inherit;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.active
        ? "0 15px 35px rgba(102, 126, 234, 0.4), 0 8px 15px rgba(0, 0, 0, 0.15)"
        : "0 8px 25px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)"};
    border-color: ${(props) =>
      props.active ? "transparent" : "rgba(102, 126, 234, 0.3)"};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.active ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.2)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
  flex-shrink: 0;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.2)" : "transparent"};

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${(props) =>
      props.active
        ? "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)"
        : "transparent"};
    transition: all 0.3s ease;
  }

  svg {
    color: ${(props) => (props.active ? "#fff" : "transparent")};
    font-size: 1.3rem;
    filter: ${(props) =>
      props.active ? "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" : "none"};
    transition: all 0.3s ease;
    z-index: 1;
  }
`;

const OptionText = styled.span`
  flex-grow: 1;
  font-weight: 600;
  font-size: 1.05rem;
  line-height: 1.4;
  letter-spacing: 0.025em;
  position: relative;
  z-index: 1;
  text-shadow: ${(props) =>
    props.active ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none"};
`;

const InfoButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 50px;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))"};
  border: none;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -2px;
    bottom: 0;
    width: 1px;
    background: ${(props) =>
      props.active ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  svg {
    font-size: 1.1rem;
    color: ${(props) =>
      props.active ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.6)"};
    transition: all 0.3s ease;
    filter: ${(props) =>
      props.active ? "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))" : "none"};
    z-index: 1;
  }

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))"
        : "linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))"};

    &::after {
      opacity: 1;
    }

    svg {
      transform: scale(1.1);
      color: ${(props) => (props.active ? "#fff" : "rgba(255, 255, 255, 0.8)")};
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ReserveButton = styled.button`
  background: #fff;
  color: #000;
  border: none;
  padding: 1.25rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
  width: 100%;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 8px;
  margin-top: 1rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 13, 13, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const OverlayContent = styled.div`
  background: #1a1a1a;
  border: 2px solid #333;
  border-radius: 24px;
  padding: 2rem;
  max-width: 700px;
  width: 100%;
  /* Removed max-height and overflow-y properties */

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

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem 1rem;
    max-width: none;
    /* Also removed max-height here for consistency on mobile */
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
      rgba(102, 126, 234, 0.8),
      rgba(118, 75, 162, 0.8),
      transparent
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
  margin: 2rem 0;
  text-align: center;
  letter-spacing: 0.01em;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 1.5rem 0;
  }
`;

const OverlayButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2);

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
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4),
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
// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import { FaUserCheck, FaInfoCircle, FaTimes } from "react-icons/fa";
// import { BsBuildings } from "react-icons/bs";
// import {
//   IoShieldCheckmarkOutline,
//   IoCarSportOutline,
//   IoCheckmarkCircle,
// } from "react-icons/io5";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// const fetchCarDetails = async (id) => {
//   const response = await fetch(`${process.env.REACT_APP_API_URL}/cars/${id}`);
//   if (!response.ok) {
//     throw new Error("Car not found");
//   }
//   return response.json();
// };

// const reservationOptions = [
//   {
//     id: 1,
//     text: "Pay 2 Lacs & Reserve Car for 24 hrs",
//     modal: {
//       title: "Pay ₹2,00,000 & Reserve Car for 24 hrs",
//       subtitle: "We will confirm your booking.",
//       message:
//         "All you need to do is pay 2 lacs now & you can come back and purchase the car anytime within the period. In case you fail to purchase the car, we will refund the payment.",
//     },
//   },
//   {
//     id: 2,
//     text: "Pay 10% & Get Confirmed Booking",
//     modal: {
//       title: "Pay 10% & Get Confirmed Booking",
//       subtitle: "We will confirm your booking.",
//       message:
//         "All you need to do is pay 10% of the total amount and you can make the rest of the payment at a later stage and the car will be yours!",
//     },
//   },
//   {
//     id: 3,
//     text: "Pay 100% & Get Car Delivered Home",
//     modal: {
//       title: "Pay 100% & Get Car Delivered Home",
//       subtitle: "Enjoy seamless home delivery.",
//       message:
//         "Make a full payment to confirm your purchase, and we'll arrange for your dream car to be delivered directly to your doorstep. It's the quickest way to get your car!",
//     },
//   },
// ];

// const InfoModal = ({ content, onConfirm, onClose }) => (
//   <ModalContent>
//     <CloseButton onClick={onClose}>
//       <FaTimes />
//     </CloseButton>
//     <ModalHeader>
//       <ModalTitle>{content.title}</ModalTitle>
//       <ModalSubTitle>{content.subtitle}</ModalSubTitle>
//       <ModalMessage>{content.message}</ModalMessage>
//     </ModalHeader>
//     {/* Corrected part */}
//     <ModalButton onClick={onConfirm}>{content.buttonText}</ModalButton>
//   </ModalContent>
// );

// const FormModal = ({ carDetails, selectedOptionId, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//   });
//   const [selectedPayment, setSelectedPayment] = useState("visa");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleLocalSubmit = (e) => {
//     onSubmit(e, formData, selectedPayment);
//   };

//   const reservationAmount =
//     selectedOptionId === 1
//       ? "2,00,000"
//       : selectedOptionId === 2
//       ? (carDetails.ybtPrice * 0.1).toLocaleString("en-IN")
//       : carDetails.ybtPrice.toLocaleString("en-IN");

//   return (
//     <ModalContent>
//       <CloseButton onClick={onClose}>
//         <FaTimes />
//       </CloseButton>
//       <ModalHeader>
//         <ModalTitle>Pay ₹{reservationAmount} & Reserve Car</ModalTitle>
//         <ModalSubTitle>
//           Just a few steps away from your dream car!
//         </ModalSubTitle>
//       </ModalHeader>
//       <form onSubmit={handleLocalSubmit}>
//         <FormGrid>
//           <FormInput
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           <FormInput
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleInputChange}
//           />
//           <FormInput
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <FormInput
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleInputChange}
//           />
//         </FormGrid>
//         <PaymentMethods>
//           <PaymentOption
//             active={selectedPayment === "visa"}
//             onClick={() => setSelectedPayment("visa")}
//           >
//             <img src="https://img.icons8.com/color/100/visa.png" alt="Visa" />
//           </PaymentOption>
//           <PaymentOption
//             active={selectedPayment === "upi"}
//             onClick={() => setSelectedPayment("upi")}
//           >
//             <img src="https://img.icons8.com/color/100/upi.png" alt="UPI" />
//           </PaymentOption>
//           <PaymentOption
//             active={selectedPayment === "amex"}
//             onClick={() => setSelectedPayment("amex")}
//           >
//             <img src="https://img.icons8.com/color/100/amex.png" alt="Amex" />
//           </PaymentOption>
//         </PaymentMethods>
//         <ModalButton type="submit">Reserve Now</ModalButton>
//       </form>
//     </ModalContent>
//   );
// };

// const CarReservePage = () => {
//   const [selectedOptionId, setSelectedOptionId] = useState(1);
//   const [modal, setModal] = useState({
//     isVisible: false,
//     view: null, // 'info' or 'form'
//     content: {},
//   });
//   const { id } = useParams();

//   const {
//     data: carDetails,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["carDetails", id],
//     queryFn: () => fetchCarDetails(id),
//   });

//   const handleInfoClick = (e, option) => {
//     e.stopPropagation();
//     setModal({
//       isVisible: true,
//       view: "info",
//       content: { ...option.modal, buttonText: "Continue" },
//     });
//   };

//   const handleInfoConfirm = () => {
//     setModal((prev) => ({
//       ...prev,
//       view: "form",
//     }));
//   };

//   const handleReserveClick = () => {
//     const selectedOption = reservationOptions.find(
//       (opt) => opt.id === selectedOptionId
//     );
//     setModal({
//       isVisible: true,
//       view: "info",
//       content: { ...selectedOption.modal, buttonText: "Continue" },
//     });
//   };

//   const handleFormSubmit = async (e, formData, paymentMethod) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//     console.log("Selected Payment Method:", paymentMethod);
//     // In a real app, you would process the form data here,
//     // potentially making a POST request to your backend.

//     // Simulate a redirect to a payment gateway
//     alert("Form submitted! Redirecting to a dummy payment page...");
//     setModal({ isVisible: false, view: null, content: {} });
//     window.location.href = "https://www.fakepayment.com"; // A placeholder for a real redirect
//   };

//   if (isLoading) {
//     return (
//       <PageWrapper>
//         <h2>Loading...</h2>
//       </PageWrapper>
//     );
//   }

//   if (isError) {
//     return (
//       <PageWrapper>
//         <h2>Error: {error.message}</h2>
//       </PageWrapper>
//     );
//   }

//   if (!carDetails) {
//     return (
//       <PageWrapper>
//         <h2>Car not found.</h2>
//       </PageWrapper>
//     );
//   }

//   return (
//     <PageWrapper>
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
//                   onClick={(e) => handleInfoClick(e, option)}
//                 >
//                   <FaInfoCircle />
//                 </InfoButton>
//               </OptionButton>
//             ))}
//           </OptionsContainer>

//           <ReserveButton onClick={handleReserveClick}>
//             Reserve This Car
//           </ReserveButton>
//         </RightColumn>
//       </MainContainer>

//       {modal.isVisible && (
//         <Overlay onClick={() => setModal({ isVisible: false })}>
//           {modal.view === "info" && (
//             <InfoModal
//               content={modal.content}
//               onConfirm={handleInfoConfirm}
//               onClose={() => setModal({ isVisible: false })}
//             />
//           )}
//           {modal.view === "form" && (
//             <FormModal
//               carDetails={carDetails}
//               selectedOptionId={selectedOptionId}
//               onClose={() => setModal({ isVisible: false })}
//               onSubmit={handleFormSubmit}
//             />
//           )}
//         </Overlay>
//       )}
//     </PageWrapper>
//   );
// };

// export default CarReservePage;

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
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1rem;
//   width: 100%;
// `;

// const OptionButton = styled.button`
//   position: relative;
//   background: ${(props) => (props.active ? "#E71D36" : "#fff")};
//   color: ${(props) => (props.active ? "#fff" : "#000")};
//   border: none;
//   border-radius: 8px;
//   padding: 1.25rem 1.25rem;
//   text-align: left;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   font-size: 1rem;
//   display: flex;
//   align-items: center;
//   min-height: 70px;
//   overflow: hidden;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

//   &:hover {
//     box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
//   }
// `;

// const CheckCircle = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   border: 2px solid ${(props) => (props.active ? "#fff" : "#a0a0a0")};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 1rem;
//   flex-shrink: 0;

//   svg {
//     color: ${(props) => (props.active ? "#fff" : "transparent")};
//     font-size: 1.2rem;
//   }
// `;

// const OptionText = styled.span`
//   flex-grow: 1;
//   font-weight: 500;
// `;

// const InfoButton = styled.button`
//   position: absolute;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   width: 40px;
//   background: ${(props) => (props.active ? "#F04C5C" : "#e0e0e0")};
//   border: none;
//   border-top-right-radius: 8px;
//   border-bottom-right-radius: 8px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: background 0.2s ease;

//   svg {
//     font-size: 1rem;
//     color: ${(props) => (props.active ? "#fff" : "#555")};
//   }

//   &:hover {
//     background: ${(props) => (props.active ? "#d41c30" : "#cccccc")};
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

// // --- MODIFIED Overlay Components ---

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5); /* Slightly lighter overlay background */
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   position: relative;
//   background: #fff;
//   padding: 2rem;
//   border-radius: 12px;
//   max-width: 650px;
//   width: 90%;
//   text-align: center;
//   box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
//   color: #000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   background: transparent;
//   border: none;
//   font-size: 1.5rem;
//   color: #555;
//   cursor: pointer;
//   padding: 5px;
//   &:hover {
//     color: #000;
//   }
// `;
// const ModalHeader = styled.div`
//   text-align: center;
//   margin-bottom: 2rem;
// `;

// const ModalIcon = styled.div`
//   width: 100px; /* Size of the icon container */
//   height: 100px;
//   border-radius: 50%;
//   background: #f0f0f0; /* Light background for the icon */
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 2rem; /* Space below the icon */
//   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1); /* Subtle inner shadow */

//   img {
//     width: 60%; /* Size of the actual image inside */
//     height: 60%;
//     object-fit: contain;
//   }
// `;

// const ModalTitle = styled.h3`
//   font-size: 2rem; /* Larger title */
//   font-weight: 600;
//   margin-bottom: 0.75rem; /* Space below title */
//   color: #000; /* Black color for title */
// `;

// const ModalSubTitle = styled.p`
//   font-size: 1.1rem;
//   font-weight: 500;
//   color: #333;
//   margin-bottom: 1.5rem;
// `;

// const ModalMessage = styled.p`
//   font-size: 1rem; /* Slightly smaller message text */
//   line-height: 1.6;
//   color: #555; /* Darker grey for message */
//   margin-bottom: 2.5rem; /* More space before the button */
//   max-width: 450px; /* Constrain message width for readability */
// `;

// const ModalButton = styled(ReserveButton)`
//   margin-top: 0; /* Override */
//   background: #000; /* Black button background */
//   color: #fff; /* White text */
//   padding: 1rem 2rem; /* Adjust padding */
//   font-size: 1.1rem; /* Slightly larger text */
//   &:hover {
//     background: #333; /* Darker hover */
//   }
// `;
// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 1rem;
//   width: 100%;
//   margin-bottom: 2rem;
// `;

// const FormInput = styled.input`
//   width: 100%;
//   padding: 1rem;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   font-size: 1rem;
//   background: #f8f8f8;
//   color: #333;

//   &:focus {
//     outline: none;
//     border-color: #000;
//   }
// `;

// const PaymentMethods = styled.div`
//   display: flex;
//   justify-content: space-around;
//   gap: 1rem;
//   width: 100%;
//   margin-bottom: 2rem;
// `;

// const PaymentOption = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 1rem;
//   border: 2px solid ${(props) => (props.active ? "#000" : "#fff")};
//   border-radius: 8px;
//   cursor: pointer;
//   background: #f8f8f8;

//   img {
//     max-height: 30px;
//   }
// `;
