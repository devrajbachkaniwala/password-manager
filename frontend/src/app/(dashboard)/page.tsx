'use client';

import { useSession } from '@/hooks/useSession';
import { PasswordFormDialog } from './_components/_dialogs/password-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { withAuth } from '@/lib/auth/withAuth';
import { getPasswords } from '@/lib/password/getPasswords';
import { Spinner } from '@/components/Spinner';
import { DataTable } from './_components/_data-table/password/data-table';
import { columns } from './_components/_data-table/password/columns';
import { TCreatePasswordSchema } from './_components/_dialogs/_schema/create-password';
import { createPassword } from '@/lib/password/createPassword';
import { queryClient } from '../_components/QueryProvider';
import { useToast } from '@/components/ui/use-toast';
import { GeneratePasswordDialog } from './_components/_dialogs/generate-password';

export default function Home() {
  // const { data } = useSession();
  const { data: passwords, isLoading } = useQuery({
    queryKey: ['passwords'],
    queryFn: () => withAuth(() => getPasswords()),
    refetchOnWindowFocus: false
  });

  const handleAddPassword = (data: TCreatePasswordSchema) => {
    return createPassword(data);
  };

  return (
    <main className='py-4 container mx-auto'>
      <div className='flex justify-end gap-2 mb-4'>
        <GeneratePasswordDialog />

        <PasswordFormDialog
          dialogTriggerText='Password'
          saveHandler={handleAddPassword}
        />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        passwords && <DataTable columns={columns} data={passwords} />
      )}
    </main>
  );
}
