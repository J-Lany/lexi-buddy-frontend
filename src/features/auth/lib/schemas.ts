import { z } from 'zod';

// Keep in sync with the backend's expected consent version for teacher registration.
export const TEACHER_CONSENT_VERSION = 1;

export const signupSchema = z
  .object({
    email: z.email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
    consentAccepted: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.consentAccepted === true, {
    // Not rendered directly — the UI shows the localized
    // auth.signUp.consentError message via useI18n() instead.
    message: 'Consent required',
    path: ['consentAccepted'],
  });

export const loginSchema = z.object({
  email: z.email('Please enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signupSchema>;
export type SignInFormValues = z.infer<typeof loginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
