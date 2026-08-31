import { z } from 'zod';

export const IndustryBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
