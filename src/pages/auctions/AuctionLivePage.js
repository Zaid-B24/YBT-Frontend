import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const auctionData = {
  1: {
    title: '2022 Lamborghini Aventador SVJ',
    subtitle: 'YOUNG BOY TOYZ Edition',
    category: 'Supercar',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
    startingBid: 200000000,
    description: 'Track-focused supercar with aggressive aerodynamics, lightweight construction, and bespoke YOUNG BOY TOYZ customization.',
    specs: {
      horsepower: '850',
      torque: '780',
      rims: '21"',
      components: 'Carbon'
    }
  },
  2: {
    title: '2021 Rolls Royce Ghost',
    subtitle: 'Phantom Edition',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80',
    startingBid: 150000000,
    description: 'The epitome of luxury with handcrafted interior, whisper-quiet ride, and exclusive YOUNG BOY TOYZ modifications.',
    specs: {
      horsepower: '630',
      torque: '900',
      rims: '22"',
      components: 'Leather'
    }
  },
  3: {
    title: '2020 Bugatti Chiron',
    subtitle: 'Sport Edition',
    category: 'Hypercar',
    image: 'https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&w=800&q=80',
    startingBid: 300000000,
    description: 'Engineering marvel with quad-turbocharged W16 engine, unmatched performance, and exclusive design elements.',
    specs: {
      horsepower: '1,500',
      torque: '1,600',
      rims: '20"',
      components: 'Carbon'
    }
  },
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding-top: 100px;
`;

const AuctionContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const NavigationTabs = styled.div`
  background: #111;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 0 2rem;
  position: sticky;
  top: 100px;
  z-index: 100;
`;

const TabsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  overflow-x: auto;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#fff' : '#666'};
  padding: 1rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: #fff;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fff;
  }
`;

const CarSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-bottom: 2rem;
`;

const CarTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CarSubtitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: #ccc;
`;

const CarCategory = styled.span`
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

const CarDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ContentSection = styled.section`
  padding: 2rem 0;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const SpecCard = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1.5rem;
  text-align: center;
`;

const SpecValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SpecLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BiddingSection = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 120px;
`;

const BiddingTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const CurrentBid = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
`;

const BidHistory = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
`;

const BidHistoryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ccc;
  margin-bottom: 1rem;
`;

const BidItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.9rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const PlaceBidForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BidInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255,255,255,0.2);
  font-size: 1rem;
  background: rgba(255,255,255,0.05);
  color: #fff;
  
  &::placeholder {
    color: rgba(255,255,255,0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.4);
  }
`;

const BidButton = styled.button`
  background: #fff;
  color: #000;
  font-weight: 600;
  font-size: 0.9rem;
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

const AuctionLivePage = () => {
  const { id } = useParams();
  const auction = auctionData[id] || auctionData[1];

  const [currentBid, setCurrentBid] = useState(auction.startingBid);
  const [bidHistory, setBidHistory] = useState([
    { user: 'Bidder#1001', amount: auction.startingBid },
  ]);
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'gallery', label: 'Gallery' }
  ];

  const handleBid = (e) => {
    e.preventDefault();
    const bid = parseInt(bidAmount.replace(/,/g, ''));
    if (isNaN(bid) || bid <= currentBid) {
      setError('Bid must be higher than current bid.');
      return;
    }
    setCurrentBid(bid);
    setBidHistory([
      { user: 'You', amount: bid },
      ...bidHistory,
    ]);
    setBidAmount('');
    setError('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ContentSection>
            <CarCategory>{auction.category}</CarCategory>
            <CarTitle>{auction.title}</CarTitle>
            <CarSubtitle>{auction.subtitle}</CarSubtitle>
            <CarDescription>{auction.description}</CarDescription>
            
            <SpecsGrid>
              <SpecCard>
                <SpecValue>{auction.specs.horsepower}</SpecValue>
                <SpecLabel>Horsepower</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>{auction.specs.torque}</SpecValue>
                <SpecLabel>Nm Torque</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>{auction.specs.rims}</SpecValue>
                <SpecLabel>Forged Rims</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>{auction.specs.components}</SpecValue>
                <SpecLabel>Components</SpecLabel>
              </SpecCard>
            </SpecsGrid>
          </ContentSection>
        );

      case 'specifications':
        return (
          <ContentSection>
            <SectionTitle>Technical Specifications</SectionTitle>
            <SpecsGrid>
              <SpecCard>
                <SpecValue>{auction.specs.horsepower}</SpecValue>
                <SpecLabel>Horsepower</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>{auction.specs.torque}</SpecValue>
                <SpecLabel>Nm Torque</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>{auction.specs.rims}</SpecValue>
                <SpecLabel>Forged Rims</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>{auction.specs.components}</SpecValue>
                <SpecLabel>Components</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>3.2s</SpecValue>
                <SpecLabel>0-100 km/h</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>350 km/h</SpecValue>
                <SpecLabel>Top Speed</SpecLabel>
              </SpecCard>
            </SpecsGrid>
          </ContentSection>
        );

      case 'gallery':
        return (
          <ContentSection>
            <SectionTitle>Gallery</SectionTitle>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '1rem',
              margin: '2rem 0'
            }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} style={{
                  height: '200px',
                  background: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Gallery Image {item}
                </div>
              ))}
            </div>
          </ContentSection>
        );

      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <AuctionContainer>
        <CarSection>
          <CarImage src={auction.image} alt={auction.title} />
        </CarSection>
        <BiddingSection>
          <BiddingTitle>Live Auction</BiddingTitle>
          <CurrentBid>₹{currentBid.toLocaleString()}</CurrentBid>
          
          <BidHistoryTitle>Bid History</BidHistoryTitle>
          <BidHistory>
            {bidHistory.map((bid, idx) => (
              <BidItem key={idx}>
                <span>{bid.user}</span>
                <span>₹{bid.amount.toLocaleString()}</span>
              </BidItem>
            ))}
          </BidHistory>
          
          <PlaceBidForm onSubmit={handleBid}>
            <BidInput
              type="number"
              min={currentBid + 1}
              placeholder={`Minimum bid: ₹${(currentBid + 1).toLocaleString()}`}
              value={bidAmount}
              onChange={e => setBidAmount(e.target.value)}
              required
            />
            <BidButton type="submit">Place Bid</BidButton>
          </PlaceBidForm>
          {error && <div style={{ color: '#e63946', marginTop: '1rem', fontSize: '0.9rem' }}>{error}</div>}
        </BiddingSection>
      </AuctionContainer>

      <NavigationTabs>
        <TabsContainer>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Tab>
          ))}
        </TabsContainer>
      </NavigationTabs>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        {renderTabContent()}
      </div>
    </PageWrapper>
  );
};

export default AuctionLivePage; 