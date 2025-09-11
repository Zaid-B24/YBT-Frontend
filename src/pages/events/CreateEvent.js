import {
  Car,
  Image,
  Upload,
  X,
  Calendar,
  Users,
  MapPin,
  Tag,
  FileText,
} from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

// NOTE: You'll need to provide your own styled-components definitions
// for these components (FormContainer, Title, Grid, Field, etc.)

const AddEventFlow = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    maxAttendees: "",
    currentAttendees: "0", // Defaulting current attendees to 0
    location: "",
    startDate: "",
    endDate: "",
    imageUrls: [], // This is the correct state property for images
    primaryImage: "",
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      // ✨ FIX: Update the correct state property: imageUrls
      imageUrls: [...prev.imageUrls, ...files],
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      // ✨ FIX: Filter the correct state property: imageUrls
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all key-value pairs from the state
    Object.keys(formData).forEach((key) => {
      if (key !== "imageUrls") {
        data.append(key, formData[key]);
      }
    });

    // Append each file under the same key (e.g., 'images')
    // Your backend should be set up to handle an array of files under this key.
    formData.imageUrls.forEach((file) => {
      data.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:5001/api/events/", {
        method: "POST",
        body: data, // The body is now correctly populated
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Event added", responseData);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error uploading", error);
    }
  };

  // ✨ FIX: Improved input fields with better types and icons
  const inputFields = [
    {
      key: "title",
      label: "Event Title",
      placeholder: "Annual Summer Auto Show",
      icon: Car,
    },
    {
      key: "slug",
      label: "Event Slug",
      placeholder: "summer-auto-show-2025",
      icon: Tag,
    },
    {
      key: "description",
      label: "Description",
      placeholder: "A festival for car enthusiasts...",
      icon: FileText,
    },
    {
      key: "maxAttendees",
      label: "Max Attendees",
      placeholder: "500",
      type: "number",
      icon: Users,
    },
    {
      key: "location",
      label: "Location",
      placeholder: "City Convention Center",
      icon: MapPin,
    },
    {
      key: "startDate",
      label: "Start Date & Time",
      type: "datetime-local",
      icon: Calendar,
    },
    {
      key: "endDate",
      label: "End Date & Time",
      type: "datetime-local",
      icon: Calendar,
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit}>
      {/* ✨ FIX: Changed title for clarity */}
      <Title>Enter Event Details</Title>
      <Grid>
        {inputFields.map(
          ({ key, label, placeholder, type = "text", icon: Icon }) => (
            <Field key={key}>
              <Label>
                <Icon size={16} />
                <span>{label}</span>
              </Label>
              <Input
                type={type}
                placeholder={placeholder}
                value={formData[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                required // Added for better form validation
              />
            </Field>
          )
        )}

        <FileInputContainer>
          <InputLabel>Event Images</InputLabel>
          <FileInputWrapper
            className={formData.imageUrls.length > 0 ? "has-file" : ""}
          >
            <HiddenFileInput
              type="file"
              accept="image/*"
              multiple
              // ✨ FIX: Removed the second argument, it's not needed here
              onChange={handleFileChange}
            />
            <FileInputContent>
              <FileInputIcon>
                {formData.imageUrls.length > 0 ? (
                  <Image size={24} />
                ) : (
                  <Upload size={24} />
                )}
              </FileInputIcon>
              <FileInputText>
                {/* ✨ FIX: Read length from the correct state property */}
                {formData.imageUrls.length > 0
                  ? `${formData.imageUrls.length} Images Selected`
                  : "Click to upload images"}
              </FileInputText>
              <FileInputSubtext>
                {formData.imageUrls.length > 0
                  ? "Click to add more images"
                  : "PNG, JPG up to 10MB each"}
              </FileInputSubtext>
            </FileInputContent>
          </FileInputWrapper>
          {formData.imageUrls.length > 0 && (
            <ImagePreviewContainer>
              {formData.imageUrls.map((image, index) => (
                <SelectedFile key={index}>
                  <FileInfo>
                    <Image size={16} />
                    <span>{image.name}</span>
                  </FileInfo>
                  <RemoveButton
                    type="button"
                    onClick={() => removeImage(index)}
                  >
                    <X size={16} />
                  </RemoveButton>
                </SelectedFile>
              ))}
            </ImagePreviewContainer>
          )}
        </FileInputContainer>
      </Grid>

      <FormActions>
        <BackButton type="button" onClick={onBack}>
          &larr; Back
        </BackButton>
        <SubmitButton type="submit">
          <Car size={16} />
          <span>Add Event</span>
        </SubmitButton>
      </FormActions>
    </FormContainer>
  );
};

export default AddEventFlow;

const FormContainer = styled.form`
  padding: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem; /* Increased gap for better spacing */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

// ✨ FIX: This new style will make the file input span both columns
const FileInputContainer = styled.div`
  grid-column: 1 / -1; /* This makes the element span all columns */
  margin-top: 1rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff5f5;
  font-size: 0.875rem; /* Adjusted for consistency */
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const inputStyles = `
  width: 100%;
  background: #000;
  border: 1px solid #7f1d1d;
  border-radius: 8px; /* Slightly less rounded */
  padding: 0.75rem;
  color: white;
  transition: border 0.2s, background 0.2s;

  &:focus {
    border-color: #ff0000;
    outline: none;
    background: #1a1a1a;
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const FileInputWrapper = styled.label`
  /* Styles remain the same */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 120px;

  &:hover {
    border-color: rgba(255, 0, 0, 0.5);
    background: rgba(255, 0, 0, 0.05);
  }
  &.has-file {
    border-color: rgba(34, 197, 94, 0.5);
    background: rgba(34, 197, 94, 0.05);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;
const FileInputContent = styled.div`
  /* Styles remain the same */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
`;
const FileInputIcon = styled.div`
  /* Styles remain the same */
  padding: 1rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;

  ${FileInputWrapper}:hover & {
    background: rgba(255, 0, 0, 0.2);
    color: #ff0000;
  }

  ${FileInputWrapper}.has-file & {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }
`;
const FileInputText = styled.div`
  /* Styles remain the same */
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 500;
`;
const FileInputSubtext = styled.div`
  /* Styles remain the same */
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
`;

const ImagePreviewContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectedFile = styled.div`
  /* Styles remain the same */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem; /* Adjusted padding */
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 8px;
  color: #22c55e;
  font-size: 0.875rem;
`;
const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const RemoveButton = styled.button`
  /* Styles remain the same */
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`;
const InputLabel = styled.label`
  /* Styles remain the same */
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
`;

// ✨ FIX: Renamed 'Actions' to 'FormActions' and updated styles
const FormActions = styled.div`
  display: flex;
  justify-content: space-between; /* This is the key change */
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-top: 1.5rem; /* Added margin for separation */
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem; /* Matched padding with submit */
  font-size: 0.9rem;
  font-weight: 600;
  background-color: transparent;
  color: #a0a0a0;
  border: 1px solid #555;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

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
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.75rem;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    border-radius: 1px;
  }
`;
