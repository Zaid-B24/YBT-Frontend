import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BookingFormValidationSchema } from "../../utils/zodValidation";
import { useState } from "react";

// Updated payment options with icons
const paymentOptions = [
  {
    id: "card",
    name: "VISA/Master",
    icon: "💳",
  },
  {
    id: "upi",
    name: "UPI",
    icon: "📱",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: "🏦",
  },
];

const VehicleBookingForm = ({ onSubmit, onClose, carDetails }) => {
  const [selectedPayment, setSelectedPayment] = useState("card");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BookingFormValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    mode: "onBlur",
  });

  const onFormSubmit = async (data) => {
    const formData = { ...data, paymentMethod: selectedPayment };
    await onSubmit(formData);
    onClose();
  };

  return (
    <FormContainer>
      <BookingForm onSubmit={handleSubmit(onFormSubmit)}>
        <InputGrid>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormInput
              {...register("name")}
              placeholder="Enter your full name"
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>Phone Number *</FormLabel>
            <FormInput
              type="text"
              {...register("phone")}
              placeholder="+91 98765 43210"
            />
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>Address</FormLabel>
            <FormInput
              type="text"
              {...register("address")}
              placeholder="Enter your address"
            />
            {errors.address && (
              <ErrorMessage>{errors.address.message}</ErrorMessage>
            )}
          </FormGroup>
        </InputGrid>

        <PaymentAndButtonContainer>
          <PaymentMethodsContainer>
            <PaymentMethodsLabel>Choose Payment Method</PaymentMethodsLabel>
            <PaymentMethods>
              {paymentOptions.map((option) => (
                <PaymentOption
                  key={option.id}
                  active={selectedPayment === option.id}
                  onClick={() => setSelectedPayment(option.id)}
                >
                  <PaymentIcon active={selectedPayment === option.id}>
                    {option.icon}
                  </PaymentIcon>
                  <PaymentName active={selectedPayment === option.id}>
                    {option.name}
                  </PaymentName>
                </PaymentOption>
              ))}
            </PaymentMethods>
          </PaymentMethodsContainer>
          <SubmitButton type="submit">
            <span>Book Now</span>
          </SubmitButton>
        </PaymentAndButtonContainer>
      </BookingForm>
    </FormContainer>
  );
};

export default VehicleBookingForm;

// Styled Components (add these to your existing styles)
const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const FormLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.025em;
  margin-bottom: 0.25rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.125rem;
    left: 0;
    width: 0;
    height: 1px;
    /* Red Gradient */
    background: linear-gradient(90deg, #e53935, #ff0000);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const FormInput = styled.input`
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  color: #fff;
  font-family: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-weight: 400;
  }

  &:focus {
    outline: none;
    /* Red focus border and shadow */
    border-color: rgba(229, 57, 53, 0.6);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 0 3px rgba(229, 57, 53, 0.15), 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.08) inset !important;
    -webkit-text-fill-color: #fff !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: #fca5a5;
  font-weight: 500;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  animation: slideInError 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "⚠";
    font-size: 0.75rem;
    color: #ef4444;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }

  @keyframes slideInError {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 0.9;
      transform: translateY(0);
    }
  }
`;

const FormContainer = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    /* Red Gradient */
    background: linear-gradient(
      90deg,
      transparent,
      rgba(229, 57, 53, 0.6),
      rgba(255, 0, 0, 0.6),
      transparent
    );
    border-radius: 1px;
  }
`;

const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const PaymentMethodsLabel = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  letter-spacing: 0.025em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PaymentOption = styled.div`
  height: 70px;
  width: 95px;
  background: ${({ active }) =>
    active
      ? "linear-gradient(135deg, rgba(229, 57, 53, 0.2), rgba(255, 0, 0, 0.2))"
      : "rgba(255, 255, 255, 0.05)"};
  border: 2px solid
    ${({ active }) =>
      active ? "rgba(229, 57, 53, 0.8)" : "rgba(255, 255, 255, 0.12)"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  &:hover {
    /* Red hover border */
    border-color: rgba(229, 57, 53, 0.6);
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
    /* Red box shadow */
    box-shadow: 0 8px 16px rgba(229, 57, 53, 0.2);
  }
`;

const PaymentIcon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  transition: all 0.3s ease;
  /* Keep icons full color when hovered or active */
  filter: ${({ active }) => (active ? "none" : "grayscale(100%)")};

  ${PaymentOption}:hover & {
    opacity: 1;
    filter: none;
  }
`;

const PaymentName = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ active }) =>
    active ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.6)"};
  text-align: center;
  line-height: 1.2;
  transition: color 0.3s ease;

  ${PaymentOption}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const PaymentAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin-top: 1rem;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const SubmitButton = styled.button`
  /* Red gradient */
  background: linear-gradient(135deg, #e53935 0%, #ff0000 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 1.25rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: none;
  letter-spacing: 0.025em;
  position: relative;
  overflow: hidden;
  min-width: 160px;
  /* Red shadow */
  box-shadow: 0 8px 20px rgba(229, 57, 53, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2);

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
    /* Darker red hover gradient */
    background: linear-gradient(135deg, #ff0000 0%, #e53935 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-2px);
    /* Darker red shadow on hover */
    box-shadow: 0 12px 30px rgba(229, 57, 53, 0.4),
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
    width: 100%;
    font-size: 1rem;
    padding: 1rem 1.5rem;
  }
`;
