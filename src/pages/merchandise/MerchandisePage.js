import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Filter, Grid, List, Heart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const FilterSection = styled.div`
  padding: 2rem;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.1);
`;

const FilterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? 'rgba(255,255,255,0.1)' : 'transparent'};
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255,255,255,0.05);
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  padding: 0.8rem;
  background: ${props => props.active ? 'rgba(255,255,255,0.1)' : 'transparent'};
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.05);
  }
`;

const ProductsGrid = styled.div`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.listView ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))'};
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  display: ${props => props.listView ? 'flex' : 'block'};

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.2);
  }
`;

const ProductImage = styled.div`
  height: ${props => props.listView ? '200px' : '250px'};
  width: ${props => props.listView ? '200px' : '100%'};
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  position: relative;
  flex-shrink: 0;
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const ProductContent = styled.div`
  padding: 2rem;
  flex: 1;
`;

const ProductTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const AddToCartButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const WishlistButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isInWishlist ? 'rgba(255, 99, 107, 0.2)' : 'rgba(255,255,255,0.1)'};
  border: 1px solid ${props => props.isInWishlist ? 'rgba(255, 99, 107, 0.5)' : 'rgba(255,255,255,0.2)'};
  color: ${props => props.isInWishlist ? '#ff636b' : '#fff'};
  padding: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.isInWishlist ? 'rgba(255, 99, 107, 0.3)' : 'rgba(255,255,255,0.2)'};
  }
`;

const MerchandisePage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [listView, setListView] = useState(false);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const products = [
    {
      id: 1,
      title: "YOUNG BOY TOYZ Premium Hoodie",
      description: "Luxury cotton blend hoodie with embroidered logo and premium finish.",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "$89.99",
      rating: 4.8,
      reviews: 124,
      category: "apparel",
      badge: "Bestseller"
    },
    {
      id: 2,
      title: "Carbon Fiber Wallet",
      description: "Sleek carbon fiber wallet with RFID protection and premium leather interior.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "$129.99",
      rating: 4.9,
      reviews: 89,
      category: "accessories",
      badge: "New"
    },
    {
      id: 3,
      title: "Limited Edition Watch",
      description: "Swiss-made timepiece with carbon fiber case and YOUNG BOY TOYZ branding.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "$599.99",
      rating: 5.0,
      reviews: 45,
      category: "accessories",
      badge: "Limited"
    },
    {
      id: 4,
      title: "Performance T-Shirt",
      description: "Moisture-wicking performance fabric with subtle logo placement.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "$39.99",
      rating: 4.6,
      reviews: 203,
      category: "apparel",
      badge: null
    },
    {
      id: 5,
      title: "Leather Keychain",
      description: "Premium leather keychain with metal YOUNG BOY TOYZ emblem.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "$29.99",
      rating: 4.7,
      reviews: 156,
      category: "accessories",
      badge: null
    },
    {
      id: 6,
      title: "Racing Jacket",
      description: "Professional racing jacket with team colors and sponsor logos.",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "$199.99",
      rating: 4.9,
      reviews: 67,
      category: "apparel",
      badge: "Premium"
    }
  ];

  const filters = [
    { key: 'all', label: 'All Products' },
    { key: 'apparel', label: 'Apparel' },
    { key: 'accessories', label: 'Accessories' },
    { key: 'premium', label: 'Premium' }
  ];

  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'premium') return product.price.includes('199') || product.price.includes('599');
    return product.category === activeFilter;
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i <= rating ? '#fff' : 'none'}
          color={i <= rating ? '#fff' : '#666'}
        />
      );
    }
    return stars;
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: parseFloat(product.price.replace('$', '')),
      image: product.image
    });
  };

  const handleToggleWishlist = (product) => {
    toggleWishlist({
      id: product.id,
      title: product.title,
      description: product.description,
      price: parseFloat(product.price.replace('$', '')),
      image: product.image
    });
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Merchandise</HeroTitle>
        <HeroSubtitle>
          Discover our exclusive collection of premium merchandise and accessories, 
          crafted with the same attention to detail as our luxury vehicles.
        </HeroSubtitle>
      </HeroSection>

      <FilterSection>
        <FilterContainer>
          <FilterTabs>
            {filters.map(filter => (
              <FilterTab
                key={filter.key}
                active={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </FilterTab>
            ))}
          </FilterTabs>
          
          <ViewToggle>
            <ViewButton
              active={!listView}
              onClick={() => setListView(false)}
            >
              <Grid size={16} />
            </ViewButton>
            <ViewButton
              active={listView}
              onClick={() => setListView(true)}
            >
              <List size={16} />
            </ViewButton>
          </ViewToggle>
        </FilterContainer>
      </FilterSection>

      <ProductsGrid>
        <GridContainer listView={listView}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              listView={listView}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductImage image={product.image} listView={listView}>
                {product.badge && <ProductBadge>{product.badge}</ProductBadge>}
              </ProductImage>
              <ProductContent>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price}</ProductPrice>
                <ProductRating>
                  <Stars>{renderStars(product.rating)}</Stars>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </ProductRating>
                <ProductActions>
                  <AddToCartButton onClick={() => handleAddToCart(product)}>
                    <ShoppingCart size={16} />
                    Add to Cart
                  </AddToCartButton>
                  <WishlistButton 
                    onClick={() => handleToggleWishlist(product)}
                    isInWishlist={isInWishlist(product.id)}
                  >
                    <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                  </WishlistButton>
                </ProductActions>
              </ProductContent>
            </ProductCard>
          ))}
        </GridContainer>
      </ProductsGrid>
    </PageWrapper>
  );
};

export default MerchandisePage; 