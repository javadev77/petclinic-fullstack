import router from '@/router'

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const API_BASE_URL = '/api';

export async function http<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = token;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = await response.text();

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('authToken');
      router.push('/login');
    }

    throw new ApiError(response.status, message || response.statusText);
  }

  return response.json() as Promise<T>;
}
