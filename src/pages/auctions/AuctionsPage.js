import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const auctions = [
  {
    id: 1,
    title: "2022 Lamborghini Aventador SVJ",
    status: "Live",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
    endsIn: "2h 15m",
  },
  {
    id: 2,
    title: "2021 Rolls Royce Ghost",
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80",
    startsIn: "Tomorrow, 5pm",
  },
  {
    id: 3,
    title: "2020 Bugatti Chiron",
    status: "Live",
    image:
      "https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&w=800&q=80",
    endsIn: "45m",
  },
];

const AuctionsPageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: black;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  padding: 4rem 2rem;
  text-align: center;
`;

const AuctionsHeading = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const AuctionsSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const AuctionsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const AuctionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AuctionCard = styled(Link)`
  display: block;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const AuctionImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const AuctionInfo = styled.div`
  padding: 1.5rem;
`;

const AuctionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  color: #fff;
`;

const AuctionStatus = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 500;
  color: #fff;
  background: ${(props) =>
    props.status === "Live"
      ? "rgba(230, 57, 70, 0.8)"
      : "rgba(69, 123, 157, 0.8)"};
  border-radius: 0;
  padding: 0.3rem 0.8rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AuctionTime = styled.div`
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 0.5rem;
`;

const AuctionsPage = () => {
  return (
    <AuctionsPageWrapper>
      <p style={{ fontSize: "1.5rem", color: "#666" }}>
        Oops we are cooking something! We'll get back soon 😉
      </p>
      {/* <HeroSection>
        <AuctionsHeading>Live & Upcoming Auctions</AuctionsHeading>
        <AuctionsSubtitle>
          Participate in exclusive auctions for the world's most coveted luxury vehicles. 
          Each auction requires a subscription for authenticated bidding.
        </AuctionsSubtitle>
      </HeroSection>
      
      <AuctionsContainer>
        <AuctionsGrid>
          {auctions.map(auction => (
            <AuctionCard key={auction.id} to={`/auctions/${auction.id}`}>
              <AuctionImage src={auction.image} alt={auction.title} />
              <AuctionInfo>
                <AuctionStatus status={auction.status}>{auction.status}</AuctionStatus>
                <AuctionTitle>{auction.title}</AuctionTitle>
                {auction.status === 'Live' ? (
                  <AuctionTime>Ends in: {auction.endsIn}</AuctionTime>
                ) : (
                  <AuctionTime>Starts: {auction.startsIn}</AuctionTime>
                )}
              </AuctionInfo>
            </AuctionCard>
          ))}
        </AuctionsGrid>
      </AuctionsContainer> */}
    </AuctionsPageWrapper>
  );
};

export default AuctionsPage;
