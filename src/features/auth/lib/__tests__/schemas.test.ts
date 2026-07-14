import { loginSchema, signupSchema } from '../schemas';

describe('loginSchema', () => {
  const VALID = { email: 'teacher@example.com', password: 'password123' };

  it('accepts valid email and password', () => {
    expect(loginSchema.safeParse(VALID).success).toBe(true);
  });

  it('accepts password of exactly 8 characters', () => {
    expect(loginSchema.safeParse({ ...VALID, password: 'exactly8' }).success).toBe(true);
  });

  it('rejects invalid email format', () => {
    const result = loginSchema.safeParse({ ...VALID, email: 'notanemail' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Please enter a valid email.');
  });

  it('rejects email with missing domain', () => {
    const result = loginSchema.safeParse({ ...VALID, email: 'user@' });
    expect(result.success).toBe(false);
  });

  it('rejects empty email', () => {
    const result = loginSchema.safeParse({ ...VALID, email: '' });
    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 8 characters', () => {
    const result = loginSchema.safeParse({ ...VALID, password: 'short' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Password must be at least 8 characters.');
  });

  it('rejects password of 7 characters', () => {
    const result = loginSchema.safeParse({ ...VALID, password: '1234567' });
    expect(result.success).toBe(false);
  });

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({ ...VALID, password: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing fields', () => {
    expect(loginSchema.safeParse({}).success).toBe(false);
  });
});

describe('signupSchema', () => {
  const VALID = {
    email: 'teacher@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    consentAccepted: true,
  };

  it('accepts valid registration data', () => {
    expect(signupSchema.safeParse(VALID).success).toBe(true);
  });

  it('accepts password of exactly 8 characters with match', () => {
    const data = { ...VALID, password: 'exactly8', confirmPassword: 'exactly8' };
    expect(signupSchema.safeParse(data).success).toBe(true);
  });

  it('rejects invalid email format', () => {
    const result = signupSchema.safeParse({ ...VALID, email: 'bademail' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Enter a valid email');
  });

  it('rejects password shorter than 8 characters', () => {
    const result = signupSchema.safeParse({
      ...VALID,
      password: 'short',
      confirmPassword: 'short',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Password must be at least 8 characters long');
  });

  it('rejects mismatched passwords', () => {
    const result = signupSchema.safeParse({ ...VALID, confirmPassword: 'different!' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Passwords do not match');
    expect(result.error?.issues[0].path).toContain('confirmPassword');
  });

  it('rejects empty confirmPassword', () => {
    const result = signupSchema.safeParse({ ...VALID, confirmPassword: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing all fields', () => {
    expect(signupSchema.safeParse({}).success).toBe(false);
  });

  it('rejects unchecked consent', () => {
    const result = signupSchema.safeParse({ ...VALID, consentAccepted: false });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain('consentAccepted');
  });

  it('rejects missing consent', () => {
    const withoutConsent: Partial<typeof VALID> = { ...VALID };
    delete withoutConsent.consentAccepted;
    expect(signupSchema.safeParse(withoutConsent).success).toBe(false);
  });
});
