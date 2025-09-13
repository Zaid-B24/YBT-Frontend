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
    .max(100, "Title is too long.")
    .nonempty("Title is required."),
  description: z.string().max(5000, "Description is too long.").optional(),
  status: VehicleStatus.optional(),

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
    .min(1900, "Year seems too old.")
    .max(new Date().getFullYear(), "Year cannot be in the future."),
  manufactureYear: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  registrationNumber: z
    .string()
    .regex(
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/i,
      "Invalid registration number format (e.g., MH12AB1234)."
    )
    .nonempty(),
  kmsDriven: z.coerce.number().int().min(0, "Kilometers must be 0 or more."),
  ownerCount: z.coerce
    .number()
    .int()
    .min(1, "Owner count must be at least 1.")
    .optional(),
  insurance: z.string().optional(),

  // --- Other Specs ---
  listedBy: z.string().optional(),
  badges: z.array(z.string()).optional(),
  vipNumber: z.boolean().default(false).optional(),
  city: z.string().optional(),
  state: z.string().optional(),

  // --- Car Details ---
  brand: z.string().optional(),
  fuelType: FuelType,
  transmission: z.string().optional(),
  carType: z.string().optional(),
  exteriorColour: z.string().optional(),
  seatingCapacity: z.coerce
    .number()
    .int()
    .positive("Seating capacity must be a positive number.")
    .optional(),
  engine: z.string().optional(),
  mileage: z.coerce.number().min(0).optional(),
  driveType: z.union([DriveType.optional(), z.literal("")]),

  carImages: z
    .any()
    .refine(
      (files) => files && files.length > 0,
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
    .max(100, "Title is too long.")
    .nonempty("Title is required."), // Correctly required
  brand: z.string().optional(), // Optional in Prisma
  manufactureYear: z.coerce
    .number()
    .int()
    .min(1950)
    .max(new Date().getFullYear())
    .optional(), // Optional in Prisma
  kmsDriven: z.coerce.number().int().min(0, "Kilometers must be 0 or more."), // Required in Prisma
  ownerCount: z.coerce.number().int().min(1, "Owner count must be at least 1."), // Required in Prisma
  insurance: z.string().optional(), // Optional in Prisma
  registrationYear: z.coerce
    .number()
    .int()
    .min(1950, "Year seems too old.")
    .max(new Date().getFullYear(), "Year cannot be in the future."), // Required in Prisma
  registrationNumber: z
    .string()
    .regex(
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/i,
      "Invalid registration number format (e.g., MH12AB1234)."
    )
    .nonempty(), // Correctly required
  fuelType: FuelType, // Required in Prisma
  sellingPrice: z.coerce
    .number({ required_error: "Selling price is required." })
    .positive("Selling price must be a positive number."), // Required
  cutOffPrice: z.coerce.number().positive("Cut-off price must be positive."), // Required
  ybtPrice: z.coerce.number().positive("YBT price must be positive."), // Required
  listedBy: z.string().nonempty("Listed By is required."), // Required
  badges: z.array(z.string()).optional(), // Optional in Prisma
  vipNumber: z.boolean().default(false).optional(), // Default value in Prisma makes it optional
  description: z.string().max(5000, "Description is too long.").optional(), // Optional
  status: VehicleStatus.default("AVAILABLE").optional(), // Optional
  bikeImages: z.any().refine(
    (files) => files && files.length > 0, // Corrected to ensure at least one file
    "At least one bike image is required."
  ),
  bikeUSP: z.string().optional(), // Optional
});

export { BikeValidationSchema };

export { BookingFormValidationSchema };
export default carValidationSchema;
