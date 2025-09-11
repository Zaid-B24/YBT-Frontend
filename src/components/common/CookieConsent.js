import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings } from 'lucide-react';

const ConsentWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Text = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.3rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Button = styled.button`
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex: 1;
    padding: 0.8rem 1rem;
    font-size: 0.8rem;
  }
`;

const AcceptButton = styled(Button)`
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  color: #000000;
  border: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
`;

const DeclineButton = styled(Button)`
  background: transparent;
  color: #cccccc;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
`;

const SettingsButton = styled(Button)`
  background: transparent;
  color: #cccccc;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  color: #666;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
  }
`;

const SettingsPanel = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  z-index: 2001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SettingsContent = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SettingsTitle = styled.h3`
  font-size: 1.3rem;
  color: #ffffff;
`;

const SettingsItem = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const SettingsItemTitle = styled.h4`
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const SettingsItemDescription = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  display: none;
`;

const ToggleSlider = styled.div`
  width: 40px;
  height: 20px;
  background: ${props => props.checked ? '#00ff88' : '#333'};
  border-radius: 20px;
  position: relative;
  transition: background 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.checked ? '22px' : '2px'};
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

const ToggleLabel = styled.span`
  color: #cccccc;
  font-size: 0.9rem;
`;

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('youngboytoy-cookie-consent');
    if (!consent) {
      setTimeout(() => setShowConsent(true), 2000);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setPreferences(allPreferences);
    localStorage.setItem('youngboytoy-cookie-consent', JSON.stringify({
      timestamp: Date.now(),
      preferences: allPreferences
    }));
    setShowConsent(false);
  };

  const handleDecline = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setPreferences(necessaryOnly);
    localStorage.setItem('youngboytoy-cookie-consent', JSON.stringify({
      timestamp: Date.now(),
      preferences: necessaryOnly
    }));
    setShowConsent(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('youngboytoy-cookie-consent', JSON.stringify({
      timestamp: Date.now(),
      preferences
    }));
    setShowSettings(false);
    setShowConsent(false);
  };

  const handleToggle = (key) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <AnimatePresence>
        {showConsent && (
          <ConsentWrapper
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CloseButton onClick={() => setShowConsent(false)}>
              <X size={16} />
            </CloseButton>
            <Container>
              <Content>
                <IconWrapper>
                  <Cookie size={20} />
                </IconWrapper>
                <Text>
                  <Title>Cookie Preferences</Title>
                  <Description>
                    We use cookies to enhance your browsing experience and provide personalized content. 
                    You can accept all cookies or customize your preferences.
                  </Description>
                </Text>
              </Content>
              <Actions>
                <SettingsButton onClick={() => setShowSettings(true)}>
                  <Settings size={16} />
                </SettingsButton>
                <DeclineButton onClick={handleDecline}>
                  Decline
                </DeclineButton>
                <AcceptButton onClick={handleAcceptAll}>
                  Accept All
                </AcceptButton>
              </Actions>
            </Container>
          </ConsentWrapper>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SettingsContent>
              <SettingsHeader>
                <SettingsTitle>Cookie Settings</SettingsTitle>
                <CloseButton onClick={() => setShowSettings(false)}>
                  <X size={20} />
                </CloseButton>
              </SettingsHeader>

              <SettingsItem>
                <SettingsItemTitle>Necessary Cookies</SettingsItemTitle>
                <SettingsItemDescription>
                  These cookies are essential for the website to function properly. 
                  They cannot be disabled.
                </SettingsItemDescription>
                <Toggle>
                  <ToggleInput type="checkbox" checked={true} disabled />
                  <ToggleSlider checked={true} />
                  <ToggleLabel>Always Active</ToggleLabel>
                </Toggle>
              </SettingsItem>

              <SettingsItem>
                <SettingsItemTitle>Analytics Cookies</SettingsItemTitle>
                <SettingsItemDescription>
                  Help us understand how visitors interact with our website by 
                  collecting anonymous information.
                </SettingsItemDescription>
                <Toggle>
                  <ToggleInput 
                    type="checkbox" 
                    checked={preferences.analytics}
                    onChange={() => handleToggle('analytics')}
                  />
                  <ToggleSlider checked={preferences.analytics} />
                  <ToggleLabel>Analytics</ToggleLabel>
                </Toggle>
              </SettingsItem>

              <SettingsItem>
                <SettingsItemTitle>Marketing Cookies</SettingsItemTitle>
                <SettingsItemDescription>
                  Used to track visitors across websites to display relevant 
                  advertisements and promotions.
                </SettingsItemDescription>
                <Toggle>
                  <ToggleInput 
                    type="checkbox" 
                    checked={preferences.marketing}
                    onChange={() => handleToggle('marketing')}
                  />
                  <ToggleSlider checked={preferences.marketing} />
                  <ToggleLabel>Marketing</ToggleLabel>
                </Toggle>
              </SettingsItem>

              <SettingsItem>
                <SettingsItemTitle>Preference Cookies</SettingsItemTitle>
                <SettingsItemDescription>
                  Remember your preferences and settings to provide a more 
                  personalized experience.
                </SettingsItemDescription>
                <Toggle>
                  <ToggleInput 
                    type="checkbox" 
                    checked={preferences.preferences}
                    onChange={() => handleToggle('preferences')}
                  />
                  <ToggleSlider checked={preferences.preferences} />
                  <ToggleLabel>Preferences</ToggleLabel>
                </Toggle>
              </SettingsItem>

              <AcceptButton 
                onClick={handleSaveSettings}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                Save Preferences
              </AcceptButton>
            </SettingsContent>
          </SettingsPanel>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent; 