'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setIsLoading(false);
  }, [router]);

  return isLoading ? (
    <Loader />
  ) : (
    <>{children}</>
  );
};

export default AuthLayout;
