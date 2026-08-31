import { z } from 'zod';

export const MentorshipBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
