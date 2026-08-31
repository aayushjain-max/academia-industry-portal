import { z } from 'zod';

export const CareerBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
