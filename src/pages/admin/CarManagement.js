import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Car,
  Calendar,
  Star,
  MoreVertical,
  Tag,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
//import { Link } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";
import CarDetailsForm from "../../components/forms/CarDetailsForm";
import { useLocation } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [nextCursor, setNextCursor] = useState(null);
  const [cursorHistory, setCursorHistory] = useState([null]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Check if navigation state exists and has the 'openAddForm' property
    if (location.state?.openAddForm) {
      setShowAddCarForm(true);
    }
  }, [location.state]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // When a new search is performed, reset pagination to the first page
      setCurrentPageIndex(0);
      setCursorHistory([null]);
    }, 500);

    // Cleanup function to cancel the timer if the user types again
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      // Use URLSearchParams to easily build the query string
      const params = new URLSearchParams({
        limit: "9", // Or any number you prefer
        sortBy: sortBy,
      });

      // Add search term if it exists
      if (debouncedSearchTerm) {
        params.append("searchTerm", debouncedSearchTerm);
      }

      // Add the cursor for the current page
      const currentCursor = cursorHistory[currentPageIndex];
      if (currentCursor) {
        params.append("cursor", currentCursor);
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cars?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setCars(data.data); // The backend returns data in a 'data' property
      setNextCursor(data.nextCursor); // Store the cursor for the next page
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      // Optionally set an error state here to show a message to the user
    } finally {
      setLoading(false);
    }
  }, [sortBy, debouncedSearchTerm, currentPageIndex, cursorHistory]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  useEffect(() => {
    setCurrentPageIndex(0);
    setCursorHistory([null]);
  }, [sortBy]);

  const handleDelete = async (carId) => {
    // Optional: Ask for confirmation before deleting
    if (!window.confirm("Are you sure you want to delete this car?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cars/${carId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // If successful, remove the car from the local state to update the UI
      setCars(cars.filter((car) => car.id !== carId));
      console.log("Car deleted successfully");
      toast.success("Car deleted successfully! 🗑️");

      fetchCars();
    } catch (error) {
      console.error("Failed to delete car:", error);
      toast.error(error);
    }
  };

  const handleNextPage = () => {
    if (!nextCursor) return; // Don't do anything if there's no next page

    // Add the new cursor to our history if it's not already there
    if (!cursorHistory.includes(nextCursor)) {
      setCursorHistory([...cursorHistory, nextCursor]);
    }
    // Move to the next page
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageIndex === 0) return; // Can't go back from the first page
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <AdminNav />
      <StyledToastContainer />
      <PageContainer>
        <PageHeader>
          <PageTitle>Car Management</PageTitle>
          <PageSubtitle>
            Manage your luxury car inventory and listings
          </PageSubtitle>
        </PageHeader>
        {showAddCarForm && (
          <CarDetailsForm
            onBack={() => setShowAddCarForm(false)}
            onSuccess={() => setShowAddCarForm(false)}
          />
        )}

        <ControlsSection>
          <ControlsRow>
            <SearchContainer>
              <SearchIcon size={20} />
              <SearchInput
                type="text"
                placeholder="Search cars by name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              // Add some styling to this select to match your design
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
            </select>
            {/* <FilterButton>
              <Filter size={20} />
              Filters
            </FilterButton> */}
            <AddButton onClick={() => setShowAddCarForm(true)}>
              <Plus size={20} />
              Add New Car
            </AddButton>
          </ControlsRow>
        </ControlsSection>

        {loading ? (
          <p>Loading cars...</p> // Simple loading indicator
        ) : cars.length > 0 ? (
          <CarsGrid>
            {/* No more client-side filtering, just map the 'cars' state */}
            {cars.map((car) => (
              <CarCard key={car.id}>
                {/* Your CarCard JSX remains the same, just ensure field names match */}
                {/* Example: car.thumbnail instead of car.carImages[0] */}
                <CarImage imageUrl={car.thumbnail}></CarImage>
                <CarContent>
                  <CarHeader>
                    <div>
                      <CarTitle>
                        {car.brand} {car.title}
                      </CarTitle>
                    </div>
                    {/* The backend doesn't send price, so you might need to adjust your 'select' in the controller */}
                    {/* <CarPrice>{car.price}</CarPrice> */}
                  </CarHeader>

                  {/* The rest of your card details... */}

                  <CarActions>
                    {/* ... other action buttons */}
                    <ActionButton
                      title="Delete Car"
                      onClick={() => handleDelete(car.id)}
                    >
                      <Trash2 size={18} />
                    </ActionButton>
                    {/* ... other action buttons */}
                  </CarActions>
                </CarContent>
              </CarCard>
            ))}
          </CarsGrid>
        ) : (
          <p>No cars found matching your criteria.</p> // Empty state
        )}

        {/* <CarsGrid>
          {filteredCars.map((car) => (
            <CarCard key={car.id}>
              <CarImage imageUrl={car.carImages[0]}></CarImage>
              <CarContent>
                <CarHeader>
                  <div>
                    <CarTitle>
                      {car.brand} {car.title}
                    </CarTitle>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "0.9rem",
                      }}
                    >
                      Car Type: {car.carType}
                    </div>
                  </div>
                  <CarPrice>{car.price}</CarPrice>
                </CarHeader>

                <CarStatus>
                  <StatusBadge status={car.status}>{car.status}</StatusBadge>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    <Star size={16} fill="#ffd700" color="#ffd700" />
                    <span style={{ fontSize: "0.9rem" }}>4.8</span>
                  </div>
                </CarStatus>

                <CarDetails>
                  <CarDetail>
                    <Tag size={16} />
                    <span>{car.manufactureYear}</span>
                  </CarDetail>
                  <CarDetail>
                    <Car size={16} />
                    <span>{car.mileage} mi</span>
                  </CarDetail>
                  <CarDetail>
                    <MapPin size={16} />
                    <span>
                      {car.city}, {car.state}
                    </span>
                  </CarDetail>
                  <CarDetail>
                    <Calendar size={16} />
                    <span>Available</span>
                  </CarDetail>
                </CarDetails>

                <CarActions>
                  <ActionButton title="View Details">
                    <Eye size={18} />
                  </ActionButton>
                  <ActionButton title="Edit Car">
                    <Edit size={18} />
                  </ActionButton>
                  <ActionButton
                    title="Delete Car"
                    onClick={() => handleDelete(car.id)} // Add this line
                  >
                    <Trash2 size={18} />
                  </ActionButton>
                  <ActionButton title="More Options">
                    <MoreVertical size={18} />
                  </ActionButton>
                </CarActions>
              </CarContent>
            </CarCard>
          ))}
        </CarsGrid> */}

        <Pagination>
          <ChevronLeft
            onClick={handlePreviousPage}
            disabled={currentPageIndex === 0 || loading}
          >
            Previous
          </ChevronLeft>
          <span style={{ color: "white", alignSelf: "center" }}>
            Page {currentPageIndex + 1}
          </span>
          <ChevronRight
            onClick={handleNextPage}
            disabled={!nextCursor || loading}
          >
            Next
          </ChevronRight>
        </Pagination>
      </PageContainer>
    </PageWrapper>
  );
};

export default CarManagement;

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

const FilterButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CarCard = styled.div`
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

const CarImage = styled.div`
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

const CarContent = styled.div`
  padding: 2rem;
`;

const CarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const CarTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
  font-family: "Playfair Display", serif;
`;

const CarPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #ff4444;
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CarDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CarDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const CarStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const statusColors = {
  available: {
    background: "rgba(16, 185, 129, 0.15)", // Light Emerald Green
    color: "#10b981", // Solid Emerald Green
  },
  pending: {
    background: "rgba(245, 158, 11, 0.15)", // Light Amber
    color: "#f59e0b", // Solid Amber
  },
  inactive: {
    background: "rgba(239, 68, 68, 0.15)", // Light Red
    color: "#ef4444", // Solid Red
  },
  default: {
    background: "rgba(107, 114, 128, 0.15)", // Light Gray
    color: "#6b7280", // Solid Gray
  },
};

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  /* Get the background color from our theme object */
  background: ${(props) =>
    statusColors[props.status?.toLowerCase()]?.background ||
    statusColors.default.background};

  /* Get the text color from our theme object */
  color: ${(props) =>
    statusColors[props.status?.toLowerCase()]?.color ||
    statusColors.default.color};
`;

const CarActions = styled.div`
  display: flex;
  gap: 0.75rem;
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

const PageButton = styled.button`
  background: ${(props) =>
    props.active ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"};
  border: 1px solid
    ${(props) =>
      props.active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"};
  color: ${(props) => (props.active ? "#fff" : "rgba(255,255,255,0.7)")};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
