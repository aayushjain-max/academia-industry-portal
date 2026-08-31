import { z } from 'zod';

export const AiBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
