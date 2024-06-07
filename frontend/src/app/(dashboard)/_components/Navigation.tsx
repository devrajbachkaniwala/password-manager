'use client';

import { queryClient } from '@/app/_components/QueryProvider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from '@/hooks/useSession';
import { logout } from '@/lib/auth/logout';
import { withAuth } from '@/lib/auth/withAuth';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Navigation() {
  const router = useRouter();
  const { toast } = useToast();

  const logoutUser = useMutation({
    mutationFn: () => withAuth(() => logout()),
    onSuccess: (data) => {
      toast({ title: 'Successfully logged out' });
      queryClient.removeQueries();
      router.replace('/login');
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Failed to logout'
      });
      console.log(err);
    }
  });
  const { data } = useSession();

  const handleLogout = () => {
    logoutUser.mutate();
  };

  return (
    <ul className='py-2 container mx-auto flex justify-between items-center gap-2'>
      <li className='flex-1'>
        <Link href={'/'}>Password Manager</Link>
      </li>

      <li> {data?.email} </li>
      <li>
        <Button
          className='w-20'
          isLoading={logoutUser.isPending}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </li>
    </ul>
  );
}

export { Navigation };
