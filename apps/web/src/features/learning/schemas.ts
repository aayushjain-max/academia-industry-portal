import { z } from 'zod';

export const LearningBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
