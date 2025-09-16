import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserCheck, FaInfoCircle } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import {
  IoShieldCheckmarkOutline,
  IoCarSportOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PageWrapper = styled.div`
  padding: 100px 2rem;
  min-height: 100vh;
  background: #0d0d0d; // A slightly off-black like in the image
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
  background: #1c1c1c; /* Dark background for the card */
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Adds a subtle shadow */
  padding: 1.5rem;
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
  gap: 0.25rem; /* Reduced from 1.5rem */
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem; /* Reduced from 1rem */
`;

const StatLabel = styled.span`
  color: #a0a0a0;
  font-size: 0.9rem; /* Reduced from 0.9rem */
  margin-bottom: 0.1rem; /* Reduced from 0.25rem */
  text-transform: uppercase;
`;

const StatValue = styled.span`
  font-size: 1rem; /* Reduced from 1rem */
  font-weight: 600;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%; /* Make the image fill its new container */
  object-fit: cover;
  object-position: center; /* Ensures the most important part of the image is visible */
`;

// Right Column for Reservation Options
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
`;

const OptionButton = styled.button`
  background: ${(props) => (props.active ? "#1c1c1c" : "transparent")};
  border: 1px solid ${(props) => (props.active ? "#fff" : "#555")};
  color: #fff;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100px;

  &:hover {
    border-color: #fff;
  }
`;

const OptionTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  svg {
    font-size: 1.2rem;
    color: ${(props) => (props.active ? "#fff" : "#888")};
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
  height: 350px; /* Or a different fixed height */
  border-radius: 8px;
  margin-top: 1rem;
  overflow: hidden;
  display: flex; /* To center the image inside */
  justify-content: center;
  align-items: center;
`;

const fetchCarDetails = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/cars/${id}`);
  if (!response.ok) {
    throw new Error("Car not found");
  }
  return response.json();
};

const CarReservePage = () => {
  const [selectedOption, setSelectedOption] = useState(1);
  const { id } = useParams();

  const {
    data: carDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["carDetails", id],
    queryFn: () => fetchCarDetails(id),
  });

  if (isLoading) {
    return (
      <PageWrapper>
        <h2>Loading...</h2>
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
        <h2>Error: {error.message}</h2>
      </PageWrapper>
    );
  }

  if (!carDetails) {
    return (
      <PageWrapper>
        <h2>Car not found.</h2>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <MainContainer>
        {/* LEFT COLUMN */}

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

        {/* RIGHT COLUMN */}
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
            <OptionButton
              active={selectedOption === 1}
              onClick={() => setSelectedOption(1)}
            >
              <OptionTopRow active={selectedOption === 1}>
                <span>Pay 2 Lacs & Reserve Car for 24 hrs</span>
                {selectedOption === 1 ? (
                  <IoCheckmarkCircle />
                ) : (
                  <FaInfoCircle />
                )}
              </OptionTopRow>
            </OptionButton>
            <OptionButton
              active={selectedOption === 2}
              onClick={() => setSelectedOption(2)}
            >
              <OptionTopRow active={selectedOption === 2}>
                <span>Pay 10% & Get Confirmed Booking</span>
                {selectedOption === 2 ? (
                  <IoCheckmarkCircle />
                ) : (
                  <FaInfoCircle />
                )}
              </OptionTopRow>
            </OptionButton>
            <OptionButton
              active={selectedOption === 3}
              onClick={() => setSelectedOption(3)}
            >
              <OptionTopRow active={selectedOption === 3}>
                <span>Pay 100% & Get Car Delivered Home</span>
                {selectedOption === 3 ? (
                  <IoCheckmarkCircle />
                ) : (
                  <FaInfoCircle />
                )}
              </OptionTopRow>
            </OptionButton>
          </OptionsContainer>

          <ReserveButton>Reserve This Car</ReserveButton>
        </RightColumn>
      </MainContainer>
    </PageWrapper>
  );
};

export default CarReservePage;
