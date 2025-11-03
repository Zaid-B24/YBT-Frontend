import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Plus, Search, Trash2 } from "lucide-react";
//import { Link } from "react-router-dom";
import CarDetailsForm from "../../components/forms/CarDetailsForm";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "../../hooks/useDebounceHook";

const fetchCars = async ({ queryKey }) => {
  const [_key, { limit, sortBy, searchTerm, cursor }] = queryKey;
  const params = new URLSearchParams({ limit, sortBy });
  if (searchTerm) params.append("searchTerm", searchTerm);
  if (cursor) params.append("cursor", cursor);

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/cars?${params.toString()}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const CarManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [sortBy, setSortBy] = useState("newest");
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [cursorHistory, setCursorHistory] = useState([null]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentPageIndex(0);
    setCursorHistory([null]);
  }, [sortBy]);

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
    queryKey: ["adminCars", queryFilters],
    queryFn: fetchCars,
    keepPreviousData: true,
  });

  const cars = data?.data || [];
  const nextCursor = data?.pagination?.nextCursor;

  const deleteCarMutation = useMutation({
    mutationFn: (carId) =>
      fetch(`${process.env.REACT_APP_API_URL}/cars/${carId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      toast.success("Car deleted successfully! 🗑️");
      queryClient.invalidateQueries({ queryKey: ["adminCars"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete car.");
    },
  });

  const handleDelete = (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      deleteCarMutation.mutate(carId);
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
      <StyledToastContainer />
      <PageContainer>
        {showAddCarForm && (
          <CarDetailsForm
            onBack={() => setShowAddCarForm(false)}
            onSuccess={() => {
              setShowAddCarForm(false);
              queryClient.invalidateQueries({ queryKey: ["adminCars"] });
            }}
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

            <StyledSelect
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
            </StyledSelect>
            <AddButton onClick={() => setShowAddCarForm(true)}>
              <Plus size={20} />
              Add New Car
            </AddButton>
          </ControlsRow>
        </ControlsSection>

        {isLoading && <p>Loading cars...</p>}
        {isError && <p>Error: {error.message}</p>}

        {!isLoading &&
          !isError &&
          (cars.length > 0 ? (
            <CarsGrid>
              {cars.map((car) => (
                <CarCard key={car.id}>
                  <CarImage imageUrl={car.thumbnail}></CarImage>
                  <CarContent>
                    <CarHeader>
                      <div>
                        <CarTitle>
                          {car.brand} {car.title}
                        </CarTitle>
                      </div>
                      <CarPrice>
                        {car.ybtPrice.toLocaleString("en-IN")}
                      </CarPrice>
                    </CarHeader>
                  </CarContent>
                  <ActionButton
                    title="Delete Car"
                    onClick={() => handleDelete(car.id)}
                  >
                    <Trash2 size={18} />
                  </ActionButton>
                </CarCard>
              ))}
            </CarsGrid>
          ) : (
            <p>No cars found matching your criteria.</p>
          ))}

        <Pagination>
          {/* 4. FIX: Use 'isLoading' instead of 'loading' */}
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

const CarImage = styled.div`
  height: 250px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const CarContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
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
  color: #ffffff; /* Set the text color to white */
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

// {/* <CarsGrid>
//           {filteredCars.map((car) => (
//             <CarCard key={car.id}>
//               <CarImage imageUrl={car.carImages[0]}></CarImage>
//               <CarContent>
//                 <CarHeader>
//                   <div>
//                     <CarTitle>
//                       {car.brand} {car.title}
//                     </CarTitle>
//                     <div
//                       style={{
//                         color: "rgba(255,255,255,0.6)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       Car Type: {car.carType}
//                     </div>
//                   </div>
//                   <CarPrice>{car.price}</CarPrice>
//                 </CarHeader>

//                 <CarStatus>
//                   <StatusBadge status={car.status}>{car.status}</StatusBadge>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.25rem",
//                       color: "rgba(255,255,255,0.6)",
//                     }}
//                   >
//                     <Star size={16} fill="#ffd700" color="#ffd700" />
//                     <span style={{ fontSize: "0.9rem" }}>4.8</span>
//                   </div>
//                 </CarStatus>

//                 <CarDetails>
//                   <CarDetail>
//                     <Tag size={16} />
//                     <span>{car.manufactureYear}</span>
//                   </CarDetail>
//                   <CarDetail>
//                     <Car size={16} />
//                     <span>{car.mileage} mi</span>
//                   </CarDetail>
//                   <CarDetail>
//                     <MapPin size={16} />
//                     <span>
//                       {car.city}, {car.state}
//                     </span>
//                   </CarDetail>
//                   <CarDetail>
//                     <Calendar size={16} />
//                     <span>Available</span>
//                   </CarDetail>
//                 </CarDetails>

//                 <CarActions>
//                   <ActionButton title="View Details">
//                     <Eye size={18} />
//                   </ActionButton>
//                   <ActionButton title="Edit Car">
//                     <Edit size={18} />
//                   </ActionButton>
//                   <ActionButton
//                     title="Delete Car"
//                     onClick={() => handleDelete(car.id)} // Add this line
//                   >
//                     <Trash2 size={18} />
//                   </ActionButton>
//                   <ActionButton title="More Options">
//                     <MoreVertical size={18} />
//                   </ActionButton>
//                 </CarActions>
//               </CarContent>
//             </CarCard>
//           ))}
//         </CarsGrid> */}
