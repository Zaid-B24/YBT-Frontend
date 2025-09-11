import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const PrivacyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const PrivacyTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  text-align: center;
`;

const LastUpdated = styled.p`
  text-align: center;
  color: #ccc;
  margin-bottom: 3rem;
  font-style: italic;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const SectionContent = styled.div`
  line-height: 1.7;
  color: #ccc;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  strong {
    color: #fff;
  }
`;

const ContactInfo = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
`;

const PrivacyPage = () => {
  return (
    <PageWrapper>
      <PrivacyContainer>
        <PrivacyTitle>Privacy Policy</PrivacyTitle>
        <LastUpdated>Last updated: January 5, 2024</LastUpdated>

        <Section>
          <SectionTitle>1. Introduction</SectionTitle>
          <SectionContent>
            <p>
              Welcome to YOUNG BOY TOYZ ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p>
              By accessing or using our website, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>2. Information We Collect</SectionTitle>
          <SectionContent>
            <p><strong>Personal Information:</strong></p>
            <ul>
              <li>Name, email address, phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Account credentials and preferences</li>
            </ul>
            
            <p><strong>Automatically Collected Information:</strong></p>
            <ul>
              <li>IP address, browser type, and device information</li>
              <li>Website usage data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Location data (with your consent)</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>3. How We Use Your Information</SectionTitle>
          <SectionContent>
            <p>We use the collected information for various purposes:</p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To process transactions and fulfill orders</li>
              <li>To communicate with you about your account and orders</li>
              <li>To send promotional materials and marketing communications (with your consent)</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
              <li>To detect and prevent fraud or security issues</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>4. Information Sharing and Disclosure</SectionTitle>
          <SectionContent>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and conducting business</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              <li><strong>Consent:</strong> When you have given explicit consent for sharing</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>5. Data Security</SectionTitle>
          <SectionContent>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>SSL encryption for data transmission</li>
              <li>Secure servers and databases</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>6. Cookies and Tracking Technologies</SectionTitle>
          <SectionContent>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files stored on your device that help us:
            </p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve website functionality</li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>7. Your Rights and Choices</SectionTitle>
          <SectionContent>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided below.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>8. Third-Party Links</SectionTitle>
          <SectionContent>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>9. Children's Privacy</SectionTitle>
          <SectionContent>
            <p>
              Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>10. International Data Transfers</SectionTitle>
          <SectionContent>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>11. Changes to This Privacy Policy</SectionTitle>
          <SectionContent>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </SectionContent>
        </Section>

        <ContactInfo>
          <SectionTitle>Contact Us</SectionTitle>
          <SectionContent>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@youngboytoyz.com<br />
              <strong>Phone:</strong> +91 9876543210<br />
              <strong>Address:</strong> YOUNG BOY TOYZ, Mumbai, Maharashtra, India
            </p>
          </SectionContent>
        </ContactInfo>
      </PrivacyContainer>
    </PageWrapper>
  );
};

export default PrivacyPage; 