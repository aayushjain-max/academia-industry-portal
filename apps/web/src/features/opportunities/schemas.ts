import { z } from 'zod';

export const OpportunitiesBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
