import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// --- Styled Components ---

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  color: #fff;
  font-family: "Inter", sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  cursor: pointer;

  h1 {
    font-family: "Playfair Display", serif;
    font-size: 1.8rem;
    margin: 0;
  }
`;

const ContentCard = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem 2rem 2rem 2rem;
`;

const TicketRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const TicketInfo = styled.div`
  h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
  p {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.2);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 1.2rem;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
  }
`;

const SummaryFooter = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalAmount = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ProceedButton = styled.button`
  background: #fff;
  color: #111;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #e6e6e6;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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
