import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ChevronUp, MapPin, Star } from "lucide-react";

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

const VehiclesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VehicleCard = styled(motion.div)`
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

const VehicleCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const VehicleImage = styled.div`
  height: 250px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
`;

const VehicleBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const VehicleBadge = styled.span`
  background: rgba(34, 197, 94, 0.9);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  border-radius: 20px;
`;

const VehicleRating = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.5rem 0.8rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
`;

const VehicleContent = styled.div`
  padding: 1.5rem;
`;

const VehicleTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const VehicleDescription = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const VehicleSpecs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const VehiclePricing = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PriceOption = styled.div`
  text-align: center;
`;

const PriceLabel = styled.div`
  font-size: 0.8rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PriceAmount = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
`;

const VehicleLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const RentalsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter states
  const [categoryFilters, setCategoryFilters] = useState({
    Cars: false,
    Bikes: false,
    Motorhomes: false,
  });

  const [brandFilters, setBrandFilters] = useState({
    BMW: false,
    Audi: false,
    Mercedes: false,
    Porsche: false,
    Lamborghini: false,
    Ducati: false,
    Kawasaki: false,
    "Luxury Nomad": false,
  });

  const [locationFilters, setLocationFilters] = useState({
    Mumbai: false,
    Delhi: false,
    Bangalore: false,
    Chennai: false,
    Pune: false,
    Hyderabad: false,
  });

  const [categorySectionOpen, setCategorySectionOpen] = useState(true);
  const [brandSectionOpen, setBrandSectionOpen] = useState(true);
  const [locationSectionOpen, setLocationSectionOpen] = useState(true);

  const rentalVehicles = [
    {
      id: 1,
      title: "BMW M3 Competition",
      description:
        "Experience the thrill of German engineering with this high-performance sedan featuring twin-turbo power and precision handling.",
      category: "Cars",
      brand: "BMW",
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["3.0L Twin-Turbo", "503 HP", "Auto"],
      badges: ["LUXURY", "PERFORMANCE"],
      rating: 4.8,
      dailyPrice: "₹15,000",
      monthlyPrice: "₹3,50,000",
    },
    {
      id: 2,
      title: "Ducati Panigale V4",
      description:
        "Italian superbike excellence with V4 engine delivering unmatched performance and racing heritage on two wheels.",
      category: "Bikes",
      brand: "Ducati",
      location: "Delhi",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["1103cc V4", "214 HP", "6-Speed"],
      badges: ["SUPERBIKE", "TRACK"],
      rating: 4.9,
      dailyPrice: "₹8,000",
      monthlyPrice: "₹1,80,000",
    },
    {
      id: 3,
      title: "Luxury Nomad Elite 35",
      description:
        "Premium motorhome with luxury amenities, perfect for family road trips and extended travel adventures across India.",
      category: "Motorhomes",
      brand: "Luxury Nomad",
      location: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["35 ft", "6 Berth", "Diesel"],
      badges: ["LUXURY", "FAMILY"],
      rating: 4.7,
      dailyPrice: "₹12,000",
      monthlyPrice: "₹2,80,000",
    },
    {
      id: 4,
      title: "Porsche 911 Carrera",
      description:
        "Iconic sports car combining timeless design with modern performance, delivering the ultimate driving experience.",
      category: "Cars",
      brand: "Porsche",
      location: "Chennai",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      specs: ["3.0L Turbo", "379 HP", "PDK"],
      badges: ["SPORTS", "PREMIUM"],
      rating: 4.9,
      dailyPrice: "₹18,000",
      monthlyPrice: "₹4,20,000",
    },
    {
      id: 5,
      title: "Kawasaki Ninja H2",
      description:
        "Supercharged hyperbike pushing the boundaries of motorcycle performance with cutting-edge technology.",
      category: "Bikes",
      brand: "Kawasaki",
      location: "Pune",
      image:
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["998cc SC", "197 HP", "6-Speed"],
      badges: ["HYPERBIKE", "SUPERCHARGED"],
      rating: 4.8,
      dailyPrice: "₹10,000",
      monthlyPrice: "₹2,20,000",
    },
    {
      id: 6,
      title: "Mercedes AMG GT",
      description:
        "German grand tourer combining luxury and performance with handcrafted AMG engineering excellence.",
      category: "Cars",
      brand: "Mercedes",
      location: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["4.0L V8", "469 HP", "AMG"],
      badges: ["AMG", "GT"],
      rating: 4.8,
      dailyPrice: "₹20,000",
      monthlyPrice: "₹4,80,000",
    },
  ];

  const handleCategoryFilterChange = (category) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleBrandFilterChange = (brand) => {
    setBrandFilters((prev) => ({
      ...prev,
      [brand]: !prev[brand],
    }));
  };

  const handleLocationFilterChange = (location) => {
    setLocationFilters((prev) => ({
      ...prev,
      [location]: !prev[location],
    }));
  };

  const resetFilters = () => {
    setCategoryFilters(
      Object.keys(categoryFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
    setBrandFilters(
      Object.keys(brandFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
    setLocationFilters(
      Object.keys(locationFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
    setSearchTerm("");
    setActiveCategory("all");
  };

  const getActiveCategories = () => {
    return Object.keys(categoryFilters).filter(
      (category) => categoryFilters[category]
    );
  };

  const getActiveBrands = () => {
    return Object.keys(brandFilters).filter((brand) => brandFilters[brand]);
  };

  const getActiveLocations = () => {
    return Object.keys(locationFilters).filter(
      (location) => locationFilters[location]
    );
  };

  const filteredVehicles = rentalVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.description.toLowerCase().includes(searchTerm.toLowerCase());

    const activeCategories = getActiveCategories();
    const matchesCategory =
      activeCategories.length === 0 ||
      activeCategories.includes(vehicle.category);

    const activeBrands = getActiveBrands();
    const matchesBrand =
      activeBrands.length === 0 || activeBrands.includes(vehicle.brand);

    const activeLocations = getActiveLocations();
    const matchesLocation =
      activeLocations.length === 0 ||
      activeLocations.includes(vehicle.location);

    const matchesTab =
      activeCategory === "all" ||
      vehicle.category.toLowerCase() === activeCategory;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesLocation &&
      matchesTab
    );
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "brand":
        return a.brand.localeCompare(b.brand);
      case "price":
        const priceA = parseInt(a.dailyPrice.replace(/[₹,]/g, ""));
        const priceB = parseInt(b.dailyPrice.replace(/[₹,]/g, ""));
        return priceA - priceB;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <PageWrapper>
      <p style={{ fontSize: "1.5rem", color: "#666" }}>
        Oops we are cooking something! We'll get back soon 😉
      </p>
      {/* <MainContainer filtersVisible={filtersVisible}>
        {filtersVisible && (
          <Sidebar>
            <FilterHeader>
              <FilterTitle>Filters</FilterTitle>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexShrink: 0 }}>
                <FilterActionButton onClick={() => setFiltersVisible(false)}>
                  HIDE FILTERS
                </FilterActionButton>
                <ResetButton onClick={resetFilters}>
                  RESET
                </ResetButton>
              </div>
            </FilterHeader>

            <SearchContainer>
              <SearchIcon />
              <SearchInput
                placeholder="Search vehicles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

            <FilterSection>
              <FilterSectionHeader onClick={() => setCategorySectionOpen(!categorySectionOpen)}>
                <FilterSectionTitle>Category</FilterSectionTitle>
                {categorySectionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </FilterSectionHeader>
              <FilterOptions isOpen={categorySectionOpen}>
                {Object.keys(categoryFilters).map(category => (
                  <FilterOption key={category}>
                    <FilterCheckbox
                      type="checkbox"
                      id={category}
                      checked={categoryFilters[category]}
                      onChange={() => handleCategoryFilterChange(category)}
                    />
                    <FilterLabel htmlFor={category}>{category}</FilterLabel>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterSection>

            <FilterSection>
              <FilterSectionHeader onClick={() => setBrandSectionOpen(!brandSectionOpen)}>
                <FilterSectionTitle>Brand</FilterSectionTitle>
                {brandSectionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </FilterSectionHeader>
              <FilterOptions isOpen={brandSectionOpen}>
                {Object.keys(brandFilters).map(brand => (
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
              <FilterSectionHeader onClick={() => setLocationSectionOpen(!locationSectionOpen)}>
                <FilterSectionTitle>Location</FilterSectionTitle>
                {locationSectionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </FilterSectionHeader>
              <FilterOptions isOpen={locationSectionOpen}>
                {Object.keys(locationFilters).map(location => (
                  <FilterOption key={location}>
                    <FilterCheckbox
                      type="checkbox"
                      id={location}
                      checked={locationFilters[location]}
                      onChange={() => handleLocationFilterChange(location)}
                    />
                    <FilterLabel htmlFor={location}>{location}</FilterLabel>
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
            <HeroTitle>Premium Vehicle Rentals</HeroTitle>
            <HeroDescription>
              Experience luxury and performance with our premium rental fleet. Choose from exotic cars, 
              high-performance motorcycles, and luxury motorhomes for daily adventures or extended journeys.
            </HeroDescription>
          </HeroSection>

          <CategoryTabs>
            <CategoryTab 
              active={activeCategory === 'all'} 
              onClick={() => setActiveCategory('all')}
            >
              All Vehicles
            </CategoryTab>
            <CategoryTab 
              active={activeCategory === 'cars'} 
              onClick={() => setActiveCategory('cars')}
            >
              Cars
            </CategoryTab>
            <CategoryTab 
              active={activeCategory === 'bikes'} 
              onClick={() => setActiveCategory('bikes')}
            >
              Bikes
            </CategoryTab>
            <CategoryTab 
              active={activeCategory === 'motorhomes'} 
              onClick={() => setActiveCategory('motorhomes')}
            >
              Motorhomes
            </CategoryTab>
          </CategoryTabs>

          <ContentHeader>
            <ResultsCount>{sortedVehicles.length} vehicles available for rent</ResultsCount>
            <SortContainer>
              <span style={{ color: '#ccc', fontSize: '0.9rem' }}>Sort by</span>
              <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="brand">Brand</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </SortSelect>
            </SortContainer>
          </ContentHeader>

          <VehiclesGrid>
            {sortedVehicles.map((vehicle, index) => (
              <VehicleCardLink key={vehicle.id} to={`/rentals/${vehicle.id}`}>
                <VehicleCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <VehicleImage image={vehicle.image}>
                    <VehicleBadges>
                      {vehicle.badges.map((badge, badgeIndex) => (
                        <VehicleBadge key={badgeIndex}>
                          {badge}
                        </VehicleBadge>
                      ))}
                    </VehicleBadges>
                    <VehicleRating>
                      <Star size={12} fill="currentColor" />
                      {vehicle.rating}
                    </VehicleRating>
                  </VehicleImage>
                  <VehicleContent>
                    <VehicleTitle>{vehicle.title}</VehicleTitle>
                    <VehicleDescription>{vehicle.description}</VehicleDescription>
                    <VehicleSpecs>
                      {vehicle.specs.map((spec, idx) => (
                        <span key={idx}>{spec}</span>
                      ))}
                    </VehicleSpecs>
                    <VehicleLocation>
                      <MapPin size={14} />
                      {vehicle.location}
                    </VehicleLocation>
                    <VehiclePricing>
                      <PriceOption>
                        <PriceLabel>Daily</PriceLabel>
                        <PriceAmount>{vehicle.dailyPrice}</PriceAmount>
                      </PriceOption>
                      <PriceOption>
                        <PriceLabel>Monthly</PriceLabel>
                        <PriceAmount>{vehicle.monthlyPrice}</PriceAmount>
                      </PriceOption>
                    </VehiclePricing>
                  </VehicleContent>
                </VehicleCard>
              </VehicleCardLink>
            ))}
          </VehiclesGrid>
        </MainContent>
      </MainContainer> */}
    </PageWrapper>
  );
};

export default RentalsPage;
