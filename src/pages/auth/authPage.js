import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, Loader } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

// --- Styled Components (Mostly from your original file) ---

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
`;

const AuthContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const Subtitle = styled.p`
  font-family: "Courier New", monospace;
  text-align: center;
  color: #ccc;
  margin-bottom: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-line;
  line-height: 1.5;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
  font-size: 0.9rem;
  min-height: 1.2rem;
`;

const ToggleContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #ccc;
`;

const ToggleButton = styled.button`
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

// --- Main Auth Page Component ---

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      if (isLoginView) {
        await login(data.email, data.password);
      } else {
        if (data.password !== data.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await signup(
          data.name,
          data.email,
          data.password,
          data.confirmPassword
        );
      }
      navigate(from, { replace: true }); // Navigate to home on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PageWrapper>
      <AuthContainer
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title>{isLoginView ? "Welcome Back" : "Create Account"}</Title>
        <Subtitle>
          {isLoginView ? (
            "Sign in to access your account"
          ) : (
            <>
              Join the YOUNG BOY TOYZ community
              <br />
              <span style={{ fontSize: "0.9rem", color: "#bbb" }}>
                Signup & Register as an IDM member (Indian Domestic Market
                Culture association)
              </span>
            </>
          )}
        </Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence>
            {!isLoginView && (
              <motion.div
                key="name-input"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }} // Keeps content from spilling during animation
              >
                <InputGroup>
                  <InputIcon>
                    <User size={20} />
                  </InputIcon>
                  <Input
                    type="text"
                    placeholder="Full name"
                    {...register("name", { required: !isLoginView })}
                  />
                </InputGroup>
              </motion.div>
            )}
          </AnimatePresence>

          <InputGroup>
            <InputIcon>
              <Mail size={20} />
            </InputIcon>
            <Input
              type="email"
              placeholder="Email address"
              {...register("email", { required: true })}
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: !isLoginView ? 6 : undefined,
              })}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
          </InputGroup>

          <AnimatePresence>
            {!isLoginView && (
              <motion.div
                key="confirm-password-input"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }} // Keeps content from spilling during animation
              >
                <InputGroup>
                  <InputIcon>
                    <Lock size={20} />
                  </InputIcon>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: !isLoginView,
                    })}
                  />
                </InputGroup>
              </motion.div>
            )}
          </AnimatePresence>

          <ErrorMessage>{error}</ErrorMessage>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <Loader size={20} className="animate-spin" />
            ) : isLoginView ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </SubmitButton>
        </Form>

        <ToggleContainer>
          {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
          <ToggleButton onClick={() => setIsLoginView(!isLoginView)}>
            {isLoginView ? "Sign Up" : "Sign In"}
          </ToggleButton>
        </ToggleContainer>
      </AuthContainer>
    </PageWrapper>
  );
};

export default AuthPage;
