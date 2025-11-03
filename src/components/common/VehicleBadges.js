import { Zap } from "lucide-react";
import styled from "styled-components";

export const BadgesContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;
export const CarBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

const VehicleBadges = ({ vehicle }) => {
  const allBadges = vehicle.badges || [];

  if (!allBadges.length) {
    return null;
  }

  return (
    <BadgesContainer>
      {allBadges.map((badge, index) => (
        <CarBadge key={index}>
          {badge.includes("STAGE") && <Zap size={12} />}
          {badge}
        </CarBadge>
      ))}
    </BadgesContainer>
  );
};

export default VehicleBadges;
