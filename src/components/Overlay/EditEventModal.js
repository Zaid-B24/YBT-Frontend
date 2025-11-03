import { useState } from "react";
import styled from "styled-components";
import { Edit, Save, X } from "lucide-react";
import CreateEventForm from "../forms/CreateEventForm"; // Re-using your form

const EditEventModal = ({ event, onClose, onUpdate, isLoading }) => {
  const [status, setStatus] = useState(event.status);
  const [isFullEdit, setIsFullEdit] = useState(false);

  const handleStatusUpdate = () => {
    onUpdate({ eventId: event.id, eventData: { status } });
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Edit: {event.title}</h3>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        {isFullEdit ? (
          // If in full edit mode, render the form
          <CreateEventForm
            // Pass the event data to pre-fill the form
            initialData={event}
            onSuccess={onClose} // Close modal on success
            onBack={() => setIsFullEdit(false)}
          />
        ) : (
          // Default view: Quick Actions
          <ModalContent>
            <SectionTitle>Quick Actions</SectionTitle>
            <ActionRow>
              <label htmlFor="status-select">Change Status:</label>
              <StyledSelect
                id="status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </StyledSelect>
              <SaveButton onClick={handleStatusUpdate} disabled={isLoading}>
                <Save size={16} />
                {isLoading ? "Saving..." : "Save Status"}
              </SaveButton>
            </ActionRow>

            <SectionTitle>Advanced</SectionTitle>
            <FullEditButton onClick={() => setIsFullEdit(true)}>
              <Edit size={16} />
              Edit Full Event Details
            </FullEditButton>
          </ModalContent>
        )}
      </ModalContainer>
    </Overlay>
  );
};

export default EditEventModal;

// --- STYLED COMPONENTS ---

const Overlay = styled.div`
  position: fixed;
  overflow-y: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledSelect = styled.select`
  // --- Core Styles ---
  padding: 1rem 2.5rem 1rem 1rem; // Add space on the right for the arrow
  border-radius: 12px;
  border: 1px solid #444;
  background-color: #1f1f1f;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;

  // --- Custom Arrow ---
  appearance: none; // Hide the default browser arrow
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center; // Position the arrow

  // --- Interaction States ---
  &:hover {
    border-color: #666;
  }

  &:focus {
    border-color: #ff4444;
    box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.3);
  }
`;

const buttonStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid #555;
  background-color: #333;
  color: #f0f0f0;

  &:hover {
    background-color: #444;
    border-color: #666;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SaveButton = styled.button`
  ${buttonStyles}

  /* Primary button variant */
  ${({ $primary }) =>
    $primary &&
    `
    background-color: #3b82f6;
    border-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
      border-color: #2563eb;
    }
  `}
`;
const FullEditButton = styled.button`
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
