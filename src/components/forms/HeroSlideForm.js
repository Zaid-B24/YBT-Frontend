import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const fetchCars = async ({ queryKey }) => {
  const [_key, { limit, sortBy, searchTerm, cursor }] = queryKey;
  const params = new URLSearchParams({ limit, sortBy });
  if (searchTerm) params.append("searchTerm", searchTerm);
  if (cursor) params.append("cursor", cursor);

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/cars?${params.toString()}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const fetchEvents = async ({ queryKey }) => {
  const token = localStorage.getItem("adminToken");
  const [_key, { limit, sortBy, cursor }] = queryKey;
  const params = new URLSearchParams({ limit, sortBy });
  if (cursor) params.append("cursor", cursor);
  if (!token) throw new Error("No admin token found.");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/admin?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const responseData = await response.json();
  return responseData.data;
};

const FormContainer = styled.form`
  padding: 2.5rem;
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #333;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #ccc;
`;

const inputStyles = css`
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  transition: border 0.2s, background 0.2s;
  &:focus {
    border-color: #0af253;
    outline: none;
    background: rgba(0, 0, 0, 0.3);
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const StyledInput = styled.input`
  ${inputStyles}
`;

const StyledSelect = styled.select`
  ${inputStyles}
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
`;

const Divider = styled.p`
  text-align: center;
  color: #777;
  font-weight: 600;
  margin: 1.5rem 0;
  letter-spacing: 1px;
  font-size: 0.8rem;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #fff;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 1.2em;
  height: 1.2em;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
  border-top: 1px solid #333;
  padding-top: 1.5rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  // Primary (Submit) style
  ${(props) =>
    props.$primary &&
    css`
      background: #fff;
      color: #000;
      &:hover {
        opacity: 0.8;
      }
    `}

  // Secondary (Back) style
  ${(props) =>
    !props.$primary &&
    css`
      background: #333;
      color: #fff;
      &:hover {
        background: #444;
      }
    `}
    
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-size: 0.85rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  justify-content: space-between;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
`;

const buttonReset = css`
  background: transparent;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
`;

const BackButton = styled.button`
  ${buttonReset}
  padding: 0.5rem 1rem;
  font-weight: 600;
  background-color: transparent;
  color: #a0a0a0;
  border-color: #555;
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #e5e5e5;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const HeroSlideForm = ({
  onBack,
  onSuccess,
  slideToEdit,
  onCreate,
  onUpdate,
  isSaving,
}) => {
  const isEditMode = Boolean(slideToEdit);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditMode) {
      reset({
        order: slideToEdit.order,
        carId: slideToEdit.carId || "",
        eventId: slideToEdit.eventId || "",
        customTitle: slideToEdit.customTitle || "",
        customSubtitle: slideToEdit.customSubtitle || "",
        customLinkUrl: slideToEdit.customLinkUrl || "",
        customAssetUrl: slideToEdit.customAssetUrl || "",
        customAssetType: slideToEdit.customAssetType || "IMAGE",
        isActive: slideToEdit.isActive,
      });
    } else {
      reset({
        order: 0,
        carId: "",
        eventId: "",
        customTitle: "",
        customSubtitle: "",
        customLinkUrl: "",
        customAssetUrl: "",
        customAssetType: "IMAGE",
        isActive: true,
      });
    }
  }, [isEditMode, slideToEdit, reset]);

  const { data: cars, isLoading: isLoadingCars } = useQuery({
    queryKey: ["adminCarsList", { limit: 1000, sortBy: "name_asc" }],
    queryFn: fetchCars,
  });

  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["adminEventsList", { limit: 1000, sortBy: "newest" }],
    queryFn: fetchEvents,
  });

  const carId = watch("carId");
  const eventId = watch("eventId");

  useEffect(() => {
    if (carId) setValue("eventId", "");
  }, [carId, setValue]);

  useEffect(() => {
    if (eventId) setValue("carId", "");
  }, [eventId, setValue]);

  const onSubmit = (data) => {
    const cleanData = {
      ...data,
      carId: data.carId ? parseInt(data.carId) : null,
      eventId: data.eventId ? parseInt(data.eventId) : null,
      order: parseInt(data.order),
      customTitle: data.customTitle || null,
      customSubtitle: data.customSubtitle || null,
      customLinkUrl: data.customLinkUrl || null,
      customAssetUrl: data.customAssetUrl || null,
    };

    if (!cleanData.customAssetUrl && !cleanData.carId && !cleanData.eventId) {
      toast.error(
        "A slide must have a custom asset or be linked to a car/event."
      );
      return;
    }

    if (isEditMode) {
      onUpdate({ slideId: slideToEdit.id, slideData: cleanData });
    } else {
      onCreate(cleanData);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Title>{isEditMode ? "Edit" : "Create"} Hero Slide</Title>
        <BackButton type="button" onClick={onBack} title="Close">
          <X size={16} />
        </BackButton>
      </HeaderContainer>

      <FormGroup>
        <SectionTitle>Link to Car (Optional):</SectionTitle>
        <StyledSelect
          {...register("carId")}
          disabled={isLoadingCars || isLoadingEvents}
        >
          <option value="">None</option>
          {cars?.data?.map((car) => (
            <option key={car.id} value={car.id}>
              {car.brand} {car.title}
            </option>
          ))}
        </StyledSelect>
      </FormGroup>

      <FormGroup>
        <SectionTitle>Link to Event (Optional):</SectionTitle>
        <StyledSelect
          {...register("eventId")}
          disabled={isLoadingCars || isLoadingEvents}
        >
          <option value="">None</option>
          {events?.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </StyledSelect>
      </FormGroup>

      <Divider>OR CUSTOMIZE</Divider>

      <FormGroup>
        <StyledLabel>Custom Title:</StyledLabel>
        <StyledInput {...register("customTitle")} />
      </FormGroup>

      <FormGroup>
        <StyledLabel>Custom Subtitle:</StyledLabel>
        <StyledInput {...register("customSubtitle")} />
      </FormGroup>

      <FormGroup>
        <StyledLabel>Custom Link URL:</StyledLabel>
        <StyledInput {...register("customLinkUrl")} />
      </FormGroup>

      <FormGroup>
        <StyledLabel>Custom Asset URL (from Cloudinary):</StyledLabel>
        <StyledInput {...register("customAssetUrl")} disabled={isEditMode} />
        {isEditMode && (
          <ErrorMessage as="small">
            Asset URL cannot be changed after creation.
          </ErrorMessage>
        )}
        {errors.customAssetUrl && (
          <ErrorMessage>
            This field is required if no car/event is linked.
          </ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <StyledLabel>Asset Type:</StyledLabel>
        <StyledSelect {...register("customAssetType")}>
          <option value="IMAGE">Image</option>
          <option value="VIDEO">Video</option>
        </StyledSelect>
      </FormGroup>

      <FormGroup>
        <StyledLabel>Order:</StyledLabel>
        <StyledInput
          type="number"
          {...register("order")}
          disabled={isEditMode}
        />
        {isEditMode && (
          <ErrorMessage as="small">
            Use the drag-and-drop tool to reorder.
          </ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <CheckboxWrapper>
          <StyledCheckbox {...register("isActive")} />
          Active?
        </CheckboxWrapper>
      </FormGroup>

      <ButtonGroup>
        <Button type="button" onClick={onBack} disabled={isSaving}>
          Back
        </Button>
        <Button $primary type="submit" disabled={isSaving}>
          {isSaving
            ? "Saving..."
            : isEditMode
            ? "Update Slide"
            : "Create Slide"}
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
};

export default HeroSlideForm;
