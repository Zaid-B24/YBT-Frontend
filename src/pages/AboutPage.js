import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// Removed icon imports as they are no longer used

const PageWrapper = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const StorySection = styled.div`
  padding: 3rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
`;

// MODIFIED: Changed grid-template-columns to 1fr
const StoryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Was 1fr 1fr */
  gap: 3rem;
  align-items: center;

  @media (max-width: 968px) {
    gap: 2rem;
  }
`;

const StoryText = styled.div`
  h2 {
    font-family: "Playfair Display", serif;
    font-size: 2.3rem;
    font-weight: 400;
    margin-bottom: 1.2rem;
  }

  p {
    color: #ccc;
    line-height: 1.8;
    margin-bottom: 1rem;
    font-size: 1.05rem;
  }

  ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;

    li {
      color: #ccc;
      margin-bottom: 0.3rem;
      line-height: 1.7;
    }
  }
`;

// REMOVED: StoryImage styled-component

const ValuesSection = styled.div`
  padding: 3rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const ValuesContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const ValuesTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.3rem;
  font-weight: 400;
  margin-bottom: 2.5rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.8rem;
`;

const ValueCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-6px);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.08);
  }
`;

// REMOVED: ValueIcon styled-component

const ValueTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.8rem;
  color: #fff;
`;

const ValueDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const TeamSection = styled.div`
  padding: 3rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const TeamTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.3rem;
  font-weight: 400;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
`;

const TeamMember = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
`;

// REMOVED: MemberImage styled-component

const MemberInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const MemberName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.4rem;
  color: #fff;
`;

const MemberRole = styled.p`
  color: #aaa;
  margin-bottom: 0.8rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MemberBio = styled.p`
  color: #999;
  line-height: 1.6;
  font-size: 0.9rem;
`;

const AboutPage = () => {
  // MODIFIED: Removed 'icon' property from objects
  const values = [
    {
      title: "Excellence",
      description:
        "We pursue perfection in every detail, ensuring each project exceeds expectations.",
    },
    {
      title: "Collaboration",
      description:
        "We work closely with our clients to bring their automotive dreams to life.",
    },
    {
      title: "Innovation",
      description:
        "We constantly push boundaries, merging cutting-edge tech with timeless design.",
    },
    {
      title: "Passion",
      description:
        "Our love for automotive excellence drives everything we do.",
    },
  ];

  // MODIFIED: Removed 'image' property from objects
  const teamMembers = [
    {
      name: "Marcus Johnson",
      role: "Founder & CEO",
      bio: "With over 15 years in luxury automotive, Marcus founded YOUNG BOY TOYZ to redefine vehicle customization.",
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Design",
      bio: "Elena’s vision and technical expertise have shaped some of our most iconic transformations.",
    },
    {
      name: "James Mitchell",
      role: "Chief Engineer",
      bio: "James ensures every modification meets the highest standards of performance and reliability.",
    },
  ];

  return (
    <PageWrapper>
      <StorySection>
        <StoryContent>
          <StoryText>
            <h2>Our Story</h2>
            <p>
              YOUNG BOY TOYZ (YBT) was founded by Mr. Hamdan Pathan — a serial
              entrepreneur, humanitarian, cyber-security investigator, and
              fitness model — driven by a bold vision: to make
              aftermarket-upgraded and limited-edition vehicles accessible,
              trustworthy, and thrilling for true automotive enthusiasts.
            </p>
            <p>
              What began as a passion has evolved into India’s first premium
              aftermarket automobile brand, redefining how exclusive machines
              are bought, experienced, and celebrated. YBT introduces a new era
              of automotive shopping with its immersive Digital Showroom
              Experience, allowing customers to explore extraordinary creations
              with transparency and assurance.
            </p>
            <p>We specialize in purchase & sale of:</p>
            <ul>
              <li>Cars</li>
              <li>Superbikes</li>
              <li>Vanity Vans & Caravans</li>
              <li>Motorhomes</li>
              <li>Private Jets</li>
              <li>Boats</li>
            </ul>
            <p>
              Every machine is curated from top-tier automotive designers,
              custom garages, and master workshops — representing the finest
              craftsmanship of the aftermarket world.
            </p>
            <p>
              YBT is also building a new cultural movement — IDM (Indian
              Domestic Market Culture Association) — uniting enthusiasts
              nationwide through events that celebrate the bond between humans
              and machines.
            </p>
          </StoryText>
          {/* REMOVED: <StoryImage /> */}
        </StoryContent>
      </StorySection>

      <ValuesSection>
        <ValuesContainer>
          <ValuesTitle>Our Values</ValuesTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* REMOVED: <ValueIcon> */}
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesContainer>
      </ValuesSection>

      <TeamSection>
        <TeamTitle>Meet Our Team</TeamTitle>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* REMOVED: <MemberImage /> */}
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberBio>{member.bio}</MemberBio>
              </MemberInfo>
            </TeamMember>
          ))}
        </TeamGrid>
      </TeamSection>
    </PageWrapper>
  );
};

export default AboutPage;
