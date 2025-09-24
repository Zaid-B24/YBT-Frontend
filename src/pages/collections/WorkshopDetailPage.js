import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  DesignerPageSkeleton,
  ProductCardSkeleton,
} from "../../components/cards/DetailPageSkeletons";

const fetchWorkshopBySlug = async (slug) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/workshop/slug/${slug}`
  );
  if (!response.ok) throw new Error("Workshop not found");
  return response.json();
};

const fetchCarsByWorkshopId = async (workshopId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/cars?collectionType=WORKSHOP&workshopId=${workshopId}`
  );
  if (!response.ok) throw new Error("Could not fetch cars for this workshop");
  const data = await response.json();
  return data.data || [];
};

const WorkshopDetailPage = () => {
  const { slug } = useParams();

  // Query 1: Fetch the workshop's details
  const { data: workshop, isLoading: isLoadingWorkshop } = useQuery({
    queryKey: ["workshop", slug],
    queryFn: () => fetchWorkshopBySlug(slug),
  });

  // Query 2: Fetch the workshop's cars (projects)
  const { data: cars = [], isLoading: isLoadingCars } = useQuery({
    queryKey: ["cars", "workshop", workshop?.id],
    queryFn: () => fetchCarsByWorkshopId(workshop.id),
    enabled: !!workshop, // Only run if 'workshop' exists
  });

  if (isLoadingWorkshop) return <DesignerPageSkeleton />;
  if (!workshop) return <p>Workshop not found.</p>;

  return (
    <PageWrapper>
      <HeroSection>
        <HeroContainer>
          <WorkshopImage image={workshop.image} />
          <WorkshopInfo>
            <WorkshopName>{workshop.name}</WorkshopName>
            <WorkshopTitle>{workshop.title}</WorkshopTitle>
            <WorkshopDescription>{workshop.description}</WorkshopDescription>
            <WorkshopMeta>
              <MetaItem>
                <Calendar size={16} />{" "}
                <span>{workshop.stats.years} Experience</span>
              </MetaItem>
              <MetaItem>
                <MapPin size={16} />{" "}
                <span>{workshop.stats.location || "India"}</span>
              </MetaItem>
              <MetaItem>
                <Users size={16} />{" "}
                <span>{workshop.stats.specialists} Specialists</span>
              </MetaItem>
            </WorkshopMeta>
          </WorkshopInfo>
        </HeroContainer>
      </HeroSection>

      <ServicesSection>
        <ServicesContainer>
          <SectionTitle>Our Specialized Services</SectionTitle>
          <ServicesGrid>
            {workshop.services?.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesContainer>
      </ServicesSection>

      <ProjectsSection>
        <SectionTitle>Featured Projects</SectionTitle>
        <ProjectsGrid>
          {isLoadingCars ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </>
          ) : (
            // Change 'projects.map' to 'cars.map' and use 'car' as the item
            cars.map((car, index) => (
              <ProjectCard
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectImage image={car.thumbnail}>{/* ... */}</ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{car.title}</ProjectTitle>
                  <ProjectDescription>{car.description}</ProjectDescription>
                  <ViewButton to={`/cars/${car.id}`}>
                    {" "}
                    {/* Link to the car detail page */}
                    View Project
                    <ArrowRight size={16} />
                  </ViewButton>
                </ProjectContent>
              </ProjectCard>
            ))
          )}
        </ProjectsGrid>
      </ProjectsSection>
    </PageWrapper>
  );
};

export default WorkshopDetailPage;

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

const WorkshopImage = styled.div`
  height: 400px;
  background: url("https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")
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

const WorkshopInfo = styled.div``;

const WorkshopName = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3.5rem;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const WorkshopTitle = styled.h2`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const WorkshopDescription = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const WorkshopMeta = styled.div`
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

const ServicesSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
`;

const ServiceIcon = styled.div`
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 1rem;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const ServiceTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const ServiceDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const ProjectsSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectsGrid = styled.div`
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

const ProjectCard = styled(motion.div)`
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

const ProjectImage = styled.div`
  height: 250px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ProjectDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
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
