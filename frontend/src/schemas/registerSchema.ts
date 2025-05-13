import { z } from 'zod';

export const registerSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Please enter a valid email address'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z
        .string({ required_error: "Please confirm your password" })
        .min(8, 'Passwords must match'),
    terms: z
        .boolean()
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
