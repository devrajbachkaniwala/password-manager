'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from '@/hooks/useSession';
import { Spinner } from '@/components/Spinner';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !!data) {
      router.replace('/');
    }
  }, [router, isLoading, data]);

  if (!isLoading && !data) {
    return children;
  }

  return null;
}
