import { z } from 'zod';

export const AuthBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
