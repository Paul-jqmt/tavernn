import {z} from "zod";

export const createTeamSchema = z.object({
    teamName: z
        .string()
        .min(5, "Team Name must be at least 5 characters.")
        .max(30, "Team Name cannot exceed 20 characters."),
    gameId: z
        .string()
        .min(1, "Please choose a game."),
    description: z
        .string()
        .max(200, "Description cannot exceed 200 characters.")
        .optional(),
    admissionType: z
        .enum(["open", "closed", "invite_only"], {
        required_error: "Admission Type is required.",
    }),
    becomeCaptain: z
        .boolean(),
    captainId: z
        .string()
        .optional(),
}).refine(
    (data) => {
        // IF becomeCaptain IS FALSE, captainId MUST NOT BE EMPTY
        if (data.becomeCaptain && !data.captainId) return false
        return true
    },
    {
        path: ["captainId"],
        message: "Select a Team Captain if you do not want to become captain.",
});

export type CreateTeamValues = z.infer<typeof createTeamSchema>;