import { z } from 'zod';

export const PlacementsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
