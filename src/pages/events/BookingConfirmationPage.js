import styled from "styled-components";

import { useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

// --- Styled Components (Matching your YBT Theme) ---
// ... (All styled components like PageWrapper, ConfirmationCard, etc. are identical to the previous answer)
const PageWrapper = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  color: #fff;
  font-family: "Inter", sans-serif;

  @media (max-width: 768px) {
    margin: 2rem auto;
    padding: 1rem;
  }
`;

const ConfirmationCard = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const IconWrapper = styled.div`
  color: ${(props) => (props.success ? "#28a745" : "#dc3545")};
  line-height: 1;
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  margin: 0;
  margin-top: 0.5rem;
`;

const Message = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 400px;
  margin: 0;
`;

const DetailText = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  word-break: break-all;
  margin-top: 1rem; /* Added some margin for spacing */
`;

// REMOVED: ActionButton styled component

// --- Component ---

const BookingConfirmationPage = () => {
  // REMOVED: navigate
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");
  const reason = searchParams.get("reason");
  const paymentId = searchParams.get("paymentId");

  const isSuccess = status === "success";

  // REMOVED: handleAction function

  return (
    <PageWrapper>
      <ConfirmationCard>
        <IconWrapper success={isSuccess}>
          {isSuccess ? <CheckCircle size={48} /> : <XCircle size={48} />}
        </IconWrapper>

        <Title>{isSuccess ? "Order Confirmed!" : "Payment Failed"}</Title>

        <Message>
          {isSuccess
            ? "Your Order is complete. You will be able to see your tickets in your profile."
            : "Unfortunately, your payment could not be processed."}
        </Message>

        {isSuccess && orderId && <DetailText>Order ID: {orderId}</DetailText>}
        {isSuccess && paymentId && (
          <DetailText>Payment ID: {paymentId}</DetailText>
        )}
        {!isSuccess && reason && (
          <DetailText>Reason: {decodeURIComponent(reason)}</DetailText>
        )}

        {/* REMOVED: ActionButton JSX */}
      </ConfirmationCard>
    </PageWrapper>
  );
};

export default BookingConfirmationPage;
