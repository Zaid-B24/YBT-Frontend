import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const auctionData = {
  1: {
    title: '2022 Lamborghini Aventador SVJ',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
    description: 'Bid for a chance to own the ultimate supercar. Live auction with exclusive access for subscribers.',
    subscriptionFee: 4999,
    status: 'Live',
    endsIn: '2h 15m',
  },
  2: {
    title: '2021 Rolls Royce Ghost',
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80',
    description: 'Upcoming auction for the epitome of luxury. Secure your spot by subscribing.',
    subscriptionFee: 3999,
    status: 'Upcoming',
    startsIn: 'Tomorrow, 5pm',
  },
  3: {
    title: '2020 Bugatti Chiron',
    image: 'https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&w=800&q=80',
    description: 'Participate in the auction of this engineering marvel. Limited seats available.',
    subscriptionFee: 7999,
    status: 'Live',
    endsIn: '45m',
  },
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding-top: 100px;
`;

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6));
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  text-align: center;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const FeeBox = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 3rem;
  margin: 2rem 0;
  text-align: center;
`;

const FeeAmount = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
`;

const FeeLabel = styled.div`
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ParticipateButton = styled.button`
  background: #fff;
  color: #000;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AuctionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);

  const auction = auctionData[id] || auctionData[1];

  const handleParticipate = () => {
    // In a real app, payment logic would go here
    setSubscribed(true);
    setTimeout(() => {
      navigate(`/auctions/${id}/live`);
    }, 1200);
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroBackground image={auction.image} />
        <HeroContent>
          <StatusBadge>{auction.status}</StatusBadge>
          <Title>{auction.title}</Title>
          <Description>{auction.description}</Description>
          {auction.status === 'Live' ? (
            <div style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Ends in: {auction.endsIn}
            </div>
          ) : (
            <div style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Starts: {auction.startsIn}
            </div>
          )}
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <FeeBox>
          <FeeAmount>₹{auction.subscriptionFee.toLocaleString()}</FeeAmount>
          <FeeLabel>Subscription Fee to Participate</FeeLabel>
          <ParticipateButton onClick={handleParticipate} disabled={subscribed}>
            {subscribed ? 'Processing...' : 'Participate in Auction'}
          </ParticipateButton>
        </FeeBox>
      </ContentSection>
    </PageWrapper>
  );
};

export default AuctionDetailsPage; 