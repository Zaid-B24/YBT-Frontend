import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const WishlistItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
`;

const ItemImage = styled.div`
  height: 200px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  position: relative;
`;

const ItemContent = styled.div`
  padding: 1.5rem;
`;

const ItemTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ItemDescription = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled(motion.button)`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: ${props => props.primary ? 'linear-gradient(45deg, #fff, #f0f0f0)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.primary ? '#000' : '#fff'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(45deg, #f0f0f0, #e0e0e0)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const RemoveButton = styled(motion.button)`
  padding: 0.75rem;
  border: 1px solid rgba(255, 99, 107, 0.3);
  border-radius: 8px;
  background: rgba(255, 99, 107, 0.1);
  color: #ff636b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 99, 107, 0.2);
    border-color: rgba(255, 99, 107, 0.5);
  }
`;

const EmptyWishlist = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const EmptyIcon = styled.div`
  margin-bottom: 2rem;
  color: #333;
`;

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.title,
      price: item.price || 0,
      image: item.image
    });
  };

  return (
    <PageWrapper>
      <Container>
        <Header>
          <Title>My Wishlist</Title>
          <Subtitle>
            Your saved items and dream customizations
          </Subtitle>
        </Header>

        {wishlistItems.length === 0 ? (
          <EmptyWishlist>
            <EmptyIcon>
              <Heart size={64} />
            </EmptyIcon>
            <h3>Your wishlist is empty</h3>
            <p>Start adding items you love to your wishlist</p>
          </EmptyWishlist>
        ) : (
          <WishlistGrid>
            {wishlistItems.map((item, index) => (
              <WishlistItem
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ItemImage image={item.image} />
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                  {item.price && (
                    <ItemPrice>${item.price}</ItemPrice>
                  )}
                  <ItemActions>
                    <ActionButton
                      primary
                      onClick={() => handleAddToCart(item)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </ActionButton>
                    <RemoveButton
                      onClick={() => removeFromWishlist(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 size={16} />
                    </RemoveButton>
                  </ItemActions>
                </ItemContent>
              </WishlistItem>
            ))}
          </WishlistGrid>
        )}
      </Container>
    </PageWrapper>
  );
};

export default WishlistPage; 