import { z } from 'zod';

export const AnalyticsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
