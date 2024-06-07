'use client';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { useEffect } from 'react';
import { Header } from './_components/Header';
import { Spinner } from '@/components/Spinner';

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !data) {
      router.replace('/login');
    }
  }, [router, isLoading, data]);

  if (!isLoading && !!data) {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return null;
}
