import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CheckoutForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const FormSection = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #ccc;
  font-weight: 500;
`;

const FormInput = styled.input`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  
  &::placeholder {
    color: rgba(255,255,255,0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.4);
  }
`;

const FormSelect = styled.select`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  
  option {
    background: #333;
    color: #fff;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.4);
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255,255,255,0.3);
  }
  
  ${props => props.selected && `
    border-color: #fff;
    background: rgba(255,255,255,0.05);
  `}
`;

const PaymentRadio = styled.input`
  margin: 0;
`;

const PaymentLabel = styled.label`
  font-size: 0.9rem;
  cursor: pointer;
  flex: 1;
`;

const OrderSummary = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 120px;
`;

const SummaryTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const ItemDetails = styled.div`
  font-size: 0.8rem;
  color: #ccc;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  margin-left: 1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  
  ${props => props.total && `
    border-top: 1px solid rgba(255,255,255,0.1);
    font-weight: 600;
    font-size: 1.1rem;
    margin-top: 1rem;
    padding-top: 1rem;
  `}
`;

const PlaceOrderButton = styled.button`
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
  width: 100%;
  margin-top: 1.5rem;
  
  &:hover {
    background: #f0f0f0;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1rem 0;
`;

const Checkbox = styled.input`
  margin-top: 0.25rem;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #ccc;
  line-height: 1.5;
  cursor: pointer;
`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    // Billing Information
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    
    // Shipping Information
    sameAsBilling: true,
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZipCode: '',
    shippingCountry: 'India',
    
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Terms
    agreeTerms: false,
    subscribeNewsletter: false
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/orders', { 
        state: { 
          orderConfirmed: true, 
          orderNumber: 'YBT' + Date.now(),
          total: getCartTotal()
        }
      });
    }, 2000);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 10000000 ? 0 : 500000; // Free shipping over ₹1 crore
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <PageWrapper>
        <CheckoutContainer>
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2rem', marginBottom: '1rem' }}>
              Your cart is empty
            </h2>
            <p style={{ color: '#ccc', marginBottom: '2rem' }}>
              Add some items to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => navigate('/merchandise')}
              style={{
                background: '#fff',
                color: '#000',
                border: 'none',
                padding: '1rem 2rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}
            >
              Continue Shopping
            </button>
          </div>
        </CheckoutContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <CheckoutContainer>
        <CheckoutForm>
          <form onSubmit={handleSubmit}>
            {/* Billing Information */}
            <FormSection>
              <SectionTitle>Billing Information</SectionTitle>
              <FormGrid>
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
                <FormGroup>
                  <FormLabel>Email *</FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Phone *</FormLabel>
                  <FormInput
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <FormLabel>Address *</FormLabel>
                  <FormInput
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>City *</FormLabel>
                  <FormInput
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>State *</FormLabel>
                  <FormInput
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>ZIP Code *</FormLabel>
                  <FormInput
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Country *</FormLabel>
                  <FormSelect
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </FormSelect>
                </FormGroup>
              </FormGrid>
            </FormSection>

            {/* Shipping Information */}
            <FormSection>
              <SectionTitle>Shipping Information</SectionTitle>
              <CheckboxGroup>
                <Checkbox
                  type="checkbox"
                  id="sameAsBilling"
                  name="sameAsBilling"
                  checked={formData.sameAsBilling}
                  onChange={handleInputChange}
                />
                <CheckboxLabel htmlFor="sameAsBilling">
                  Same as billing address
                </CheckboxLabel>
              </CheckboxGroup>
              
              {!formData.sameAsBilling && (
                <FormGrid>
                  <FormGroup>
                    <FormLabel>First Name *</FormLabel>
                    <FormInput
                      type="text"
                      name="shippingFirstName"
                      value={formData.shippingFirstName}
                      onChange={handleInputChange}
                      required={!formData.sameAsBilling}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Last Name *</FormLabel>
                    <FormInput
                      type="text"
                      name="shippingLastName"
                      value={formData.shippingLastName}
                      onChange={handleInputChange}
                      required={!formData.sameAsBilling}
                    />
                  </FormGroup>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Address *</FormLabel>
                    <FormInput
                      type="text"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      required={!formData.sameAsBilling}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>City *</FormLabel>
                    <FormInput
                      type="text"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      required={!formData.sameAsBilling}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>State *</FormLabel>
                    <FormInput
                      type="text"
                      name="shippingState"
                      value={formData.shippingState}
                      onChange={handleInputChange}
                      required={!formData.sameAsBilling}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>ZIP Code *</FormLabel>
                    <FormInput
                      type="text"
                      name="shippingZipCode"
                      value={formData.shippingZipCode}
                      onChange={handleInputChange}
                      required={!formData.sameAsBilling}
                    />
                  </FormGroup>
                </FormGrid>
              )}
            </FormSection>

            {/* Payment Method */}
            <FormSection>
              <SectionTitle>Payment Method</SectionTitle>
              <PaymentMethods>
                <PaymentMethod 
                  selected={formData.paymentMethod === 'card'}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                >
                  <PaymentRadio
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <PaymentLabel>Credit/Debit Card</PaymentLabel>
                </PaymentMethod>
                
                <PaymentMethod 
                  selected={formData.paymentMethod === 'upi'}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                >
                  <PaymentRadio
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                  />
                  <PaymentLabel>UPI Payment</PaymentLabel>
                </PaymentMethod>
                
                <PaymentMethod 
                  selected={formData.paymentMethod === 'netbanking'}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'netbanking' }))}
                >
                  <PaymentRadio
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={formData.paymentMethod === 'netbanking'}
                    onChange={handleInputChange}
                  />
                  <PaymentLabel>Net Banking</PaymentLabel>
                </PaymentMethod>
              </PaymentMethods>

              {formData.paymentMethod === 'card' && (
                <FormGrid style={{ marginTop: '1.5rem' }}>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Card Number *</FormLabel>
                    <FormInput
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Expiry Date *</FormLabel>
                    <FormInput
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>CVV *</FormLabel>
                    <FormInput
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </FormGroup>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Cardholder Name *</FormLabel>
                    <FormInput
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormGrid>
              )}
            </FormSection>

            {/* Terms and Conditions */}
            <FormSection>
              <CheckboxGroup>
                <Checkbox
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                />
                <CheckboxLabel htmlFor="agreeTerms">
                  I agree to the <a href="/terms" style={{ color: '#fff', textDecoration: 'underline' }}>Terms and Conditions</a> and <a href="/privacy" style={{ color: '#fff', textDecoration: 'underline' }}>Privacy Policy</a> *
                </CheckboxLabel>
              </CheckboxGroup>
              
              <CheckboxGroup>
                <Checkbox
                  type="checkbox"
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                />
                <CheckboxLabel htmlFor="subscribeNewsletter">
                  Subscribe to our newsletter for exclusive offers and updates
                </CheckboxLabel>
              </CheckboxGroup>
            </FormSection>
          </form>
        </CheckoutForm>

        {/* Order Summary */}
        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          {cartItems.map((item) => (
            <OrderItem key={`${item.id}-${item.size || 'default'}`}>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemDetails>
                  {item.size && `Size: ${item.size} • `}
                  Qty: {item.quantity}
                </ItemDetails>
              </ItemInfo>
              <ItemPrice>₹{(item.price * item.quantity).toLocaleString()}</ItemPrice>
            </OrderItem>
          ))}
          
          <SummaryRow>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </SummaryRow>
          
          <SummaryRow>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</span>
          </SummaryRow>
          
          <SummaryRow>
            <span>Tax (GST 18%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </SummaryRow>
          
          <SummaryRow total>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </SummaryRow>
          
          <PlaceOrderButton 
            onClick={handleSubmit}
            disabled={isProcessing || !formData.agreeTerms}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </PlaceOrderButton>
        </OrderSummary>
      </CheckoutContainer>
    </PageWrapper>
  );
};

export default CheckoutPage; 