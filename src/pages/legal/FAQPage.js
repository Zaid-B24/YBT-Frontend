import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle, Phone, Mail } from 'lucide-react';

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

const SearchSection = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SearchBox = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  border-radius: 8px;
  font-size: 1rem;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.4);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #666;
`;

const FAQContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 0.5rem;
`;

const FAQItem = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.02);
  }
`;

const ChevronIcon = styled(ChevronDown)`
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 1rem;
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 1.5rem 1.5rem;
  color: #ccc;
  line-height: 1.6;
`;

const ContactSection = styled.div`
  padding: 4rem 2rem;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.1);
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const ContactSubtitle = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ContactMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ContactMethod = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const ContactIcon = styled.div`
  margin-bottom: 1rem;
  color: #fff;
`;

const ContactLabel = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ContactInfo = styled.p`
  color: #ccc;
  font-size: 0.9rem;
`;

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      category: "General Information",
      questions: [
        {
          id: 1,
          question: "What is YOUNG BOY TOYZ?",
          answer: "YOUNG BOY TOYZ is a luxury automotive customization company specializing in high-end vehicle modifications, performance upgrades, and bespoke automotive solutions. We transform ordinary vehicles into extraordinary masterpieces."
        },
        {
          id: 2,
          question: "Where are you located?",
          answer: "Our headquarters and main showroom are located in Los Angeles, California. We also have authorized dealers and service centers across the United States."
        },
        {
          id: 3,
          question: "How long have you been in business?",
          answer: "YOUNG BOY TOYZ was founded in 2020 and has quickly established itself as a premier destination for luxury automotive customization, with over 1000 vehicles modified to date."
        }
      ]
    },
    {
      category: "Services & Modifications",
      questions: [
        {
          id: 4,
          question: "What types of modifications do you offer?",
          answer: "We offer a comprehensive range of modifications including performance upgrades, body kits, interior customization, exhaust systems, suspension upgrades, wheel and tire packages, and complete vehicle transformations."
        },
        {
          id: 5,
          question: "Do you work on all vehicle brands?",
          answer: "We specialize in luxury and high-performance vehicles including BMW, Mercedes-Benz, Audi, Porsche, Lamborghini, Ferrari, Tesla, and many other premium brands."
        },
        {
          id: 6,
          question: "How long does a typical modification take?",
          answer: "Project timelines vary depending on the scope of work. Simple modifications may take 1-2 weeks, while complete transformations can take 2-6 months. We provide detailed timelines during consultation."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          id: 7,
          question: "How much do your modifications cost?",
          answer: "Pricing varies significantly based on the vehicle, modifications requested, and materials used. We offer free consultations to provide accurate quotes tailored to your specific needs and budget."
        },
        {
          id: 8,
          question: "Do you offer financing options?",
          answer: "Yes, we partner with several financing companies to offer flexible payment plans for qualified customers. Contact us to discuss financing options that work for your situation."
        },
        {
          id: 9,
          question: "What payment methods do you accept?",
          answer: "We accept cash, certified checks, wire transfers, and major credit cards. For larger projects, we typically require a deposit with the balance due upon completion."
        }
      ]
    },
    {
      category: "Warranty & Support",
      questions: [
        {
          id: 10,
          question: "Do you provide warranties on your work?",
          answer: "Yes, we provide comprehensive warranties on all our work. Parts and labor warranties vary by component and modification type, typically ranging from 1-3 years."
        },
        {
          id: 11,
          question: "Do you offer maintenance services?",
          answer: "Absolutely! We provide ongoing maintenance and support for all vehicles we modify. Our certified technicians are familiar with every modification we install."
        },
        {
          id: 12,
          question: "What if I have issues after the modification?",
          answer: "We stand behind our work 100%. If you experience any issues, contact us immediately and we'll resolve them promptly under our warranty program."
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Frequently Asked Questions</HeroTitle>
        <HeroSubtitle>
          Find answers to common questions about our services, processes, and policies.
        </HeroSubtitle>
      </HeroSection>

      <SearchSection>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
      </SearchSection>

      <FAQContainer>
        {filteredFAQs.map((category) => (
          <CategorySection key={category.category}>
            <CategoryTitle>{category.category}</CategoryTitle>
            {category.questions.map((faq) => (
              <FAQItem
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <FAQQuestion onClick={() => toggleItem(faq.id)}>
                  {faq.question}
                  <ChevronIcon isOpen={openItems[faq.id]} />
                </FAQQuestion>
                <AnimatePresence>
                  {openItems[faq.id] && (
                    <FAQAnswer
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </CategorySection>
        ))}
      </FAQContainer>

      <ContactSection>
        <ContactTitle>Still Have Questions?</ContactTitle>
        <ContactSubtitle>
          Our team is here to help. Reach out through any of these channels.
        </ContactSubtitle>
        <ContactMethods>
          <ContactMethod
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ContactIcon>
              <Phone size={32} />
            </ContactIcon>
            <ContactLabel>Phone</ContactLabel>
            <ContactInfo>+1 (555) 123-4567</ContactInfo>
          </ContactMethod>
          <ContactMethod
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <ContactIcon>
              <Mail size={32} />
            </ContactIcon>
            <ContactLabel>Email</ContactLabel>
            <ContactInfo>info@youngboytoyz.com</ContactInfo>
          </ContactMethod>
          <ContactMethod
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactIcon>
              <MessageCircle size={32} />
            </ContactIcon>
            <ContactLabel>Live Chat</ContactLabel>
            <ContactInfo>Available 9 AM - 6 PM PST</ContactInfo>
          </ContactMethod>
        </ContactMethods>
      </ContactSection>
    </PageWrapper>
  );
};

export default FAQPage; 