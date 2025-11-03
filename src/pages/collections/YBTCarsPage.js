import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, ArrowRight } from "lucide-react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { CarCardSkeleton } from "../../components/cards/CarCardSkeleton";
import React from "react";
import VehicleBadges from "../../components/common/VehicleBadges";
import { useCars } from "../../hooks/useCars";

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

  @media (max-width: 1024px) {
    display: none;
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

const YBTCarsPage = () => {
  const [filters, setFilters] = useState({
    brand: "",
    price: "",
    year: "",
  });

  const handleResetFilters = () => {
    setFilters({
      brand: "",
      price: "",
      year: "",
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const {
    cars,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCars("YBT", filters, { useInfinite: true });

  const availableBrands = useMemo(() => {
    if (!cars) return [];
    return [...new Set(cars.map((car) => car.brand).filter(Boolean))];
  }, [cars]);

  const availableYears = useMemo(() => {
    if (!cars) return [];
    return [...new Set(cars.map((car) => car.year).filter(Boolean))].sort(
      (a, b) => b - a
    );
  }, [cars]);

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
      <Sidebar>
        <FilterSection>
          <FilterTitle>
            <Filter size={20} /> Filters
          </FilterTitle>

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
              {availableBrands.map((brand) => (
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
              {availableYears.map((year) => (
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
                    key={car.id} // Use the unique car ID for the key
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
