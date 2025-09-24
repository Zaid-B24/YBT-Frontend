import styled from "styled-components";
import AdminNav from "../../components/admin/AdminNav";
import { useEffect, useMemo, useState } from "react";
import BikeDetailsForm from "../../components/forms/BikeDetailsForm";
import { Plus, Search, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounceHook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchBikes = async ({ queryKey }) => {
  const [_key, { limit, sortBy, searchTerm, cursor }] = queryKey;

  const params = new URLSearchParams({ limit, sortBy });
  if (searchTerm) params.append("searchTerm", searchTerm);
  if (cursor) params.append("cursor", cursor);

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/bikes?${params.toString()}`
  );
  console.log("response on bike page", response);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const BikeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [sortBy, setSortBy] = useState("newest");
  const [showAddBikeForm, setShowAddBikeForm] = useState(false);

  // --- Pagination States ---
  const [cursorHistory, setCursorHistory] = useState([null]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openAddForm) {
      setShowAddBikeForm(true);
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentPageIndex(0);
    setCursorHistory([null]);
  }, [debouncedSearchTerm, sortBy]);

  const queryFilters = useMemo(
    () => ({
      limit: 9,
      sortBy,
      searchTerm: debouncedSearchTerm,
      cursor: cursorHistory[currentPageIndex],
    }),
    [sortBy, debouncedSearchTerm, cursorHistory, currentPageIndex]
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminBikes", queryFilters],
    queryFn: fetchBikes,
    keepPreviousData: true,
  });

  const bikes = data?.data || [];
  const nextCursor = data?.pagination?.nextCursor;

  const deleteBikeMutation = useMutation({
    mutationFn: (bikeId) =>
      fetch(`${process.env.REACT_APP_API_URL}/bikes/${bikeId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      toast.success("Bike deleted successfully! 🗑️");
      queryClient.invalidateQueries({ queryKey: ["adminBikes"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete bike.");
    },
  });

  const handleDelete = (bikeId) => {
    if (window.confirm("Are you sure you want to delete this bike?")) {
      deleteBikeMutation.mutate(bikeId);
    }
  };

  const handleNextPage = () => {
    if (!nextCursor) return;
    if (!cursorHistory.includes(nextCursor)) {
      setCursorHistory([...cursorHistory, nextCursor]);
    }
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <PageWrapper>
      <AdminNav />
      <StyledToastContainer />
      <PageContainer>
        {showAddBikeForm && (
          <BikeDetailsForm
            onBack={() => setShowAddBikeForm(false)}
            onSuccess={() => {
              setShowAddBikeForm(false);
              queryClient.invalidateQueries({ queryKey: ["adminBikes"] });
            }}
          />
        )}

        <ControlsSection>
          <ControlsRow>
            <SearchContainer>
              <SearchIcon size={18} />
              <SearchInput
                type="text"
                placeholder="Search bikes by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
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
            <AddButton onClick={() => setShowAddBikeForm(true)}>
              <Plus size={18} />
              Add New Bike
            </AddButton>
          </ControlsRow>
        </ControlsSection>

        {isLoading && <p>Loading bikes...</p>}
        {isError && <p>Error: {error.message}</p>}

        {!isLoading &&
          !isError &&
          (bikes.length > 0 ? (
            <BikeGrid>
              {bikes.map((bike) => (
                <BikeCard key={bike.id}>
                  <BikeImage imageUrl={bike.thumbnail} />
                  <BikeContent>
                    <BikeHeader>
                      <div>
                        <BikeTitle>
                          {bike.brand} {bike.title}
                        </BikeTitle>
                        <BikePrice>
                          Selling Price: {bike.ybtPrice.toLocaleString("en-IN")}
                        </BikePrice>
                      </div>
                    </BikeHeader>
                    {/* Add more bike-specific info here if needed */}
                    <BikeActions>
                      <ActionButton
                        title="Delete Bike"
                        onClick={() => handleDelete(bike.id)}
                      >
                        <Trash2 size={16} />
                      </ActionButton>
                    </BikeActions>
                  </BikeContent>
                </BikeCard>
              ))}
            </BikeGrid>
          ) : (
            <p>No bikes found matching your criteria.</p>
          ))}

        <Pagination>
          <PageButton
            onClick={handlePreviousPage}
            disabled={currentPageIndex === 0 || isLoading}
          >
            Previous
          </PageButton>
          <span>Page {currentPageIndex + 1}</span>
          <PageButton
            onClick={handleNextPage}
            disabled={!nextCursor || isLoading}
          >
            Next
          </PageButton>
        </Pagination>
      </PageContainer>
    </PageWrapper>
  );
};

export default BikeManagement;

const BikeCard = styled.div`
  // Your original styled component styles here
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

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

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const BikeImage = styled.div`
  height: 250px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const BikeContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BikeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const BikeTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
  font-family: "Playfair Display", serif;
`;

const BikeActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

// Re-exported styled components
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

const BikePrice = styled.div``;

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
const BikeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

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
