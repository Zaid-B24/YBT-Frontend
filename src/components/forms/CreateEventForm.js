import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Car,
  Image,
  Video,
  Upload,
  X,
  Calendar,
  MapPin,
  Tag,
  FileText,
  Hash,
  IndianRupee,
  Ticket,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components";

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

const fetchCategories = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/eventcategory`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data;
};

const createEvent = async (formData) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No admin token found.");
  const response = await fetch(`${process.env.REACT_APP_API_URL}/events`, {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("this is the response on posting ");
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create event");
  }
  return response.json();
};

const CreateEventForm = ({ onSuccess, onBack }) => {
  const queryClient = useQueryClient();

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      console.error("Error creating event:", error.message);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      images: [],
      videos: [],
      ticketTypes: [
        {
          name: "Basic",
          price: 0,
          quantity: 100,
          saleStartDate: "",
          saleEndDate: "",
        },
      ],
      agenda: [],
      facilities: "",
      youshouldKnow: "",
    },
  });

  const {
    fields: ticketFields,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    control,
    name: "ticketTypes",
  });

  const onSubmit = async (formData) => {
    if (!formData.startDate) {
      console.error("Please select a start date for the event first.");
      // You could show an error message to the user here.
      return;
    }

    // Get just the date part (e.g., "2025-10-02") from the main start date.
    const eventDatePart = new Date(formData.startDate)
      .toISOString()
      .split("T")[0];
    const processedData = {
      ...formData,

      //categoryIds: [1],
      ticketTypes: [{ name: "VIP Pass", price: 2500, quantity: 50 }],

      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,

      // agenda: formData.agenda.map((item) => {
      //   // Return null if the time input is empty
      //   if (!item.time) {
      //     return { ...item, time: null };
      //   }

      //   // Combine the main event's date with this item's time
      //   // Example: "2025-10-02" + "T" + "14:30" => "2025-10-02T14:30"
      //   const combinedDateTimeString = `${eventDatePart}T${item.time}`;

      //   return {
      //     ...item,
      //     time: new Date(combinedDateTimeString).toISOString(),
      //   };
      // }),
    };
    const data = new FormData();

    Object.keys(processedData).forEach((key) => {
      const value = processedData[key];
      if (key === "images" && value) {
        for (let i = 0; i < value.length; i++) {
          data.append("images", value[i]); // Appends to 'images' field
        }
      } else if (key === "videos" && value) {
        // --- ADDED THIS BLOCK ---
        for (let i = 0; i < value.length; i++) {
          data.append("videos", value[i]); // Appends to 'videos' field
        }
      } else if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else if (key !== "images" && key !== "videos" && value) {
        // --- CHANGED ---
        data.append(key, value);
      }
    });

    mutate(data);
  };

  const images = watch("images");

  const inputFields = [
    {
      key: "title",
      label: "Event Title",
      placeholder: "Annual Tech Conference",
      icon: Car,
    },
    {
      key: "description",
      label: "Description",
      placeholder: "A conference for tech enthusiasts...",
      icon: FileText,
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
    {
      key: "facilities",
      label: "Facilities",
      placeholder: "e.g., Free WiFi, Parking, Food Stalls",
      icon: Sparkles,
      as: "textarea", // <-- Use a textarea for better UX
    },
    {
      key: "youshouldKnow",
      label: "You Should Know",
      placeholder: "e.g., Bring ID, No outside food, Gates open at 6 PM",
      icon: Lightbulb,
      as: "textarea", // <-- Also a textarea
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>Create New Event</Title>
      <Grid>
        {inputFields.map(
          ({ key, label, placeholder, type = "text", icon, as }) => (
            <FormField key={key} label={label} icon={icon} error={errors[key]}>
              {as === "textarea" ? ( // <-- Check if it should be a textarea
                <Textarea
                  placeholder={placeholder}
                  {...register(key, { required: `${label} is required.` })}
                />
              ) : (
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...register(key, { required: `${label} is required.` })}
                />
              )}
            </FormField>
          )
        )}

        <FormField label="Categories" icon={Tag} error={errors.categoryIds}>
          <Controller
            name="categoryIds"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                disabled={isLoadingCategories}
                onChange={(e) => {
                  const selectedValues = Array.from(
                    e.target.selectedOptions,
                    (option) => parseInt(option.value, 10)
                  );
                  field.onChange(selectedValues);
                }}
              >
                {isLoadingCategories ? (
                  <option disabled>Loading...</option>
                ) : (
                  categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </Select>
            )}
          />
        </FormField>
      </Grid>

      <FileInputContainer>
        <Label>
          <Image size={16} />
          <span>Event Images</span>
        </Label>
        <Controller
          control={control}
          name="images"
          render={({ field: { onChange, value } }) => (
            <>
              <FileInputWrapper className={value?.length > 0 ? "has-file" : ""}>
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
                  <Upload size={24} />
                  <FileInputText>
                    {value?.length > 0
                      ? `${value.length} image(s) selected`
                      : "Click or drag to upload"}
                  </FileInputText>
                </FileInputContent>
              </FileInputWrapper>
              {value?.length > 0 && (
                <ImagePreviewContainer>
                  {value.map((image, index) => (
                    <SelectedFile key={index}>
                      <span>{image.name}</span>
                      <RemoveItemButton
                        type="button"
                        onClick={() =>
                          onChange(value.filter((_, i) => i !== index))
                        }
                      >
                        <X size={16} />
                      </RemoveItemButton>
                    </SelectedFile>
                  ))}
                </ImagePreviewContainer>
              )}
            </>
          )}
        />
      </FileInputContainer>

      <FileInputContainer>
        <Label>
          <Video size={16} />
          <span>Event Videos</span>
        </Label>
        <Controller
          control={control}
          name="videos" // Changed name to "videos"
          render={({ field: { onChange, value } }) => (
            <>
              <FileInputWrapper className={value?.length > 0 ? "has-file" : ""}>
                <HiddenFileInput
                  type="file"
                  accept="video/*" // Only videos
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    onChange([...(value || []), ...files]);
                  }}
                />
                <FileInputContent>
                  <Upload size={24} />
                  <FileInputText>
                    {value?.length > 0
                      ? `${value.length} video(s) selected` // Changed text
                      : "Click or drag to upload"}
                  </FileInputText>
                </FileInputContent>
              </FileInputWrapper>
              {value?.length > 0 && (
                <ImagePreviewContainer>
                  {value.map(
                    (
                      video,
                      index // Renamed 'image' to 'video' for clarity
                    ) => (
                      <SelectedFile key={index}>
                        <span>{video.name}</span>
                        <RemoveItemButton
                          type="button"
                          onClick={() =>
                            onChange(value.filter((_, i) => i !== index))
                          }
                        >
                          <X size={16} />
                        </RemoveItemButton>
                      </SelectedFile>
                    )
                  )}
                </ImagePreviewContainer>
              )}
            </>
          )}
        />
      </FileInputContainer>

      <SectionTitle>Ticket Types</SectionTitle>
      {ticketFields.map((field, index) => (
        <TicketGrid key={field.id}>
          <FormField
            label="Ticket Name"
            icon={Ticket}
            error={errors.ticketTypes?.[index]?.name}
          >
            <Input
              {...register(`ticketTypes.${index}.name`, { required: true })}
              placeholder="e.g., VIP"
            />
          </FormField>

          <FormField
            label="Price"
            icon={IndianRupee}
            error={errors.ticketTypes?.[index]?.price}
          >
            <Input
              type="number"
              {...register(`ticketTypes.${index}.price`, {
                required: true,
                valueAsNumber: true,
              })}
            />
          </FormField>

          <FormField
            label="Quantity"
            icon={Hash}
            error={errors.ticketTypes?.[index]?.quantity}
          >
            <Input
              type="number"
              {...register(`ticketTypes.${index}.quantity`, {
                required: true,
                valueAsNumber: true,
              })}
            />
          </FormField>

          {/* --- CHANGE 3: Added Sale Start Date field --- */}
          <FormField
            label="Sale Start Date"
            icon={Calendar}
            error={errors.ticketTypes?.[index]?.saleStartDate}
          >
            <Input
              type="datetime-local"
              {...register(`ticketTypes.${index}.saleStartDate`)}
            />
          </FormField>

          {/* --- CHANGE 4: Added Sale End Date field --- */}
          <FormField
            label="Sale End Date"
            icon={Calendar}
            error={errors.ticketTypes?.[index]?.saleEndDate}
          >
            <Input
              type="datetime-local"
              {...register(`ticketTypes.${index}.saleEndDate`)}
            />
          </FormField>

          <RemoveItemButton type="button" onClick={() => removeTicket(index)}>
            <X size={16} /> Remove
          </RemoveItemButton>
        </TicketGrid>
      ))}
      <Button
        type="button"
        onClick={() =>
          appendTicket({
            name: "",
            price: 0,
            quantity: 50,
            saleStartDate: "",
            saleEndDate: "",
          })
        }
      >
        + Add Ticket Type
      </Button>
      <FormActions>
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button $primary type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Create Event"}
        </Button>
      </FormActions>
    </FormContainer>
  );
};

export default CreateEventForm;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical; // Allows user to resize vertically
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const inputStyles = `
  width: 100%;
  background: #2a2a2e;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 0.75rem;
  color: #f0f0f0;
  font-size: 0.9rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
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

const ErrorMessage = styled.p`
  color: #ff5252;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

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

const SectionTitle = styled.h3`
  color: #e0e0e0;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
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
  color: #a0a0a0;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
  height: 100px;
`;

const FileInputContainer = styled.div`
  grid-column: 1 / -1;
  margin-top: 1.5rem;
`;

const FileInputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: #2a2a2e;
  cursor: pointer;
  transition: border-color 0.3s ease;
  color: #888;

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
  gap: 0.5rem;
`;

const FileInputText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ImagePreviewContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectedFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 6px;
  color: #d1d1d1;
  font-size: 0.875rem;
`;

const TicketGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1rem;
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

const RemoveItemButton = styled.button`
  ${buttonStyles}
  padding: 0.5rem;
  background: #4b3434;
  border-color: #6c4b4b;
  color: #ef4444;

  &:hover {
    background-color: #ef4444;
    color: white;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #333;
`;

// const AgendaItem = styled.div`
//   display: grid;
//   grid-template-columns: 0.3fr 1fr auto;
//   gap: 1rem;
//   align-items: flex-end;
//   margin-bottom: 1rem;

//   ${Field} {
//     margin: 0;
//   }
// `;

// {/* <AgendaContainer>
//   <InputLabel>
//     <List size={16} /> Event Agenda
//   </InputLabel>
//   {fields.map((item, index) => (
//     <AgendaItem key={item.id}>
//       <FormField
//         label="Time"
//         icon={Clock}
//         error={errors.agenda?.[index]?.time}
//       >
//         <Input
//           type="time"
//           {...register(`agenda.${index}.time`, { required: true })}
//         />
//       </FormField>
//       <FormField
//         label="Activity Title"
//         icon={Type}
//         error={errors.agenda?.[index]?.title}
//       >
//         <Input
//           type="text"
//           placeholder="e.g., Keynote Speech"
//           {...register(`agenda.${index}.title`, {
//             required: "Activity title is required.",
//           })}
//         />
//       </FormField>

//       <FormField
//         label="Description (Optional)"
//         icon={FileText}
//         error={errors.agenda?.[index]?.description}
//       >
//         <Input
//           type="text"
//           placeholder="e.g., Speaker name, details, etc."
//           {...register(`agenda.${index}.description`)} // <-- No longer required
//         />
//       </FormField>
//       {fields.length > 1 && (
//         <RemoveButton type="button" onClick={() => remove(index)}>
//           <X size={16} />
//         </RemoveButton>
//       )}
//     </AgendaItem>
//   ))}
//   <AddAgendaButton
//     type="button"
//     onClick={() => append({ time: "", title: "", description: "" })}
//   >
//     + Add Agenda Item
//   </AddAgendaButton>
// </AgendaContainer> */}
