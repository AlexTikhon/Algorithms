// auth/useFetchUser.ts
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { apiFetch } from '../api/apiClient';

export function useFetchUser() {
  const { user, accessToken, refreshToken, loading, logout } = useAuth();

  useEffect(() => {
    if (user || loading) return;

    apiFetch(
      '/api/me',
      {},
      () => ({ accessToken, refreshToken }),
      tokens => {
        localStorage.setItem('session', JSON.stringify({ user, ...tokens }));
      }
    )
      .then(data => {
        // update user in context
      })
      .catch(() => logout());
  }, [user, loading, accessToken, refreshToken, logout]);
}
