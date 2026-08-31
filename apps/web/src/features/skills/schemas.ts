import { z } from 'zod';

export const SkillsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
