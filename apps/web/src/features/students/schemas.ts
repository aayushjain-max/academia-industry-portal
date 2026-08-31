import { z } from 'zod';

export const StudentsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
