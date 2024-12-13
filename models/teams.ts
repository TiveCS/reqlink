import { z } from 'zod';

export const mutateTeamSchema = z.object({
  name: z
    .string()
    .min(1, 'Team name is required')
    .max(100, 'Team name max length is 100 characters'),
});

export const teamIdSchema = z.string().uuid('Invalid team ID');

export type MutateTeamDTO = z.infer<typeof mutateTeamSchema>;
