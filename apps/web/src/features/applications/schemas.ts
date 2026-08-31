import { z } from 'zod';

export const ApplicationsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
