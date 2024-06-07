'use client';

import { IPassword } from '@/services/password/interfaces/password';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { PasswordFormDialog } from '../../_dialogs/password-form';
import { TUpdatePasswordSchema } from '../../_dialogs/_schema/update-password';
import { updatePassword } from '@/lib/password/updatePassword';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { withAuth } from '@/lib/auth/withAuth';
import { removePassword } from '@/lib/password/removePassword';
import { queryClient } from '@/app/_components/QueryProvider';
import { useToast } from '@/components/ui/use-toast';
import { getPassword } from '@/lib/password/getPassword';
import { Spinner } from '@/components/Spinner';

export const columns: ColumnDef<IPassword>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'username',
    header: 'Username'
  },
  {
    header: 'Password',
    cell: ({ row }) => {
      const password = row.original;
      let passwordMask = '';
      for (let i = 0; i < 10; i++) {
        passwordMask += '#';
      }

      return passwordMask;
    }
  },
  {
    accessorKey: 'url',
    header: 'URL',
    cell: ({ row }) => {
      return row.original.url?.length ? row.original.url : '-';
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const password = row.original;
      return new Date(password.createdAt).toLocaleDateString();
    }
  },
  {
    accessorKey: 'modifiedAt',
    header: 'Modified At',
    cell: ({ row }) => {
      const password = row.original;
      return new Date(password.modifiedAt).toLocaleDateString();
    }
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const password = row.original;
      return <DataTableActions password={password} />;
    }
  }
];

interface IDataTableActionsProps {
  password: IPassword;
}

function DataTableActions({ password }: IDataTableActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { toast } = useToast();

  const { data: passwordData, isFetching } = useQuery({
    queryKey: ['passwords', password.id],
    queryFn: ({ queryKey }) =>
      withAuth(() => getPassword(queryKey[1] ?? '', true)),
    enabled: dropdownOpen
  });

  const rmPasswordMutation = useMutation({
    mutationFn: () => withAuth(() => removePassword(password.id)),
    onSuccess: (data) => {
      toast({
        title: 'Password removed successfully'
      });
      queryClient.invalidateQueries({
        queryKey: ['passwords'],
        exact: true
      });
      setDropdownOpen(false);
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Failed to remove password',
        description: err.message
      });
    }
  });

  const handleSavePassword = (data: TUpdatePasswordSchema, id?: string) => {
    setDropdownOpen(false);
    return updatePassword(id ?? '', data);
  };

  const handleRmPassword = () => {
    rmPasswordMutation.mutate();
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: 'Copied to clipboard'
    });
  };

  return (
    <DropdownMenu
      open={dropdownOpen}
      onOpenChange={(value) => setDropdownOpen(value)}
    >
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='flex flex-col gap-1'>
        {isFetching ? (
          <Spinner />
        ) : (
          <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => copyToClipboard(passwordData?.password ?? '')}
              className='hover:cursor-pointer'
            >
              Copy password
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Button className='w-full hover:cursor-pointer' asChild>
                <PasswordFormDialog
                  defaultValue={passwordData ?? undefined}
                  saveHandler={handleSavePassword}
                />
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem className='p-0' asChild>
              <div>
                <Button
                  variant='destructive'
                  className='w-full hover:cursor-pointer'
                  isLoading={rmPasswordMutation.isPending}
                  onClick={handleRmPassword}
                >
                  Delete
                </Button>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
