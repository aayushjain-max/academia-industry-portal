import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email('Please enter a valid academic/work email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  role: z.enum(['STUDENT', 'INDUSTRY', 'INSTITUTION_ADMIN', 'ACADEMICIAN'], {
    errorMap: () => ({ message: 'Please select a valid user role' }),
  }),
  institution_name: z.string().optional(),
  degree: z.string().optional(),
  department: z.string().optional(),
  company_name: z.string().optional(),
  designation: z.string().optional(),
  phone: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const OnboardingSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  institution_name: z.string().optional(),
  degree: z.string().optional(),
  department: z.string().optional(),
  year_of_study: z.number().min(1).max(5).optional(),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
  company_name: z.string().optional(),
  industry_sector: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

export type OnboardingFormData = z.infer<typeof OnboardingSchema>;
