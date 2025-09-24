import { z } from "zod";

// --- Enums ---
const VehicleStatus = z.enum(["AVAILABLE", "SOLD", "PENDING", "RESERVED"]);
const FuelType = z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "CNG"]);
const DriveType = z.enum(["FWD", "RWD", "AWD", "FOUR_WD"]);
const CollectionType = z.enum(["YBT", "DESIGNER", "WORKSHOP", "TORQUE_TUNER"]);
const Stage = z.enum(["STAGE1", "STAGE2", "STAGE3"]);

// --- Main Validation Schema ---
export const carValidationSchema = z
  .object({
    // --- Core Details ---
    title: z
      .string()
      .min(3, "Title must be at least 3 characters.")
      .nonempty("Title is required."),
    description: z.string().optional(),
    status: VehicleStatus.optional(),

    // --- Collection & Dealer ---
    dealerId: z.string().nonempty("Please select who is listing this car."),
    collectionType: CollectionType,
    designerId: z.string().optional(),
    workshopId: z.string().optional(),
    tuningStage: z.union([Stage, z.literal("")]).optional(),

    // --- Pricing (Corrected) ---
    sellingPrice: z.coerce
      .number()
      .positive("Selling price must be a positive number."),
    cutOffPrice: z.coerce
      .number()
      .positive("Cut-off price must be a positive number."),
    ybtPrice: z.coerce
      .number()
      .positive("YBT price must be a positive number."),

    // --- Ownership & History ---
    registrationYear: z.coerce
      .number()
      .int()
      .min(1900)
      .max(new Date().getFullYear()),
    registrationNumber: z.string().nonempty("Registration number is required."),
    kmsDriven: z.coerce.number().int().min(0, "Kms must be 0 or more."),
    ownerCount: z.coerce.number().int().min(1).optional(),
    insurance: z.string().optional(),
    manufactureYear: z.coerce
      .number()
      .int()
      .min(1900)
      .max(new Date().getFullYear())
      .optional(),

    // --- Other Specs ---
    badges: z.array(z.string()).optional(),
    vipNumber: z.boolean().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    carUSP: z.string().optional(),

    // --- Car Details ---
    brand: z.string().optional(),
    carType: z.string().optional(),
    transmission: z.string().optional(),
    exteriorColour: z.string().optional(),
    peakTorque: z.string().optional(),
    peakPower: z.string().optional(),
    doors: z.coerce.number().int().positive().optional(),
    seatingCapacity: z.coerce.number().int().positive().optional(),
    engine: z.string().optional(),
    fuelType: FuelType.optional(),
    mileage: z.coerce.number().min(0).optional(),
    driveType: z.union([DriveType, z.literal("")]).optional(),

    carImages: z
      .any()
      .refine(
        (files) => files?.length > 0,
        "At least one car image is required."
      ),
  })
  .refine(
    (data) => {
      // Conditional validation logic
      if (data.collectionType === "DESIGNER") return !!data.designerId;
      return true;
    },
    {
      message: "A designer must be selected for the Designer Collection.",
      path: ["designerId"],
    }
  )
  .refine(
    (data) => {
      if (data.collectionType === "WORKSHOP") return !!data.workshopId;
      return true;
    },
    {
      message: "A workshop must be selected for the Workshop Collection.",
      path: ["workshopId"],
    }
  )
  .refine(
    (data) => {
      if (data.collectionType === "TORQUE_TUNER") return !!data.tuningStage;
      return true;
    },
    {
      message: "A tuning stage is required for the Torque Tuner Collection.",
      path: ["tuningStage"],
    }
  );

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

const bikeValidationSchema = z.object({
  // --- Core Details ---
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .nonempty("Title is required."),
  description: z.string().optional(),
  brand: z.string().optional(),
  bikeUSP: z.string().optional(),
  status: VehicleStatus.optional(),

  // --- Dealer ---
  dealerId: z.string().nonempty("Please select who is listing this bike."),

  // --- Pricing ---
  ybtPrice: z.coerce
    .number()
    .positive("YBT price is a required positive number."),
  sellingPrice: z.coerce
    .number()
    .positive("Selling price must be positive.")
    .optional(),
  cutOffPrice: z.coerce
    .number()
    .positive("Cut-off price must be positive.")
    .optional(),

  // --- Ownership & History ---
  registrationYear: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear()),
  registrationNumber: z.string().nonempty("Registration number is required."),
  kmsDriven: z.coerce.number().int().min(0, "Kms must be 0 or more."),
  ownerCount: z.coerce.number().int().min(1).optional(),
  insurance: z.string().optional(),

  // --- Specs ---
  engine: z.string().optional(),
  specs: z.array(z.string()).optional(),
  fuelType: FuelType.optional(),
  badges: z.array(z.string()).optional(),
  vipNumber: z.boolean().optional(),

  // --- Media ---
  bikeImages: z
    .any()
    .refine(
      (files) => files?.length > 0,
      "At least one bike image is required."
    ),
});

export { bikeValidationSchema };

export { BookingFormValidationSchema };
export default carValidationSchema;
