import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(100, 'Project name max length is 100 characters'),
  description: z
    .string()
    .max(255, 'Project description max length is 255 characters'),
});

export type ProjectOverview = {
  id: string;
  name: string;
  updatedAt: Date;
  requirementSpecLeft: number;
  backlogLeft: number;
};

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;
