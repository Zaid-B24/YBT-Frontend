import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const ImprintContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const ImprintTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 3rem;
  text-align: center;
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
  
  strong {
    color: #fff;
  }
`;

const ContactCard = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ImprintPage = () => {
  return (
    <PageWrapper>
      <ImprintContainer>
        <ImprintTitle>Legal Information</ImprintTitle>

        <ContactCard>
          <SectionTitle>Company Information</SectionTitle>
          <SectionContent>
            <p>
              <strong>Company Name:</strong> YOUNG BOY TOYZ Private Limited<br />
              <strong>Legal Form:</strong> Private Limited Company<br />
              <strong>Registration Number:</strong> CIN: U74999MH2023PTC123456<br />
              <strong>GST Number:</strong> 27AABCY1234L1ZZ<br />
              <strong>PAN Number:</strong> AABCY1234L
            </p>
          </SectionContent>
        </ContactCard>

        <ContactCard>
          <SectionTitle>Registered Address</SectionTitle>
          <SectionContent>
            <p>
              YOUNG BOY TOYZ Private Limited<br />
              123, Luxury Plaza, Bandra Kurla Complex<br />
              Mumbai, Maharashtra 400051<br />
              India
            </p>
          </SectionContent>
        </ContactCard>

        <ContactCard>
          <SectionTitle>Contact Information</SectionTitle>
          <SectionContent>
            <p>
              <strong>Phone:</strong> +91 9876543210<br />
              <strong>Email:</strong> info@youngboytoyz.com<br />
              <strong>Website:</strong> www.youngboytoyz.com<br />
              <strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST
            </p>
          </SectionContent>
        </ContactCard>

        <Section>
          <SectionTitle>Authorized Representatives</SectionTitle>
          <SectionContent>
            <p>
              <strong>Managing Director:</strong> Mr. Rajesh Kumar<br />
              <strong>Chief Executive Officer:</strong> Ms. Priya Sharma<br />
              <strong>Chief Technology Officer:</strong> Mr. Arjun Patel
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Regulatory Information</SectionTitle>
          <SectionContent>
            <p>
              <strong>Registrar of Companies:</strong> Mumbai, Maharashtra<br />
              <strong>Date of Incorporation:</strong> January 15, 2023<br />
              <strong>Authorized Capital:</strong> ₹10,00,000<br />
              <strong>Paid-up Capital:</strong> ₹5,00,000
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Business Activities</SectionTitle>
          <SectionContent>
            <p>
              YOUNG BOY TOYZ specializes in luxury automotive customization, high-end merchandise, and exclusive automotive experiences. Our services include:
            </p>
            <p>
              • Custom vehicle modifications and enhancements<br />
              • Luxury automotive merchandise and accessories<br />
              • Exclusive automotive events and experiences<br />
              • Premium car auctions and collectibles<br />
              • Automotive consulting and design services
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Intellectual Property</SectionTitle>
          <SectionContent>
            <p>
              All content, trademarks, service marks, trade names, logos, and intellectual property displayed on this website are the property of YOUNG BOY TOYZ Private Limited or their respective owners. Unauthorized use is strictly prohibited.
            </p>
            <p>
              <strong>Trademark:</strong> YOUNG BOY TOYZ® is a registered trademark of YOUNG BOY TOYZ Private Limited.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Liability Disclaimer</SectionTitle>
          <SectionContent>
            <p>
              The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information contained on the website.
            </p>
            <p>
              Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Governing Law</SectionTitle>
          <SectionContent>
            <p>
              This website and its contents are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with this website shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Data Protection Officer</SectionTitle>
          <SectionContent>
            <p>
              For all data protection and privacy-related inquiries, please contact our Data Protection Officer:
            </p>
            <p>
              <strong>Name:</strong> Ms. Anita Desai<br />
              <strong>Email:</strong> dpo@youngboytoyz.com<br />
              <strong>Phone:</strong> +91 9876543211
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Professional Indemnity</SectionTitle>
          <SectionContent>
            <p>
              YOUNG BOY TOYZ Private Limited maintains professional indemnity insurance coverage through HDFC ERGO General Insurance Company Limited, Policy Number: PI/2023/YBT/001.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Environmental Compliance</SectionTitle>
          <SectionContent>
            <p>
              We are committed to environmental sustainability and comply with all applicable environmental regulations. Our operations are conducted in accordance with the Environmental Protection Act, 1986, and related state regulations.
            </p>
          </SectionContent>
        </Section>

        <ContactCard>
          <SectionTitle>Customer Service</SectionTitle>
          <SectionContent>
            <p>
              For customer service inquiries, complaints, or feedback:
            </p>
            <p>
              <strong>Customer Care:</strong> +91 1800-123-4567 (Toll-free)<br />
              <strong>Email:</strong> support@youngboytoyz.com<br />
              <strong>WhatsApp:</strong> +91 9876543210<br />
              <strong>Hours:</strong> 24/7 Customer Support
            </p>
          </SectionContent>
        </ContactCard>

        <Section>
          <SectionContent>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '2rem' }}>
              <em>Last updated: January 5, 2024</em>
            </p>
          </SectionContent>
        </Section>
      </ImprintContainer>
    </PageWrapper>
  );
};

export default ImprintPage; 