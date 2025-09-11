import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const CartOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const CartContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  background: #0a0a0a;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: #ccc;
  }
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  border-radius: 8px;
  flex-shrink: 0;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h3`
  font-size: 0.9rem;
  color: #fff;
  margin: 0;
`;

const ItemPrice = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin: 0;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
`;

const QuantityButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Quantity = styled.span`
  color: #fff;
  font-size: 0.9rem;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;
  
  &:hover {
    color: #ff5252;
  }
`;

const EmptyCart = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const CartFooter = styled.div`
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    isCartOpen,
    toggleCart
  } = useCart();

  const handleCheckout = () => {
    toggleCart(); // Close cart
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <CartOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />
          <CartContainer
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <CartHeader>
              <CartTitle>
                <ShoppingBag size={24} />
                Shopping Cart ({cartItems.length})
              </CartTitle>
              <CloseButton onClick={toggleCart}>
                <X size={24} />
              </CloseButton>
            </CartHeader>

            {cartItems.length === 0 ? (
              <EmptyCart>
                <ShoppingBag size={48} />
                <p>Your cart is empty</p>
              </EmptyCart>
            ) : (
              <>
                <CartItems>
                  {cartItems.map(item => (
                    <CartItem key={item.id}>
                      <ItemImage image={item.image} />
                      <ItemDetails>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>₹{item.price.toLocaleString()}</ItemPrice>
                        <QuantityControls>
                          <QuantityButton
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={16} />
                          </QuantityButton>
                          <Quantity>{item.quantity}</Quantity>
                          <QuantityButton
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </QuantityButton>
                        </QuantityControls>
                      </ItemDetails>
                      <RemoveButton onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={16} />
                      </RemoveButton>
                    </CartItem>
                  ))}
                </CartItems>

                <CartFooter>
                  <CartTotal>
                    <span>Total:</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </CartTotal>
                  <CheckoutButton
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                  </CheckoutButton>
                </CartFooter>
              </>
            )}
          </CartContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart; 