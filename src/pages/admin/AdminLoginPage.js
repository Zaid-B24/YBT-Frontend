import React from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #111827; /* bg-gray-900 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Card = styled.div`
  max-width: 28rem; /* max-w-md */
  width: 100%;
  margin: 0 auto;
  background-color: #1f2937; /* bg-gray-800 */
  padding: 2rem;
  border-radius: 1rem; /* rounded-2xl */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); /* shadow-lg */
`;

const Title = styled.h1`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 800; /* font-extrabold */
  color: #fff;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #9ca3af; /* text-gray-400 */
  text-align: center;
  margin-top: 0.5rem;
`;

const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputWrapper = styled.div``;

const Label = styled.label`
  position: absolute;
  left: -9999px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem; /* rounded-lg */
  background-color: #374151; /* bg-gray-700 */
  border: 1px solid #4b5563; /* border-gray-600 */
  color: #fff;
  font-size: 1rem;

  ::placeholder {
    color: #9ca3af; /* placeholder-gray-400 */
  }

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px #6366f1;
  }
`;

const ErrorBox = styled.div`
  background-color: rgba(239, 68, 68, 0.2); /* bg-red-500/20 */
  border: 1px solid #ef4444; /* border-red-500 */
  color: #fca5a5; /* text-red-300 */
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  background-color: #4f46e5; /* bg-indigo-600 */
  color: #fff;
  font-weight: bold;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem; /* rounded-lg */
  transition: all 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4338ca; /* bg-indigo-700 */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #6366f1;
  }
`;

// Components
const ActionButton = ({ children, onClick, type = "button" }) => (
  <Button type={type} onClick={onClick}>
    {children}
  </Button>
);

const FormInput = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = true,
}) => (
  <InputWrapper>
    <Label htmlFor={id}>{placeholder}</Label>
    <Input
      id={id}
      name={name}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </InputWrapper>
);

const AdminLoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { adminLogin, isAdmin } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await adminLogin(email, password);

      if (result.success && result.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        setError(
          "Login failed. Please check your credentials and ensure you are an admin."
        );
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <PageWrapper>
      <Card>
        <div>
          <Title>Admin Portal</Title>
          <Subtitle>Sign in to manage your application.</Subtitle>
        </div>

        <Form onSubmit={handleSubmit}>
          <FormInput
            id="email-address"
            name="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <ErrorBox>{error}</ErrorBox>}

          <ActionButton type="submit">Sign In</ActionButton>
        </Form>
      </Card>
    </PageWrapper>
  );
};

export default AdminLoginPage;
