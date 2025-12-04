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

  /* Reduce padding on mobile to save space */
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
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
    margin-bottom: 2rem; /* Less space below on mobile */
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0;

  @media (min-width: 768px) {
    padding: 0;
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

  /* Mobile: Smaller Logo */
  @media (max-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }
`;

const BrandDescription = styled.p`
  color: #cccccc;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 400px;
  font-size: 0.95rem; /* Desktop base size */

  /* Mobile: Smaller text and tighter line height */
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

/**
 * Container for the newsletter input and button.
 */
const NewsletterForm = styled.div`
  display: flex;
  gap: 0.5rem;
  max-width: 350px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: row; /* Keep it side-by-side if it fits, or column if preferred */
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;
  min-width: 150px;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* Mobile: Smaller input text */
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.6rem 0.8rem;
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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
  }
`;

const FooterColumn = styled.div``;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem; /* Tighter spacing on mobile */
  }
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

  /* Mobile: Smaller link text */
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column-reverse; /* Stack copyright below links */
    gap: 1.5rem;
    text-align: center;
    padding-top: 1.5rem;
  }
`;

const Copyright = styled.p`
  color: #666;
  font-size: 0.9rem;

  /* Mobile: Smaller copyright text */
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: row; /* Keep links side by side if possible */
    gap: 1.5rem;
  }
`;

const BottomLink = styled(Link)`
  color: #666;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }

  /* Mobile: Smaller bottom links */
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Footer = () => {
  const mainLinks = [
    // { to: "/models", label: "Models" },
    //{ to: "/faq", label: "FAQ" },
    { to: "/rentals", label: "Rentals" },

    { to: "/auctions", label: "Auctions" },
    { to: "/rims", label: "Rims" },
    { to: "/contact", label: "Contact Us" },
    // { to: "/boutique", label: "Boutique" },
  ];

  const companyLinks = [
    // { to: "/armoring", label: "Armoring" },
    { to: "/dealers", label: "Dealers" },
    // { to: "/press", label: "Press room" },
    { to: "/blog", label: "Blog" },
  ];

  // const servicesLinks = [
  //   { to: "/luxury-aviation", label: "Luxury aviation" },
  //   { to: "/marine", label: "Marine" },
  //   { to: "/past-models", label: "Past models" },
  //   { to: "/residences", label: "Residences" },
  // ];

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
            <FooterLinks>
              {mainLinks.map((link) => (
                <FooterLink key={link.to}>
                  <FooterLinkItem to={link.to}>{link.label}</FooterLinkItem>
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterLinks>
              {companyLinks.map((link) => (
                <FooterLink key={link.to}>
                  <FooterLinkItem to={link.to}>{link.label}</FooterLinkItem>
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>

          {/* <FooterColumn>
            <FooterLinks>
              {servicesLinks.map((link) => (
                <FooterLink key={link.to}>
                  <FooterLinkItem to={link.to}>{link.label}</FooterLinkItem>
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn> */}
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
