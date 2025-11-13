import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const HomepageWrapper = styled.div`
  background: #000;
  color: #fff;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: ${(props) => (props.image ? `url(${props.image})` : "#000")}
    center center/cover no-repeat;
  transition: all 0.5s ease;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  text-align: left;
  max-width: 600px;
  padding: 0 0 0 5vw;

  @media (max-width: 768px) {
    padding: 0 1.5rem; /* 1.5rem on left and right */
    max-width: 100%;
    text-align: center; /* Or keep left, but balanced padding is key */
  }
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0.02em;
  margin-bottom: 1.5rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.4;
  color: #fff;
  margin-bottom: 2.5rem;
  max-width: 400px;
`;

const HeroButton = styled(Link)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
  @media (max-width: 768px) {
    width: 30px;
    height: 4px; /* Slightly thicker */

    /* Add a "tap target" for accessibility */
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: -10px;
      bottom: -10px;
      left: -5px;
      right: -5px;
    }
  }
`;

const Dot = styled.button`
  width: 40px;
  height: 3px;
  background: ${(props) => (props.active ? "#fff" : "rgba(255,255,255,0.3)")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const FindModelSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(20, 20, 20, 0.8);
  text-align: center;
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const FindModelTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
`;

const FindModelSubtitle = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 3rem;
`;

const SearchForm = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchSelect = styled.select`
  flex: 1;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;

  option {
    background: #333;
    color: #fff;
  }
`;

const SearchButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const LatestSection = styled.section`
  padding: 4rem 2rem;
  background: #0a0a0a;
  color: #fff;
  @media (max-width: 768px) {
    padding: 3rem 1rem; /* Reduces padding for mobile */
  }
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
  text-align: center;
  color: #fff;
`;

const CardsGrid = styled.div`
  display: grid;
  /* --- THIS IS THE FIX --- */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem; /* Reduced gap for a tighter fit */
  max-width: 1400px;
  margin: 0 auto;
`;

const CarCard = styled(Link)`
  position: relative;
  display: block;
  aspect-ratio: 4 / 3; /* Set a fixed height for the card */
  overflow: hidden;
  border-radius: 8px; /* Add a radius for a softer look */
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CardImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.image ? `url(${props.image})` : "#ddd")}
    center center/cover no-repeat;
  transition: transform 0.4s ease;

  /* Add a zoom effect on hover */
  ${CarCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  z-index: 3; /* Add this line */
`;

const Badge = styled.span`
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2; /* Make sure it's above the image */
  padding: 1.5rem;
  background: none; /* <-- This is the fix. No more gradient. */
`;

const CardTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;

  /* --- ADD THIS LINE --- */
  /* This makes the text readable on any image */
  text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);
`;

const MissionSection = styled.section`
  padding: 6rem 2rem;
  background: #000;
  text-align: center;
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const MissionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 3.5rem; // Desktop
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 3rem;
  letter-spacing: 0.02em;

  span {
    color: #666;
  }

  /* --- ADD THIS --- */
  @media (max-width: 768px) {
    font-size: 2.2rem; // Mobile
    margin-bottom: 2rem;
  }
`;

const MissionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const MissionButton = styled(Link)`
  background: ${(props) =>
    props.$primary ? "rgba(255,255,255,0.2)" : "transparent"};
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const JoinSection = styled.section`
  padding: 4rem 2rem;
  background: #000;
  text-align: center;
`;

const JoinSubtitle = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ContactButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const HeroLoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 700px;
  color: #fff;
  z-index: 3;

  svg {
    margin-bottom: 1rem;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 4rem 0; /* Give it some space */

  svg {
    margin-bottom: 1rem;
  }
`;

const LoadingSpinner = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

const fetchHeroSlides = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/homepage/hero-slides`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to fetch hero slides");
  }
  return result.data;
};

const fetchLatestAdditions = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/cars/latest-additions`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to fetch latest additions");
  }
  return result.data;
};

const getTransformedUrl = (url, assetType) => {
  if (!url || !url.includes("cloudinary.com")) {
    return url;
  }

  const width = 1920;
  const height = 1080;
  const transformations = `c_fill,w_${width},h_${height},q_auto`;

  const parts = url.split("/upload/");
  if (parts.length !== 2) {
    return url;
  }

  if (assetType === "VIDEO") {
    const videoTransformations = `f_auto,${transformations}`;
    return `${parts[0]}/upload/${videoTransformations}/${parts[1]}`;
  }
  return `${parts[0]}/upload/${transformations}/${parts[1]}`;
};

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    data: heroSlides,
    isLoading: isHeroLoading,
    isError: isHeroError,
  } = useQuery({
    queryKey: ["heroSlides"],
    queryFn: fetchHeroSlides,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: latestAdditions,
    isLoading: isLatestLoading,
    isError: isLatestError,
  } = useQuery({
    queryKey: ["latestAdditions"],
    queryFn: fetchLatestAdditions,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const carsForSale = [
    {
      id: "tesla-cybertruck-elongation-evo",
      title: "Tesla Cybertruck - Elongation EVO by YOUNG BOY TOYZ",
      type: "SUV",
      year: "2024",
      transmission: "AUTOMATIC",
      power: "630 HP",
      mileage: "100 KM",
      number: "NR.1113",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: "lamborghini-urus-coupe",
      title: "Lamborghini Urus Coupé by YOUNG BOY TOYZ",
      type: "COUPE",
      year: "2021",
      transmission: "AUTOMATIC",
      power: "900 HP",
      mileage: "219 KM",
      number: "NR.714",
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: "lamborghini-aventador-ultima",
      title: "Lamborghini Aventador Ultima 1/350 by YOUNG BOY TOYZ",
      type: "COUPE",
      year: "2022",
      transmission: "AUTOMATIC",
      power: "770 HP",
      mileage: "200 KM",
      number: "NR.840",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
  ];

  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides]);

  return (
    <HomepageWrapper>
      <HeroSection>
        {isHeroLoading && (
          <HeroLoadingWrapper>
            <LoadingSpinner size={32} />
          </HeroLoadingWrapper>
        )}

        {isHeroError && (
          <HeroLoadingWrapper>
            <AlertCircle size={32} />
            <p>Error loading content.</p>
          </HeroLoadingWrapper>
        )}

        {heroSlides && heroSlides.length > 0 && (
          <>
            {heroSlides[currentSlide].assetType === "VIDEO" ? (
              <HeroVideo
                src={getTransformedUrl(
                  heroSlides[currentSlide].assetUrl,
                  "VIDEO"
                )}
                autoPlay
                loop
                muted
                playsInline
                key={currentSlide}
              />
            ) : (
              <HeroBackground
                image={getTransformedUrl(
                  heroSlides[currentSlide].assetUrl,
                  "IMAGE"
                )}
              />
            )}

            <HeroOverlay />

            <HeroContent>
              <HeroTitle>{heroSlides[currentSlide].title}</HeroTitle>
              <HeroSubtitle>{heroSlides[currentSlide].subtitle}</HeroSubtitle>
              <HeroButton to={heroSlides[currentSlide].linkUrl}>
                DISCOVER NOW
              </HeroButton>
            </HeroContent>

            <CarouselDots>
              {heroSlides.map((_, index) => (
                <Dot
                  key={index}
                  active={index === currentSlide}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </CarouselDots>
          </>
        )}
      </HeroSection>

      <FindModelSection>
        <FindModelTitle>FIND YOUR DREAM MODEL</FindModelTitle>
        <FindModelSubtitle>
          Choose options from below and find your customization
        </FindModelSubtitle>
        <SearchForm>
          <SearchSelect>
            <option>Brand</option>
            <option>Ferrari</option>
            <option>Lamborghini</option>
            <option>Porsche</option>
            <option>Mercedes-Benz</option>
          </SearchSelect>
          <SearchSelect>
            <option>Model</option>
            <option>F8 Tributo</option>
            <option>Huracán</option>
            <option>911 Turbo S</option>
            <option>G-Class</option>
          </SearchSelect>
          <SearchButton to="/models">SEARCH</SearchButton>
        </SearchForm>
      </FindModelSection>

      <LatestSection>
        <SectionTitle>LATEST ADDITIONS</SectionTitle>
        {isLatestLoading && (
          <StatusWrapper>
            {" "}
            {/* You can reuse the hero loading component */}
            <LoadingSpinner size={32} />
            <p>Loading Latest Cars...</p>
          </StatusWrapper>
        )}

        {/* --- Handle Error State --- */}
        {isLatestError && (
          <StatusWrapper>
            <AlertCircle size={32} />
            <p>Error loading cars.</p>
          </StatusWrapper>
        )}

        {latestAdditions && latestAdditions.length > 0 && (
          <CardsGrid>
            {latestAdditions.map((car) => (
              <CarCard key={car.id} to={`/cars/${car.id}`}>
                {" "}
                {/* Use car.slug */}
                <CardImage image={car.thumbnail}>
                  {" "}
                  {/* Use car.thumbnail */}
                  <CardBadges>
                    {car.badges.map((badge, i) => (
                      <Badge key={i}>{badge}</Badge>
                    ))}
                  </CardBadges>
                </CardImage>
                <CardContent>
                  <CardTitle>
                    {car.brand} {car.title}
                  </CardTitle>
                </CardContent>
              </CarCard>
            ))}
          </CardsGrid>
        )}
      </LatestSection>

      <MissionSection>
        <MissionTitle>
          OUR MISSION GOES BEYOND TUNING.
          <br />
          WE CREATE UNIQUE MASTERPIECES
          <br />
          <span>THAT DEFY CONVENTION</span>
        </MissionTitle>
        <MissionButtons>
          <MissionButton to="/about">ABOUT US</MissionButton>
          <MissionButton to="/models" $primary>
            ALL MODELS
          </MissionButton>
        </MissionButtons>
      </MissionSection>

      <JoinSection>
        <JoinSubtitle>Get in touch to make your dream car true.</JoinSubtitle>
        <ContactButton to="/contact">CONTACT US</ContactButton>
      </JoinSection>
    </HomepageWrapper>
  );
};

export default Homepage;

// <LatestSection style={{ background: "#111" }}>
//         <SectionTitle>CARS FOR SALE</SectionTitle>

//         {/* 2. Reuse CardsGrid */}
//         <CardsGrid>
//           {carsForSale.map((car, index) => (
//             // 3. Reuse CarCard
//             <CarCard key={index} to={`/cars/${car.id}`}>
//               {/* 4. Reuse CardImage */}
//               <CardImage image={car.image}>
//                 {/* 5. Reuse CardBadges logic */}
//                 <CardBadges>
//                   <Badge>AVAILABLE • {car.number}</Badge>
//                 </CardBadges>
//               </CardImage>

//               <CardContent>
//                 <CardTitle>
//                   {car.brand} {car.title}
//                 </CardTitle>
//               </CardContent>
//             </CarCard>
//           ))}
//         </CardsGrid>
//       </LatestSection>
