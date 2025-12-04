import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, ArrowRight, Search, X } from "lucide-react";
import { CarCardSkeleton } from "../../components/cards/CarCardSkeleton";
import VehicleBadges from "../../components/common/VehicleBadges";
import { useCars } from "../../hooks/useCars";
import { useCarFilters } from "../../hooks/useCarFilters";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: black;
  color: #fff;
  display: flex;
`;

const Sidebar = styled.div`
  width: 300px;
  background: rgba(255, 255, 255, 0.02);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  position: sticky;
  top: 100px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  z-index: 50;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 85%;
    max-width: 320px;
    background: #000; /* Make background solid black on mobile */
    transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
    border-right: 1px solid rgba(255, 255, 255, 0.1);

    // ADDED: Huge top padding on mobile so it doesn't hide behind your Logo/Header
    padding-top: 120px;
  }
`;

// NEW: A dark overlay background when sidebar is open on mobile
const SidebarOverlay = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 40;
    backdrop-filter: blur(3px);
  }
`;

const MobileToggleBtn = styled.button`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    // Changed top margin from 0 to 2rem
    margin: 2rem auto 2rem auto;
    background: #fff;
    color: #000;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);

    &:active {
      transform: scale(0.98);
    }
  }
`;

const MobileCloseBtn = styled.button`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    position: absolute;
    top: 130px;

    right: 1.5rem;
    background: rgba(
      255,
      255,
      255,
      0.1
    ); /* Optional: Add background to make it visible */
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    z-index: 100; /* Ensure it sits on top of sidebar content */

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
`;

const HeroSection = styled.section`
  padding: 2rem 0 3rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

const FilterButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background: ${(props) =>
    props.isActive ? "#fff" : "rgba(255, 255, 255, 0.05)"};
  color: ${(props) => (props.isActive ? "#000" : "#fff")};
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) =>
      props.isActive ? "#fff" : "rgba(255, 255, 255, 0.1)"};
    border-color: #fff;
  }
`;

const FilterTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 4px;

  option {
    background: #000;
    color: #fff;
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CarCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const CarImage = styled.div`
  height: 250px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
  border-radius: 20px 20px 0 0;
`;

const CarContent = styled.div`
  padding: 1.5rem;
`;

const CarTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const CarSpecs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const CarPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    gap: 1rem;
  }
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #fff;
  }
`;

const SearchContainer = styled.div`
  padding: 1.5rem 0; /* Removed horizontal padding to fit flex container */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 10px; /* Space between input and button */
  align-items: stretch;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1; /* Take up remaining space */
`;

// Updated Input to remove the old left-padding for the icon
const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 2.5rem 0.75rem 1rem; // Padding right for the X button
  font-size: 0.9rem;
  border-radius: 8px; // Rounded corners

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

// NEW: The Square Search Button
const SearchActionButton = styled.button`
  background: #fff;
  color: #000;
  border: none;
  border-radius: 8px;
  width: 44px; /* Square button */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ClearButton = styled.div`
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const YBTCarsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    price: "",
    year: "",
  });

  const { data: filterOptions, isLoading: filtersLoading } = useCarFilters();

  const handleSearch = () => {
    setAppliedSearch(searchInput);
    setIsSidebarOpen(false);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setAppliedSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResetFilters = () => {
    setFilters({
      brand: "",
      price: "",
      year: "",
    });
    setSearchInput("");
    setAppliedSearch("");
    setIsSidebarOpen(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const activeParams = useMemo(
    () => ({
      ...filters,
      q: appliedSearch, // This will switch your hook to use searchCarsAPI
    }),
    [filters, appliedSearch]
  );

  const {
    cars,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCars("YBT", activeParams, { useInfinite: true });

  const yearList = useMemo(() => {
    if (!filterOptions || !filterOptions.minYear || !filterOptions.maxYear)
      return [];
    const years = [];
    for (let i = filterOptions.maxYear; i >= filterOptions.minYear; i--) {
      years.push(i);
    }
    return years;
  }, [filterOptions]);

  const loadMoreRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <PageWrapper>
      <SidebarOverlay
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />
      <Sidebar isOpen={isSidebarOpen}>
        <FilterSection>
          <FilterTitle>
            <Filter size={20} /> Search & Filters
          </FilterTitle>

          <SearchContainer>
            <SearchRow>
              <SearchInputWrapper>
                <SearchInput
                  type="text"
                  placeholder="Search cars..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {searchInput && (
                  <ClearButton onClick={handleClearSearch}>
                    <X size={16} />
                  </ClearButton>
                )}
              </SearchInputWrapper>

              {/* The Action Button */}
              <SearchActionButton onClick={handleSearch} title="Search">
                <Search size={20} />
              </SearchActionButton>
            </SearchRow>
          </SearchContainer>

          <FilterGroup>
            <FilterLabel>Brand</FilterLabel>
            <FilterButtonGroup>
              <FilterButton
                isActive={!filters.brand}
                onClick={() =>
                  handleFilterChange({ target: { name: "brand", value: "" } })
                }
              >
                All
              </FilterButton>
              {!filtersLoading &&
                filterOptions?.brands?.map((brand) => (
                  <FilterButton
                    key={brand}
                    isActive={filters.brand === brand}
                    onClick={() =>
                      handleFilterChange({
                        target: { name: "brand", value: brand },
                      })
                    }
                  >
                    {brand}
                  </FilterButton>
                ))}
            </FilterButtonGroup>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Year</FilterLabel>
            <FilterSelect
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option value="">All Years</option>
              {yearList.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Price Range</FilterLabel>
            <FilterSelect
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
            >
              <option value="">All Prices</option>
              <option value="below-4cr">Below ₹4 Cr</option>
              <option value="4-5cr">₹4-5 Cr</option>
              <option value="above-5cr">Above ₹5 Cr</option>
            </FilterSelect>
          </FilterGroup>
          <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
        </FilterSection>
      </Sidebar>

      <MainContent>
        <HeroSection>
          <HeroTitle>YBT Cars Collection</HeroTitle>
          <HeroSubtitle>
            Discover our exclusive collection of luxury cars, each featuring
            signature YBT modifications and premium customizations that define
            automotive excellence.
          </HeroSubtitle>
          <MobileToggleBtn onClick={() => setIsSidebarOpen(true)}>
            <Filter size={18} />
            Search & Filters
          </MobileToggleBtn>
        </HeroSection>

        {isLoading && !isFetchingNextPage ? (
          <CarsGrid>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </CarsGrid>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <AnimatePresence>
              <CarsGrid layout>
                {cars.map((car, index) => (
                  <CarCard
                    key={car.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <CarImage image={car.image}>
                      <VehicleBadges vehicle={car} />
                    </CarImage>
                    <CarContent>
                      <CarTitle>YBT {car.title}</CarTitle>
                      <CarSpecs>
                        <span>{car.specs?.join(" • ")}</span>
                      </CarSpecs>
                      <CarPrice>
                        ₹ {(car.price || 0).toLocaleString("en-IN")}
                      </CarPrice>
                      <ViewButton to={`/cars/${car.id}`}>
                        View Details
                        <ArrowRight size={16} />
                      </ViewButton>
                    </CarContent>
                  </CarCard>
                ))}
              </CarsGrid>
            </AnimatePresence>

            <div
              ref={loadMoreRef}
              style={{ height: "100px", marginTop: "2rem" }}
            >
              {isFetchingNextPage ? (
                <p style={{ textAlign: "center" }}>Loading more...</p>
              ) : !hasNextPage && cars.length > 0 ? (
                <p style={{ textAlign: "center" }}>You've reached the end!</p>
              ) : null}
            </div>
          </>
        )}
      </MainContent>
    </PageWrapper>
  );
};

export default YBTCarsPage;
