import { useEffect, useMemo, useState } from "react";
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
    gap: 1.5rem;
  }
`;

const CarCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px;

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
  /* Removed fixed height */
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
  aspect-ratio: 16 / 9; /* Use aspect ratio for consistent image size */
  object-fit: cover;
`;

const CarBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem; /* Better spacing for multiple badges */
`;

const CarBadge = styled.span`
  background: #dc2626;
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
`;

const CarContent = styled.div`
  padding: 1.25rem; /* Reduced padding */
  flex-grow: 1; /* Ensures content pushes down to fill space */
  display: flex;
  flex-direction: column;
`;

const CarTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0 0 0.25rem; /* Reduced bottom margin */
  color: #fff;
`;
const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-top: auto; /* Pushes the price to the bottom of the card */
`;
const ProductSpecs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0 1rem; /* Adjusting margin to better fit within the card layout */
  font-size: 0.8rem;
  font-weight: 500;
`;

const SpecItem = styled.span`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
`;

const product = [
  {
    id: 1,
    title: "GS Custom Lamborghini Aventador",
    price: "₹6,50,00,000",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    specs: ["V12 Engine", "750 HP", "AWD"],
    badge: "GS Signature",
  },
  {
    id: 2,
    title: "GS Ferrari 488 Spider",
    price: "₹5,80,00,000",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    specs: ["V8 Twin-Turbo", "670 HP", "RWD"],
    badge: "GS Custom",
  },
  {
    id: 3,
    title: "GS Porsche 911 GT3 RS",
    price: "₹4,20,00,000",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    specs: ["H6 Naturally Aspirated", "520 HP", "RWD"],
    badge: "GS Track",
  },
  {
    id: 4,
    title: "GS McLaren 720S",
    price: "₹5,50,00,000",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
    specs: ["V8 Twin-Turbo", "720 HP", "RWD"],
    badge: "GS Performance",
  },
  {
    id: 5,
    title: "GS Aston Martin Vantage",
    price: "₹3,80,00,000",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    specs: ["V8 Twin-Turbo", "510 HP", "RWD"],
    badge: "GS Luxury",
  },
  {
    id: 6,
    title: "GS Bentley Continental GT",
    price: "₹4,50,00,000",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    specs: ["W12 Twin-Turbo", "635 HP", "AWD"],
    badge: "GS Grand Tourer",
  },
];

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
                Oops we are cooking something! We'll get back soon 😉
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
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
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
                      <CarTitle>
                        {model.brand} {model.title}
                      </CarTitle>
                      <ProductSpecs>
                        {product[2].specs.map((spec, idx) => (
                          <SpecItem key={idx}>{spec}</SpecItem>
                        ))}
                      </ProductSpecs>
                      <ProductPrice>
                        ₹ {model.ybtPrice.toLocaleString("en-IN")}
                      </ProductPrice>
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
