import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: #111;
  color: #fff;
`;

const ErrorTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #f87171;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  max-width: 600px;
`;

const RefreshButton = styled.button`
  background: #fff;
  color: #111;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    
    console.error("Error caught by boundary:", error);
    console.error("Error info:", errorInfo);
    
    // Send error to monitoring service (e.g., Sentry)
    // if (window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but an unexpected error has occurred. Our team has been notified and we're working to fix it.
          </ErrorMessage>
          <RefreshButton onClick={this.handleRefresh}>
            Refresh Page
          </RefreshButton>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre
              style={{
                marginTop: "2rem",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                fontSize: "0.8rem",
                maxWidth: "800px",
                overflow: "auto",
                textAlign: "left",
              }}
            >
              {this.state.error.toString()}
              {"\n"}
              {this.state.errorInfo?.componentStack}
            </pre>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
