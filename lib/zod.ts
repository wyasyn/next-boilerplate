import { object, string } from "zod";

export const signInSchema = object({
  username: string().min(3, {
    message: "Username must have at least 3 characters.",
  }),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const registrationSchema = object({
  username: string().min(3, {
    message: "Username must have at least 3 characters.",
  }),
  firstName: string().min(3, {
    message: "Name must have at least 3 characters.",
  }),
  lastName: string().min(3, {
    message: "Name must have at least 3 characters.",
  }),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  password2: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
