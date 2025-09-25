import { Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const LockedOverlay = styled.div`
  position: relative;
  border-radius: 12px;
  padding: 4rem 2rem;
  margin-top: 1rem;
  overflow: hidden;
  text-align: center;
  background: rgba(26, 26, 26, 0.5); /* Semi-transparent background */
  border: 1px solid #292929;

  /* This creates the cool glass/blur effect */
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
  }
`;

const LockedContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LockedText = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: #f2f2f2;
  margin: 0;
`;

const LoginButton = styled(Link)`
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

const LockedContent = () => {
  const location = useLocation();
  return (
    <LockedOverlay>
      <LockedContentWrapper>
        <Lock size={32} color="#e1c841" />
        <LockedText>This content is for members only</LockedText>
        <LoginButton to="/auth" state={{ from: location }}>
          Login to View Details
        </LoginButton>
      </LockedContentWrapper>
    </LockedOverlay>
  );
};

export default LockedContent;
