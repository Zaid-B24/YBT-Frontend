import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import DealerDetailsForm from "../../components/forms/DealerDetailsForm";
import {
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";

const fetchDealers = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No admin token found.");

  const res = await fetch(`${process.env.REACT_APP_API_URL}/dealer`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch dealers");
  const responseData = await res.json();
  return responseData.data;
};

const DealerManagement = () => {
  const [showAddDealerForm, setShowAddDealerForm] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: dealers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminDealers"],
    queryFn: fetchDealers,
  });

  const deleteDealerMutation = useMutation({
    mutationFn: async (dealerId) => {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/dealer/${dealerId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete dealer");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Dealer removed successfully");
      queryClient.invalidateQueries({ queryKey: ["adminDealers"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this dealer?")) {
      deleteDealerMutation.mutate(id);
    }
  };

  return (
    <PageWrapper>
      <PageContainer>
        {showAddDealerForm && (
          <DealerDetailsForm
            onBack={() => setShowAddDealerForm(false)}
            onSuccess={() => {
              setShowAddDealerForm(false);
              QueryClient.invalidateQueries({ queryKey: ["adminCars"] });
            }}
          />
        )}

        <HeaderSection>
          <PageTitle>Dealer Management</PageTitle>
          <SubText>Manage registered dealers and permissions</SubText>
        </HeaderSection>
        <ControlsSection>
          <ControlsRow>
            <AddButton onClick={() => setShowAddDealerForm(true)}>
              <Plus size={20} />
              Add New Dealer
            </AddButton>
          </ControlsRow>
        </ControlsSection>
        {isLoading && (
          <LoadingMessage>Loading dealer directory...</LoadingMessage>
        )}
        {isError && <ErrorMessage>Error: {error.message}</ErrorMessage>}

        {!isLoading && !isError && (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Dealer Name</Th>
                  <Th>Contact Info</Th>
                  <Th>Location</Th>
                  <Th>Status</Th>
                  <Th style={{ textAlign: "right" }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {dealers.length > 0 ? (
                  dealers.map((dealer) => (
                    <Tr key={dealer.id}>
                      <Td>
                        <NameCell>
                          {dealer.name}
                          <IdBadge>ID: {dealer.id}</IdBadge>
                        </NameCell>
                      </Td>
                      <Td>
                        <ContactCell>
                          <div>
                            <Mail size={14} /> {dealer.email}
                          </div>
                          <div>
                            <Phone size={14} /> {dealer.phone}
                          </div>
                        </ContactCell>
                      </Td>
                      <Td>
                        <LocationCell>
                          {dealer.city ? (
                            <>
                              <MapPin size={14} /> {dealer.city}
                            </>
                          ) : (
                            <span style={{ opacity: 0.5 }}>N/A</span>
                          )}
                        </LocationCell>
                      </Td>
                      <Td>
                        {dealer.isActive ? (
                          <StatusBadge active>
                            <CheckCircle size={12} /> Active
                          </StatusBadge>
                        ) : (
                          <StatusBadge>
                            <XCircle size={12} /> Inactive
                          </StatusBadge>
                        )}
                      </Td>
                      <Td style={{ textAlign: "right" }}>
                        <ActionButton
                          onClick={() => handleDelete(dealer.id)}
                          title="Delete Dealer"
                        >
                          <Trash2 size={18} />
                        </ActionButton>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <tr>
                    <Td
                      colSpan="5"
                      style={{ textAlign: "center", padding: "3rem" }}
                    >
                      No dealers found matching your search.
                    </Td>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableContainer>
        )}
      </PageContainer>
    </PageWrapper>
  );
};

export default DealerManagement;

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

const HeaderSection = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: "Playfair Display", serif;
  background: linear-gradient(90deg, #fff, #bbb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubText = styled.p`
  color: rgba(255, 255, 255, 0.6);
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
`;

/* --- NEW TABLE STYLES --- */

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden; /* For rounded corners */
  overflow-x: auto; /* Handle mobile scrolling */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px; /* Force scroll on very small screens */
`;

const Th = styled.th`
  text-align: left;
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
`;

const Tr = styled.tr`
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Td = styled.td`
  padding: 1.5rem;
  color: #fff;
  vertical-align: middle;
`;

const NameCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: 600;
  font-size: 1.1rem;
`;

const IdBadge = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 400;
`;

const ContactCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const LocationCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  background: ${(props) =>
    props.active ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${(props) => (props.active ? "#22c55e" : "#ef4444")};
  border: 1px solid
    ${(props) =>
      props.active ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"};
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    transform: translateY(-2px);
  }
`;

const StyledToastContainer = styled(ToastContainer).attrs({
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Slide,
})`
  .Toastify__toast {
    font-family: "Poppins", sans-serif;
    border-radius: 10px;
    padding: 16px;
    font-size: 0.95rem;
    background: #222;
    color: white;
  }
  .Toastify__toast--success {
    border-left: 4px solid #22c55e;
  }
  .Toastify__toast--error {
    border-left: 4px solid #ef4444;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 4rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 12px;
  margin-bottom: 2rem;
`;
