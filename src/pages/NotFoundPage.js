import { Link } from "react-router-dom";
import styled from "styled-components";
import { Home } from "lucide-react";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: #111;
  color: #fff;
`;

const NotFoundCode = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 8rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const NotFoundTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 600;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NotFoundMessage = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  max-width: 400px;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  color: #111;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundCode>404</NotFoundCode>
      <NotFoundTitle>Page Not Found</NotFoundTitle>
      <NotFoundMessage>
        The page you're looking for doesn't exist or has been moved.
      </NotFoundMessage>
      <HomeButton to="/">
        <Home size={20} />
        Back to Home
      </HomeButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
