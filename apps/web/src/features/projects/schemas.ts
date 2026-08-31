import { z } from 'zod';

export const ProjectsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
