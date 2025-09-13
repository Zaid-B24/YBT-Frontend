import styled from "styled-components";
import AdminNav from "../../components/admin/AdminNav";
import { useCallback, useEffect, useState } from "react";
import BikeDetailsForm from "../../components/forms/BikeDetailsForm";
import { ChevronLeft, ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";

const BikeManagement = () => {
  const [showAddBikeForm, setShowAddBikeForm] = useState(false);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [nextCursor, setNextCursor] = useState(null);
  const [previousCursors, setPreviousCursors] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openAddForm) {
      setShowAddBikeForm(true);
    }
  }, [location.state]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchBikes = useCallback(
    async (cursor) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          limit: "9",
          sortBy: sortBy,
        });

        if (debouncedSearchTerm) {
          params.append("searchTerm", debouncedSearchTerm);
        }

        if (cursor) {
          params.append("cursor", cursor);
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/bikes?${params.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setBikes(data.data);
        setNextCursor(data.nextCursor);
      } catch (error) {
        console.error("Failed to fetch bikes:", error);
      } finally {
        setLoading(false);
      }
    },
    [sortBy, debouncedSearchTerm]
  );

  useEffect(() => {
    const currentCursor =
      previousCursors.length > 0
        ? previousCursors[previousCursors.length - 1]
        : null;
    fetchBikes(currentCursor);
  }, [fetchBikes, previousCursors]);

  useEffect(() => {
    setPreviousCursors([]);
    fetchBikes(null);
  }, [sortBy, debouncedSearchTerm, fetchBikes]);

  const handleDelete = async (bikeId) => {
    if (!window.confirm("Are you sure you want to delete this bike?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/bikes/${bikeId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Instead of filtering, refetch the bikes to get the most up-to-date list
      fetchBikes(previousCursors[previousCursors.length - 1] || null);
      console.log("Bike deleted successfully");
      toast.success("Bike deleted successfully! 🗑️");
    } catch (error) {
      console.error("Failed to delete bike:", error);
      toast.error(error);
    }
  };

  const handleNextPage = () => {
    if (!nextCursor) return;
    // Add the current page's cursor to history and move to the next page
    setPreviousCursors([...previousCursors, nextCursor]);
  };

  const handlePreviousPage = () => {
    if (previousCursors.length === 0) return;
    // Remove the last cursor from history to go back
    setPreviousCursors(previousCursors.slice(0, -1));
  };

  return (
    <PageWrapper>
      <AdminNav />
      <StyledToastContainer />
      <PageContainer>
        <PageHeader>
          <PageTitle>Bike Management</PageTitle>
          <PageSubtitle>
            Manage your luxury Bike inventory and listings
          </PageSubtitle>
        </PageHeader>

        {showAddBikeForm && (
          <BikeDetailsForm
            onBack={() => setShowAddBikeForm(false)}
            onSuccess={() => {
              setShowAddBikeForm(false);
              // Refetch bikes on success to show the new bike
              fetchBikes(previousCursors[previousCursors.length - 1] || null);
            }}
          />
        )}

        <ControlsSection>
          <ControlsRow>
            <SearchContainer>
              <SearchIcon size={20} />
              <SearchInput
                type="text"
                placeholder="Search bikes by name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

            <select
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
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
            </select>
            <AddButton onClick={() => setShowAddBikeForm(true)}>
              <Plus size={20} />
              Add New Bike
            </AddButton>
          </ControlsRow>
        </ControlsSection>

        {loading ? (
          <p>Loading bikes...</p>
        ) : bikes.length > 0 ? (
          <BikeGrid>
            {bikes.map((bike) => (
              <BikeCard key={bike.id}>
                {/* Corrected props to match the new component name and data */}
                <BikeImage imageUrl={bike.thumbnail}></BikeImage>
                <BikeContent>
                  <BikeHeader>
                    <div>
                      <BikeTitle>
                        {bike.brand} {bike.title}
                      </BikeTitle>
                      {/* You can show price if you update your backend 'select' */}
                      <BikePrice>Selling Price: {bike.sellingPrice}</BikePrice>
                    </div>
                  </BikeHeader>
                  <BikeActions>
                    <ActionButton
                      title="Delete Bike"
                      onClick={() => handleDelete(bike.id)}
                    >
                      <Trash2 size={18} />
                    </ActionButton>
                  </BikeActions>
                </BikeContent>
              </BikeCard>
            ))}
          </BikeGrid>
        ) : (
          <p>No bikes found matching your criteria.</p>
        )}

        <Pagination>
          <ChevronLeft
            onClick={handlePreviousPage}
            disabled={previousCursors.length === 0 || loading}
            style={{
              opacity: previousCursors.length === 0 || loading ? 0.5 : 1,
            }}
          />
          <span style={{ color: "white", alignSelf: "center" }}>
            Page {previousCursors.length + 1}
          </span>
          <ChevronRight
            onClick={handleNextPage}
            disabled={!nextCursor || loading}
            style={{ opacity: !nextCursor || loading ? 0.5 : 1 }}
          />
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
  border-radius: 20px;
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
  background-color: #1a1a1a;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 70%
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const BikeContent = styled.div`
  padding: 2rem;
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
const PageHeader = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
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
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }
`;

const BikePrice = styled.div``;
const PageTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff, #ccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
`;
const PageSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  margin-bottom: 0;
  font-weight: 300;
`;
const ControlsSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 3rem;
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
