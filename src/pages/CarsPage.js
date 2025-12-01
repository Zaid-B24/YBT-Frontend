import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Search } from "lucide-react";
import CarCard from "../components/cards/CarCard";
//import { carsData } from '../data/carsData';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000000;
`;

const PageHeader = styled.section`
  padding: 4rem 2rem 2rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  text-align: center;
`;

const PageTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.section`
  padding: 2rem;
  background: #050505;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const FilterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ResultsInfo = styled.div`
  color: #cccccc;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FilterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #666;
`;

const SortSelect = styled.select`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }

  option {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

const FilterPanel = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const FilterContent = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
`;

const CloseButton = styled.button`
  color: #ffffff;
  padding: 0.5rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
`;

const FilterGroupTitle = styled.h4`
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FilterOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
`;

const FilterOption = styled.button`
  padding: 0.5rem 1rem;
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.02)"};
  border: 1px solid
    ${(props) =>
      props.active ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.8rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const CarsGrid = styled.section`
  padding: 2rem;
`;

const GridContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.1rem;
`;

const carsData = [{}];

const CarsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    model: [],
    type: [],
  });

  const brands = [...new Set(carsData.map((car) => car.brand))].sort();
  const models = [...new Set(carsData.map((car) => car.model))].sort();
  const types = [...new Set(carsData.map((car) => car.type))].sort();

  const filteredCars = useMemo(() => {
    let filtered = carsData.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand =
        activeFilters.brand.length === 0 ||
        activeFilters.brand.includes(car.brand);
      const matchesModel =
        activeFilters.model.length === 0 ||
        activeFilters.model.includes(car.model);
      const matchesType =
        activeFilters.type.length === 0 ||
        activeFilters.type.includes(car.type);

      return matchesSearch && matchesBrand && matchesModel && matchesType;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, activeFilters]);

  const toggleFilter = (category, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const resetFilters = () => {
    setActiveFilters({
      brand: [],
      model: [],
      type: [],
    });
    setSearchTerm("");
  };

  return (
    <PageWrapper>
      <PageHeader>
        <PageTitle>Models</PageTitle>
        <PageSubtitle>
          Discover our exclusive collection of luxury automotive masterpieces,
          each crafted with uncompromising attention to detail and performance.
        </PageSubtitle>
      </PageHeader>

      <FilterSection>
        <FilterContainer>
          <FilterLeft>
            <FilterButton onClick={() => setShowFilters(true)}>
              <Filter size={16} />
              Filters
            </FilterButton>
            <ResultsInfo>{filteredCars.length} results</ResultsInfo>
          </FilterLeft>

          <FilterRight>
            <SearchBox>
              <SearchIcon />
              <SearchInput
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>
            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="newest">From newest</option>
              <option value="oldest">From oldest</option>
            </SortSelect>
          </FilterRight>
        </FilterContainer>
      </FilterSection>

      <CarsGrid>
        <GridContainer>
          <AnimatePresence>
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </AnimatePresence>
        </GridContainer>

        {filteredCars.length === 0 && (
          <NoResults>
            <h3>No results found.</h3>
            <button
              onClick={resetFilters}
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Reset filters
            </button>
          </NoResults>
        )}
      </CarsGrid>

      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FilterContent>
              <FilterHeader>
                <FilterTitle>Filter Models</FilterTitle>
                <CloseButton onClick={() => setShowFilters(false)}>
                  <X size={24} />
                </CloseButton>
              </FilterHeader>

              <FilterGroup>
                <FilterGroupTitle>Brand</FilterGroupTitle>
                <FilterOptions>
                  {brands.map((brand) => (
                    <FilterOption
                      key={brand}
                      active={activeFilters.brand.includes(brand)}
                      onClick={() => toggleFilter("brand", brand)}
                    >
                      {brand}
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterGroup>

              <FilterGroup>
                <FilterGroupTitle>Model</FilterGroupTitle>
                <FilterOptions>
                  {models.slice(0, 20).map((model) => (
                    <FilterOption
                      key={model}
                      active={activeFilters.model.includes(model)}
                      onClick={() => toggleFilter("model", model)}
                    >
                      {model}
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterGroup>

              <FilterGroup>
                <FilterGroupTitle>Type</FilterGroupTitle>
                <FilterOptions>
                  {types.map((type) => (
                    <FilterOption
                      key={type}
                      active={activeFilters.type.includes(type)}
                      onClick={() => toggleFilter("type", type)}
                    >
                      {type}
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterGroup>

              <button
                onClick={resetFilters}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "4px",
                  marginTop: "1rem",
                }}
              >
                Reset Filters
              </button>
            </FilterContent>
          </FilterPanel>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default CarsPage;
