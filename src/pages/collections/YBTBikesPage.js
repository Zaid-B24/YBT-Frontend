import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, ArrowRight, Heart, ShoppingCart } from "lucide-react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { CarCardSkeleton } from "../../components/cards/CarCardSkeleton";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
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

// const fetchBikes = async (filters) => {
//   const params = new URLSearchParams();

//   params.append("collectionType", "YBT");

//   if (filters.brand) params.append("brands", filters.brand);
//   if (filters.year) params.append("registrationYear", filters.year);
//   if (filters.engine) params.append("engine", filters.engine); // Assuming backend supports this

//   const apiUrl = `${process.env.REACT_APP_API_URL}/bikes?${params.toString()}`;
//   console.log(`Fetching bikes from: ${apiUrl}`);

//   const response = await fetch(apiUrl);
//   if (!response.ok) {
//     throw new Error(`Server responded with ${response.status}.`);
//   }
//   const responseData = await response.json();
//   return responseData.data || [];
// };

const fetchBikes = async ({ pageParam = null, queryKey }) => {
  const [_key, filters] = queryKey;

  const params = new URLSearchParams();
  params.append("collectionType", "YBT");

  if (filters.brand) params.append("brands", filters.brand);
  if (filters.year) params.append("registrationYear", filters.year);
  if (filters.engine) params.append("engine", filters.engine);

  if (pageParam) {
    params.append("cursor", pageParam);
  }

  const apiUrl = `${process.env.REACT_APP_API_URL}/bikes?${params.toString()}`;
  console.log(`Fetching bikes from: ${apiUrl}`);

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}.`);
  }

  return response.json();
};

const YBTBikesPage = () => {
  const [filters, setFilters] = useState({
    brand: "",
    engine: "",
    year: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({ brand: "", engine: "", year: "" });
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["bikes", filters],
    queryFn: fetchBikes,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination.nextCursor ?? undefined;
    },
    keepPreviousData: true,
  });

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Is the entry intersecting the viewport?
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } // Trigger when the element is 100% visible
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

  const bikes = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const brands = [...new Set(bikes.map((bike) => bike.brand).filter(Boolean))];
  const years = [
    ...new Set(bikes.map((bike) => bike.registrationYear).filter(Boolean)),
  ];

  console.log("Brands array:", brands);
  console.log("Years array:", years);
  return (
    <PageWrapper>
      <Sidebar>
        <FilterSection>
          <FilterTitle>
            <Filter size={20} />
            Filters
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
              {brands.map((brand) => (
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
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Engine Size</FilterLabel>
            <FilterSelect
              name="engine"
              value={filters.engine}
              onChange={handleFilterChange}
            >
              <option value="">All Engines</option>
              <option value="600-800cc">600-800cc</option>
              <option value="800-1000cc">800-1000cc</option>
              <option value="1000cc+">1000cc+</option>
            </FilterSelect>
          </FilterGroup>
          {/* Assuming you have a styled component for ResetButton */}
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
        </HeroSection>

        {status === "loading" ? (
          <BikesGrid>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </BikesGrid>
        ) : status === "error" ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <BikesGrid>
              {/* ✨ Map over the pages, and then map over the bikes in each page */}
              {data?.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.data.map((bike, index) => (
                    <BikeCard
                      key={bike.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <BikeImage image={bike.thumbnail}>
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
                </React.Fragment>
              ))}
            </BikesGrid>

            {/* ✨ Add the loading trigger at the end */}
            <div
              ref={loadMoreRef}
              style={{ height: "100px", margin: "20px 0" }}
            >
              {isFetchingNextPage ? (
                <p style={{ textAlign: "center" }}>Loading more...</p>
              ) : hasNextPage ? (
                <p style={{ textAlign: "center" }}>Scroll to load more</p>
              ) : (
                <p style={{ textAlign: "center" }}>You've reached the end!</p>
              )}
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
