import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, Ticket } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// --- Styled Components (Matching your YBT Theme) ---

const PageWrapper = styled.div`
  max-width: 1000px; /* Wider to accommodate two columns */
  margin: 2rem auto;
  padding: 2rem;
  color: #fff;
  font-family: "Inter", sans-serif;
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

const MainContent = styled.div`
  flex: 2;
`;

const SidePanel = styled.div`
  flex: 1;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: fit-content; /* Ensure it doesn't take full height if content is short */

  @media (max-width: 768px) {
    order: -1; /* Move side panel above main content on small screens */
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;

  h1 {
    font-family: "Playfair Display", serif;
    font-size: 1.8rem;
    margin: 0;
  }
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const InfoCard = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TicketTypeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  font-size: 0.95rem;

  &:not(:last-child) {
    border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  }

  span:first-child {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const CalculationRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.95rem;

  span:first-child {
    color: rgba(255, 255, 255, 0.7);
  }

  &.total {
    font-size: 1.1rem;
    font-weight: bold;
    color: #fff;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 1rem;
    padding-top: 1rem;
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  -webkit-appearance: none; /* Remove default arrow on Webkit */
  -moz-appearance: none; /* Remove default arrow on Firefox */
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23ffffff' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 16px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff; /* Example focus color */
  }

  option {
    background-color: #1a1a1a;
    color: #fff;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);

  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    background-color: transparent;
    display: grid;
    place-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &::before {
      content: "";
      width: 12px;
      height: 12px;
      transform: scale(0);
      transition: transform 0.2s ease;
      box-shadow: inset 1em 1em #fff; /* Use white for checked state */
      border-radius: 2px;
    }

    &:checked {
      border-color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:checked::before {
      transform: scale(1);
    }
  }
`;

const ProceedToPayButton = styled.button`
  background: #fff;
  color: #111;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 2rem;

  &:hover:not(:disabled) {
    background: #e6e6e6;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// --- Utility Functions (if not already defined globally) ---

const BookingSummaryPage = () => {
  const location = useLocation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { event, selectedTickets } = location.state || {};

  // --- 1. ADD STATE MANAGEMENT ---
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      !event ||
      !selectedTickets ||
      Object.keys(selectedTickets).length === 0
    ) {
      console.log("Redirecting from summary page due to missing data...");
      navigate(`/events`);
    }
  }, [event, selectedTickets, navigate]);

  const orderSummary = useMemo(() => {
    if (!selectedTickets || Object.keys(selectedTickets).length === 0) {
      return { lineItems: [], totalAmount: 0 };
    }
    const lineItems = Object.values(selectedTickets).map((ticket) => ({
      ...ticket,
      subtotal: ticket.price * ticket.quantity,
    }));
    const totalAmount = lineItems.reduce((acc, item) => acc + item.subtotal, 0);
    return { lineItems, totalAmount };
  }, [selectedTickets]);

  if (!event || !selectedTickets || Object.keys(selectedTickets).length === 0) {
    return <div>Loading summary...</div>;
  }

  const handleProceedToPay = async () => {
    setIsProcessing(true);
    setError(null);

    // Prepare the 'items' array for your backend
    const items = Object.values(selectedTickets)
      .filter((ticket) => ticket.quantity > 0)
      .map((ticket) => ({
        ticketTypeId: ticket.id, // Use ticket.id instead of ticket.ticketTypeId
        quantity: ticket.quantity,
      }));

    const idempotencyKey = uuidv4();

    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        console.error(" token not found. Please log in.");
        return;
      }

      console.log("Data being sent to backend:", { eventId: event.id, items });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/ticketbooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify({ eventId: event.id, items }),
        }
      );

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }

      const { razorpayOrder } = result.data;

      // b. Configure and open the Razorpay Checkout modal
      const options = {
        key: "rzp_test_RPPDvF6yabnIXE", // ⚠️ Replace with your public Razorpay Test Key
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Young Boy Toyz",
        description: `Booking for ${event.title}`,
        order_id: razorpayOrder.id,
        handler: function (response) {
          console.log(response);
          // On success, redirect to a confirmation page
          navigate("/events");
        },
        prefill: {
          name: "Test User",
          email: "test.user@example.com",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!event) return null;
  return (
    <PageWrapper>
      <MainContent>
        <Header onClick={() => navigate(`/book/${event.slug}`)}>
          <ChevronLeft />
          <h1>Ticket Options</h1> {/* Matching image title */}
        </Header>

        <SectionTitle>{event.title}</SectionTitle>
        {/* <InfoCard>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            <Ticket
              size={16}
              style={{ verticalAlign: "middle", marginRight: "0.5rem" }}
            />
            Save the planet. Use your phone as a ticket.
          </p>
          <ul
            style={{
              fontSize: "0.9rem",
              opacity: 0.7,
              lineHeight: "1.5rem",
              paddingLeft: "1.5rem",
            }}
          >
            <li>
              Customer(s) can access their ticket(s) from the 'My Profile'
              section on the app/mobile-web.
            </li>
            <li>
              It is mandatory to present the ticket(s) in my profile section via
              app/mobile-web at the venue.
            </li>
            <li>No physical ticket(s) are required to enter the venue.</li>
          </ul>
        </InfoCard> */}
      </MainContent>

      <SidePanel>
        <SectionTitle style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          {event.title}
        </SectionTitle>
        {orderSummary.lineItems.map((item) => (
          // Add the key prop here
          <TicketTypeDisplay key={item.ticketTypeId}>
            <span>
              {item.name} ({item.quantity})
            </span>
            <span>₹{item.subtotal.toLocaleString()}</span>
          </TicketTypeDisplay>
        ))}

        <CalculationRow>
          <span>Sub-Total</span>
          <span>₹{orderSummary.totalAmount.toLocaleString()}</span>
        </CalculationRow>

        {/* You can add a real booking fee later */}
        <CalculationRow>
          <span>Booking Fee</span>
          <span>₹123.63</span>
        </CalculationRow>

        <CalculationRow className="total">
          <span>Total Amount</span>
          <span>₹{(orderSummary.totalAmount + 123.63).toLocaleString()}</span>
        </CalculationRow>

        <div style={{ marginTop: "1.5rem" }}>
          <SelectField>
            <option>Select State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            {/* Add more states as needed */}
          </SelectField>
        </div>

        <CheckboxContainer>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
          />
          By proceeding, I express my consent to complete this transaction.
        </CheckboxContainer>

        {error && (
          <p style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
            Error: {error}
          </p>
        )}

        <ProceedToPayButton
          disabled={!agreedToTerms || isProcessing}
          onClick={handleProceedToPay}
        >
          {isProcessing ? "Processing..." : "Proceed to Pay"}
        </ProceedToPayButton>
      </SidePanel>
    </PageWrapper>
  );
};

export default BookingSummaryPage;
