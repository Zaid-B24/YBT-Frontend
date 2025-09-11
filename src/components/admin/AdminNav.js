import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Car,
  Users,
  Calendar,
  DollarSign,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  Bike,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${(props) =>
    props.scrolled ? "rgba(0, 0, 0, 0.95)" : "transparent"};

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: ${(props) =>
    props.scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none"};
  will-change: background-color, backdrop-filter;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.25rem 3rem;
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  min-height: 80px;

  @media (max-width: 1200px) {
    padding: 1.25rem 2rem;
  }

  @media (max-width: 968px) {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    min-height: 70px;
  }
`;

const LeftMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
  margin: 0;
  padding: 0;
  justify-self: start;

  @media (max-width: 968px) {
    display: none;
  }
`;

const Logo = styled(Link)`
  grid-column: 2;
  justify-self: center;
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 2.5px;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 10;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &::before {
    content: "≡";
    margin-right: 0.75rem;
    font-size: 0.9rem;
    font-weight: 300;
    opacity: 0.7;
  }

  &::after {
    content: "≡";
    margin-left: 0.75rem;
    font-size: 0.9rem;
    font-weight: 300;
    opacity: 0.7;
  }

  @media (max-width: 968px) {
    position: static;
    grid-column: unset;
    justify-self: unset;
    font-size: 1.3rem;
    letter-spacing: 2px;

    &::before,
    &::after {
      display: none;
    }
  }
`;

const RightMenuContainer = styled.div`
  grid-column: 3;
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 968px) {
    grid-column: unset;
    justify-self: unset;
  }
`;

const RightMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.75rem;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 968px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${(props) => (props.active ? "#fff" : "rgba(255, 255, 255, 0.8)")};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #ff4444, #ff6b6b);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  ${(props) =>
    props.active &&
    `
    &::after {
      width: 100%;
    }
  `}
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  text-align: right;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: #fff;
`;

const UserRole = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  border: none;
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 68, 68, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  padding: 0.6rem;
  cursor: pointer;
  display: none;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 968px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(20px);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  transform: translateX(${(props) => (props.open ? "0" : "100%")});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MobileMenuClose = styled.button`
  background: none;
  border: none;
  color: #fff;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MobileNavLink = styled(Link)`
  color: ${(props) => (props.active ? "#fff" : "rgba(255, 255, 255, 0.8)")};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid transparent;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  ${(props) =>
    props.active &&
    `
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  `}
`;

const MobileLogoutButton = styled.button`
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  border: none;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 68, 68, 0.4);
  }
`;

const AdminNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/admin/cars", label: "Cars", icon: Car },
    { path: "/admin/bikes", label: "Bikes", icon: Bike },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <HeaderWrapper scrolled={scrolled}>
        <Nav>
          <LeftMenu>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  active={location.pathname === item.path}
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </LeftMenu>

          <Logo to="/admin/dashboard">YOUNG BOY TOYZ</Logo>

          <RightMenuContainer>
            <RightMenu>
              <li>
                <UserSection>
                  <UserInfo>
                    <UserName>{user?.name}</UserName>
                    <UserRole>Administrator</UserRole>
                  </UserInfo>
                  <LogoutButton onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </LogoutButton>
                </UserSection>
              </li>
            </RightMenu>
            <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </MobileMenuButton>
          </RightMenuContainer>
        </Nav>
      </HeaderWrapper>

      <MobileMenu open={mobileMenuOpen}>
        <MobileMenuHeader>
          <Logo to="/admin/dashboard">YOUNG BOY TOYZ</Logo>
          <MobileMenuClose onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </MobileMenuClose>
        </MobileMenuHeader>

        <MobileNavLinks>
          {navItems.map((item) => (
            <MobileNavLink
              key={item.path}
              to={item.path}
              active={location.pathname === item.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon size={20} />
              {item.label}
            </MobileNavLink>
          ))}
          <MobileLogoutButton onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </MobileLogoutButton>
        </MobileNavLinks>
      </MobileMenu>
    </>
  );
};

export default AdminNav;
