import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters")
    .transform((value) => value.toLowerCase()),

  age: z
    .number()
    .int("Age must be a whole number")
    .min(1, "Age must be at least 1")
    .max(120, "Age must not exceed 120"),

  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City must not exceed 100 characters")
});

export const updateUserSchema = createUserSchema;