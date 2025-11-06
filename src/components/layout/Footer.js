import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FooterWrapper = styled.footer`
  background: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 2rem 2rem;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align children to the left */
  padding: 1rem 0; /* Add vertical spacing for mobile */

  @media (min-width: 768px) {
    padding: 0; /* Reset padding on desktop */
  }
`;

/**
 * Logo text styling.
 */
const Logo = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #ffffff;
  margin-bottom: 1rem;
`;

/**
 * Brand description paragraph.
 */
const BrandDescription = styled.p`
  color: #cccccc;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 400px;
`;

/**
 * Container for the newsletter input and button.
 * Stacks vertically on mobile.
 */
const NewsletterForm = styled.div`
  display: flex;
  gap: 0.5rem;
  max-width: 350px;
  width: 100%; /* Ensure it takes available width */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/**
 * Newsletter email input field.
 */
const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;
  min-width: 150px; /* Prevent it from getting too squished */

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

/**
 * Newsletter submit button.
 */
const NewsletterButton = styled.button`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  /* Added to center the icon */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.85rem; /* Make it a bit taller on mobile */
  }
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLinkItem = styled(Link)`
  color: #cccccc;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    color: #ffffff;
    transform: translateX(5px);
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const BottomLink = styled(Link)`
  color: #666;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const Footer = () => {
  const mainLinks = [
    // { to: "/models", label: "Models" },
    // { to: "/rims", label: "Rims" },
    { to: "/cars", label: "Cars for sale" },
    // { to: "/atelier", label: "Atelier" },
    // { to: "/boutique", label: "Boutique" },
  ];

  const companyLinks = [
    // { to: "/armoring", label: "Armoring" },
    { to: "/dealers", label: "Dealers" },
    { to: "/company", label: "Company" },
    { to: "/careers", label: "Careers" },
    // { to: "/press", label: "Press room" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  const servicesLinks = [
    { to: "/luxury-aviation", label: "Luxury aviation" },
    { to: "/marine", label: "Marine" },
    { to: "/past-models", label: "Past models" },
    { to: "/residences", label: "Residences" },
  ];

  return (
    <FooterWrapper>
      <Container>
        <TopSection>
          <Brand>
            <Logo>YOUNG BOY TOYZ</Logo>
            <BrandDescription>
              From premium builds to community and culture, YBT is more than a
              marketplace — it’s a lifestyle. More than a showroom — YBT is a
              luxury lifestyle movement dedicated to bespoke performance
              machines and the culture that surrounds them.
            </BrandDescription>
            <NewsletterForm>
              <NewsletterInput type="email" placeholder="Enter your email" />
              <NewsletterButton>
                <ArrowRight size={16} />
              </NewsletterButton>
            </NewsletterForm>
          </Brand>

          <FooterColumn>
            <ColumnTitle>Models</ColumnTitle>
            <FooterLinks>
              {mainLinks.map((link) => (
                <FooterLink key={link.to}>
                  <FooterLinkItem to={link.to}>{link.label}</FooterLinkItem>
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Company</ColumnTitle>
            <FooterLinks>
              {companyLinks.map((link) => (
                <FooterLink key={link.to}>
                  <FooterLinkItem to={link.to}>{link.label}</FooterLinkItem>
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Services</ColumnTitle>
            <FooterLinks>
              {servicesLinks.map((link) => (
                <FooterLink key={link.to}>
                  <FooterLinkItem to={link.to}>{link.label}</FooterLinkItem>
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>
        </TopSection>

        <BottomSection>
          <Copyright>© YOUNG BOY TOYZ 2025</Copyright>
          <BottomLinks>
            <BottomLink to="/imprint">Imprint</BottomLink>
            <BottomLink to="/privacy">Privacy policy</BottomLink>
          </BottomLinks>
        </BottomSection>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
