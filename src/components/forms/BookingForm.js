import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Slide, toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { BookingFormValidationSchema } from "../../utils/zodValidation";
import { useEffect } from "react";

const VehicleBookingForm = ({ category, vehicleId, user, token }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(BookingFormValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        address: user.address || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    const endpoint = user
      ? `${process.env.REACT_APP_API_URL}/${category}/${vehicleId}/book`
      : `${process.env.REACT_APP_API_URL}/${vehicleId}/guest-book`;

    // B. Prepare the headers (including auth token if logged in)
    const headers = {
      "Content-Type": "application/json",
    };
    if (user && token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      // C. Make the dynamic fetch request with a JSON body
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data), // Send data as JSON, not FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking request failed.");
      }

      const responseData = await response.json();
      toast.success(responseData.message || "Request sent successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <BookingForm onSubmit={handleSubmit(onSubmit)}>
      <StyledToastContainer />
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormInput {...register("name")} />
        {errors.name && <>{errors.name.message}</>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormInput type="email" {...register("email")} />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Phone Number *</FormLabel>
        <FormInput type="text" {...register("phone")} />
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <FormLabel>Address</FormLabel>
        <FormInput type="text" {...register("address")} />
        {errors.address && (
          <ErrorMessage>{errors.address.message}</ErrorMessage>
        )}
      </FormGroup>
      <SubmitButton type="submit">Book Now</SubmitButton>
    </BookingForm>
  );
};

export default VehicleBookingForm;

const BookingForm = styled.form`
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;
const ErrorMessage = styled.p`
  color: #ef4444; // A tailwind red color
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: #fff;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const StyledToastContainer = styled(ToastContainer).attrs({
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  CloseButton: false,
  pauseOnHover: true,
  draggable: true,
  transition: Slide,
})`
  .Toastify__toast {
    font-family: "Poppins", sans-serif;
    border-radius: 10px;
    padding: 16px;
    font-size: 0.95rem;
    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  }

  .Toastify__toast--error {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .Toastify__toast--info {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
  }

  .Toastify__progress-bar {
    background: rgba(255, 255, 255, 0.7);
  }
`;

// // const [formData, setFormData] = useState({
//   //   name: "",
//   //   email: "",
//   //   phone: "",
//   //   address: "",
//   // });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success(
//       "Thank you for reserving the car! We’ll notify you with details shortly."
//     );
//     return console.log("form submitted");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
