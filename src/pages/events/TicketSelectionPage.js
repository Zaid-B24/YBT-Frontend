import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// --- Styled Components ---

const PageWrapper = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.25rem;
  color: #fff;
  font-family: "Inter", sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  cursor: pointer;

  h1 {
    font-family: "Playfair Display", serif;
    font-size: 1.5rem;
    margin: 0;
  }
`;

const ContentCard = styled.div`
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
`;

const TicketRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  margin-bottom: 0.7rem;
  transition: all 0.18s ease;
  background: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    transform: translateY(-2px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
const TicketInfo = styled.div`
}
p {
margin: 0;
font-size: 0.95rem;
color: #cfcfcf;
}
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  button {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.18s ease;
  }

  button:hover:not(:disabled) {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.12);
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  span {
    font-size: 1.15rem;
    font-weight: 700;
    min-width: 28px;
    text-align: center;
    color: #fff;
  }
`;

const SummaryFooter = styled.div`
  position: sticky;
  bottom: 12px;
  margin-top: 1.25rem;
  padding: 12px;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0.65),
    rgba(10, 10, 10, 0.6)
  );
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  z-index: 50;
`;

const TotalAmount = styled.div`
  font-size: 1.15rem;
  font-weight: 800;
`;

const ProceedButton = styled.button`
  background: linear-gradient(90deg, #ff6b3d, #ff3a6b);
  color: #fff;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease;
  min-width: 120px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(255, 80, 80, 0.14);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(0.2);
  }
`;

const SmallNote = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #bdbdbd;
`;

const Toast = styled.div`
  position: fixed;
  right: 16px;
  bottom: 84px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  z-index: 9999;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.55);
`;

// --- The Main Component ---

const fetchEventForBooking = async (slug) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/${slug}`
  );
  if (!response.ok) throw new Error("Could not fetch event details.");
  const responseData = await response.json();
  return responseData.data;
};

const TicketSelectionPage = () => {
  const [selectedTickets, setSelectedTickets] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookingEvent", slug],
    queryFn: () => fetchEventForBooking(slug),
    enabled: !!slug, // Only run query if slug exists
  });

  // Guard clause if user lands here directly without event data

  const handleTicketChange = (ticket, change) => {
    const currentQty = selectedTickets[ticket.id]?.quantity || 0;
    const newQty = currentQty + change;

    // Ensure quantity is within valid bounds (0 to max available)
    if (newQty >= 0 && newQty <= ticket.quantity) {
      setSelectedTickets((prev) => ({
        ...prev,
        [ticket.id]: {
          ...ticket, // Store full ticket info
          quantity: newQty,
        },
      }));
    }
  };

  const totalAmount = Object.values(selectedTickets).reduce((acc, ticket) => {
    return acc + ticket.quantity * ticket.price;
  }, 0);

  const totalTicketsSelected = Object.values(selectedTickets).reduce(
    (sum, ticket) => sum + ticket.quantity,
    0
  );

  const handleProceed = () => {
    navigate(`/book/${event.slug}/summary`, {
      state: { event, selectedTickets },
    });
    console.log("Selected Tickets:", selectedTickets);
    console.log("Total Amount:", totalAmount);
    // navigate('/book/summary', { state: { event, selectedTickets } });
  };

  if (isLoading) {
    return <PageWrapper>Loading fresh ticket details...</PageWrapper>;
  }

  // Handle errors
  if (isError) {
    return <PageWrapper>Could not load event. Please try again.</PageWrapper>;
  }

  if (!event) {
    return (
      <PageWrapper>
        <h2>Event not found.</h2>
        <p>Please go back to the event page and try again.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header onClick={() => navigate(`/events/${event.slug}`)}>
        <ChevronLeft />
        <h1>{event.title}</h1>
      </Header>

      <ContentCard>
        <h2 style={{ fontFamily: '"Playfair Display", serif' }}>
          Select Tickets
        </h2>
        {event.ticketTypes.map((ticket) => {
          const quantity = selectedTickets[ticket.id]?.quantity || 0;
          return (
            <TicketRow key={ticket.id}>
              <TicketInfo>
                <h3>{ticket.name}</h3>
                <p>₹{ticket.price.toLocaleString()}</p>
              </TicketInfo>
              <QuantitySelector>
                <button
                  onClick={() => handleTicketChange(ticket, -1)}
                  disabled={quantity === 0}
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleTicketChange(ticket, 1)}
                  disabled={quantity >= ticket.quantity}
                >
                  <Plus size={16} />
                </button>
              </QuantitySelector>
            </TicketRow>
          );
        })}
      </ContentCard>

      <SummaryFooter>
        <TotalAmount>Total: ₹{totalAmount.toLocaleString()}</TotalAmount>
        <ProceedButton
          onClick={handleProceed}
          disabled={totalTicketsSelected === 0}
        >
          Continue
        </ProceedButton>
      </SummaryFooter>
    </PageWrapper>
  );
};

export default TicketSelectionPage;
