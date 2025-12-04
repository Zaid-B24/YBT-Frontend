import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, ArrowRight, X, Search } from "lucide-react";
import { CarCardSkeleton } from "../../components/cards/CarCardSkeleton";
import { useBikeFilters } from "../../hooks/useBikeFilters";
import { useBikes } from "../../hooks/useBikes";

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

const BikesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BikeCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px 20px 0 0;
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

const BikeImage = styled.div`
  height: 250px;

  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
  border-radius: 20px 20px 0 0;
`;

const BikeBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BikeContent = styled.div`
  padding: 1.5rem;
`;

const BikeTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const BikeSpecs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const BikePrice = styled.div`
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

const YBTBikesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    engine: "",
    year: "",
  });

  const { data: filterOptions, isLoading: filtersLoading } = useBikeFilters();

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
      q: appliedSearch,
    }),
    [filters, appliedSearch]
  );

  const {
    bikes,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBikes(activeParams, { useInfinite: true });

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
                  placeholder="Search bikes..."
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
          <HeroTitle>YBT Bikes Collection</HeroTitle>
          <HeroSubtitle>
            Experience our exclusive collection of high-performance motorcycles,
            each featuring signature YBT modifications and premium
            customizations for the ultimate riding experience.
          </HeroSubtitle>
          <MobileToggleBtn onClick={() => setIsSidebarOpen(true)}>
            <Filter size={18} />
            Search & Filters
          </MobileToggleBtn>
        </HeroSection>

        {isLoading && !isFetchingNextPage ? (
          <BikesGrid>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </BikesGrid>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <AnimatePresence>
              <BikesGrid layout>
                {bikes.map((bike, index) => (
                  <BikeCard
                    key={bike.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <BikeImage image={bike.image}>
                      <BikeBadge>{bike.badges?.[0] || "Featured"}</BikeBadge>
                    </BikeImage>
                    <BikeContent>
                      <BikeTitle>{bike.title}</BikeTitle>
                      <BikeSpecs>
                        <span>{bike.specs.join(" • ")}</span>
                      </BikeSpecs>
                      <BikePrice>
                        ₹{bike.ybtPrice?.toLocaleString("en-IN")}
                      </BikePrice>
                      <ViewButton to={`/bikes/${bike.id}`}>
                        View Details <ArrowRight size={16} />
                      </ViewButton>
                    </BikeContent>
                  </BikeCard>
                ))}
              </BikesGrid>
            </AnimatePresence>
            <div
              ref={loadMoreRef}
              style={{ height: "100px", marginTop: "2rem" }}
            >
              {isFetchingNextPage ? (
                <p style={{ textAlign: "center" }}>Loading more...</p>
              ) : !hasNextPage && bikes.length > 0 ? (
                <p style={{ textAlign: "center" }}>You've reached the end!</p>
              ) : null}
            </div>
          </>
        )}
      </MainContent>
    </PageWrapper>
  );
};

export default YBTBikesPage;

// {isError && <p>Error: {error.message}</p>}
//         {isLoading && (
//           <BikesGrid>
//             {Array.from({ length: 6 }).map((_, index) => (
//               <CarCardSkeleton key={index} />
//             ))}
//           </BikesGrid>
//         )}

//         {!isLoading && !isError && (
//           <BikesGrid>
//             {/* Map over the 'bikes' array from useQuery */}
//             {bikes.map((bike, index) => (
//               <BikeCard
//                 key={bike.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <BikeImage image={bike.thumbnail}>
//                   {" "}
//                   {/* Use thumbnail from API */}
//                   <BikeBadge>{bike.badges?.[0] || "Featured"}</BikeBadge>{" "}
//                   {/* Safely access first badge */}
//                 </BikeImage>
//                 <BikeContent>
//                   <BikeTitle>{bike.title}</BikeTitle>
//                   <BikeSpecs>
//                     <span>{bike.specs.join(" • ")}</span>
//                   </BikeSpecs>
//                   <BikePrice>
//                     ₹{bike.ybtPrice?.toLocaleString("en-IN")}
//                   </BikePrice>{" "}
//                   {/* Safely format price */}
//                   <ViewButton to={`/bikes/${bike.id}`}>
//                     {" "}
//                     {/* Link to bike detail page */}
//                     View Details
//                     <ArrowRight size={16} />
//                   </ViewButton>
//                 </BikeContent>
//               </BikeCard>
//             ))}
//           </BikesGrid>
//         )}

///////////////////////////////////////////////////

// {
//   /*
// <BikesGrid>
//           {filteredBikes.map((bike, index) => (
//             <BikeCard
//               key={bike.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <BikeImage image={bike.image}>
//                 <BikeBadge>{bike.badge}</BikeBadge>
//                 <BikeActions>
//                   <ActionButton>
//                     <Heart size={16} />
//                   </ActionButton>
//                   <ActionButton>
//                     <ShoppingCart size={16} />
//                   </ActionButton>
//                 </BikeActions>
//               </BikeImage>
//               <BikeContent>
//                 <BikeTitle>{bike.title}</BikeTitle>
//                 <BikeSpecs>
//                   {bike.specs.map((spec, idx) => (
//                     <span key={idx}>{spec}</span>
//                   ))}
//                 </BikeSpecs>
//                 <BikePrice>{bike.price}</BikePrice>
//                 <ViewButton to={`/cars/${bike.id}`}>
//                   View Details
//                   <ArrowRight size={16} />
//                 </ViewButton>
//               </BikeContent>
//             </BikeCard>
//           ))}
//         </BikesGrid>
// // const ybtBikes = [
// //     {
// //       id: 1,
// //       title: "YBT Ducati Panigale V4",
// //       brand: "Ducati",
// //       year: "2023",
// //       price: "₹28,50,000",
// //       image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
// //       specs: ["1103cc V4", "214 HP", "6-Speed"],
// //       badge: "YBT Signature"
// //     },
// //     {
// //       id: 2,
// //       title: "YBT Kawasaki Ninja H2",
// //       brand: "Kawasaki",
// //       year: "2023",
// //       price: "₹35,00,000",
// //       image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
// //       specs: ["998cc I4", "310 HP", "6-Speed"],
// //       badge: "YBT Supercharged"
// //     },
// //     {
// //       id: 3,
// //       title: "YBT BMW S1000RR",
// //       brand: "BMW",
// //       year: "2023",
// //       price: "₹22,50,000",
// //       image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
// //       specs: ["999cc I4", "205 HP", "6-Speed"],
// //       badge: "YBT Performance"
// //     },
// //     {
// //       id: 4,
// //       title: "YBT Yamaha YZF-R1M",
// //       brand: "Yamaha",
// //       year: "2023",
// //       price: "₹26,00,000",
// //       image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
// //       specs: ["998cc I4", "200 HP", "6-Speed"],
// //       badge: "YBT Racing"
// //     },
// //     {
// //       id: 5,
// //       title: "YBT Aprilia RSV4 Factory",
// //       brand: "Aprilia",
// //       year: "2023",
// //       price: "₹32,00,000",
// //       image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
// //       specs: ["1077cc V4", "217 HP", "6-Speed"],
// //       badge: "YBT Factory"
// //     },
// //     {
// //       id: 6,
// //       title: "YBT Honda CBR1000RR-R",
// //       brand: "Honda",
// //       year: "2023",
// //       price: "₹24,50,000",
// //       image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
// //       specs: ["999cc I4", "215 HP", "6-Speed"],
// //       badge: "YBT Fireblade"
// //     }
// //   ]; */
// }
