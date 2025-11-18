import { z } from 'zod';
import { signupSchema } from '@/features/auth/utils/validation';

export type FormValues = z.infer<typeof signupSchema>;

export enum EActivationStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
