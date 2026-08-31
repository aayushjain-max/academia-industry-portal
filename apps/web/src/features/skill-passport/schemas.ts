import { z } from 'zod';

export const SkillpassportBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
