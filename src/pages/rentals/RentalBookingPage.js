import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Calendar, MapPin, User, Phone, Mail, CreditCard } from 'lucide-react';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
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

const BookingHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const BookingTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const BookingSubtitle = styled.p`
  color: #ccc;
  font-size: 1.1rem;
`;

const BookingContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BookingForm = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr'};
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: rgba(34, 197, 94, 0.5);
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: rgba(34, 197, 94, 0.5);
  }

  option {
    background: #333;
    color: #fff;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: rgba(34, 197, 94, 0.5);
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const BookingSummary = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 120px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const VehicleInfo = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const VehicleImage = styled.div`
  height: 150px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const VehicleName = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const VehicleDetails = styled.div`
  color: #ccc;
  font-size: 0.9rem;
`;

const BookingDetails = styled.div`
  margin-bottom: 2rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
`;

const DetailLabel = styled.span`
  color: #ccc;
`;

const DetailValue = styled.span`
  color: #fff;
  font-weight: 500;
`;

const PricingBreakdown = styled.div`
  margin-bottom: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
`;

const ConfirmButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecurityNote = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 5px;
  font-size: 0.8rem;
  color: #ccc;
  text-align: center;
`;

const RentalBookingPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    licenseNumber: '',
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    additionalDriver: false,
    specialRequests: ''
  });

  // Mock vehicle data
  const vehicle = {
    id: 1,
    title: "BMW M3 Competition",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    dailyPrice: 15000,
    location: "Mumbai"
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      const diffTime = Math.abs(returnDate - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const days = calculateDays();
  const basePrice = vehicle.dailyPrice * days;
  const additionalDriverFee = formData.additionalDriver ? 500 * days : 0;
  const insurance = Math.round(basePrice * 0.1);
  const taxes = Math.round((basePrice + additionalDriverFee + insurance) * 0.18);
  const totalPrice = basePrice + additionalDriverFee + insurance + taxes;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  return (
    <PageWrapper>
      <Container>
        <BackButton to={`/rentals/${id}`}>
          <ArrowLeft size={16} />
          Back to Vehicle Details
        </BackButton>

        <BookingHeader>
          <BookingTitle>Complete Your Booking</BookingTitle>
          <BookingSubtitle>Fill in the details below to confirm your rental</BookingSubtitle>
        </BookingHeader>

        <BookingContent>
          <BookingForm>
            <form onSubmit={handleSubmit}>
              <FormSection>
                <SectionTitle>
                  <User size={20} />
                  Personal Information
                </SectionTitle>
                <FormRow columns="1fr 1fr">
                  <FormGroup>
                    <FormLabel>First Name *</FormLabel>
                    <FormInput
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Last Name *</FormLabel>
                    <FormInput
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                <FormRow columns="1fr 1fr">
                  <FormGroup>
                    <FormLabel>Email Address *</FormLabel>
                    <FormInput
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormInput
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                <FormRow columns="1fr 1fr">
                  <FormGroup>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormInput
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Driving License Number *</FormLabel>
                    <FormInput
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="Enter license number"
                      required
                    />
                  </FormGroup>
                </FormRow>
              </FormSection>

              <FormSection>
                <SectionTitle>
                  <Calendar size={20} />
                  Rental Details
                </SectionTitle>
                <FormRow columns="1fr 1fr">
                  <FormGroup>
                    <FormLabel>Pick-up Date *</FormLabel>
                    <FormInput
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Return Date *</FormLabel>
                    <FormInput
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <FormLabel>Pick-up Location *</FormLabel>
                  <FormSelect
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select pickup location</option>
                    <option value="mumbai-airport">Mumbai Airport</option>
                    <option value="mumbai-downtown">Mumbai Downtown</option>
                    <option value="mumbai-hotel">Hotel Delivery</option>
                    <option value="custom">Custom Location</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>
                    <input
                      type="checkbox"
                      name="additionalDriver"
                      checked={formData.additionalDriver}
                      onChange={handleInputChange}
                      style={{ marginRight: '0.5rem' }}
                    />
                    Add Additional Driver (+₹500/day)
                  </FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Special Requests</FormLabel>
                  <FormTextarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or requests..."
                  />
                </FormGroup>
              </FormSection>
            </form>
          </BookingForm>

          <BookingSummary>
            <SummaryTitle>Booking Summary</SummaryTitle>
            
            <VehicleInfo>
              <VehicleImage image={vehicle.image} />
              <VehicleName>{vehicle.title}</VehicleName>
              <VehicleDetails>Available in {vehicle.location}</VehicleDetails>
            </VehicleInfo>

            <BookingDetails>
              <DetailRow>
                <DetailLabel>Pick-up Date:</DetailLabel>
                <DetailValue>{formData.pickupDate || 'Not selected'}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Return Date:</DetailLabel>
                <DetailValue>{formData.returnDate || 'Not selected'}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Duration:</DetailLabel>
                <DetailValue>{days} day{days !== 1 ? 's' : ''}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Pick-up Location:</DetailLabel>
                <DetailValue>{formData.pickupLocation || 'Not selected'}</DetailValue>
              </DetailRow>
            </BookingDetails>

            <PricingBreakdown>
              <PriceRow>
                <DetailLabel>Base Rate ({days} day{days !== 1 ? 's' : ''}):</DetailLabel>
                <DetailValue>₹{basePrice.toLocaleString()}</DetailValue>
              </PriceRow>
              {formData.additionalDriver && (
                <PriceRow>
                  <DetailLabel>Additional Driver:</DetailLabel>
                  <DetailValue>₹{additionalDriverFee.toLocaleString()}</DetailValue>
                </PriceRow>
              )}
              <PriceRow>
                <DetailLabel>Insurance:</DetailLabel>
                <DetailValue>₹{insurance.toLocaleString()}</DetailValue>
              </PriceRow>
              <PriceRow>
                <DetailLabel>Taxes (18%):</DetailLabel>
                <DetailValue>₹{taxes.toLocaleString()}</DetailValue>
              </PriceRow>
              <TotalRow>
                <span>Total Amount:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </TotalRow>
            </PricingBreakdown>

            <ConfirmButton onClick={handleSubmit}>
              <CheckCircle size={20} style={{ marginRight: '0.5rem', display: 'inline' }} />
              Confirm Booking
            </ConfirmButton>

            <SecurityNote>
              <CheckCircle size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
              Your booking is secured with 256-bit SSL encryption
            </SecurityNote>
          </BookingSummary>
        </BookingContent>
      </Container>
    </PageWrapper>
  );
};

export default RentalBookingPage; 