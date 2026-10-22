// ../Schemas/ContactSchema.js
import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" }),
    
  lastName: z
    .string()
    .min(1, { message: "Last name is required" }),
    
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ pattern: z.regexes.html5Email, message: "Invalid email address." }),
    
  phone: z
    .string({ required_error: "Phone number is required" })
    .refine((val) => val && isValidPhoneNumber(val), {
      message: "Please enter a valid international phone number",
    }),
    
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});
