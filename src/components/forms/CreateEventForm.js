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
  List,
  Clock,
} from "lucide-react";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components";

const FormField = ({ label, icon: Icon, children, error }) => (
  <Field>
    <Label>
      <Icon size={16} /> {/* The Icon variable is correctly used here */}
      <span>{label}</span>
    </Label>
    {children}
    {error && <ErrorMessage>{error.message}</ErrorMessage>}
  </Field>
);

const CreateEventForm = ({ onSuccess, onBack }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      maxAttendees: "",
      location: "",
      startDate: "",
      endDate: "",
      imageUrls: [],
      agenda: [{ time: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "agenda",
  });

  const onSubmit = async (formData) => {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "imageUrls") {
        formData.imageUrls.forEach((file) => {
          data.append("images", file);
        });
      } else if (key === "agenda") {
        // Serialize the agenda array into a JSON string
        data.append("agenda", JSON.stringify(formData.agenda));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/events/`, {
        method: "POST",
        body: data,
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

  const imageUrls = watch("imageUrls");

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
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>Enter Event Details</Title>
      <Grid>
        {inputFields.map(
          ({ key, label, placeholder, type = "text", icon: Icon }) => (
            <FormField key={key} label={label} icon={Icon} error={errors[key]}>
              <Input
                type={type}
                placeholder={placeholder}
                {...register(key, { required: true })}
              />
            </FormField>
          )
        )}

        <FileInputContainer>
          <InputLabel>Event Images</InputLabel>
          <Controller
            control={control}
            name="imageUrls"
            render={({ field: { onChange, value } }) => (
              <>
                <FileInputWrapper
                  className={value?.length > 0 ? "has-file" : ""}
                >
                  <HiddenFileInput
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      onChange([...(value || []), ...files]);
                    }}
                  />
                  <FileInputContent>
                    <FileInputIcon>
                      {value?.length > 0 ? (
                        <Image size={24} />
                      ) : (
                        <Upload size={24} />
                      )}
                    </FileInputIcon>
                    <FileInputText>
                      {value?.length > 0
                        ? `${value.length} Images Selected`
                        : "Click to upload images"}
                    </FileInputText>
                    <FileInputSubtext>
                      {value?.length > 0
                        ? "Click to add more images"
                        : "PNG, JPG up to 10MB each"}
                    </FileInputSubtext>
                  </FileInputContent>
                </FileInputWrapper>
                {value?.length > 0 && (
                  <ImagePreviewContainer>
                    {value.map((image, index) => (
                      <SelectedFile key={index}>
                        <FileInfo>
                          <Image size={16} />
                          <span>{image.name}</span>
                        </FileInfo>
                        <RemoveButton
                          type="button"
                          onClick={() =>
                            onChange(value.filter((_, i) => i !== index))
                          }
                        >
                          <X size={16} />
                        </RemoveButton>
                      </SelectedFile>
                    ))}
                  </ImagePreviewContainer>
                )}
              </>
            )}
          />
        </FileInputContainer>

        <AgendaContainer>
          <InputLabel>
            <List size={16} /> Event Agenda
          </InputLabel>
          {fields.map((item, index) => (
            <AgendaItem key={item.id}>
              <FormField
                label="Time"
                icon={Clock}
                error={errors.agenda?.[index]?.time}
              >
                <Input
                  type="time"
                  {...register(`agenda.${index}.time`, { required: true })}
                />
              </FormField>
              <FormField
                label="Description"
                icon={FileText}
                error={errors.agenda?.[index]?.description}
              >
                <Input
                  type="text"
                  placeholder="e.g., Opening Ceremony"
                  {...register(`agenda.${index}.description`, {
                    required: true,
                  })}
                />
              </FormField>
              {fields.length > 1 && (
                <RemoveButton type="button" onClick={() => remove(index)}>
                  <X size={16} />
                </RemoveButton>
              )}
            </AgendaItem>
          ))}
          <AddAgendaButton
            type="button"
            onClick={() => append({ time: "", description: "" })}
          >
            + Add Agenda Item
          </AddAgendaButton>
        </AgendaContainer>
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
      {/* RHF requires the form to have an onSubmit */}
    </FormContainer>
  );
};

export default CreateEventForm;

const AgendaContainer = styled.div`
  grid-column: 1 / -1;
  border: 1px dashed #7f1d1d;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const AddAgendaButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #ff0000;
  border: 1px dashed #ff0000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    background-color: #ff0000;
    color: white;
  }
`;

const ErrorMessage = styled.p`
  color: #ff5252;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

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

const AgendaItem = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr auto;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1rem;

  ${Field} {
    margin: 0;
  }
`;
