const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export async function registerUser(email: string, password: string): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Failed to register user');
  }

  return { success: true, data, message: 'Registration successful' };
}

export async function activateUser(token: string): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_URL}/auth/activate?token=${token}`, {
    method: 'GET',
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Failed to activate account');
  }

  return { success: true, data, message: 'Account activated successfully' };
}
