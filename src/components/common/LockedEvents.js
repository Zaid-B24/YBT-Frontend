import { LuLockKeyhole } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const AuthButton = styled(Link)`
  background: linear-gradient(to right, #dc2626, #b91c1c);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: scale(1.05);
  }
`;

const DetailsCard = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SimpleLockedCard = styled(DetailsCard)`
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
  border-color: rgba(255, 255, 255, 0.2);
`;

const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://images.unsplash.com/photo-1593622512339-7a2c8a75a7b4?q=80&w=2070&auto=format&fit=crop");
  background-size: cover;
  background-position: center;
  filter: blur(10px) brightness(0.6);
  transform: scale(1.2);
  z-index: 1;
`;

const LockedContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #fff;
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const LockedLocation = () => {
  const location = useLocation();
  return (
    <SimpleLockedCard>
      <BlurBackground />
      <LockedContent>
        <LuLockKeyhole size={36} strokeWidth={1.5} />
        <SectionTitle style={{ fontSize: "1.5rem", marginBottom: 0 }}>
          Location Locked
        </SectionTitle>
        <p style={{ margin: 0, opacity: 0.8, maxWidth: "250px" }}>
          Please log in or create an account to view the event location.
        </p>
        <AuthButton
          style={{ marginTop: "0.5rem" }}
          to="/auth"
          state={{ from: location }}
        >
          Login / Sign Up
        </AuthButton>
      </LockedContent>
    </SimpleLockedCard>
  );
};

export default LockedLocation;
