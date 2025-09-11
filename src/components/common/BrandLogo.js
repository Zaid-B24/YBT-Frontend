import styled from "styled-components";

import BMWLogo from "../../assets/Logos/bmw-svgrepo-com.svg";
import GmcLogo from "../../assets/Logos/gmc-svgrepo-com.svg";
import HondaLogo from "../../assets/Logos/honda-svgrepo-com.svg";
import LexusLogo from "../../assets/Logos/lexus-svgrepo-com.svg";
import NissanLogo from "../../assets/Logos/nissan-svgrepo-com.svg";
import RollsRoyce from "../../assets/Logos/rolls-royce-svgrepo-com.svg";
import TataLogo from "../../assets/Logos/tata-svgrepo-com.svg";
import ToyotaLogo from "../../assets/Logos/toyota-svgrepo-com.svg";

const logoMap = {
  Tata: TataLogo,
  Honda: HondaLogo,
  GMC: GmcLogo,
  Toyota: ToyotaLogo,
  Lexus: LexusLogo,
  Nissan: NissanLogo,
  BMW: BMWLogo,
  RollsRoyce: RollsRoyce,
};

// const LogoContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px; /* Space between logo and text */
//   font-size: 1.1rem;
//   font-weight: 500;
// `;

// const LogoImage = styled.img`
//   height: 30px; /* Adjust size as needed */
//   width: auto;
// `;

// const BrandText = styled.span`
//   color: #333; /* Style for the fallback text */
// `;

const BrandLogo = styled.img.attrs((props) => ({
  // Find the logo in a map and set the src, with a fallback
  src: logoMap[props.brand] || "/path/to/default-logo.svg",
  alt: `${props.brand} Logo`,
}))`
  height: 50px; /* Adjust size as needed */
  width: auto;
  object-fit: contain;

  /* Styling to make it look premium */
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 10px;
`;

export default BrandLogo;
