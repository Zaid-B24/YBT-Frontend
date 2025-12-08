import React from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Save,
  X,
  Loader2,
  Briefcase,
} from "lucide-react";

// --- 1. ZOD VALIDATION SCHEMA ---
const dealerValidationSchema = z.object({
  name: z.string().min(2, "Dealer name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
});

// --- 2. MAIN COMPONENT ---
const DealerDetailsForm = ({ onSuccess, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(dealerValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
    },
  });

  const createDealerMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/dealer/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // Handle Duplicate Email Error (409) specifically
        if (response.status === 409) {
          throw new Error("A dealer with this email already exists.");
        }
        throw new Error(result.message || "Failed to create dealer");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Dealer registered successfully! 🎉");
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    createDealerMutation.mutate(data);
  };

  // --- Helper to render fields cleanly ---
  const renderField = (field) => {
    const {
      key,
      label,
      placeholder,
      type = "text",
      component,
      icon: Icon,
      required,
    } = field;
    const error = errors[key];

    return (
      <Field key={key}>
        <Label htmlFor={key}>
          {Icon && <Icon size={16} />}
          {label}
          {required && <RequiredStar>*</RequiredStar>}
        </Label>

        {component === "textarea" ? (
          <Textarea
            id={key}
            placeholder={placeholder}
            rows={4}
            {...register(key)}
            $hasError={!!error}
          />
        ) : (
          <Input
            id={key}
            type={type}
            placeholder={placeholder}
            {...register(key)}
            $hasError={!!error}
          />
        )}

        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Field>
    );
  };

  // --- FIELD CONFIGURATION ---
  const sections = {
    "👤 Basic Information": [
      {
        key: "name",
        label: "Dealer / Business Name",
        placeholder: "e.g., Royal Motors",
        icon: Briefcase,
        required: true,
      },
      {
        key: "email",
        label: "Email Address",
        placeholder: "contact@royalmotors.com",
        icon: Mail,
        required: true,
      },
      {
        key: "phone",
        label: "Phone Number",
        placeholder: "+91 98765 43210",
        icon: Phone,
      },
    ],
    "📍 Location Details": [
      {
        key: "city",
        label: "City",
        placeholder: "e.g., Mumbai",
        icon: Building2,
      },
      {
        key: "address",
        label: "Full Address",
        placeholder: "Shop No, Street, Area...",
        icon: MapPin,
        component: "textarea",
      },
    ],
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Title>Register New Dealer</Title>
        <BackButton type="button" onClick={onBack} title="Close">
          <X size={20} />
        </BackButton>
      </HeaderContainer>

      {Object.entries(sections).map(([sectionTitle, fields]) => (
        <Section key={sectionTitle}>
          <SectionTitle>{sectionTitle}</SectionTitle>
          <Grid>{fields.map((field) => renderField(field))}</Grid>
        </Section>
      ))}

      <Footer>
        <CancelButton type="button" onClick={onBack}>
          Cancel
        </CancelButton>
        <SubmitButton
          type="submit"
          disabled={isSubmitting || createDealerMutation.isPending}
        >
          {createDealerMutation.isPending ? (
            <>
              <Loader2 size={18} className="spin" />
              <span>Registering...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Save Dealer</span>
            </>
          )}
        </SubmitButton>
      </Footer>
    </FormContainer>
  );
};

export default DealerDetailsForm;

/* --- 3. STYLED COMPONENTS (High-End Dark Theme) --- */

const FormContainer = styled.form`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }

  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #fff;
  font-family: "Playfair Display", serif;
  margin: 0;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transform: rotate(90deg);
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin-left: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.25rem;
`;

const RequiredStar = styled.span`
  color: #ff4444;
  margin-left: 2px;
`;

const inputStyles = css`
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid
    ${(props) => (props.$hasError ? "#ff4444" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? "#ff4444" : "rgba(255, 255, 255, 0.3)"};
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 0 4px
      ${(props) =>
        props.$hasError
          ? "rgba(255, 68, 68, 0.1)"
          : "rgba(255, 255, 255, 0.05)"};
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Textarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 100px;
`;

const ErrorMessage = styled.span`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::before {
    content: "!";
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 14px;
    height: 14px;
    background: rgba(255, 68, 68, 0.2);
    border-radius: 50%;
    font-size: 10px;
    font-weight: bold;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const CancelButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  border: none;
  color: #fff;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 20px rgba(255, 68, 68, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255, 68, 68, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;
