import React from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import styled from "styled-components";
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

const SuccessContainer = {
  textAlign: "center",
  padding: "40px 20px",
  maxWidth: "600px",
  margin: "40px auto",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const SuccessTitle = {
  marginTop: "20px",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#28a745",
};

const SuccessText = {
  fontSize: "1.1rem",
  color: "#555",
  margin: "10px 0",
};

const BookingId = {
  marginTop: "10px",
  fontSize: "1rem",
  color: "#333",
  background: "#f4f4f4",
  padding: "8px 12px",
  borderRadius: "4px",
  display: "inline-block",
};

const ButtonContainer = {
  marginTop: "30px",
  display: "flex",
  gap: "15px",
  justifyContent: "center",
};

// --- This is a placeholder for your Button component ---
const Button = ({ children, to, primary = false }) => (
  <Link
    to={to}
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

const BookingSuccessPage = () => {
  const { bookingId } = useParams();

  return (
    <PageWrapper>
    <div style={SuccessContainer}>
      <CheckCircle size={80} color="#28a745" />
      <h1 style={SuccessTitle}>Booking Confirmed!</h1>
      <p style={SuccessText}>Your tickets are booked and confirmed.</p>
      <p style={SuccessText}>A confirmation email has been sent to you.</p>

      <div style={BookingId}>
        Your Booking ID is: <strong>{bookingId}</strong>
      </div>

      <div style={ButtonContainer}>
        <Button to="/my-bookings" primary>
          View My Bookings
        </Button>
        <Button to="/events">Browse More Events</Button>
      </div>
    </div>
    </PageWrapper>
  );
};

export default BookingSuccessPage;