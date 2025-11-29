import { z } from 'zod';
import { loginSchema, signupSchema } from '@/features/auth/utils/validation';

export type FormValues = z.infer<typeof signupSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;

export enum EActivationStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
