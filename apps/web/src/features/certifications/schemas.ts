import { z } from 'zod';

export const CertificationsBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
