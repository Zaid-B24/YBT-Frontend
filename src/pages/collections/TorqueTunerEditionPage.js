import React, { useState, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { CarCardSkeleton } from "../../components/cards/CarCardSkeleton";
import { useCars } from "../../hooks/useCars";
import VehicleBadges from "../../components/common/VehicleBadges";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const MainContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: ${(props) =>
    props.filtersVisible ? "300px 1fr" : "1fr"};
  gap: ${(props) => (props.filtersVisible ? "3rem" : "0")};
  transition: all 0.3s ease;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// Sidebar Styles
const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0;
  height: fit-content;
  position: sticky;
  top: 120px;

  @media (max-width: 1200px) {
    position: static;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 55px;
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const FilterActionButton = styled.button`
  background: transparent;
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

const ShowFiltersButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
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

const FilterSection = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const FilterSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

const FilterSectionTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const FilterOptions = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const FilterCheckbox = styled.input`
  width: 16px;
  height: 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

// Main Content Styles
const MainContent = styled.div``;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 2.5rem;
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

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResultsCount = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin: 0;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SortSelect = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;

  option {
    background: #333;
    color: #fff;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CarCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-5px);
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
`;

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

const CarContent = styled.div`
  padding: 1.5rem;
`;

const CarTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const CarDescription = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
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

const TorqueTunerEditionPage = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [brandFilters, setBrandFilters] = useState({
    BMW: false,
    Audi: false,
    Mercedes: false,
    Porsche: false,
    Lamborghini: false,
    McLaren: false,
  });

  const [stageFilters, setStageFilters] = useState({
    "Stage 1": false,
    "Stage 2": false,
    "Stage 3": false,
  });

  const [brandSectionOpen, setBrandSectionOpen] = useState(true);
  const [stageSectionOpen, setStageSectionOpen] = useState(true);

  const activeBrands = useMemo(
    () => Object.keys(brandFilters).filter((brand) => brandFilters[brand]),
    [brandFilters]
  );
  const activeStages = useMemo(
    () => Object.keys(stageFilters).filter((stage) => stageFilters[stage]),
    [stageFilters]
  );

  const apiStages = useMemo(
    () => activeStages.map((s) => s.replace(" ", "").toUpperCase()),
    [activeStages]
  );

  const {
    cars,
    isLoading,
    isError,
    error,
    fetchNextPage, // Get the function to fetch more data
    hasNextPage, // Know if there is more data to fetch
    isFetchingNextPage, // Know when the next page is being fetched
  } = useCars(
    "TORQUE_TUNER",
    {
      sortBy,
      brands: activeBrands,
      stages: apiStages,
    },
    { useInfinite: true } // Enable infinite scrolling!
  );

  // 3. ADD the infinite scroll logic using IntersectionObserver
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
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  const handleBrandFilterChange = (brand) => {
    setBrandFilters((prev) => ({
      ...prev,
      [brand]: !prev[brand],
    }));
  };

  const handleStageFilterChange = (stage) => {
    setStageFilters((prev) => ({
      ...prev,
      [stage]: !prev[stage],
    }));
  };

  const resetFilters = () => {
    setBrandFilters(
      Object.keys(brandFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
    setStageFilters(
      Object.keys(stageFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
  };

  return (
    <PageWrapper>
      <MainContainer filtersVisible={filtersVisible}>
        {filtersVisible && (
          <Sidebar>
            <FilterHeader>
              <FilterTitle>Filters</FilterTitle>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <FilterActionButton onClick={() => setFiltersVisible(false)}>
                  HIDE FILTERS
                </FilterActionButton>
                <ResetButton onClick={resetFilters}>RESET</ResetButton>
              </div>
            </FilterHeader>

            {/* <SearchContainer>
              <SearchIcon />
              <SearchInput
                placeholder="Search performance vehicles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer> */}

            <FilterSection>
              <FilterSectionHeader
                onClick={() => setBrandSectionOpen(!brandSectionOpen)}
              >
                <FilterSectionTitle>Brand</FilterSectionTitle>
                {brandSectionOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </FilterSectionHeader>
              <FilterOptions isOpen={brandSectionOpen}>
                {Object.keys(brandFilters).map((brand) => (
                  <FilterOption key={brand}>
                    <FilterCheckbox
                      type="checkbox"
                      id={brand}
                      checked={brandFilters[brand]}
                      onChange={() => handleBrandFilterChange(brand)}
                    />
                    <FilterLabel htmlFor={brand}>{brand}</FilterLabel>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterSection>

            <FilterSection>
              <FilterSectionHeader
                onClick={() => setStageSectionOpen(!stageSectionOpen)}
              >
                <FilterSectionTitle>Tuning Stage</FilterSectionTitle>
                {stageSectionOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </FilterSectionHeader>
              <FilterOptions isOpen={stageSectionOpen}>
                {Object.keys(stageFilters).map((stage) => (
                  <FilterOption key={stage}>
                    <FilterCheckbox
                      type="checkbox"
                      id={stage}
                      checked={stageFilters[stage]}
                      onChange={() => handleStageFilterChange(stage)}
                    />
                    <FilterLabel htmlFor={stage}>{stage}</FilterLabel>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterSection>
          </Sidebar>
        )}

        <MainContent>
          {!filtersVisible && (
            <ShowFiltersButton onClick={() => setFiltersVisible(true)}>
              SHOW FILTERS
            </ShowFiltersButton>
          )}

          <HeroSection>
            <HeroTitle>Torque Tuner Edition</HeroTitle>
            <HeroDescription>
              Experience the ultimate in performance engineering with our Torque
              Tuner Edition vehicles. Each car is meticulously tuned for maximum
              power, torque, and dynamic driving experience through our
              proprietary stage-based modification programs.
            </HeroDescription>
          </HeroSection>

          <ContentHeader>
            <ResultsCount>
              {isLoading && !isFetchingNextPage
                ? "Searching..."
                : `${cars.length} performance vehicles found`}
            </ResultsCount>
            <SortContainer>
              <span style={{ color: "#ccc", fontSize: "0.9rem" }}>Sort by</span>
              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="brand">Brand</option>
                <option value="price">Price</option>
                <option value="power">Power</option>
              </SortSelect>
            </SortContainer>
          </ContentHeader>

          {isError && <p>Error: {error.message}</p>}
          {isLoading && (
            <CarsGrid>
              {/* Render 6 skeletons for a full grid layout */}
              {Array.from({ length: 6 }).map((_, index) => (
                <CarCardSkeleton key={index} />
              ))}
            </CarsGrid>
          )}

          {!isLoading && !isError && (
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
                        {vehicle.specs.map((spec, idx) => (
                          <span key={idx}>{spec}</span>
                        ))}
                      </CarSpecs>
                      <CarDescription>{vehicle.description}</CarDescription>
                      <CarSpecs>
                        {vehicle.specs?.map((spec, idx) => (
                          <span key={idx}>{spec}</span>
                        ))}
                      </CarSpecs>
                      <CarPrice>
                        ₹ {vehicle.price.toLocaleString("en-IN")}
                      </CarPrice>
                    </CarContent>
                  </CarCard>
                </CarCardLink>
              ))}
            </CarsGrid>
          )}

          <div ref={loadMoreRef} style={{ height: "1px", margin: "1rem 0" }}>
            {isFetchingNextPage && <p>Loading more...</p>}
            {!hasNextPage && cars.length > 0 && <p>No more cars to load.</p>}
          </div>
        </MainContent>
      </MainContainer>
    </PageWrapper>
  );
};

export default TorqueTunerEditionPage;
