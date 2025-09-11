import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Award, Users, Target, Heart } from 'lucide-react';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const StorySection = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StoryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StoryText = styled.div`
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
  }

  p {
    color: #ccc;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
`;

const StoryImage = styled.div`
  height: 400px;
  background: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80') center center/cover no-repeat;
  border-radius: 8px;
`;

const ValuesSection = styled.div`
  padding: 4rem 2rem;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const ValuesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const ValuesTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 3rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const ValueIcon = styled.div`
  margin-bottom: 1.5rem;
  color: #fff;
`;

const ValueTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const ValueDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const TeamSection = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 3rem;
  text-align: center;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  border-radius: 8px;
`;

const MemberImage = styled.div`
  height: 300px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
`;

const MemberInfo = styled.div`
  padding: 2rem;
  text-align: center;
`;

const MemberName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const MemberRole = styled.p`
  color: #ccc;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MemberBio = styled.p`
  color: #999;
  line-height: 1.6;
  font-size: 0.9rem;
`;

const AboutPage = () => {
  const values = [
    {
      icon: <Award size={48} />,
      title: "Excellence",
      description: "We pursue perfection in every detail, from initial concept to final delivery, ensuring each project exceeds expectations."
    },
    {
      icon: <Users size={48} />,
      title: "Collaboration",
      description: "We work closely with our clients to understand their vision and bring their automotive dreams to life."
    },
    {
      icon: <Target size={48} />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible, integrating cutting-edge technology with timeless design."
    },
    {
      icon: <Heart size={48} />,
      title: "Passion",
      description: "Our love for automotive excellence drives everything we do, from the smallest detail to the grandest transformation."
    }
  ];

  const teamMembers = [
    {
      name: "Marcus Johnson",
      role: "Founder & CEO",
      bio: "With over 15 years in luxury automotive, Marcus founded YOUNG BOY TOYZ with a vision to redefine vehicle customization.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Design",
      bio: "Elena's artistic vision and technical expertise have shaped some of our most iconic vehicle transformations.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "James Mitchell",
      role: "Chief Engineer",
      bio: "James ensures every modification meets the highest standards of performance, safety, and reliability.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>About Us</HeroTitle>
        <HeroSubtitle>
          Discover the story behind YOUNG BOY TOYZ and our commitment to 
          automotive excellence and innovation.
        </HeroSubtitle>
      </HeroSection>

      <StorySection>
        <StoryContent>
          <StoryText>
            <h2>Our Story</h2>
            <p>
              Founded in 2020 in Los Angeles, YOUNG BOY TOYZ emerged from a passion for 
              automotive excellence and a vision to transform the luxury vehicle customization industry.
            </p>
            <p>
              What started as a small workshop has grown into a premier destination for 
              discerning clients seeking the ultimate in automotive personalization. Our team 
              of skilled craftsmen and engineers work tirelessly to bring each client's vision to life.
            </p>
            <p>
              Today, we've completed over 1,000 custom projects, each one a testament to our 
              commitment to quality, innovation, and customer satisfaction.
            </p>
          </StoryText>
          <StoryImage />
        </StoryContent>
      </StorySection>

      <ValuesSection>
        <ValuesContainer>
          <ValuesTitle>Our Values</ValuesTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ValueIcon>{value.icon}</ValueIcon>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MemberImage image={member.image} />
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