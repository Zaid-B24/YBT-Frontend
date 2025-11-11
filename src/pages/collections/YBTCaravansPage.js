import styled from "styled-components";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: black;
  color: #fff;
  display: flex;
`;

const YBTCaravansPage = () => {
  return (
    <PageWrapper>
      <p style={{ fontSize: "1.5rem", color: "#666" }}>
        Oops we are cooking something! We'll get back soon 😉
      </p>
    </PageWrapper>
  );
};

export default YBTCaravansPage;
