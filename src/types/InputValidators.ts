import { z } from 'zod';

// Define the email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Create the schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'UserName is required')
    .regex(emailRegex, 'Invalid email format'),

  password: z.string().min(1, 'Password is required'),
});
