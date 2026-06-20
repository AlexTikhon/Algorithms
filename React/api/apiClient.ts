// api/apiClient.ts
import { useAuth } from '../auth/AuthContext';

export async function apiFetch(
  url: string,
  options: RequestInit = {},
  getTokens: () => { accessToken: string | null; refreshToken: string | null },
  saveTokens: (tokens: { accessToken: string; refreshToken: string }) => void
) {
  const { accessToken, refreshToken } = getTokens();

  const headers = new Headers(options.headers);
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);

  let res = await fetch(url, { ...options, headers });

  // If token expired → try refresh
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch('/api/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (refreshRes.ok) {
      const tokens = await refreshRes.json();
      saveTokens(tokens);

      headers.set('Authorization', `Bearer ${tokens.accessToken}`);
      res = await fetch(url, { ...options, headers });
    }
  }

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
