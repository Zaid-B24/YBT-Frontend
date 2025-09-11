import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';

const PageWrapper = styled.div`
  padding-top: 100px;
  background: #000;
  color: #fff;
  min-height: 100vh;
`;

const BackButton = styled(Link)`
  position: fixed;
  top: 120px;
  left: 2rem;
  z-index: 1000;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 0.8rem;
  border-radius: 50%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), 
              url('https://www.mansory.com/sites/default/files/styles/hero_large/public/2024-03/bmw-m5-hero.jpg') center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const CategoryBadge = styled.div`
  background: rgba(255,255,255,0.1);
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: inline-block;
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

const HeroSubtitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const HeroButton = styled.button`
  background: ${props => props.primary ? '#fff' : 'transparent'};
  color: ${props => props.primary ? '#000' : '#fff'};
  border: 1px solid ${props => props.primary ? '#fff' : 'rgba(255,255,255,0.5)'};
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? '#f0f0f0' : 'rgba(255,255,255,0.1)'};
  }
`;

const NavigationTabs = styled.div`
  background: #111;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 0 2rem;
  position: sticky;
  top: 100px;
  z-index: 100;
`;

const TabsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  overflow-x: auto;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#fff' : '#666'};
  padding: 1rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: #fff;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fff;
  }
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const SectionSubtitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: #ccc;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #ccc;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const SpecCard = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  text-align: center;
`;

const SpecValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SpecLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const RimsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const RimCard = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.1);
    transform: translateY(-2px);
  }
`;

const RimImage = styled.div`
  width: 100%;
  height: 100px;
  background: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #666;
`;

const RimName = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const RimFinish = styled.div`
  font-size: 0.7rem;
  color: #666;
`;

const RequestForm = styled.div`
  background: #111;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  margin: 2rem 0;
`;

const FormTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #ccc;
`;

const FormInput = styled.input`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 0.8rem;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.4);
  }
`;

const FormSelect = styled.select`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 0.8rem;
  font-size: 0.9rem;

  option {
    background: #333;
  }

  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.4);
  }
`;

const FormTextarea = styled.textarea`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 0.8rem;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.4);
  }
`;

const SubmitButton = styled.button`
  background: #fff;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #f0f0f0;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const GalleryImage = styled.div`
  height: 200px;
  background: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;

  &:hover {
    transform: scale(1.02);
  }
`;

const ConfigureSection = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 3rem;
  text-align: center;
  margin: 3rem 0;
`;

const ConfigureTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ConfigureSubtitle = styled.p`
  color: #ccc;
  margin-bottom: 2rem;
`;

const ConfigureButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CarDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('introduction');
  const [formData, setFormData] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    vinNumber: '',
    message: ''
  });

  // Sample car data - in a real app, this would come from an API or database
  const carData = {
    'bmw-m5-young-boy-toyz-edition': {
      title: 'BMW M5',
      subtitle: 'YOUNG BOY TOYZ Edition',
      category: 'Performance Sedan',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      description: 'YOUNG BOY TOYZ introduce the new thrilled customization programme with power and aerodynamics precision for the BMW M5 (G90)',
      specs: {
        horsepower: '850',
        torque: '1,150',
        rims: '22"',
        components: 'Carbon'
      }
    },
    'tesla-cybertruck-elongation-evo': {
      title: 'Tesla Cybertruck',
      subtitle: 'Elongation EVO',
      category: 'Electric SUV',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      description: 'Revolutionary electric pickup with extended wheelbase and luxury interior modifications.',
      specs: {
        horsepower: '630',
        torque: '1,020',
        rims: '24"',
        components: 'Carbon'
      }
    },
    'lamborghini-huracan-veneno': {
      title: 'Lamborghini Huracán',
      subtitle: 'Veneno Edition',
      category: 'Supercar',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      description: 'Track-focused supercar with aggressive aerodynamics and lightweight construction.',
      specs: {
        horsepower: '770',
        torque: '750',
        rims: '21"',
        components: 'Carbon'
      }
    },
    // Add more car data as needed
    'mercedes-g63-amg-gronos': {
      title: 'Mercedes G63 AMG',
      subtitle: 'Gronos Edition',
      category: 'Luxury SUV',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      description: 'Luxury SUV with wide body kit and performance enhancements.',
      specs: {
        horsepower: '820',
        torque: '1,100',
        rims: '23"',
        components: 'Carbon'
      }
    },
    'porsche-911-gt3-rs-stallion': {
      title: 'Porsche 911 GT3 RS',
      subtitle: 'Stallion Edition',
      category: 'Sports Car',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      description: 'Race-bred sports car with advanced aerodynamics and track-tuned suspension.',
      specs: {
        horsepower: '650',
        torque: '620',
        rims: '21"',
        components: 'Carbon'
      }
    },
    'ferrari-f8-tributo-tempesta': {
      title: 'Ferrari F8 Tributo',
      subtitle: 'Tempesta Edition',
      category: 'Supercar',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      description: 'Italian masterpiece with enhanced performance and bespoke styling.',
      specs: {
        horsepower: '800',
        torque: '770',
        rims: '21"',
        components: 'Carbon'
      }
    }
  };

  const currentCar = carData[id] || carData['bmw-m5-young-boy-toyz-edition']; // Fallback to BMW M5

  const tabs = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'exterior', label: 'Exterior' },
    { id: 'rims', label: 'Rims' },
    { id: 'interior', label: 'Interior' },
    { id: 'performance', label: 'Performance' },
    { id: 'gallery', label: 'Gallery' }
  ];

  const rims = [
    { name: 'FV.10', finish: 'Black Glossy', size: '22"x10,5 ET20' },
    { name: 'FV.10', finish: 'Black Glossy', size: '22"x11,5 ET25' },
    { name: 'DX.5', finish: 'Black Diamond', size: '22"' },
    { name: 'FO.6', finish: 'Raw - for custom paint', size: '22"' },
    { name: 'FV.9', finish: 'Black Glossy', size: '22"' },
    { name: 'FC.5', finish: 'Black Glossy', size: '22"' },
    { name: 'Y.5', finish: 'Black Diamond', size: '22"' },
    { name: 'W.5', finish: 'Polished', size: '22"' },
    { name: 'N.80', finish: 'Black Diamond', size: '22"' },
    { name: 'N.50', finish: 'Black Glossy', size: '22"' },
    { name: 'FS.23', finish: 'Black Glossy', size: '22"' },
    { name: 'FD.15', finish: 'Chrome', size: '22"' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you. Your request has been sent successfully.');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'introduction':
        return (
          <ContentSection>
            <SectionTitle>{currentCar.title}</SectionTitle>
            <SectionSubtitle>
              {currentCar.description}
            </SectionSubtitle>
            
            <AboutText>
              Lightweight add-on components made of carbon fiber, ultra-light forged rims, 
              enhanced performance and combination with a sport exhaust system with 
              stunning design elements. Much more to come…
            </AboutText>

            <SpecsGrid>
              <SpecCard>
                <SpecValue>{currentCar.specs.horsepower}</SpecValue>
                <SpecLabel>Horsepower</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>{currentCar.specs.torque}</SpecValue>
                <SpecLabel>Nm Torque</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>{currentCar.specs.rims}</SpecValue>
                <SpecLabel>Forged Rims</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>{currentCar.specs.components}</SpecValue>
                <SpecLabel>Fiber Components</SpecLabel>
              </SpecCard>
            </SpecsGrid>

            <RequestForm>
              <FormTitle>Fill the form to send a request for a price.</FormTitle>
              <form onSubmit={handleSubmit}>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Salutation *</FormLabel>
                    <FormSelect name="salutation" value={formData.salutation} onChange={handleInputChange} required>
                      <option value="">Select</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </FormSelect>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>First name *</FormLabel>
                    <FormInput 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Last name *</FormLabel>
                    <FormInput 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email address *</FormLabel>
                    <FormInput 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Phone number *</FormLabel>
                    <FormInput 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Address *</FormLabel>
                    <FormInput 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Country *</FormLabel>
                    <FormSelect name="country" value={formData.country} onChange={handleInputChange} required>
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </FormSelect>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>VIN number *</FormLabel>
                    <FormInput 
                      type="text" 
                      name="vinNumber" 
                      value={formData.vinNumber} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </FormGroup>
                </FormGrid>
                <FormGroup>
                  <FormLabel>Message *</FormLabel>
                  <FormTextarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Tell us about your requirements..."
                    required 
                  />
                </FormGroup>
                <SubmitButton type="submit">Send Request</SubmitButton>
              </form>
            </RequestForm>
          </ContentSection>
        );

      case 'rims':
        return (
          <ContentSection>
            <SectionTitle>Rims</SectionTitle>
            <SectionSubtitle>Compatible rims</SectionSubtitle>
            
            <RimsGrid>
              {rims.map((rim, index) => (
                <RimCard key={index}>
                  <RimImage>Rim Image</RimImage>
                  <RimName>{rim.name}</RimName>
                  <RimFinish>{rim.finish}</RimFinish>
                  <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.5rem' }}>
                    {rim.size}
                  </div>
                </RimCard>
              ))}
            </RimsGrid>

            <ConfigureSection>
              <ConfigureTitle>Custom configuration</ConfigureTitle>
              <ConfigureSubtitle>Contact us or start the new configuration right now.</ConfigureSubtitle>
              <ConfigureButtons>
                <HeroButton primary>Request Price</HeroButton>
                <HeroButton>Product Overview</HeroButton>
                <HeroButton>Configure</HeroButton>
              </ConfigureButtons>
            </ConfigureSection>
          </ContentSection>
        );

      case 'interior':
        return (
          <ContentSection>
            <SectionTitle>Interior</SectionTitle>
            <SectionSubtitle>Interior of your choice</SectionSubtitle>
            
            <AboutText>
              Every YOUNG BOY TOYZ masterpiece is a singular expression of its owner's unique vision.
            </AboutText>

            <div style={{ textAlign: 'center', margin: '3rem 0' }}>
              <div style={{ 
                height: '300px', 
                background: '#333', 
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666'
              }}>
                360° panorama interior view
              </div>
              <HeroButton>See 360° View</HeroButton>
            </div>

            <ConfigureSection>
              <ConfigureTitle>Interested in the custom configuration?</ConfigureTitle>
              <ConfigureButtons>
                <HeroButton primary>Contact Us</HeroButton>
              </ConfigureButtons>
            </ConfigureSection>
          </ContentSection>
        );

      case 'performance':
        return (
          <ContentSection>
            <SectionTitle>Performance</SectionTitle>
            
            <SpecsGrid>
              <SpecCard>
                <SpecValue>1</SpecValue>
                <SpecLabel>Stage</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>+120 HP</SpecValue>
                <SpecLabel>Power</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>+150 Nm</SpecValue>
                <SpecLabel>Torque</SpecLabel>
              </SpecCard>
              <SpecCard>
                <SpecValue>+20 Km/h</SpecValue>
                <SpecLabel>V-Max</SpecLabel>
              </SpecCard>
            </SpecsGrid>

            <AboutText>
              Experience unparalleled performance with our stage 1 upgrade package. 
              Enhanced power delivery, improved torque characteristics, and increased top speed 
              make this the ultimate BMW M5 transformation.
            </AboutText>
          </ContentSection>
        );

      case 'gallery':
        return (
          <ContentSection>
            <SectionTitle>Gallery</SectionTitle>
            
            <GalleryGrid>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <GalleryImage key={item}>
                  Gallery Image {item}
                </GalleryImage>
              ))}
            </GalleryGrid>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <HeroButton>Show More</HeroButton>
            </div>
          </ContentSection>
        );

      case 'exterior':
        return (
          <ContentSection>
            <SectionTitle>Exterior</SectionTitle>
            <SectionSubtitle>Unique as you</SectionSubtitle>
            
            <AboutText>
              Every YOUNG BOY TOYZ masterpiece is a singular expression of its owner's unique vision. 
              Carbon fiber aerodynamic components, custom paint options, and precision-crafted details 
              ensure your BMW M5 stands apart from the ordinary.
            </AboutText>

            <GalleryGrid>
              {[1, 2, 3, 4].map((item) => (
                <GalleryImage key={item}>
                  Exterior View {item}
                </GalleryImage>
              ))}
            </GalleryGrid>
          </ContentSection>
        );

      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <BackButton to="/models">
        <ArrowLeft size={20} />
      </BackButton>
      
      <HeroSection style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${currentCar.image})` }}>
        <HeroContent>
          <CategoryBadge>{currentCar.category}</CategoryBadge>
          <HeroTitle>{currentCar.title}</HeroTitle>
          <HeroSubtitle>{currentCar.subtitle}</HeroSubtitle>
          <HeroButtons>
            <HeroButton>Discover</HeroButton>
            <HeroButton primary>Request Price</HeroButton>
            <HeroButton>Product Overview</HeroButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <NavigationTabs>
        <TabsContainer>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Tab>
          ))}
        </TabsContainer>
      </NavigationTabs>

      {renderTabContent()}
    </PageWrapper>
  );
};

export default CarDetailsPage; 