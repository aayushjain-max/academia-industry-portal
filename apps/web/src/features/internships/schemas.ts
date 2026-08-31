import { z } from 'zod';

export const InternshipsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
