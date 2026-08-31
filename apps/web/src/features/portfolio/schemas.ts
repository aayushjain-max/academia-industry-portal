import { z } from 'zod';

export const PortfolioBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
