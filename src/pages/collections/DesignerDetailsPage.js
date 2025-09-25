import styled from "styled-components";
import { ArrowRight, Award, Calendar, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  DesignerPageSkeleton,
  ProductCardSkeleton,
} from "../../components/cards/DetailPageSkeletons";

const fetchDesignerBySlug = async (slug) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/designer/slug/${slug}`
  );
  console.log("THis is the response in Designer details page", response);
  if (!response.ok) throw new Error("Designer not found");
  return response.json();
};

const fetchCarsByDesignerId = async (designerId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/cars?collectionType=DESIGNER&designerId=${designerId}`
  );

  console.log("THis is the response for getting car by designer id", response);

  if (!response.ok) throw new Error("Could not fetch cars for this designer");
  const data = await response.json();
  return data.data || []; // Return the array of cars
};

const DesignerDetailPage = () => {
  const { slug } = useParams();

  const { data: designer, isLoading: isLoadingDesigner } = useQuery({
    queryKey: ["designer", slug],
    queryFn: () => fetchDesignerBySlug(slug),
  });

  const { data: cars = [], isLoading: isLoadingCars } = useQuery({
    queryKey: ["cars", "designer", designer?.id],
    queryFn: () => fetchCarsByDesignerId(designer.id),
    enabled: !!designer, // The '!!' turns the designer object into a boolean. The query only runs if 'designer' exists.
  });

  if (isLoadingDesigner) {
    return <DesignerPageSkeleton />;
  }

  if (!designer) {
    return <p>Designer not found.</p>;
  }
  return (
    <PageWrapper>
      <HeroSection>
        <HeroContainer>
          <DesignerImage image={designer.image} />
          <DesignerInfo>
            <DesignerName>{designer.name}</DesignerName>
            <DesignerTitle>{designer.title}</DesignerTitle>
            <DesignerDescription>{designer.description}</DesignerDescription>
            <DesignerMeta>
              <MetaItem>
                <Calendar size={16} />{" "}
                <span>{designer.stats.experience} years of Experience</span>
              </MetaItem>
              <MetaItem>
                <MapPin size={16} />{" "}
                <span>{designer.stats.location || "India"}</span>
              </MetaItem>
              <MetaItem>
                <Award size={16} /> <span>{designer.stats.awards} Awards</span>
              </MetaItem>
            </DesignerMeta>
          </DesignerInfo>
        </HeroContainer>
      </HeroSection>

      <ProductsSection>
        <SectionTitle>Creations by {designer.name}</SectionTitle>
        <ProductsGrid>
          {isLoadingCars ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </>
          ) : (
            cars.map((car, index) => (
              <ProductCard key={car.id} /* ...animation props... */>
                <ProductImage image={car.thumbnail}>
                  {/* ... ProductBadge and ProductActions ... */}
                </ProductImage>
                <ProductContent>
                  <ProductTitle>{car.title}</ProductTitle>
                  <ProductPrice>
                    {car.ybtPrice.toLocaleString("en-IN")}
                  </ProductPrice>
                  <ViewButton to={`/cars/${car.id}`}>
                    View Details <ArrowRight size={16} />
                  </ViewButton>
                </ProductContent>
              </ProductCard>
            ))
          )}
        </ProductsGrid>
      </ProductsSection>
    </PageWrapper>
  );
};

export default DesignerDetailPage;

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const DesignerImage = styled.div`
  height: 400px;
  /* Use the 'image' prop, with a fallback just in case */
  background: url(${(props) =>
      props.image || "https://placehold.co/800x600?text=No+Image"})
    center center/cover no-repeat;
  border-radius: 10px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.3), transparent);
    border-radius: 10px;
  }
`;

const DesignerName = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3.5rem;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const DesignerTitle = styled.h2`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const DesignerDescription = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const DesignerMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
`;

const ProductsSection = styled.section`
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
`;

const ProductsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

const ProductImage = styled.div`
  height: 250px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ProductPrice = styled.div`
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

const DesignerInfo = styled.div``;
