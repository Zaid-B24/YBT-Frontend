import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, MapPin, Users, Fuel, 
  Shield, CheckCircle, Heart, Share2, Phone, Mail 
} from 'lucide-react';

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
`;

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

const ImageSection = styled.div``;

const MainImage = styled.div`
  height: 400px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
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

const ImageActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const Thumbnail = styled.div`
  height: 80px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#fff' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const BookingSection = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 120px;
`;

const VehicleTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

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

const PricingOptions = styled.div`
  margin-bottom: 2rem;
`;

const PricingTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const PriceOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const PriceLabel = styled.div`
  font-weight: 500;
`;

const PriceAmount = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
`;

const BookingForm = styled.div`
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const BookButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: #fff;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem 0;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ContactInfo = styled.div`
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ContactButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.05);
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

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const Description = styled.p`
  color: #ccc;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

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

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  margin-bottom: 0.5rem;
`;

const PolicySection = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
`;

const PolicyTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
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
    content: '•';
    color: #22c55e;
    position: absolute;
    left: 0;
  }
`;

const RentalDetailsPage = () => {
  const { id } = useParams();
  const [selectedPricing, setSelectedPricing] = useState('daily');
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - in real app, fetch based on ID
  const vehicle = {
    id: 1,
    title: "BMW M3 Competition",
    description: "Experience the thrill of German engineering with this high-performance sedan featuring twin-turbo power and precision handling. The BMW M3 Competition represents the pinnacle of sports sedan excellence, combining everyday usability with track-ready performance. Its aggressive styling, advanced aerodynamics, and meticulously tuned chassis deliver an uncompromising driving experience.",
    category: "Cars",
    brand: "BMW",
    location: "Mumbai",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
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
      seating: "4 Passengers"
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
      "Multiple Driving Modes"
    ]
  };

  const pricingOptions = [
    { id: 'daily', label: 'Daily Rental', price: vehicle.dailyPrice, duration: 'per day' },
    { id: 'weekly', label: 'Weekly Rental', price: '₹90,000', duration: 'per week' },
    { id: 'monthly', label: 'Monthly Rental', price: vehicle.monthlyPrice, duration: 'per month' }
  ];

  return (
    <PageWrapper>
      <Container>
        <BackButton to="/rentals">
          <ArrowLeft size={16} />
          Back to Rentals
        </BackButton>

        <VehicleHeader>
          <ImageSection>
            <MainImage image={vehicle.images[selectedImage]}>
              <ImageBadges>
                {vehicle.badges.map((badge, index) => (
                  <ImageBadge key={index}>{badge}</ImageBadge>
                ))}
              </ImageBadges>
              <ImageActions>
                <ActionButton>
                  <Heart size={16} />
                </ActionButton>
                <ActionButton>
                  <Share2 size={16} />
                </ActionButton>
              </ImageActions>
            </MainImage>
            <ThumbnailGrid>
              {vehicle.images.map((image, index) => (
                <Thumbnail
                  key={index}
                  image={image}
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ThumbnailGrid>
            
            <DetailsSection style={{ marginTop: '2rem' }}>
              <SectionTitle>About This Vehicle</SectionTitle>
              <Description>{vehicle.description}</Description>
            </DetailsSection>

            <DetailsSection>
              <SectionTitle>Specifications</SectionTitle>
              <SpecsGrid>
                <SpecItem>
                  <SpecIcon><Fuel size={20} /></SpecIcon>
                  <SpecLabel>Engine</SpecLabel>
                  <SpecValue>{vehicle.specs.engine}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon><Fuel size={20} /></SpecIcon>
                  <SpecLabel>Power</SpecLabel>
                  <SpecValue>{vehicle.specs.power}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon><Fuel size={20} /></SpecIcon>
                  <SpecLabel>Transmission</SpecLabel>
                  <SpecValue>{vehicle.specs.transmission}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon><Users size={20} /></SpecIcon>
                  <SpecLabel>Seating</SpecLabel>
                  <SpecValue>{vehicle.specs.seating}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon><Fuel size={20} /></SpecIcon>
                  <SpecLabel>Fuel Type</SpecLabel>
                  <SpecValue>{vehicle.specs.fuelType}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecIcon><Fuel size={20} /></SpecIcon>
                  <SpecLabel>Drivetrain</SpecLabel>
                  <SpecValue>{vehicle.specs.drivetrain}</SpecValue>
                </SpecItem>
              </SpecsGrid>
            </DetailsSection>
          </ImageSection>

          <BookingSection>
            <VehicleTitle>{vehicle.title}</VehicleTitle>
            <VehicleRating>
              <RatingStars>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(vehicle.rating) ? "currentColor" : "none"}
                    color="#fbbf24"
                  />
                ))}
              </RatingStars>
              <RatingText>{vehicle.rating} ({vehicle.reviewCount} reviews)</RatingText>
            </VehicleRating>
            <VehicleLocation>
              <MapPin size={16} />
              Available in {vehicle.location}
            </VehicleLocation>

            <PricingOptions>
              <PricingTitle>Choose Rental Duration</PricingTitle>
              {pricingOptions.map(option => (
                <PriceOption
                  key={option.id}
                  selected={selectedPricing === option.id}
                  onClick={() => setSelectedPricing(option.id)}
                >
                  <div>
                    <PriceLabel>{option.label}</PriceLabel>
                    <div style={{ fontSize: '0.8rem', color: '#ccc' }}>{option.duration}</div>
                  </div>
                  <PriceAmount>{option.price}</PriceAmount>
                </PriceOption>
              ))}
            </PricingOptions>

            <BookingForm>
              <FormGroup>
                <FormLabel>Pick-up Date</FormLabel>
                <FormInput type="date" />
              </FormGroup>
              <FormGroup>
                <FormLabel>Return Date</FormLabel>
                <FormInput type="date" />
              </FormGroup>
              <FormGroup>
                <FormLabel>Pick-up Location</FormLabel>
                <FormInput type="text" placeholder="Enter address or location" />
              </FormGroup>
            </BookingForm>

                            <BookButton as={Link} to={`/rentals/${id}/book`}>Book Now</BookButton>

            <ContactInfo>
              <div style={{ marginBottom: '1rem', color: '#ccc', fontSize: '0.9rem' }}>
                Need help? Contact us
              </div>
              <div>
                <ContactButton>
                  <Phone size={14} />
                  Call
                </ContactButton>
                <ContactButton>
                  <Mail size={14} />
                  Email
                </ContactButton>
              </div>
            </ContactInfo>
          </BookingSection>
        </VehicleHeader>

        <VehicleDetails>
          <DetailsContent>
            <DetailsSection>
              <SectionTitle>Features & Amenities</SectionTitle>
              <FeaturesList>
                {vehicle.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <CheckCircle size={16} color="#22c55e" />
                    {feature}
                  </FeatureItem>
                ))}
              </FeaturesList>
            </DetailsSection>
          </DetailsContent>

          <PolicySection>
            <PolicyTitle>
              <Shield size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Rental Policies
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

export default RentalDetailsPage; 