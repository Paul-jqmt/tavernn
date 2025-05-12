import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address.'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Invalid password.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;