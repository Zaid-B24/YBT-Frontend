import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import styled from "styled-components";
// Import your PageWrapper and any button styles
// import { PageWrapper } from "./styles/CommonStyles";
// import { PrimaryButton, SecondaryLink } from "./styles/ButtonStyles";

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
const FailureContainer = {
  textAlign: "center",
  padding: "40px 20px",
  maxWidth: "600px",
  margin: "40px auto",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const FailureTitle = {
  marginTop: "20px",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#dc3545",
};

const FailureText = {
  fontSize: "1.1rem",
  color: "#555",
  margin: "10px 0",
};

const OrderId = {
  marginTop: "10px",
  fontSize: "1rem",
  color: "#777",
};

const ButtonContainer = {
  marginTop: "30px",
  display: "flex",
  gap: "15px",
  justifyContent: "center",
};

// --- This is a placeholder for your Button component ---
const Button = ({ children, to, primary = false, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    style={{
      textDecoration: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      fontWeight: "600",
      background: primary ? "#007bff" : "#f0f0f0",
      color: primary ? "#fff" : "#333",
    }}
  >
    {children}
  </Link>
);
// --- End placeholder ---

const BookingFailurePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reason = searchParams.get("reason");
  const orderId = searchParams.get("order_id"); // This is the razorpay order_id

  let message = "Your order could not be completed.";
  if (reason === "modal_dismissed") {
    message = "You cancelled the payment.";
  } else if (reason === "verification_failed") {
    message =
      "Payment verification failed. If money was deducted, please contact support.";
  } else {
    message = "An unknown error occurred.";
  }

  const handleTryAgain = (e) => {
    e.preventDefault();
    // This is a simple way to send the user back one step.
    // A more robust solution would re-fetch the slug for the orderId.
    // For now, this is the most straightforward UX.
    navigate(-1);
  };

  return (
    <PageWrapper>
      <div style={FailureContainer}>
        <XCircle size={80} color="#dc3545" />
        <h1 style={FailureTitle}>Payment Failed</h1>
        <p style={FailureText}>{message}</p>
        {orderId && <p style={OrderId}>Order ID: {orderId}</p>}
        <p style={FailureText}>
          Your payment was not successful, and your tickets have not been
          booked.
        </p>

        <div style={ButtonContainer}>
          {/* The "to" is a fallback, onClick is better here */}
          <Button to="#" onClick={handleTryAgain} primary>
            Try Again
          </Button>
          <Button to="/events">Back to Events</Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default BookingFailurePage;
