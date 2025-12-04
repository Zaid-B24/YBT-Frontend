import { useState, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, X, Filter, ArrowRight } from "lucide-react";
import { CarCardSkeleton } from "../../components/cards/CarCardSkeleton";
import { useCars } from "../../hooks/useCars";
import VehicleBadges from "../../components/common/VehicleBadges";
import { useCarFilters } from "../../hooks/useCarFilters";
const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
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

// NEW: Close button inside the sidebar (Mobile only)
const MobileCloseBtn = styled.button`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
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

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

// Main Content Styles
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

const HeroDescription = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
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

const CarCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
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

const FilterCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #ccc;

  input {
    cursor: pointer;
    accent-color: #fff;
    width: 16px;
    height: 16px;
  }
`;

const TorqueTunerEditionPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    price: "",
    year: "",
  });

  const [stageFilters, setStageFilters] = useState({
    "Stage 1": false,
    "Stage 2": false,
    "Stage 3": false,
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
    if (e.key === "Enter") handleSearch();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleStageFilterChange = (stage) => {
    setStageFilters((prev) => ({ ...prev, [stage]: !prev[stage] }));
  };

  const handleResetFilters = () => {
    setFilters({ brand: "", price: "", year: "" });
    setStageFilters({ "Stage 1": false, "Stage 2": false, "Stage 3": false });
    setSearchInput("");
    setAppliedSearch("");
    setIsSidebarOpen(false);
  };

  const activeStages = useMemo(
    () => Object.keys(stageFilters).filter((stage) => stageFilters[stage]),
    [stageFilters]
  );

  const apiStages = useMemo(
    () => activeStages.map((s) => s.replace(" ", "").toUpperCase()),
    [activeStages]
  );

  const activeParams = useMemo(
    () => ({
      ...filters,
      stages: apiStages, // Pass stage array
      q: appliedSearch,
    }),
    [filters, apiStages, appliedSearch]
  );

  const {
    cars,
    isLoading,
    error,
    fetchNextPage, // Get the function to fetch more data
    hasNextPage, // Know if there is more data to fetch
    isFetchingNextPage, // Know when the next page is being fetched
  } = useCars(
    "TORQUE_TUNER",
    activeParams,
    { useInfinite: true } // Enable infinite scrolling!
  );

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
                  placeholder="Search tuned cars..."
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
            <FilterLabel>Tuning Stage</FilterLabel>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {Object.keys(stageFilters).map((stage) => (
                <FilterCheckboxLabel key={stage}>
                  <input
                    type="checkbox"
                    checked={stageFilters[stage]}
                    onChange={() => handleStageFilterChange(stage)}
                  />
                  {stage}
                </FilterCheckboxLabel>
              ))}
            </div>
          </FilterGroup>
          <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
        </FilterSection>
      </Sidebar>

      <MainContent>
        <HeroSection>
          <HeroTitle>Torque Tuner Edition</HeroTitle>
          <HeroDescription>
            Experience the ultimate in performance engineering with our Torque
            Tuner Edition vehicles. Meticulously tuned for maximum power and
            driving dynamics.
          </HeroDescription>
          <MobileToggleBtn onClick={() => setIsSidebarOpen(true)}>
            <Filter size={18} /> Search & Filters
          </MobileToggleBtn>
        </HeroSection>

        {isLoading && !isFetchingNextPage ? (
          <CarsGrid>
            {Array.from({ length: 6 }).map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </CarsGrid>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : cars.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#ccc" }}>
            <h3>No vehicles found</h3>
            <p>Try adjusting your search or filters.</p>
            <button
              onClick={handleResetFilters}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <AnimatePresence>
              <CarsGrid>
                {cars.map((vehicle, index) => (
                  <CarCardLink key={vehicle.id} to={`/cars/${vehicle.id}`}>
                    <CarCard
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CarImage image={vehicle.image}>
                        <VehicleBadges vehicle={vehicle} />
                      </CarImage>
                      <CarContent>
                        <CarTitle>{vehicle.title}</CarTitle>
                        <CarSpecs>
                          {vehicle.specs?.slice(0, 3).map((spec, idx) => (
                            <span key={idx}>{spec} • </span>
                          ))}
                        </CarSpecs>
                        <CarPrice>
                          ₹ {vehicle.price.toLocaleString("en-IN")}
                        </CarPrice>
                        <ViewButton>
                          View Details <ArrowRight size={16} />
                        </ViewButton>
                      </CarContent>
                    </CarCard>
                  </CarCardLink>
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

export default TorqueTunerEditionPage;

// const CarBadges = styled.div`
//   position: absolute;
//   top: 1rem;
//   left: 1rem;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const VehicleBadges = styled.div`
//   position: absolute;
//   top: 1rem;
//   left: 1rem;
//   background: rgba(0, 0, 0, 0.8);
//   color: #fff;
//   padding: 0.3rem 0.8rem;
//   border-radius: 20px;
//   font-size: 0.8rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `;
// const CarBadge = styled.span`
//   position: absolute;
//   top: 1rem;
//   left: 1rem;
//   background: rgba(0, 0, 0, 0.8);
//   color: #fff;
//   padding: 0.3rem 0.8rem;
//   border-radius: 20px;
//   font-size: 0.8rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `;

// <MainContainer filtersVisible={filtersVisible}>
//         {filtersVisible && (
//           <Sidebar>
//             <FilterHeader>
//               <FilterTitle>Filters</FilterTitle>
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "1.5rem",
//                   alignItems: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 <FilterActionButton onClick={() => setFiltersVisible(false)}>
//                   HIDE FILTERS
//                 </FilterActionButton>
//                 <ResetButton onClick={resetFilters}>RESET</ResetButton>
//               </div>
//             </FilterHeader>

//             <FilterSection>
//               <FilterSectionHeader
//                 onClick={() => setBrandSectionOpen(!brandSectionOpen)}
//               >
//                 <FilterSectionTitle>Brand</FilterSectionTitle>
//                 {brandSectionOpen ? (
//                   <ChevronUp size={16} />
//                 ) : (
//                   <ChevronDown size={16} />
//                 )}
//               </FilterSectionHeader>
//               <FilterOptions isOpen={brandSectionOpen}>
//                 {Object.keys(brandFilters).map((brand) => (
//                   <FilterOption key={brand}>
//                     <FilterCheckbox
//                       type="checkbox"
//                       id={brand}
//                       checked={brandFilters[brand]}
//                       onChange={() => handleBrandFilterChange(brand)}
//                     />
//                     <FilterLabel htmlFor={brand}>{brand}</FilterLabel>
//                   </FilterOption>
//                 ))}
//               </FilterOptions>
//             </FilterSection>

//             <FilterSection>
//               <FilterSectionHeader
//                 onClick={() => setStageSectionOpen(!stageSectionOpen)}
//               >
//                 <FilterSectionTitle>Tuning Stage</FilterSectionTitle>
//                 {stageSectionOpen ? (
//                   <ChevronUp size={16} />
//                 ) : (
//                   <ChevronDown size={16} />
//                 )}
//               </FilterSectionHeader>
//               <FilterOptions isOpen={stageSectionOpen}>
//                 {Object.keys(stageFilters).map((stage) => (
//                   <FilterOption key={stage}>
//                     <FilterCheckbox
//                       type="checkbox"
//                       id={stage}
//                       checked={stageFilters[stage]}
//                       onChange={() => handleStageFilterChange(stage)}
//                     />
//                     <FilterLabel htmlFor={stage}>{stage}</FilterLabel>
//                   </FilterOption>
//                 ))}
//               </FilterOptions>
//             </FilterSection>
//           </Sidebar>
//         )}

//         <MainContent>
//           {!filtersVisible && (
//             <ShowFiltersButton onClick={() => setFiltersVisible(true)}>
//               SHOW FILTERS
//             </ShowFiltersButton>
//           )}

//           <HeroSection>
//             <HeroTitle>Torque Tuner Edition</HeroTitle>
//             <HeroDescription>
//               Experience the ultimate in performance engineering with our Torque
//               Tuner Edition vehicles. Each car is meticulously tuned for maximum
//               power, torque, and dynamic driving experience through our
//               proprietary stage-based modification programs.
//             </HeroDescription>
//           </HeroSection>

//           <ContentHeader>
//             <ResultsCount>
//               {isLoading && !isFetchingNextPage
//                 ? "Searching..."
//                 : `${cars.length} performance vehicles found`}
//             </ResultsCount>
//             <SortContainer>
//               <span style={{ color: "#ccc", fontSize: "0.9rem" }}>Sort by</span>
//               <SortSelect
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="name">Name</option>
//                 <option value="brand">Brand</option>
//                 <option value="price">Price</option>
//                 <option value="power">Power</option>
//               </SortSelect>
//             </SortContainer>
//           </ContentHeader>

//           {isError && <p>Error: {error.message}</p>}
//           {isLoading && (
//             <CarsGrid>
//               {/* Render 6 skeletons for a full grid layout */}
//               {Array.from({ length: 6 }).map((_, index) => (
//                 <CarCardSkeleton key={index} />
//               ))}
//             </CarsGrid>
//           )}

//           {!isLoading && !isError && (
//             <CarsGrid>
//               {cars.map((vehicle, index) => (
//                 <CarCardLink key={vehicle.id} to={`/cars/${vehicle.id}`}>
//                   <CarCard
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                   >
//                     <CarImage image={vehicle.image}>
//                       <VehicleBadges vehicle={vehicle} />
//                     </CarImage>
//                     <CarContent>
//                       <CarTitle>{vehicle.title}</CarTitle>
//                       <CarSpecs>
//                         {vehicle.specs.map((spec, idx) => (
//                           <span key={idx}>{spec}</span>
//                         ))}
//                       </CarSpecs>
//                       <CarDescription>{vehicle.description}</CarDescription>
//                       <CarSpecs>
//                         {vehicle.specs?.map((spec, idx) => (
//                           <span key={idx}>{spec}</span>
//                         ))}
//                       </CarSpecs>
//                       <CarPrice>
//                         ₹ {vehicle.price.toLocaleString("en-IN")}
//                       </CarPrice>
//                     </CarContent>
//                   </CarCard>
//                 </CarCardLink>
//               ))}
//             </CarsGrid>
//           )}

//           <div ref={loadMoreRef} style={{ height: "1px", margin: "1rem 0" }}>
//             {isFetchingNextPage && <p>Loading more...</p>}
//             {!hasNextPage && cars.length > 0 && <p>No more cars to load.</p>}
//           </div>
//         </MainContent>
//       </MainContainer>
