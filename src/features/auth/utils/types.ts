import { z } from 'zod';
import { signupSchema } from '@/features/auth/utils/validation';

export type FormValues = z.infer<typeof signupSchema>;
