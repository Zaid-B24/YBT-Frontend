import { z } from "zod";

const VehicleStatus = z.enum(["AVAILABLE", "SOLD", "PENDING"]);
const FuelType = z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "CNG"]);
const DriveType = z.enum(["FWD", "RWD", "AWD", "FOUR_WD"]);

// 2. Main Validation Schema
const carValidationSchema = z.object({
  // --- Core Details ---
  carUSP: z.string().optional(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title is too long."),
  description: z.string().max(5000, "Description is too long.").optional(),
  status: VehicleStatus.default("AVAILABLE").optional(),

  // --- Pricing ---
  sellingPrice: z.coerce
    .number({ required_error: "Selling price is required." })
    .positive("Selling price must be a positive number."),
  cutOffPrice: z.coerce.number().positive("Cut-off price must be positive."),
  ybtPrice: z.coerce.number().positive("YBT price must be positive."),

  // --- Ownership & History ---
  registrationYear: z.coerce
    .number()
    .int()
    .min(1950, "Year seems too old.")
    .max(new Date().getFullYear(), "Year cannot be in the future."),
  manufactureYear: z.coerce
    .number()
    .int()
    .min(1950)
    .max(new Date().getFullYear())
    .optional(),
  registrationNumber: z
    .string()
    .regex(
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/i,
      "Invalid registration number format (e.g., MH12AB1234)."
    ),
  kmsDriven: z.coerce.number().int().min(0, "Kilometers must be 0 or more."),
  ownerCount: z.coerce.number().int().min(1, "Owner count must be at least 1."),
  insurance: z.string().optional(),

  // --- Other Specs ---
  listedBy: z.string().min(1, "Listed By is required."),
  badges: z.array(z.string().min(1, "Badge cannot be empty.")).optional(), // An array of strings
  vipNumber: z.boolean().default(false).optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),

  // --- Car Details ---
  brand: z.string().min(1, "Brand is required."),
  fuelType: FuelType, // Required enum
  transmission: z.string().min(1, "Transmission type is required."),
  carType: z.string().optional(),
  exteriorColour: z.string().optional(),
  seatingCapacity: z.coerce
    .number()
    .int()
    .positive("Seating capacity must be a positive number.")
    .optional(),
  engine: z.string().optional(),
  mileage: z.coerce.number().min(0).optional(),
  driveType: DriveType.optional(),

  carImages: z
    .any()
    .refine(
      (files) => files?.length >= 0,
      "At least one car image is required."
    ),
});

const BookingFormValidationSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters long"),

  email: z.string().nonempty("Email is required"),

  address: z
    .string()
    .min(10, "Address must be at least 10 characters long")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
});

const BikeValidationSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title is too long."),
  brand: z.string().min(1, "Brand is required."),
  manufactureYear: z.coerce
    .number()
    .int()
    .min(1950)
    .max(new Date().getFullYear())
    .optional(),
  kmsDriven: z.coerce.number().int().min(0, "Kilometers must be 0 or more."),
  ownerCount: z.coerce.number().int().min(1, "Owner count must be at least 1."),
  insurance: z.string().optional(),
  registrationYear: z.coerce
    .number()
    .int()
    .min(1950, "Year seems too old.")
    .max(new Date().getFullYear(), "Year cannot be in the future."),
  registrationNumber: z
    .string()
    .regex(
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/i,
      "Invalid registration number format (e.g., MH12AB1234)."
    ),
  fuelType: FuelType,
  sellingPrice: z.coerce
    .number({ required_error: "Selling price is required." })
    .positive("Selling price must be a positive number."),
  cutOffPrice: z.coerce.number().positive("Cut-off price must be positive."),
  ybtPrice: z.coerce.number().positive("YBT price must be positive."),
  listedBy: z.string().min(1, "Listed By is required."),
  badges: z.array(z.string().min(1, "Badge cannot be empty.")).optional(), // An array of strings
  vipNumber: z.boolean().default(false).optional(),
  description: z.string().max(5000, "Description is too long.").optional(),
  status: VehicleStatus.default("AVAILABLE").optional(),
  bikeImages: z
    .any()
    .refine(
      (files) => files?.length >= 0,
      "At least one car image is required."
    ),
  bikeUsp: z.string().optional(),
});

export { BikeValidationSchema };

export { BookingFormValidationSchema };
export default carValidationSchema;
