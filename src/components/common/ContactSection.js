import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #050505 0%, #0f0f0f 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  max-width: 600px;
  margin: 0 auto;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FormSection = styled.div``;

const ContactInfo = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #cccccc;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #ffffff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #ffffff;
  color: #000000;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const ContactDetail = styled.p`
  color: #cccccc;
  line-height: 1.6;
`;

const InfoTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  color: #cccccc;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  color: #00ff88;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1rem;
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1000);
  };

  return (
    <Section>
      <Container>
        <Header>
          <Title>Join YOUNG BOY TOYZ</Title>
          <Subtitle>
            Get in touch with us to discuss your luxury automotive project. 
            Our team of experts is ready to transform your vision into reality.
          </Subtitle>
        </Header>

        <Content>
          <FormSection>
            {showSuccess && (
              <SuccessMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                Thank you! Your message has been sent successfully.
              </SuccessMessage>
            )}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </SubmitButton>
            </Form>
          </FormSection>

          <ContactInfo>
            <InfoTitle>Get in Touch</InfoTitle>
            <Description>
              Ready to transform your vehicle into a masterpiece? Contact our team 
              of experts who will guide you through every step of your luxury 
              automotive journey.
            </Description>

            <ContactCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContactItem>
                <ContactIcon>
                  <Mail size={20} />
                </ContactIcon>
                <ContactText>
                  <ContactTitle>Email</ContactTitle>
                  <ContactDetail>info@youngboytoyz.com</ContactDetail>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <Phone size={20} />
                </ContactIcon>
                <ContactText>
                  <ContactTitle>Phone</ContactTitle>
                  <ContactDetail>+49 (0) 8784 / 24-0</ContactDetail>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <MapPin size={20} />
                </ContactIcon>
                <ContactText>
                  <ContactTitle>Address</ContactTitle>
                                      <ContactDetail>
                      Los Angeles, California<br />
                      Premium Automotive Excellence
                    </ContactDetail>
                </ContactText>
              </ContactItem>
            </ContactCard>
          </ContactInfo>
        </Content>
      </Container>
    </Section>
  );
};

export default ContactSection; 