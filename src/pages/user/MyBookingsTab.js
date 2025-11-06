import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Loader2, AlertCircle, Ticket } from "lucide-react";

// --- Import your existing TabContent component ---
// We're re-using it to keep the style consistent
const TabContent = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
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

  if (!response.ok) {
    throw new Error("Failed to fetch bookings.");
  }

  const result = await response.json();
  // Your API returns { success: true, data: { data: [...] } }
  // So we drill down to result.data.data
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
        <div style={styles.centered}>
          <Loader2 size={32} style={styles.loader} />
          <p>Loading your bookings...</p>
        </div>
      </TabContent>
    );
  }

  // --- 4. Error State ---
  if (isError) {
    return (
      <TabContent>
        <div style={{ ...styles.centered, ...styles.errorBox }}>
          <AlertCircle size={32} color="#dc3545" />
          <p style={{ margin: "10px 0 0 0", color: "#dc3545" }}>
            Error: {error.message}
          </p>
        </div>
      </TabContent>
    );
  }

  // --- 5. Empty State ---
  if (!bookings || bookings.length === 0) {
    return (
      <TabContent>
        <div style={styles.centered}>
          <Ticket size={32} />
          <h3 style={{ marginTop: "15px" }}>No Bookings Yet</h3>
          <p>You haven't booked any events. Time to explore!</p>
          <Link to="/events" style={styles.browseButton}>
            Browse Events
          </Link>
        </div>
      </TabContent>
    );
  }

  // --- 6. Success State (Render Bookings) ---
  return (
    <TabContent>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "#fff" }}>
        My Bookings
      </h2>
      <div style={styles.grid}>
        {bookings.map((booking) => (
          <BookingCard key={booking.bookingId} booking={booking} />
        ))}
      </div>
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

  return (
    <div style={styles.card}>
      <img
        src={booking.eventPrimaryImage}
        alt={booking.eventTitle}
        style={styles.cardImage}
      />
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{booking.eventTitle}</h3>
        <p style={styles.cardDate}>{eventDate}</p>
        <ul style={styles.ticketList}>
          {booking.tickets.map((ticket, index) => (
            <li key={index}>
              {ticket.quantity} x {ticket.name}
            </li>
          ))}
        </ul>
        <div style={styles.cardFooter}>
          <span style={styles.cardPrice}>
            Total: ₹{booking.totalAmount.toLocaleString()}
          </span>
          <Link
            to={`/events/${booking.eventSlug}`}
            style={styles.detailsButton}
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Placeholder Styles ---
// Using objects because we're outside the styled-components scope
// for most of this file.
const styles = {
  centered: {
    padding: "40px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
    color: "#ccc",
  },
  loader: {
    animation: "spin 1s linear infinite",
  },
  errorBox: {
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    border: "1px solid #dc3545",
    borderRadius: "8px",
  },
  browseButton: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#fff",
    color: "#000",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    color: "#fff",
  },
  cardImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "1rem",
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "0 0 0.5rem 0",
  },
  cardDate: {
    fontSize: "0.9rem",
    color: "#ccc",
    margin: "0 0 1rem 0",
  },
  ticketList: {
    fontSize: "0.9rem",
    paddingLeft: "1.2rem",
    margin: "0 0 1rem 0",
  },
  cardFooter: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "1rem",
  },
  cardPrice: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  detailsButton: {
    padding: "6px 12px",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    fontSize: "0.9rem",
  },
};

// Add keyframes for the loader
const keyframes = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
if (!document.getElementById("spin-keyframes-profile")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "spin-keyframes-profile";
  styleSheet.type = "text/css";
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);
}

export default MyBookingsTab;
