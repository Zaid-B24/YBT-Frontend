import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, Mail } from "lucide-react";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const HeroSection = styled.section`
  padding: 2rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto 2rem;
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
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
`;

const FAQItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
    background: rgba(255, 255, 255, 0.02);
  }
`;

const ChevronIcon = styled(ChevronDown)`
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
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
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-family: "Playfair Display", serif;
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
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

const InfoImage = styled.img`
  height: 350px;
  width: 100%;
  @media (max-width: 768px) {
    height: 200px;
    width: 100%;
  }
`;

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqData = [
    {
      category: "Frequently Asked Questions",
      questions: [
        {
          id: 1,
          question: "What is YBT?",
          answer:
            "YBT is India’s first premium marketplace for aftermarket-upgraded & limited-edition mobility — from cars and superbikes to caravans, motorhomes, boats, and more.\nWe connect you directly with top designers, workshops, and rare vehicle owners.",
        },
        {
          id: 2,
          question: "What makes YBT special?",
          answer:
            "✔ Curated & verified vehicles\n✔ Exclusive designer builds\n✔ Digital showroom experience\n✔ Pan-India delivery support\n✔ Community events & culture (IDM)\n\nWe don’t list everything. Only the best, authentic, premium machines.",
        },
        {
          id: 3,
          question: "What can I buy on YBT?",
          answer:
            "• Modified / upgraded cars\n• Superbikes & adventure bikes\n• Off-roaders & ATVs\n• Caravans & motorhomes\n• Vanity vans\n• Private jets & boats (on request)",
        },
        {
          id: 4,
          question: "How does buying work?",
          answer:
            "Browse → Shortlist → Connect with our team →\nInspection & verification → Secure transaction → Delivery\n\nOur Concierge experts guide you throughout.",
        },
        {
          id: 5,
          question: "How does selling work?",
          answer:
            "Share your vehicle details → 9619007705 ( WhatsApp) \nOur team verifies →\nWe shortlist pricing →\nYour machine gets listed to the right audience.",
        },
        {
          id: 6,
          question: "Who upgrades the vehicles?",
          answer:
            "India’s & International Level most skilled & trusted designers / workshops.\n\nYBT works only with verified talent ensuring safe, premium-grade builds.",
        },
        {
          id: 7,
          question: "What is YBT Collection?",
          answer:
            "A curated set of premium machines personally sourced, verified, restored, and showcased as elite collectibles.",
        },
        {
          id: 8,
          question: "What is IDM?",
          answer:
            "IDM — Indian Domestic Market Culture\n\nWe celebrate automobile passion through:\n• Meetups\n• Auto shows\n• Rallies\n• Track events\n\nBuy tickets to your favorite events through YBT and be part of the culture Indian Domestic market I.D.M",
        },
        {
          id: 9,
          question: "Is it safe to buy through YBT?",
          answer:
            "Yes.\n\nEvery listing goes through verification.\nVehicle health certificate Assurance No work Just Drive.\n\nYou get proper documentation, expert Concierge guidance & safe transaction support.",
        },
        {
          id: 10,
          question: "Which locations do you serve?",
          answer:
            "Pan-India — We Introduced ourself as a [ Digital Showroom ]\n\nPlus cross-border trade via YBT Dubai, serving the UAE and expanding to Indonesia & USA.",
        },
        {
          id: 11,
          question: "Do you offer custom builds?",
          answer:
            "Yes —\n\nShare your vision, and we connect you with the best designers to build your dream machine.",
        },
      ],
    },
  ];

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <PageWrapper>
      <HeroSection>
        <HeroSubtitle>
          Find answers to common questions about our services, processes, and
          policies.
        </HeroSubtitle>
      </HeroSection>
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
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
            <InfoImage src="/r3.jpg" />
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
            <ContactInfo>+91 9619007705</ContactInfo>
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
            <ContactInfo>Collab@youngboyztoyz.com</ContactInfo>
          </ContactMethod>
        </ContactMethods>
      </ContactSection>
    </PageWrapper>
  );
};

export default FAQPage;
