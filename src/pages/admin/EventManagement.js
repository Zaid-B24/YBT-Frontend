import {
  Calendar,
  Edit,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import CreateEventForm from "../../components/forms/CreateEventForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Slide, toast, ToastContainer } from "react-toastify";
import EditEventModal from "../../components/Overlay/EditEventModal";
import CreateCategoryForm from "../../components/forms/CreateCategoryForm";

const fetchEvents = async ({ queryKey }) => {
  const token = localStorage.getItem("adminToken");
  console.log("Admin token, ", token);
  const [_key, { limit, sortBy, cursor }] = queryKey;
  const params = new URLSearchParams({ limit, sortBy });
  if (cursor) params.append("cursor", cursor);
  if (!token) throw new Error("No admin token found.");
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/admin?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log("THis is the response", response);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const responseData = await response.json();
  return responseData.data;
};

const updateEventStatusAPI = async ({ eventId, status }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/${eventId}/update-status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update event status.");
  }

  return response.json();
};

const deleteEventAPI = async (eventId) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/${eventId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete event.");
  }
  return { success: true };
};

const EventManagement = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState(null);

  const queryFilters = useMemo(
    () => ({
      limit: 9,
      sortBy,
    }),
    [sortBy]
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", queryFilters],
    queryFn: fetchEvents,
    keepPreviousData: true,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateEventStatusAPI,
    onSuccess: () => {
      toast.success("Event status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setEditingEvent(null); // Close the modal
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateEvent = ({ eventId, eventData }) => {
    updateStatusMutation.mutate({ eventId, status: eventData.status });
  };

  const deleteEventMutation = useMutation({
    mutationFn: deleteEventAPI,
    onSuccess: () => {
      toast.success("Event deleted successfully! 🗑️");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEventMutation.mutate(eventId);
    }
  };

  const eventsData = data || [];
  return (
    <PageWrapper>
      <StyledToastContainer />
      <PageContainer>
        {showEventForm && (
          <CreateEventForm
            onBack={() => setShowEventForm(false)}
            onSuccess={() => {
              setShowEventForm(false);
              queryClient.invalidateQueries({ queryKey: ["events"] });
            }}
          />
        )}
        {showCategoryForm && (
          <CreateCategoryForm
            onSuccess={() => {
              setShowCategoryForm(false); // Use the correct setter function
              // You might also want to invalidate the 'categories' query here
              queryClient.invalidateQueries({ queryKey: ["categories"] });
            }}
            onCancel={() => setShowCategoryForm(false)} // Added onCancel for completeness
          />
        )}

        <ControlsSection>
          <ControlsRow>
            <SearchContainer>
              <SearchIcon size={20} />
              <SearchInput
                type="text"
                placeholder="Search events by name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

            <AddButton onClick={() => setShowCategoryForm(true)}>
              <Plus size={20} />
              Create New Category
            </AddButton>

            <StyledSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#222",
                color: "white",
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
            </StyledSelect>
            <AddButton onClick={() => setShowEventForm(true)}>
              <Plus size={20} />
              Add New Event
            </AddButton>
          </ControlsRow>
        </ControlsSection>
        {isLoading && <p>Loading events...</p>}
        {isError && <p>Error: {error.message}</p>}

        {!isLoading &&
          !isError &&
          (eventsData.length > 0 ? (
            <EventsGrid>
              {eventsData.map((event) => (
                <EventCard key={event.id}>
                  <EventImage imageUrl={event.primaryImage}></EventImage>
                  <EventStatus>
                    <StatusBadge status={event.status}>
                      {event.status.charAt(0) +
                        event.status.slice(1).toLowerCase()}
                    </StatusBadge>
                  </EventStatus>
                  <EventContent>
                    {/* This new container groups the info */}
                    <EventInfo>
                      <EventTitle>{event.title}</EventTitle>
                      <EventMeta>
                        <span>
                          <Calendar size={14} />
                          {new Date(event.startDate).toLocaleDateString()}
                        </span>
                        <span>
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      </EventMeta>
                    </EventInfo>

                    {/* UserActions is now at the bottom */}
                    <UserActions>
                      <ActionButton
                        title="Edit Event"
                        onClick={() => setEditingEvent(event)}
                      >
                        <Edit size={18} />
                      </ActionButton>
                      <ActionButton
                        title="Delete Event"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 size={18} />
                      </ActionButton>
                      <ActionButton title="More Options">
                        <MoreVertical size={18} />
                      </ActionButton>
                    </UserActions>
                  </EventContent>
                </EventCard>
              ))}
            </EventsGrid>
          ) : (
            <p>No events found.</p>
          ))}

        {editingEvent && (
          <EditEventModal
            event={editingEvent}
            onClose={() => setEditingEvent(null)}
            onUpdate={handleUpdateEvent}
            isLoading={updateStatusMutation.isPending}
          />
        )}
      </PageContainer>
    </PageWrapper>
  );
};

export default EventManagement;

const StyledToastContainer = styled(ToastContainer).attrs({
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  CloseButton: false,
  pauseOnHover: true,
  draggable: true,
  transition: Slide,
})`
  .Toastify__toast {
    font-family: "Poppins", sans-serif;
    border-radius: 10px;
    padding: 16px;
    font-size: 0.95rem;
    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  }

  .Toastify__toast--error {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .Toastify__toast--info {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
  }

  .Toastify__progress-bar {
    background: rgba(255, 255, 255, 0.7);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #fff;
  padding-top: 80px;
`;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const ControlsSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  size: 20px;
`;

const StyledSelect = styled.select`
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #ff4444;
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  border: none;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(255, 68, 68, 0.4);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const EventImage = styled.div`
  height: 220px;
  flex-shrink: 0;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const EventContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* This is the key change! */
  flex-grow: 1; /* Makes content fill the remaining card height */
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Aligns title and icons to the top */
  gap: 1rem; /* Adds space between title and icons */
  width: 100%;
`;

const EventTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  font-family: "Playfair Display", serif;
`;

const CarPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff; /* Set the text color to white */
`;

const statusStyles = {
  // Use a more solid background with some opacity for better visibility
  PUBLISHED: css`
    background-color: rgba(5, 150, 105, 0.9); // Solid Green with 90% opacity
    color: #fff; // White text for contrast
    border: 1px solid #047857; // Darker green border
  `,
  DRAFT: css`
    background-color: rgba(217, 119, 6, 0.9); // Solid Amber with 90% opacity
    color: #fff; // White text for contrast
    border: 1px solid #b45309; // Darker amber border
  `,
  COMPLETED: css`
    background-color: rgba(37, 99, 235, 0.9); // Solid Blue with 90% opacity
    color: #fff; // White text for contrast
    border: 1px solid #1d4ed8; // Darker blue border
  `,
  CANCELLED: css`
    background-color: rgba(220, 38, 38, 0.9); // Solid Red with 90% opacity
    color: #fff; // White text for contrast
    border: 1px solid #b91c1c; // Darker red border
  `,
  // Add a PENDING status example if you have one
  PENDING: css`
    background-color: rgba(
      100,
      116,
      139,
      0.9
    ); // Solid Gray/Slate with 90% opacity
    color: #fff;
    border: 1px solid #64748b;
  `,
};

const UserActions = styled.div`
  display: flex;
  justify-content: flex-end; /* Aligns icons to the right */
  gap: 0.5rem;
  margin-top: 1.5rem; /* Creates space above the actions */
  padding-top: 1rem; /* Adds padding inside the 'footer' area */
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  /* Ensure a high z-index if other elements might overlap */
  z-index: 10;
  /* Add box-shadow for a slight lift and separation */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  ${({ status }) =>
    statusStyles[status] ||
    css`
      /* Default/fallback style if status is not matched */
      background-color: rgba(75, 85, 99, 0.9); // Dark Gray with 90% opacity
      color: #fff;
      border: 1px solid #374151;
    `}
`;

const EventInfo = styled.div``;

const EventStatus = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 10;
`;
// const StyledToastContainer = styled(ToastContainer).attrs({
//   position: "bottom-right",
//   autoClose: 3000,
//   hideProgressBar: false,
//   newestOnTop: false,
//   closeOnClick: true,
//   CloseButton: false,
//   pauseOnHover: true,
//   draggable: true,
//   transition: Slide,
// })`
//   .Toastify__toast {
//     font-family: "Poppins", sans-serif;
//     border-radius: 10px;
//     padding: 16px;
//     font-size: 0.95rem;
//     box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
//   }

//   .Toastify__toast--error {
//     background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
//     color: white;
//   }

//   .Toastify__toast--info {
//     background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
//     color: white;
//   }

//   .Toastify__progress-bar {
//     background: rgba(255, 255, 255, 0.7);
//   }
// `;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transform: scale(1.1);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  color: #fff;
`;

const PageButton = styled.button`
  background: ${(props) => (props.disabled ? "#2a2a2a" : "#333")};
  border: 1px solid #555;
  color: ${(props) => (props.disabled ? "#666" : "#fff")};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  &:not(:disabled):hover {
    background: #444;
  }
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-top: 0.75rem; /* Reduced margin */
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);

  span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  span:not(:first-child)::before {
    content: "•";
    margin-right: 1rem;
    color: rgba(255, 255, 255, 0.4);
  }
`;
