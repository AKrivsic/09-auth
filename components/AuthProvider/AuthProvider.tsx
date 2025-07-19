'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();
        if (!isAuthenticated) {
          if (isMounted) clearIsAuthenticated();
          return;
        }

        const user = await getMe();

        if (!user || !user.email) {
          if (isMounted) clearIsAuthenticated();
          return;
        }

        if (isMounted) setUser(user);
      } catch (error) {
        console.error('AuthProvider error:', error);
        if (isMounted) clearIsAuthenticated();
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
