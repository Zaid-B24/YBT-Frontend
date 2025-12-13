import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchHeroSlides = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/homepage/hero-slides`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  const result = await response.json();
  return result.data;
};

const fetchLatestAdditions = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/cars/latest-additions`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  const result = await response.json();
  return result.data;
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

  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides]);

  const currentAsset = heroSlides?.[currentSlide];

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
                src={currentAsset.assetUrl}
                autoPlay
                loop
                muted
                playsInline
                key={currentSlide} // Force re-render on slide change
              />
            ) : (
              <HeroImageBox>
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet={currentAsset.mobileAssetUrl}
                  />
                  <img
                    src={currentAsset.assetUrl}
                    alt={currentAsset.title}
                    fetchPriority="high"
                  />
                </picture>
              </HeroImageBox>
            )}

            <HeroOverlay />

            <HeroContent>
              <HeroTitle>{heroSlides[currentSlide].title}</HeroTitle>

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
                <CardImageWrapper>
                  <picture>
                    {/* Try mobile thumbnail first (if available) */}
                    {car.mobileThumbnail && (
                      <source
                        media="(max-width: 768px)"
                        srcSet={car.mobileThumbnail}
                      />
                    )}
                    <img src={car.thumbnail} alt={car.title} />
                  </picture>

                  <CardBadges>
                    {car.badges?.map((badge, i) => (
                      <Badge key={i}>{badge}</Badge>
                    ))}
                  </CardBadges>
                </CardImageWrapper>
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
          EVERY TRADE IS A PRIVILEGE.
          <br />
          AUTHENTIC BUILDS, RESERVED FOR THOSE WHO MEET OUR STANDARD.
          <br />
          <span>
            WE TRADE IN AUTHENTICITY. EACH VEHICLE IS HANDPICKED FOR CLIENTS WHO
            VALUE EXCELLENCE
          </span>
        </MissionTitle>
        <MissionButtons>
          <MissionButton to="/about">ABOUT US</MissionButton>
          {/* <MissionButton to="/models" $primary>
            ALL MODELS
          </MissionButton> */}
        </MissionButtons>

        <JoinSection>
          <JoinSubtitle>Get in touch to make your dream car true.</JoinSubtitle>
          <ContactButton to="/contact">CONTACT US</ContactButton>
        </JoinSection>
      </MissionSection>
    </HomepageWrapper>
  );
};

export default Homepage;

const HomepageWrapper = styled.div`
  background: #000;
  color: #fff;
  overflow-x: hidden;
  width: 100%;
`;

const HeroImageBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: opacity 0.5s ease-in-out;
  }
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  @supports (height: 100dvh) {
    height: 100dvh;
  }
  min-height: 600px;
  display: flex;

  /* CHANGE: Align content to the bottom */
  align-items: flex-end;
  justify-content: flex-start;

  overflow: hidden;

  /* Add padding bottom to ensure text doesn't hit the very edge or overlap dots too much */
  padding-bottom: 8vh;

  @media (max-width: 768px) {
    padding-bottom: 12vh; /* More space on mobile for safe area */
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

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Darker overlay on mobile to make text pop against busy portrait images */
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0.2) 100%
  );
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  text-align: left;
  max-width: 800px; /* Increased max-width */
  padding: 0 0 0 5vw; /* Left padding */

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    max-width: 100%;
    text-align: left;
    /* No margin-top needed since we use flex-end on parent */
  }
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 4.5rem; /* Slightly larger on desktop */
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.02em;
  margin-bottom: 2rem; /* Space between title and button */
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); /* Better readability */

  @media (max-width: 768px) {
    font-size: 2.2rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
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
  @media (max-width: 768px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.8rem;
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
    bottom: 4rem; /* Move dots up slightly on mobile */
  }
`;

const Dot = styled.button`
  width: 40px;
  height: 3px;
  background: ${(props) => (props.active ? "#fff" : "rgba(255,255,255,0.3)")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0; /* Reset padding */
`;

/* --- LATEST SECTION --- */

const CardImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  /* Hover Effect handled on parent */
`;
const LatestSection = styled.section`
  padding: 4rem 2rem;
  background: #0a0a0a;
  color: #fff;
  @media (max-width: 768px) {
    padding: 3rem 1rem;
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

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  /* FIX: Adjusted minmax for small screens so cards don't overflow */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const CarCard = styled(Link)`
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  background: #111; /* Fallback color */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CardBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  z-index: 3;
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
  z-index: 2;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
`;

const CardTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);
`;

/* --- MISSION SECTION --- */

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
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.5px;
  margin-bottom: 3.5rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  span {
    display: block;
    margin-top: 1rem;
    color: #888;
    font-size: 1.4rem;
    line-height: 1.4;
  }

  /* FIX: Mobile font sizes significantly reduced */
  @media (max-width: 768px) {
    font-size: 1.1rem; /* Reduced to ~17px */
    line-height: 1.5;
    max-width: 100%;
    margin-bottom: 2rem;

    span {
      font-size: 0.75rem; /* Reduced to ~12px */
      margin-top: 0.75rem;
      line-height: 1.5;
      color: #666; /* Slightly darker for better read on small text */
    }
  }
`;

const MissionButtons = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const MissionButton = styled(Link)`
  background: ${(props) =>
    props.$primary ? "rgba(255,255,255,0.15)" : "transparent"};
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1rem 2.2rem;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 768px) {
    /* FIX: Compact size for mobile */
    width: 100%;
    max-width: 280px; /* Slightly narrower max-width */
    padding: 0.8rem 1.5rem; /* Reduced padding */
    font-size: 0.8rem; /* Smaller text */
    letter-spacing: 1px;
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

  @media (max-width: 768px) {
    /* FIX: Compact size for mobile */
    padding: 0.8rem 2rem; /* Reduced height */
    font-size: 0.8rem; /* Smaller text */
    width: 100%;
    max-width: 280px; /* Match MissionButton width */
  }
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
  width: 100%;
  background: #000;

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
  padding: 4rem 0;

  svg {
    margin-bottom: 1rem;
  }
`;

const LoadingSpinner = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

/////////////////////////////////////////////////////
// const FindModelSection = styled.section`
//   padding: 4rem 2rem;
//   background: rgba(20, 20, 20, 0.8);
//   text-align: center;
//   @media (max-width: 768px) {
//     padding: 3rem 1.5rem;
//   }
// `;

// const FindModelTitle = styled.h2`
//   font-family: "Playfair Display", serif;
//   font-size: 2rem;
//   font-weight: 400;
//   margin-bottom: 1rem;
//   letter-spacing: 0.05em;
// `;

// const FindModelSubtitle = styled.p`
//   font-size: 1.1rem;
//   color: #ccc;
//   margin-bottom: 3rem;
// `;

// const SearchForm = styled.div`
//   display: flex;
//   gap: 1rem;
//   max-width: 800px;
//   margin: 0 auto;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const SearchSelect = styled.select`
//   flex: 1;
//   padding: 1rem;
//   background: rgba(255, 255, 255, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   color: #fff;
//   font-size: 1rem;

//   option {
//     background: #333;
//     color: #fff;
//   }
// `;

// const SearchButton = styled(Link)`
//   background: rgba(255, 255, 255, 0.2);
//   border: 1px solid rgba(255, 255, 255, 0.3);
//   color: #fff;
//   padding: 1rem 2rem;
//   font-size: 0.9rem;
//   font-weight: 500;
//   letter-spacing: 1px;
//   text-transform: uppercase;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   text-decoration: none;
//   display: inline-block;

//   &:hover {
//     background: rgba(255, 255, 255, 0.3);
//   }
// `;

// {/* <FindModelSection>
//         <FindModelTitle>FIND YOUR DREAM MODEL</FindModelTitle>
//         <FindModelSubtitle>
//           Choose options from below and find your customization
//         </FindModelSubtitle>
//         <SearchForm>
//           <SearchSelect>
//             <option>Brand</option>
//             <option>Ferrari</option>
//             <option>Lamborghini</option>
//             <option>Porsche</option>
//             <option>Mercedes-Benz</option>
//           </SearchSelect>
//           <SearchSelect>
//             <option>Model</option>
//             <option>F8 Tributo</option>
//             <option>Huracán</option>
//             <option>911 Turbo S</option>
//             <option>G-Class</option>
//           </SearchSelect>
//           <SearchButton to="/models">SEARCH</SearchButton>
//         </SearchForm>
//       </FindModelSection> */}
