import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Tag, X } from "lucide-react"; // Using Tag for category icon

// ========== API HELPER ==========
// This function sends the data to your backend controller.
const createCategory = async (categoryData) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/eventcategory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    }
  );

  if (!response.ok) {
    // Try to parse the error message from the backend for better feedback
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create the category.");
  }

  return response.json();
};

// ========== STYLED COMPONENTS ==========
// Reusing the visual style from your example.
const FormContainer = styled.form`
  padding: 1.5rem;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #333;
`;

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a0aec0;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const buttonStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid #555;
  background-color: #333;
  color: #f0f0f0;

  &:hover {
    background-color: #444;
    border-color: #666;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  ${buttonStyles}

  /* Primary button variant */
  ${({ $primary }) =>
    $primary &&
    `
    background-color: #3b82f6;
    border-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
      border-color: #2563eb;
    }
  `}
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #4a00e0, #8e2de2);
  color: #fff;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(Button)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #a0aec0;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }
`;

// ========== REUSABLE FORM FIELD COMPONENT ==========
// Inspired by your example for consistency.
const FormField = ({ label, icon: Icon, children, error }) => (
  <Field>
    <Label>
      <Icon size={16} />
      <span>{label}</span>
    </Label>
    {children}
    {error && <ErrorMessage>{error.message}</ErrorMessage>}
  </Field>
);

// ========== MAIN FORM COMPONENT ==========
const CreateCategoryForm = ({ onSuccess, onCancel }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      // This refreshes any queries that depend on categories, like a category list.
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      if (onSuccess) onSuccess(data); // Call the success callback passed in props
    },
    onError: (error) => {
      // Set a form-level error to display to the user
      setError("root.serverError", {
        type: "manual",
        message: error.message,
      });
      console.error("Error creating category:", error.message);
    },
  });

  const onSubmit = (formData) => {
    // The `mutate` function will trigger the `createCategory` API call
    mutate(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>Create New Category</Title>

      <FormField label="Category Name" icon={Tag} error={errors.name}>
        <Input
          type="text"
          placeholder="e.g., Music, Technology, Sports"
          {...register("name", {
            required: "Category name is required.",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters long.",
            },
          })}
        />
      </FormField>

      {errors.root?.serverError && (
        <ErrorMessage>{errors.root.serverError.message}</ErrorMessage>
      )}

      <ButtonGroup>
        <CancelButton type="button" onClick={onCancel} disabled={isPending}>
          Cancel
        </CancelButton>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Category"}
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
};

export default CreateCategoryForm;
