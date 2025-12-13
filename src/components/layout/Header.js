import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${(props) =>
    props.scrolled ? "rgba(0, 0, 0, 0.95)" : "transparent"};
  backdrop-filter: ${(props) => (props.scrolled ? "blur(20px)" : "none")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: ${(props) =>
    props.scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none"};
  will-change: background-color, backdrop-filter;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0.8rem 3rem;
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  min-height: 80px;

  @media (max-width: 1200px) {
    padding: 1.25rem 2rem;
  }

  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    min-height: 70px;
  }
`;

const LeftMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2.3rem;
  align-items: center;
  margin: 0;
  padding: 0;
  justify-self: start;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Logo = styled(Link)`
  grid-column: 2;
  justify-self: center;
  z-index: 10;
  position: relative;
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 100%;

  img {
    height: clamp(40px, 5vw, 80px);
    width: auto;
    max-width: 100%;
    object-fit: contain;
    opacity: 0.95;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &::before {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ffffff, transparent);
    transition: width 0.4s ease;
    transform: translateX(-50%);
  }

  &:hover img {
    transform: translateY(-2px);
    filter: drop-shadow(0 4px 14px rgba(255, 255, 255, 0.35));
    opacity: 1;
  }

  &:hover::before {
    width: 80%;
  }
  @media (hover: none) {
    &:hover img {
      transform: none;
      filter: none;
    }
  }
`;

const RightMenuContainer = styled.div`
  grid-column: 3;
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-column: unset;
    justify-self: unset;
  }
`;

const RightMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2.3rem;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.6rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const GreetingText = styled.div`
  display: flex;
  align-items: baseline; /* Aligns text with different font sizes properly */
  gap: 0.3rem; /* Adds a small space between "Hii" and the name */
  max-width: 120px; /* Adjust width as needed */
  overflow: hidden;

  /* Style for "Hii" */
  span {
    font-size: 0.85rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
  }

  /* Style for the user's name */
  strong {
    font-size: 0.95rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.8;
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-1px);
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem 0;
  min-width: 180px;
  z-index: 1000;
  backdrop-filter: blur(20px);
  margin-top: 0.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.isOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)"};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9rem;
  border-radius: 8px;
  margin: 0 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }

  svg {
    opacity: 0.7;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  width: calc(100% - 1rem);
  text-align: left;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9rem;
  border-radius: 8px;
  margin: 0 0.5rem;

  &:hover {
    background: rgba(255, 99, 107, 0.1);
    color: #ff636b;
    transform: translateX(4px);
  }

  svg {
    opacity: 0.7;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #ffffff;
  padding: 0.6rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  text-decoration: none;
  display: flex;
  align-items: center;
  opacity: 0.85;

  &:after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    width: 0;
    height: 1px;
    background: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
  }

  &:hover:after,
  &.active:after {
    width: 100%;
  }

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  &.active {
    opacity: 1;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  padding: 0.5rem;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: absolute; /* dropdown below the header */
  top: 100%; /* right below the header */
  right: 1rem; /* align to right edge */
  background: #000; /* solid black background */
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  padding: 0.5rem 0; /* space inside menu */
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 1001;
  width: 200px; /* dropdown width */

  transform: scaleY(${(props) => (props.isOpen ? 1 : 0)});
  transform-origin: top;
  transition: transform 0.25s ease, opacity 0.25s ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  @media (min-width: 1025px) {
    display: none;
  }
`;

const MobileMenuActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.25rem 0;
`;

const MobileNavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: rgba(255, 255, 255, 0.15);
    font-weight: 600;
  }
`;

const MobileActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 100%;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const MobileGreeting = styled.div`
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0 0.25rem 0.25rem 0.25rem; /* Aligns with link padding */
`;

const HamburgerIcon = styled.div`
  width: 24px;
  height: 18px;
  position: relative;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #ffffff;
    border-radius: 1px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2) {
      top: 8px;
    }

    &:nth-child(3) {
      top: 16px;
    }
  }
`;

//{ to: "/models", label: "Models" },

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const { user, logout } = useAuth();
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target) // <-- ignore button clicks
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleUserMenuClickOutside = (event) => {
      // If user menu is open, and the click happened outside of it
      if (
        userMenuOpen &&
        !event.target.closest("[data-user-menu]") // check that click didn't happen inside user menu
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleUserMenuClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleUserMenuClickOutside);
  }, [userMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const leftNavItems = [
    { to: "/collections", label: "Collections" },
    { to: "/events", label: "Tickets" },
    { to: "/merchandise", label: "Merchandise" },
  ];

  const rightNavItems = [
    { to: "/faq", label: "FAQ" },
    // { to: '/blog', label: 'Blog' },
    // { to: "/auctions", label: "Auctions" },
    //{ to: "/rentals", label: "Rentals" },
    { to: "/about", label: "About Us" },
    //{ to: "/contact", label: "Contact Us" },
  ];

  return (
    <HeaderWrapper scrolled={scrolled}>
      <Nav>
        <LeftMenu>
          {leftNavItems.map((item) => (
            <NavItem key={item.to}>
              <NavLink
                to={item.to}
                className={location.pathname === item.to ? "active" : ""}
              >
                {item.label}
              </NavLink>
            </NavItem>
          ))}
        </LeftMenu>

        <Logo to="/">
          <img src="/logo_1.svg" alt="YOUNG BOY TOYZ" />
        </Logo>

        <RightMenuContainer>
          <RightMenu>
            {rightNavItems.map((item) => (
              <NavItem key={item.to}>
                <NavLink
                  to={item.to}
                  className={location.pathname === item.to ? "active" : ""}
                >
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </RightMenu>

          <UserActions>
            {user ? (
              <UserMenu data-user-menu>
                <UserButton
                  onClick={() => {
                    setUserMenuOpen((prev) => !prev);
                    setMobileMenuOpen(false);
                  }}
                >
                  <User size={20} />
                  <GreetingText>
                    <span>Hii</span>
                    <strong>{user.name}</strong>
                  </GreetingText>
                </UserButton>
                <UserDropdown isOpen={userMenuOpen}>
                  <DropdownItem to="/profile">
                    <User size={16} />
                    Account
                  </DropdownItem>
                  <DropdownItem to="/profile#orders">
                    <ShoppingCart size={16} />
                    Orders
                  </DropdownItem>
                  <DropdownButton onClick={logout}>
                    <LogOut size={16} />
                    Logout
                  </DropdownButton>
                </UserDropdown>
              </UserMenu>
            ) : (
              <ActionButton as={Link} to="/auth" title="Login">
                <User size={20} />
              </ActionButton>
            )}
          </UserActions>
        </RightMenuContainer>

        <MobileMenuButton
          ref={mobileMenuButtonRef}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <HamburgerIcon>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </MobileMenuButton>
      </Nav>

      <MobileMenu ref={mobileMenuRef} isOpen={mobileMenuOpen}>
        {user ? (
          <>
            <MobileGreeting>HII {user.name.toUpperCase()}</MobileGreeting>
            <MobileNavLink
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={location.pathname === "/profile" ? "active" : ""}
            >
              Account
            </MobileNavLink>
            {/* <MobileNavLink
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className={location.pathname === "/my-bookings" ? "active" : ""}
            >
              Orders
            </MobileNavLink> */}
          </>
        ) : (
          <MobileGreeting>PLEASE LOG IN..🥺</MobileGreeting>
        )}
        {[...leftNavItems, ...rightNavItems].map((item) => (
          <MobileNavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileMenuOpen(false)}
            className={location.pathname === item.to ? "active" : ""}
          >
            {item.label}
          </MobileNavLink>
        ))}

        <MobileMenuActions>
          {user ? (
            <MobileActionButton
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
            >
              <LogOut size={20} />
              Logout
            </MobileActionButton>
          ) : (
            <MobileActionButton
              as={Link}
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={20} />
              Login
            </MobileActionButton>
          )}
        </MobileMenuActions>
      </MobileMenu>
    </HeaderWrapper>
  );
};

export default Header;
