import { z } from 'zod';

export const InstitutionsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
