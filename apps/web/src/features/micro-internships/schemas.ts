import { z } from 'zod';

export const MicrointernshipsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
