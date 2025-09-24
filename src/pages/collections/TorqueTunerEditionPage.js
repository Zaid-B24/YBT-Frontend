import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CarCardSkeleton } from "../../components/cards/CarCardSkeleton";

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

const SearchContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 0.9rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.5);
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

const CarBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CarBadge = styled.span`
  background: rgba(255, 69, 0, 0.9);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  border-radius: 20px;
`;

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

const fetchTunerCars = async ({
  searchTerm,
  sortBy,
  activeBrands,
  activeStages,
}) => {
  const params = new URLSearchParams();

  params.append("collectionType", "TORQUE_TUNER");

  if (searchTerm) params.append("searchTerm", searchTerm);
  if (sortBy) params.append("sortBy", sortBy);
  if (activeBrands.length > 0) params.append("brands", activeBrands.join(","));
  if (activeStages.length > 0) {
    const apiStages = activeStages.map((s) => s.replace(" ", "").toUpperCase());
    params.append("stages", apiStages.join(","));
  }

  const apiUrl = `${process.env.REACT_APP_API_URL}/cars?${params.toString()}`;
  console.log("Fetching from:", apiUrl);

  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Network response was not ok");

  const data = await response.json();
  return data;
};

const TorqueTunerEditionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filtersVisible, setFiltersVisible] = useState(true);

  // Filter states
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

  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useQuery({
    // The query key now includes all filters, so it refetches when any filter changes
    queryKey: ["tunerCars", { searchTerm, sortBy, activeBrands, activeStages }],
    queryFn: () =>
      fetchTunerCars({ searchTerm, sortBy, activeBrands, activeStages }),
    keepPreviousData: true,
  });
  const cars = responseData?.data || [];

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
    setSearchTerm("");
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

            <SearchContainer>
              <SearchIcon />
              <SearchInput
                placeholder="Search performance vehicles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

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
              {isLoading
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
                    <CarImage image={vehicle.thumbnail}>
                      <CarBadges>
                        {vehicle.badges?.map((badge, badgeIndex) => (
                          <CarBadge key={badgeIndex}>
                            {badge.includes("STAGE") && <Zap size={12} />}
                            {badge}
                          </CarBadge>
                        ))}
                      </CarBadges>
                    </CarImage>
                    <CarContent>
                      <CarTitle>{vehicle.title}</CarTitle>
                      <CarDescription>{vehicle.description}</CarDescription>
                      <CarSpecs>
                        {vehicle.specs?.map((spec, idx) => (
                          <span key={idx}>{spec}</span>
                        ))}
                      </CarSpecs>
                      <CarPrice>
                        ₹ {vehicle.ybtPrice.toLocaleString("en-IN")}
                      </CarPrice>
                    </CarContent>
                  </CarCard>
                </CarCardLink>
              ))}
            </CarsGrid>
          )}
        </MainContent>
      </MainContainer>
    </PageWrapper>
  );
};

export default TorqueTunerEditionPage;

// const tunerVehicles = [
//   {
//     id: 1,
//     title: "Torque Tuner BMW M3 Competition",
//     description: "Ultimate performance sedan with carbon fiber aerodynamics and 650HP power upgrade through Stage 3 tuning.",
//     brand: "BMW",
//     year: "2023",
//     price: "₹1,20,00,000",
//     image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     specs: ["3.0L Twin-Turbo", "650 HP", "AWD"],
//     badges: ["STAGE 3", "PERFORMANCE"],
//     stage: "Stage 3"
//   },
//   {
//     id: 2,
//     title: "Torque Tuner Audi RS6 Avant",
//     description: "High-performance wagon with enhanced turbocharging and ECU mapping delivering 750HP through Stage 2+ modifications.",
//     brand: "Audi",
//     year: "2023",
//     price: "₹1,80,00,000",
//     image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     specs: ["4.0L Twin-Turbo V8", "750 HP", "AWD"],
//     badges: ["STAGE 2", "WAGON"],
//     stage: "Stage 2"
//   },
//   {
//     id: 3,
//     title: "Torque Tuner Mercedes AMG GT 63S",
//     description: "Track-focused grand tourer with aggressive Stage 3+ tuning package delivering 800HP and enhanced aerodynamics.",
//     brand: "Mercedes",
//     year: "2023",
//     price: "₹2,50,00,000",
//     image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     specs: ["4.0L Twin-Turbo V8", "800 HP", "AWD"],
//     badges: ["STAGE 3", "AMG"],
//     stage: "Stage 3"
//   },
//   {
//     id: 4,
//     title: "Torque Tuner Porsche 911 Turbo S",
//     description: "Iconic sports car with precision Stage 2 tuning, delivering 750HP while maintaining legendary Porsche handling.",
//     brand: "Porsche",
//     year: "2023",
//     price: "₹3,20,00,000",
//     image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
//     specs: ["3.8L Twin-Turbo H6", "750 HP", "AWD"],
//     badges: ["STAGE 2", "TURBO S"],
//     stage: "Stage 2"
//   },
//   {
//     id: 5,
//     title: "Torque Tuner Lamborghini Huracán",
//     description: "Italian supercar with Stage 1+ naturally aspirated V10 enhancement, boosting power to 720HP with exotic exhaust note.",
//     brand: "Lamborghini",
//     year: "2023",
//     price: "₹4,80,00,000",
//     image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     specs: ["5.2L V10", "720 HP", "AWD"],
//     badges: ["STAGE 1", "V10"],
//     stage: "Stage 1"
//   },
//   {
//     id: 6,
//     title: "Torque Tuner McLaren 720S",
//     description: "British engineering excellence with Stage 3 modifications, achieving 850HP through advanced turbocharger upgrades.",
//     brand: "McLaren",
//     year: "2023",
//     price: "₹5,50,00,000",
//     image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     specs: ["4.0L Twin-Turbo V8", "850 HP", "RWD"],
//     badges: ["STAGE 3", "MCLAREN"],
//     stage: "Stage 3"
//   }
// ];
