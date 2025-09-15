import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounceHook";
import { useInfiniteQuery } from "@tanstack/react-query";

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

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CategoryTab = styled.button`
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
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
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
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

const ModelsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [brandSectionOpen, setBrandSectionOpen] = useState(true);

  // CHANGED: Single state for the active category instead of a filter object
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "cars";

  // Brand filter states (these can still work with the new category endpoints)
  const [brandFilters, setBrandFilters] = useState({
    "Aston Martin": false,
    Audi: false,
    BMW: false,
    Bentley: false,
    Bugatti: false,
    Ferrari: false,
    Lamborghini: false,
    Mercedes: false,
    Porsche: false,
    Tesla: false,
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const queryKey = useMemo(() => {
    const activeBrands = Object.keys(brandFilters).filter(
      (brand) => brandFilters[brand]
    );
    return [
      "models",
      activeCategory,
      sortBy,
      debouncedSearchTerm,
      activeBrands,
    ];
  }, [activeCategory, sortBy, debouncedSearchTerm, brandFilters]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = null }) => {
      const url = new URL(`${process.env.REACT_APP_API_URL}/${activeCategory}`);
      url.searchParams.append("limit", 10);
      url.searchParams.append("sortBy", sortBy);
      if (debouncedSearchTerm) {
        url.searchParams.append("searchTerm", debouncedSearchTerm);
      }
      const activeBrands = Object.keys(brandFilters).filter(
        (brand) => brandFilters[brand]
      );
      if (activeBrands.length > 0) {
        url.searchParams.append("brands", activeBrands.join(","));
      }
      if (pageParam) {
        url.searchParams.append("cursor", pageParam);
      }
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
      return response.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  const items = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const handleScroll = () => {
      if (
        (sortBy === "newest" || sortBy === "oldest") &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, sortBy]);

  const handleBrandFilterChange = (brand) => {
    setBrandFilters((prev) => ({ ...prev, [brand]: !prev[brand] }));
  };

  const resetFilters = () => {
    setBrandFilters(
      Object.keys(brandFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
    setSearchTerm("");
    setSearchParams({ category: "cars" });
  };

  const handleTabClick = (category) => {
    setSearchParams({ category });
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
                placeholder="Search"
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
          </Sidebar>
        )}

        <MainContent>
          {!filtersVisible && (
            <ShowFiltersButton onClick={() => setFiltersVisible(true)}>
              SHOW FILTERS
            </ShowFiltersButton>
          )}

          <CategoryTabs>
            <CategoryTab
              active={activeCategory === "cars"}
              onClick={() => handleTabClick("cars")}
            >
              Cars
            </CategoryTab>
            <CategoryTab
              active={activeCategory === "bikes"}
              onClick={() => handleTabClick("bikes")}
            >
              Bikes
            </CategoryTab>
            <CategoryTab
              active={activeCategory === "motorhomes"}
              onClick={() => handleTabClick("motorhomes")}
            >
              Motorhomes
            </CategoryTab>
            <CategoryTab
              active={activeCategory === "caravan"}
              onClick={() => handleTabClick("caravan")}
            >
              Caravan
            </CategoryTab>
          </CategoryTabs>

          <ContentHeader>
            <ResultsCount>{items.length} results found</ResultsCount>
            <SortContainer>
              <span style={{ color: "#ccc", fontSize: "0.9rem" }}>Sort by</span>
              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name_asc">Name (A–Z)</option>
                <option value="name_desc">Name (Z–A)</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </SortSelect>
            </SortContainer>
          </ContentHeader>

          {isLoading && <p>Loading...</p>}
          {isError && <p>Error: {error.message}</p>}
          {!isLoading && items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ fontSize: "1.5rem", color: "#666" }}>
                Oops, we're cooking something! 🍳 Please wait...
              </p>
              <p style={{ fontSize: "1rem", color: "#999", marginTop: "1rem" }}>
                No {activeCategory} available at the moment.
              </p>
            </div>
          ) : (
            <CarsGrid>
              {items.map((model, index) => (
                <CarCardLink
                  key={model.id}
                  to={`/${activeCategory}/${model.id}`}
                >
                  <CarCard
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CarImage image={model.thumbnail}>
                      <CarBadges>
                        {model.badges.map((badge, badgeIndex) => (
                          <CarBadge key={badgeIndex}>{badge}</CarBadge>
                        ))}
                      </CarBadges>
                    </CarImage>
                    <CarContent>
                      <CarTitle>{model.title}</CarTitle>
                      <CarDescription>{model.description}</CarDescription>
                    </CarContent>
                  </CarCard>
                </CarCardLink>
              ))}
            </CarsGrid>
          )}
          {isFetchingNextPage && <p>Loading more...</p>}
          {!hasNextPage && items.length > 0 && (
            <p>No more {activeCategory} to show!</p>
          )}
        </MainContent>
      </MainContainer>
    </PageWrapper>
  );
};

export default ModelsPage;
