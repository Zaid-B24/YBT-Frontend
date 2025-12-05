import styled, { css } from "styled-components";
import {
  Car,
  Users,
  Hash,
  Fuel,
  Upload,
  X,
  Zap,
  Palette,
  DoorOpen,
  Building2,
  Tags,
  CalendarDays,
  GaugeCircle,
  ShieldCheck,
  Cog,
  RotateCw,
  Armchair,
  IndianRupee,
  UserCircle,
  Sparkles,
  FileText,
  BadgeCheck,
  MapIcon,
  Video,
} from "lucide-react";
import { GiSteeringWheel } from "react-icons/gi";
import { BsCarFront, BsSpeedometer } from "react-icons/bs";
import { LuGitCommitHorizontal } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import carValidationSchema from "../../utils/zodValidation";
import { toast } from "react-toastify";
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

const fetchDesigners = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/designer`);
  if (!res.ok) throw new Error("Failed to fetch designers");
  return res.json();
};

const fetchWorkshops = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/workshop`);
  if (!res.ok) throw new Error("Failed to fetch workshops");
  return res.json();
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
            {options?.map((opt) => (
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

const CarDetailsForm = ({ onSuccess, onBack }) => {
  const { data: dealers = [], isLoading: isLoadingDealers } = useQuery({
    queryKey: ["dealers"],
    queryFn: fetchDealers,
  });
  const { data: designers = [], isLoading: isLoadingDesigners } = useQuery({
    queryKey: ["designers"],
    queryFn: fetchDesigners,
  });
  const { data: workshops = [], isLoading: isLoadingWorkshops } = useQuery({
    queryKey: ["workshops"],
    queryFn: fetchWorkshops,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(carValidationSchema),
    mode: "onChange", // Validate on change for real-time feedback
    defaultValues: {
      title: "",
      dealerId: "",
      collectionType: "YBT",
      designerId: "",
      workshopId: "",
      tuningStage: "",
      brand: "",
      carType: "",
      manufactureYear: new Date().getFullYear(),
      kmsDriven: 0,
      ownerCount: 1,
      registrationYear: new Date().getFullYear(),
      registrationNumber: "",
      insurance: "",
      engine: "",
      transmission: "AUTOMATIC",
      fuelType: "PETROL",
      mileage: 0,
      peakPower: "",
      peakTorque: "",
      driveType: "FWD",
      exteriorColour: "",
      doors: 4,
      seatingCapacity: 5,
      sellingPrice: 0,
      cutOffPrice: 0,
      ybtPrice: 0,
      city: "",
      state: "",
      carUSP: "",
      description: "",
      status: "AVAILABLE",
      vipNumber: false,
      badges: "",
      specs: "",
      features: "",
      images: [],
      videos: [],
      mobileImages: [],
      mobileVideos: [],
    },
  });

  const images = watch("images");
  const videos = watch("videos");
  const mobileImages = watch("mobileImages");
  const mobileVideos = watch("mobileVideos");
  const collectionType = watch("collectionType");

  const onSubmit = async (data) => {
    const formDataApi = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value === null || value === undefined || value === "") return;
      if (key === "images" && value.length > 0) {
        Array.from(value).forEach((file) => {
          formDataApi.append("images", file);
        });
      } else if (key === "videos" && value.length > 0) {
        Array.from(value).forEach((file) => {
          formDataApi.append("videos", file);
        });
      } else if (key === "mobileImages" && value.length > 0) {
        Array.from(value).forEach((file) => {
          formDataApi.append("mobileImages", file);
        });
      }
      // --- 4. MOBILE VIDEOS (NEW) ---
      else if (key === "mobileVideos" && value.length > 0) {
        Array.from(value).forEach((file) => {
          formDataApi.append("mobileVideos", file);
        });
      } else {
        formDataApi.append(key, value);
      }
    });

    for (let [key, value] of formDataApi.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const token = localStorage.getItem("adminToken"); // Or however you get your token
      if (!token) {
        toast.error("Authentication error. Please log in again.");
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cars`, {
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
      console.log("Car added", responseData);

      // --- ADDED: Show a success toast ---
      toast.success("Car added successfully! 🎉");

      // Call the onSuccess callback
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting form", error);

      // --- ADDED: Show an error toast ---
      const errorMessage =
        error.message || "Failed to add car. Please try again.";
      toast.error(errorMessage);
    }
  };

  // --- Group input fields by section for better organization ---
  const sections = {
    "🚗 Basic Information": [
      {
        key: "title",
        label: "Model Name",
        placeholder: "e.g., Honda Civic",
        icon: BsCarFront,
        required: true,
      },
      { key: "brand", label: "Brand", placeholder: "e.g., Nissan", icon: Tags },
      {
        key: "carType",
        label: "Car Type",
        placeholder: "e.g., Sedan, SUV",
        icon: Car,
      },
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
        key: "engine",
        label: "Engine (cc/L)",
        placeholder: "e.g., 1497cc or 1.5L Petrol",
        icon: Cog,
      },
      {
        key: "transmission",
        label: "Transmission",
        component: "select",
        icon: LuGitCommitHorizontal,
        options: [
          { value: "AUTOMATIC", label: "Automatic" },
          { value: "MANUAL", label: "Manual" },
        ],
      },
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
        key: "mileage",
        label: "Mileage (kmpl)",
        placeholder: "e.g., 18",
        type: "number",
        icon: BsSpeedometer,
      },
      {
        key: "peakPower",
        label: "Peak Power (bhp)",
        placeholder: "e.g., 120",
        icon: Zap,
      },
      {
        key: "peakTorque",
        label: "Peak Torque (Nm)",
        placeholder: "e.g., 150",
        icon: RotateCw,
      },
      {
        key: "driveType",
        label: "Drive Type",
        component: "select",
        icon: GiSteeringWheel,
        options: [
          { value: "FWD", label: "FWD (Front-Wheel)" },
          { value: "RWD", label: "RWD (Rear-Wheel)" },
          { value: "AWD", label: "AWD (All-Wheel)" },
        ],
      },
      {
        key: "exteriorColour",
        label: "Exterior Colour",
        placeholder: "e.g., Pearl White",
        icon: Palette,
      },
      {
        key: "doors",
        label: "Doors",
        placeholder: "e.g., 4",
        type: "number",
        icon: DoorOpen,
      },
      {
        key: "seatingCapacity",
        label: "Seating Capacity",
        placeholder: "e.g., 5",
        type: "number",
        icon: Armchair,
      },
      {
        key: "features",
        label: "Features & Amenities",
        placeholder: "Leather interior",
        icon: Sparkles,
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
        icon: UserCircle,
        required: true,
        // Dynamically populate options from our fetched dealers
        options: dealers.map((d) => ({ value: d.id, label: d.name })),
      },
      {
        key: "city",
        label: "City",
        placeholder: "e.g., Mumbai",
        icon: Building2,
      },
      {
        key: "state",
        label: "State",
        placeholder: "e.g., Maharashtra",
        icon: MapIcon,
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
      },
    ],
    "✨ Additional Details": [
      {
        key: "carUSP",
        label: "Key Selling Points (USP)",
        placeholder: "e.g., Sunroof, First Owner, New Tires",
        icon: Sparkles,
      },
      {
        key: "specs",
        label: "Modification Specs",
        placeholder: "e.g., Custom Exhaust, Forged Wheels, Stage 2 Remap",
        icon: Cog,
        component: "textarea",
      },
      {
        key: "badges",
        label: "Badges",
        placeholder: "e.g., V6, Limited Edition, Tuned",
        icon: BadgeCheck,
        component: "textarea",
      },
      {
        key: "description",
        label: "Full Description",
        placeholder: "A detailed description of the car's condition...",
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
            {fields.map((field) => {
              // Dynamically populate options for the dealer dropdown
              if (field.key === "dealerId") {
                field.options = dealers.map((d) => ({
                  value: d.id,
                  label: d.name,
                }));
              }
              return renderField(field, register, errors);
            })}
          </Grid>
        </Section>
      ))}

      <Section>
        <SectionTitle>🗂️ Collection & Category</SectionTitle>
        <Grid>
          {/* Collection Type Dropdown */}
          <Field>
            <Label>
              Collection Type <RequiredStar>*</RequiredStar>
            </Label>
            <Select {...register("collectionType")}>
              <option value="YBT">YBT Collection</option>
              <option value="DESIGNER">Designer Collection</option>
              <option value="WORKSHOP">Workshop Collection</option>
              <option value="TORQUE_TUNER">Torque Tuner Edition</option>
            </Select>
            {errors.collectionType && (
              <ErrorMessage>{errors.collectionType.message}</ErrorMessage>
            )}
          </Field>

          {/* --- Conditionally Rendered Fields --- */}

          {collectionType === "DESIGNER" && (
            <Field>
              <Label>
                Designer <RequiredStar>*</RequiredStar>
              </Label>
              <Select {...register("designerId")}>
                <option value="">-- Select Designer --</option>
                {isLoadingDesigners ? (
                  <option>Loading...</option>
                ) : (
                  designers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))
                )}
              </Select>
              {errors.designerId && (
                <ErrorMessage>{errors.designerId.message}</ErrorMessage>
              )}
            </Field>
          )}

          {collectionType === "WORKSHOP" && (
            <Field>
              <Label>
                Workshop <RequiredStar>*</RequiredStar>
              </Label>
              <Select {...register("workshopId")}>
                <option value="">-- Select Workshop --</option>
                {isLoadingWorkshops ? (
                  <option>Loading...</option>
                ) : (
                  workshops.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))
                )}
              </Select>
              {errors.workshopId && (
                <ErrorMessage>{errors.workshopId.message}</ErrorMessage>
              )}
            </Field>
          )}

          {collectionType === "TORQUE_TUNER" && (
            <Field>
              <Label>
                Tuning Stage <RequiredStar>*</RequiredStar>
              </Label>
              <Select {...register("tuningStage")}>
                <option value="">-- Select Stage --</option>
                <option value="STAGE1">Stage 1</option>
                <option value="STAGE2">Stage 2</option>
                <option value="STAGE3">Stage 3</option>
              </Select>
              {errors.tuningStage && (
                <ErrorMessage>{errors.tuningStage.message}</ErrorMessage>
              )}
            </Field>
          )}
        </Grid>
      </Section>

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
        </Grid>
      </Section>

      {/* --- File Input Section --- */}
      <Section>
        <SectionTitle>📸 Desktop Car Images (Landscape 16:9)</SectionTitle>
        <RequiredStar>*</RequiredStar>
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
                  : "Upload Landscape Images"}
              </FileInputText>
              <FileInputSubtext>
                First image will be the Desktop Cover.
              </FileInputSubtext>
            </FileInputContent>
          </FileInputWrapper>
          {errors.images && (
            <ErrorMessage>{errors.images.message}</ErrorMessage>
          )}
        </FileInputContainer>
      </Section>

      {/* --- 2. MOBILE IMAGES SECTION (NEW) --- */}
      <Section>
        <SectionTitle>📱 Mobile Car Images (Portrait 9:16)</SectionTitle>
        <FileInputContainer>
          <FileInputWrapper
            htmlFor="mobileImages"
            className={mobileImages?.length > 0 ? "has-file" : ""}
          >
            <HiddenFileInput
              id="mobileImages"
              type="file"
              accept="image/*"
              multiple
              {...register("mobileImages")} // <--- Key Change
            />
            <FileInputContent>
              <FileInputIcon>
                <Upload size={24} />
              </FileInputIcon>
              <FileInputText>
                {mobileImages?.length > 0
                  ? `${mobileImages.length} image(s) selected`
                  : "Upload Portrait Images"}
              </FileInputText>
              <FileInputSubtext>
                First image will be the Mobile Cover.
              </FileInputSubtext>
            </FileInputContent>
          </FileInputWrapper>
          {/* Display error if you added validation for this field */}
          {errors.mobileImages && (
            <ErrorMessage>{errors.mobileImages.message}</ErrorMessage>
          )}
        </FileInputContainer>
      </Section>

      {/* --- 3. DESKTOP VIDEOS SECTION (Keep as is) --- */}
      <Section>
        <SectionTitle>🎥 Desktop Videos (Landscape)</SectionTitle>
        <FileInputContainer>
          <FileInputWrapper
            htmlFor="videos"
            className={videos?.length > 0 ? "has-file" : ""}
          >
            <HiddenFileInput
              id="videos"
              type="file"
              accept="video/*"
              multiple
              {...register("videos")}
            />
            <FileInputContent>
              <FileInputIcon>
                <Video size={24} />
              </FileInputIcon>
              <FileInputText>
                {videos?.length > 0
                  ? `${videos.length} video(s) selected`
                  : "Upload Landscape Videos"}
              </FileInputText>
              <FileInputSubtext>MP4, MOV up to 100MB</FileInputSubtext>
            </FileInputContent>
          </FileInputWrapper>
          {errors.videos && (
            <ErrorMessage>{errors.videos.message}</ErrorMessage>
          )}
        </FileInputContainer>
      </Section>

      {/* --- 4. MOBILE VIDEOS SECTION (NEW) --- */}
      <Section>
        <SectionTitle>📱 Mobile Videos (Vertical/Shorts)</SectionTitle>
        <FileInputContainer>
          <FileInputWrapper
            htmlFor="mobileVideos"
            className={mobileVideos?.length > 0 ? "has-file" : ""}
          >
            <HiddenFileInput
              id="mobileVideos"
              type="file"
              accept="video/*"
              multiple
              {...register("mobileVideos")} // <--- Key Change
            />
            <FileInputContent>
              <FileInputIcon>
                <Video size={24} />
              </FileInputIcon>
              <FileInputText>
                {mobileVideos?.length > 0
                  ? `${mobileVideos.length} video(s) selected`
                  : "Upload Vertical Videos"}
              </FileInputText>
              <FileInputSubtext>MP4, MOV up to 100MB</FileInputSubtext>
            </FileInputContent>
          </FileInputWrapper>
          {/* Display error if you added validation for this field */}
          {errors.mobileVideos && (
            <ErrorMessage>{errors.mobileVideos.message}</ErrorMessage>
          )}
        </FileInputContainer>
      </Section>

      {/* --- Form Actions --- */}
      <SubmitButton
        type="submit"
        disabled={!isDirty || Object.keys(errors).length > 0 || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner size={16} />
            <span>Adding Car...</span>
          </>
        ) : (
          <span>Add Car</span>
        )}
      </SubmitButton>
    </FormContainer>
  );
};

export default CarDetailsForm;

/* --- Styled Components --- */
const RequiredStar = styled.span`
  color: red;
  margin-left: 4px;
`;

const Spinner = styled(RotateCw)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
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
// const BadgeRow = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   align-items: center;
//   margin-bottom: 0.5rem;
// `;
const buttonReset = css`
  background: transparent;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
`;
// const AddBadgeButton = styled.button`
//   ${buttonReset}
//   margin-top: 0.5rem;
//   padding: 0.5rem 1rem;
//   color: #fca5a5;
//   border-color: #7f1d1d;
//   align-self: flex-start;
//   &:hover {
//     background-color: #7f1d1d;
//     color: white;
//   }
// `;
// const RemoveButton = styled.button`
//   ${buttonReset}
//   color: rgba(255, 255, 255, 0.5);
//   border: none;
//   padding: 0.5rem;
//   &:hover {
//     color: #ef4444;
//     background: rgba(239, 68, 68, 0.1);
//   }
// `;
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
    border-color: #3b82f6;
    color: #3b82f6;
  }
  &.has-file {
    border-color: #22c55e;
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
  justify-content: center; /* Center content inside the button */
  gap: 0.75rem; /* Slightly more space for the icon */
  padding: 1rem 2.5rem; /* Increased padding to make it bigger */
  font-size: 1rem; /* Explicitly set font size */
  font-weight: 600;
  color: #ffffff; /* White text for better contrast on gradient */

  /* A modern, sleek gradient */
  background: linear-gradient(135deg, #e53935, #b71c1c);

  border: none; /* Removed border for a flatter look */
  border-radius: 8px; /* Slightly adjusted border-radius */
  cursor: pointer;

  /* A more subtle shadow that lifts on hover */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);

  /* Smooth transitions for all animated properties */
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px); /* Lifts the button up */
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.5);
    background: linear-gradient(
      135deg,
      #f44336,
      #c62828
    ); /* Brighter gradient on hover */
  }

  /* Style for when the button is being clicked */
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  }

  /* Accessibility: Style for keyboard navigation */
  &:focus-visible {
    outline: 2px solid #ff8a80;
    outline-offset: 2px;
  }

  &:disabled {
    background: #424242; /* Darker grey for disabled state */
    color: #9e9e9e;
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
