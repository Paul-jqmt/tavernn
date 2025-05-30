import { z } from "zod";

export const createClubSchema = z.object({
    logo: z
        .any()
        .optional()
        .transform((files) => (files?.length ? files[0] : null)),
    name: z
        .string()
        .min(5, { message: 'Name must be at least 5 characters long' })
        .max(20, { message: 'Maximum 20 characters long' }),
    type: z
        .enum(['open', 'closed', 'invite_only']),
    description: z
        .string()
        .optional(),
});

export type CreateClubValues = z.infer<typeof createClubSchema>;