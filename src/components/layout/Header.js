import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { X, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";

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
//Default Logo
// const Logo = styled(Link)`
//   grid-column: 2;
//   justify-self: center;
//   font-family: "Playfair Display", serif;
//   font-size: 1.5rem;
//   font-weight: 400;
//   letter-spacing: 2.5px;
//   color: #ffffff;
//   text-decoration: none;
//   transition: all 0.3s ease;
//   z-index: 10;
//   white-space: nowrap;

//   &:hover {
//     opacity: 0.8;
//     transform: translateY(-1px);
//   }

//   &::before {
//     content: "≡";
//     margin-right: 0.75rem;
//     font-size: 0.9rem;
//     font-weight: 300;
//     opacity: 0.7;
//   }

//   &::after {
//     content: "≡";
//     margin-left: 0.75rem;
//     font-size: 0.9rem;
//     font-weight: 300;
//     opacity: 0.7;
//   }

//   @media (max-width: 968px) {
//     position: static;
//     grid-column: unset;
//     justify-self: unset;
//     font-size: 1.3rem;
//     letter-spacing: 2px;

//     &::before,
//     &::after {
//       display: none;
//     }
//   }
// `;

// UnderLIne the logo
const Logo = styled(Link)`
  grid-column: 2;
  justify-self: center;
  font-family: "Playfair Display", serif;
  font-size: 1.6rem;
  font-weight: 300;
  letter-spacing: 3px;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  white-space: nowrap;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 50%;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ffffff, transparent);
    transition: all 0.4s ease;
    transform: translateX(-50%);
  }

  &:hover {
    transform: translateY(-2px);
    text-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);

    &::before {
      width: 100%;
    }
  }

  @media (max-width: 968px) {
    position: static;
    grid-column: unset;
    justify-self: unset;
    font-size: 1.4rem;
    letter-spacing: 2.5px;
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

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 1rem;

  @media (max-width: 968px) {
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

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  color: #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: 2px solid #000;
  box-shadow: 0 2px 8px rgba(255, 68, 68, 0.3);
  animation: ${(props) => (props.pulse ? "pulse 2s infinite" : "none")};

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.8;
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-1px);
  }

  span {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 1001;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  @media (min-width: 969px) {
    display: none;
  }
`;

const MobileMenuActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MobileActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 200px;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const MobileNavLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-align: center;
  min-width: 200px;

  &:hover {
    opacity: 0.8;
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }

  &.active {
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
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
  const { getCartItemsCount, toggleCart } = useCart();
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest("[data-user-menu]")) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [userMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const leftNavItems = [
    { to: "/collections", label: "Collections" },
    { to: "/events", label: "Events" },
    { to: "/merchandise", label: "Merchandise" },
  ];

  const rightNavItems = [
    // { to: '/faq', label: 'FAQ' },
    // { to: '/blog', label: 'Blog' },
    { to: "/auctions", label: "Auctions" },
    { to: "/rentals", label: "Rentals" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
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

        <Logo to="/">YOUNG BOY TOYZ</Logo>

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
            {/* <ActionButton onClick={toggleCart} title="Shopping Cart">
              <ShoppingCart size={20} />
              {getCartItemsCount() > 0 && (
                <Badge pulse={getCartItemsCount() > 0}>
                  {getCartItemsCount() > 99 ? "99+" : getCartItemsCount()}
                </Badge>
              )}
            </ActionButton>

            <ActionButton as={Link} to="/wishlist" title="Wishlist">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <Badge>
                  {wishlistItems.length > 99 ? "99+" : wishlistItems.length}
                </Badge>
              )}
            </ActionButton> */}

            {user ? (
              <UserMenu data-user-menu>
                <UserButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <User size={20} />
                  <span>{user.name}</span>
                </UserButton>
                <UserDropdown isOpen={userMenuOpen}>
                  <DropdownItem to="/profile">
                    <User size={16} />
                    Profile
                  </DropdownItem>
                  <DropdownItem to="/orders">
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

        <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
          <HamburgerIcon>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </MobileMenuButton>
      </Nav>

      <MobileMenu isOpen={mobileMenuOpen}>
        <CloseButton onClick={() => setMobileMenuOpen(false)}>
          <X size={24} />
        </CloseButton>
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
          <MobileActionButton
            onClick={() => {
              toggleCart();
              setMobileMenuOpen(false);
            }}
          >
            <ShoppingCart size={20} />
            Cart ({getCartItemsCount()})
          </MobileActionButton>

          <MobileActionButton
            as={Link}
            to="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Heart size={20} />
            Wishlist ({wishlistItems.length})
          </MobileActionButton>

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
              to="/login"
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
