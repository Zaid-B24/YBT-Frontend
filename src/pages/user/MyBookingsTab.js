import React from "react";
import styled, { keyframes } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Loader2, AlertCircle, Ticket } from "lucide-react";

const TabContent = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem; /* Default for desktop */

  /* On screens 768px or less, reduce padding */
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const CenteredContainer = styled.div`
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: #ccc;

  svg:first-child {
    margin-bottom: 1rem;
  }
`;

const LoaderIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

const ErrorBox = styled(CenteredContainer)`
  background-color: rgba(220, 53, 69, 0.1);
  border: 1px solid #dc3545;
  border-radius: 8px;
  color: #dc3545;
`;

const BrowseButton = styled(Link)`
  margin-top: 20px;
  padding: 10px 20px;
  background: #fff;
  color: #000;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const BookingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
`;

const CardDate = styled.div`
  font-size: 0.9rem;
  color: #ccc;
  margin: 0 0 1rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Allows dates to stack on very small cards */
  gap: 0.5rem; /* Adds space if they wrap */

  span > strong {
    color: #fff;
    opacity: 0.7;
  }
`;

const TicketList = styled.ul`
  font-size: 0.9rem;
  padding-left: 1.2rem;
  margin: 0 0 1rem 0;
  color: #ddd;

  li {
    margin-bottom: 0.25rem;
  }
`;

const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

const CardPrice = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

const DetailsButton = styled(Link)`
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

// --- 1. Data Fetching Function ---
const fetchMyBookings = async () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    throw new Error("You must be logged in to view your bookings.");
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/ticketbooking/bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response, " THis is the orders response");

  if (!response.ok) {
    throw new Error("Failed to fetch bookings.");
  }

  const result = await response.json();

  return result.data.data;
};

// --- 2. The Component ---
const MyBookingsTab = () => {
  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myBookings"],
    queryFn: fetchMyBookings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // --- 3. Loading State ---
  if (isLoading) {
    return (
      <TabContent>
        <CenteredContainer>
          <LoaderIcon size={32} />
          <p>Loading your orders...</p>
        </CenteredContainer>
      </TabContent>
    );
  }

  // --- 4. Error State ---
  if (isError) {
    return (
      <TabContent>
        <ErrorBox>
          <AlertCircle size={32} />
          <p style={{ margin: "10px 0 0 0" }}>Error: {error.message}</p>
        </ErrorBox>
      </TabContent>
    );
  }

  // --- 5. Empty State ---
  if (!bookings || bookings.length === 0) {
    return (
      <TabContent>
        <CenteredContainer>
          <Ticket size={32} />
          <h3 style={{ marginTop: "15px" }}>No Bookings Yet</h3>
          <p>You haven't booked any events. Time to explore!</p>
          <BrowseButton to="/events">Browse Events</BrowseButton>
        </CenteredContainer>
      </TabContent>
    );
  }

  // --- 6. Success State (Render Bookings) ---
  return (
    <TabContent>
      <BookingsGrid>
        {bookings.map((booking) => (
          <BookingCard key={booking.bookingId} booking={booking} />
        ))}
      </BookingsGrid>
    </TabContent>
  );
};

// --- 7. Booking Card Sub-Component ---
const BookingCard = ({ booking }) => {
  const eventDate = new Date(booking.eventStartDate).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
    }
  );

  const bookedOnDate = new Date(booking.bookedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card>
      <CardImage src={booking.eventPrimaryImage} alt={booking.eventTitle} />
      <CardContent>
        <CardTitle>{booking.eventTitle}</CardTitle>
        <CardDate>
          <span>
            <strong>Event:</strong> {eventDate}
          </span>
          <span>
            <strong>Booked:</strong> {bookedOnDate}
          </span>
        </CardDate>
        <TicketList>
          {booking.tickets.map((ticket, index) => (
            <li key={index}>
              {ticket.quantity} x {ticket.name}
            </li>
          ))}
        </TicketList>
        <CardFooter>
          <CardPrice>Total: ₹{booking.totalAmount.toLocaleString()}</CardPrice>
          <DetailsButton to={`/events/${booking.eventSlug}`}>
            View Event
          </DetailsButton>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default MyBookingsTab;
