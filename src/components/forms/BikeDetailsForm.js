import styled, { css } from "styled-components";
import {
  Users,
  Hash,
  Fuel,
  Upload,
  X,
  Tags,
  CalendarDays,
  GaugeCircle,
  ShieldCheck,
  IndianRupee,
  UserCircle,
  Sparkles,
  FileText,
  BadgeCheck,
  Cog,
} from "lucide-react";
import { TbBikeFilled } from "react-icons/tb";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { bikeValidationSchema } from "../../utils/zodValidation";
import { useQuery } from "@tanstack/react-query";

const fetchDealers = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No admin token found.");

  const res = await fetch(`${process.env.REACT_APP_API_URL}/dealer`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch dealers");
  const responseData = await res.json();
  return responseData.data;
};

const renderField = (field, register, errors) => {
  const {
    key,
    label,
    placeholder,
    type = "text",
    component,
    options,
    required,
  } = field;
  const error = errors[key];

  const renderInput = () => {
    switch (component) {
      case "select":
        return (
          <Select {...register(key)}>
            <option value="">-- Select {label} --</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            placeholder={placeholder}
            {...register(key)}
            rows={4}
          ></Textarea>
        );
      default:
        return (
          <Input
            type={type}
            placeholder={placeholder}
            {...register(key, {
              valueAsNumber: type === "number",
            })}
          />
        );
    }
  };

  return (
    <Field key={key}>
      <Label htmlFor={key}>
        {field.icon && <field.icon size={16} />}
        {label}
        {required && <RequiredStar>*</RequiredStar>}
      </Label>
      {renderInput()}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Field>
  );
};

const BikeDetailsForm = ({ onSuccess, onBack }) => {
  const { data: dealers = [] } = useQuery({
    queryKey: ["dealers"],
    queryFn: fetchDealers,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty, isSubmitting }, // Use isDirty instead of isValid
  } = useForm({
    resolver: zodResolver(bikeValidationSchema),
    mode: "onChange",
    // --- UPDATED: Default values to match the new schema ---
    defaultValues: {
      title: "",
      dealerId: "",
      brand: "",
      registrationYear: new Date().getFullYear(),
      kmsDriven: "",
      ownerCount: "",
      registrationNumber: "",
      insurance: "",
      fuelType: "PETROL",
      ybtPrice: "",
      sellingPrice: "",
      cutOffPrice: "",
      bikeUSP: "",
      description: "",
      status: "AVAILABLE",
      vipNumber: false,
      specs: [""],
      engine: "",
      badges: [""],
      images: [],
    },
  });

  const {
    fields: badgeFields,
    append: appendBadge,
    remove: removeBadge,
  } = useFieldArray({ control, name: "badges" });
  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({ control, name: "specs" });
  const images = watch("images");

  const onSubmit = async (data) => {
    const formDataApi = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value === null || value === "" || value === undefined) return;

      if (key === "images") {
        Array.from(value).forEach((file) => formDataApi.append("images", file));
      } else if (key === "badges" || key === "specs") {
        value.forEach((item) => item && formDataApi.append(key, item));
      } else {
        formDataApi.append(key, value);
      }
    });

    console.log("--- FormData to be sent to API ---");
    for (let [key, value] of formDataApi.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const token = localStorage.getItem("adminToken"); // Or however you get your token
      if (!token) {
        toast.error("Authentication error. Please log in again.");
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bikes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataApi,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const responseData = await response.json();
      console.log("Bike added", responseData);
      toast.success("Bike added successfully! 🎉");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting form", error);
      const errorMessage =
        error.message || "Failed to add bike. Please try again.";
      toast.error(errorMessage);
    }
  };

  const sections = {
    "🚲 Basic Information": [
      {
        key: "title",
        label: "Model Name",
        placeholder: "e.g., Hero Splendor",
        icon: TbBikeFilled,
        required: true,
      },
      { key: "brand", label: "Brand", placeholder: "e.g., Hero", icon: Tags },
      {
        key: "manufactureYear",
        label: "Manufacture Year",
        placeholder: "e.g., 2020",
        type: "number",
        icon: CalendarDays,
      },
    ],
    "📜 Vehicle History": [
      {
        key: "kmsDriven",
        label: "Kilometers Driven",
        placeholder: "e.g., 45,000",
        type: "number",
        icon: GaugeCircle,
        required: true,
      },
      {
        key: "ownerCount",
        label: "Number of Owners",
        placeholder: "e.g., 1",
        type: "number",
        icon: Users,
        required: true,
      },
      {
        key: "registrationYear",
        label: "Registration Year",
        placeholder: "e.g., 2021",
        type: "number",
        icon: CalendarDays,
        required: true,
      },
      {
        key: "registrationNumber",
        label: "Registration Number",
        placeholder: "e.g., MH12AB1234",
        icon: Hash,
        required: true,
      },
      {
        key: "insurance",
        label: "Insurance Status",
        placeholder: "e.g., Comprehensive",
        icon: ShieldCheck,
      },
    ],
    "⚙️ Specifications": [
      {
        key: "fuelType",
        label: "Fuel Type",
        component: "select",
        icon: Fuel,
        options: [
          { value: "PETROL", label: "Petrol" },
          { value: "DIESEL", label: "Diesel" },
          { value: "ELECTRIC", label: "Electric" },
          { value: "HYBRID", label: "Hybrid" },
          { value: "CNG", label: "CNG" },
        ],
        required: true,
      },
      {
        key: "engine",
        label: "Engine (cc)",
        placeholder: "e.g., 998cc",
        icon: Cog, // Assuming you have this icon
      },
    ],
    "💰 Listing & Price": [
      {
        key: "sellingPrice",
        label: "Selling Price",
        placeholder: "e.g., 850000",
        type: "number",
        icon: IndianRupee,
        required: true,
      },
      {
        key: "cutOffPrice",
        label: "Cut Off Price",
        placeholder: "Minimum acceptable price",
        type: "number",
        icon: IndianRupee,
        required: true,
      },
      {
        key: "ybtPrice",
        label: "YBT Price",
        placeholder: "Your best offer price",
        type: "number",
        icon: IndianRupee,
        required: true,
      },
      {
        key: "dealerId",
        label: "Listed By (Dealer)",
        component: "select",
        icon: UserCircle, // Assuming icon
        required: true,
        options: dealers.map((d) => ({ value: d.id, label: d.name })),
      },
      {
        key: "status",
        label: "Status",
        component: "select",
        icon: BadgeCheck,
        options: [
          { value: "AVAILABLE", label: "Available" },
          { value: "SOLD", label: "Sold" },
          { value: "BOOKED", label: "Booked" },
        ],
        required: true,
      },
    ],
    "✨ Additional Details": [
      {
        key: "bikeUSP",
        label: "Key Selling Points (USP)",
        placeholder: "e.g., Excellent mileage, New tires",
        icon: Sparkles,
      },
      {
        key: "description",
        label: "Full Description",
        placeholder: "A detailed description of the bike's condition...",
        icon: FileText,
        component: "textarea",
      },
    ],
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Title>Enter Car Details</Title>
        <BackButton type="button" onClick={onBack} title="Close">
          <X size={16} />
        </BackButton>
      </HeaderContainer>

      {Object.entries(sections).map(([sectionTitle, fields]) => (
        <Section key={sectionTitle}>
          <SectionTitle>{sectionTitle}</SectionTitle>
          <Grid>
            {fields.map((field) => renderField(field, register, errors))}
          </Grid>
        </Section>
      ))}
      {/* --- Special Fields Handled Separately --- */}
      <Section>
        <SectionTitle>💎 Special Features</SectionTitle>
        <Grid>
          {/* VIP Number Checkbox */}
          <Field>
            <CheckboxWrapper>
              <Checkbox id="vipNumber" {...register("vipNumber")} />
              <Label htmlFor="vipNumber" style={{ marginBottom: 0 }}>
                VIP Registration Number
              </Label>
            </CheckboxWrapper>
          </Field>

          <Field style={{ gridColumn: "1 / -1" }}>
            <Label>Badges</Label>
            {badgeFields.map((field, index) => (
              <BadgeRow key={field.id}>
                <Input
                  placeholder="e.g., Limited Edition"
                  {...register(`badges.${index}`)}
                />
                {badgeFields.length > 1 && (
                  <RemoveButton
                    type="button"
                    onClick={() => removeBadge(index)}
                  >
                    <X size={16} />
                  </RemoveButton>
                )}
              </BadgeRow>
            ))}
            <AddBadgeButton type="button" onClick={() => appendBadge("")}>
              + Add Badge
            </AddBadgeButton>
          </Field>
          <Field style={{ gridColumn: "1 / -1" }}>
            <Label>Specs</Label>
            {specFields.map((field, index) => (
              <BadgeRow key={field.id}>
                <Input
                  placeholder="e.g., Akrapovič Exhaust"
                  {...register(`specs.${index}`)}
                />
                {specFields.length > 1 && (
                  <RemoveButton type="button" onClick={() => removeSpec(index)}>
                    <X size={16} />
                  </RemoveButton>
                )}
              </BadgeRow>
            ))}
            <AddBadgeButton type="button" onClick={() => appendSpec("")}>
              + Add Spec
            </AddBadgeButton>
          </Field>
        </Grid>
      </Section>

      {/* --- File Input Section --- */}
      <Section>
        <SectionTitle>
          📸 Bike Images
          <RequiredStar>*</RequiredStar>
        </SectionTitle>
        <FileInputContainer>
          <FileInputWrapper
            htmlFor="images"
            className={images?.length > 0 ? "has-file" : ""}
          >
            <HiddenFileInput
              id="images"
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
            />
            <FileInputContent>
              <FileInputIcon>
                <Upload size={24} />
              </FileInputIcon>
              <FileInputText>
                {images?.length > 0
                  ? `${images.length} image(s) selected`
                  : "Click or drag files to upload"}
              </FileInputText>
              <FileInputSubtext>PNG, JPG, WEBP up to 10MB</FileInputSubtext>
            </FileInputContent>
          </FileInputWrapper>
          {errors.images && (
            <ErrorMessage>{errors.images.message}</ErrorMessage>
          )}
        </FileInputContainer>
      </Section>

      {/* --- Form Actions --- */}
      <SubmitButton
        type="submit"
        disabled={!isDirty || Object.keys(errors).length > 0 || isSubmitting}
      >
        {isSubmitting ? "Adding Bike..." : "Add Bike"}
      </SubmitButton>
    </FormContainer>
  );
};

export default BikeDetailsForm;

/* --- Styled Components --- */

// const Spinner = styled(RotateCw)`
//   animation: spin 1s linear infinite;
//   @keyframes spin {
//     to {
//       transform: rotate(360deg);
//     }
//   }
// `;

const RequiredStar = styled.span`
  color: red;
  margin-left: 4px;
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

const FormContainer = styled.form`
  padding: 1.5rem;
`;
const Section = styled.div`
  margin-bottom: 2.5rem;
`;
const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #e5e5e5;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff5f5;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  ${inputStyles}
`;
const Textarea = styled.textarea`
  ${inputStyles}
`;
const Select = styled.select`
  ${inputStyles}
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
`;
const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  accent-color: #0af253;
  cursor: pointer;
`;
const BadgeRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const buttonReset = css`
  background: transparent;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
`;
const AddBadgeButton = styled.button`
  ${buttonReset}
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  color: #fca5a5;
  border-color: #7f1d1d;
  align-self: flex-start;
  &:hover {
    background-color: #7f1d1d;
    color: white;
  }
`;
const RemoveButton = styled.button`
  ${buttonReset}
  color: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 0.5rem;
  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`;
const FileInputContainer = styled.div`
  grid-column: 1 / -1;
`;
const FileInputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: rgba(255, 0, 0, 0.5);
  }
  &.has-file {
    border-color: rgba(34, 197, 94, 0.5);
  }
`;
const HiddenFileInput = styled.input`
  display: none;
`;
const FileInputContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;
const FileInputIcon = styled.div``;
const FileInputText = styled.div`
  font-weight: 500;
`;
const FileInputSubtext = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
`;
const ErrorMessage = styled.p`
  color: #ff5555;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;
// const FormActions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   padding-top: 1.5rem;
//   margin-top: 1.5rem;
//   border-top: 1px solid rgba(255, 255, 255, 0.2);
// `;
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
const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: black;
  color: #ff4d4d;
  font-weight: 600;
  border: 1px solid #ff0000;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  transition: transform 0.2s, background 0.2s;
  &:hover {
    transform: scale(1.05);
    background: #111;
    color: white;
  }
  &:disabled {
    background-color: #2d2d2d;
    color: #6c6c6c;
    border-color: #444;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
const Title = styled.h2`
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  justify-content: space-between; /* Add this line */
`;
