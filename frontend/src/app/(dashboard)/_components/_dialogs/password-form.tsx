'use client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  TCreatePasswordSchema,
  createPasswordSchema
} from './_schema/create-password';
import { forwardRef, useEffect, useState } from 'react';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { withAuth } from '@/lib/auth/withAuth';
import { useToast } from '@/components/ui/use-toast';
import { queryClient } from '@/app/_components/QueryProvider';
import { IPassword } from '@/services/password/interfaces/password';
import { cn } from '@/lib/utils';
import { getPassword } from '@/lib/password/getPassword';
import { Spinner } from '@/components/Spinner';

interface IPasswordFormDialogProps {
  defaultValue?: TCreatePasswordSchema & { id?: string };
  saveHandler?: (
    data: TCreatePasswordSchema,
    id?: string
  ) => Promise<IPassword>;
  dialogTriggerText?: string;
}

const defaultFormValue: TCreatePasswordSchema = {
  title: '',
  username: '',
  password: '',
  url: ''
};

const PasswordFormDialog = forwardRef<any, IPasswordFormDialogProps>(
  ({ defaultValue, saveHandler, dialogTriggerText }, ref) => {
    const [viewPassword, setViewPassword] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { toast } = useToast();

    const passwordMutation = useMutation({
      mutationFn: (data: TCreatePasswordSchema) =>
        withAuth(async () => {
          if (saveHandler) {
            if (defaultValue) {
              return saveHandler(data, defaultValue.id);
            } else {
              return saveHandler(data);
            }
          }
        }),
      onSuccess: (data) => {
        toast({
          title: `Password ${!!defaultValue ? 'saved' : 'created'} successfully`
        });
        queryClient.invalidateQueries({ queryKey: ['passwords'], exact: true });
        setDialogOpen(false);
      },
      onError: (err) => {
        toast({
          variant: 'destructive',
          title: `Failed to ${!!defaultValue ? 'save' : 'create'} a password`,
          description: err.message
        });
      }
    });

    const resolver = zodResolver(createPasswordSchema);
    const form = useForm<TCreatePasswordSchema>({
      resolver,
      defaultValues: !!defaultValue
        ? { ...defaultValue, url: defaultValue.url ?? '' }
        : defaultFormValue
    });

    const onSubmit: SubmitHandler<TCreatePasswordSchema> = (
      data: TCreatePasswordSchema
    ) => {
      passwordMutation.mutate(data);
    };

    const handleViewPassword = () => {
      setViewPassword((prev) => !prev);
    };

    const copyToClipboard = (value: string) => {
      navigator.clipboard.writeText(value);
      toast({
        title: 'Copied to clipboard'
      });
    };

    return (
      <Dialog
        open={dialogOpen}
        onOpenChange={(value) => {
          form.reset();
          setDialogOpen(value);
        }}
      >
        <DialogTrigger asChild>
          <Button type='button'>
            {!!defaultValue ? 'Edit' : 'Add'} {dialogTriggerText}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className='text-center'>
                  Add New Password
                </DialogTitle>
              </DialogHeader>
              <div>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='title'>Title</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          id='title'
                          placeholder='Title'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='username'>Username</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type='text'
                            id='username'
                            placeholder='Username'
                            className={cn(!!defaultValue && 'pr-10')}
                            {...field}
                          />
                          {!!defaultValue && (
                            <div className='absolute top-0 right-2 h-full flex items-center'>
                              <div
                                className='hover:cursor-pointer hover:text-primary/80'
                                onClick={() => copyToClipboard(field.value)}
                              >
                                <Copy />
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type={viewPassword ? 'text' : 'password'}
                            id='password'
                            placeholder='Password'
                            className={cn(
                              'pr-10',
                              !!defaultValue && 'pr-[4.5rem]'
                            )}
                            {...field}
                          />
                          <div className='absolute top-0 right-2 h-full flex items-center gap-2'>
                            {!!defaultValue && (
                              <div
                                className='hover:cursor-pointer hover:text-primary/80'
                                onClick={() => copyToClipboard(field.value)}
                              >
                                <Copy />
                              </div>
                            )}

                            <div
                              className='hover:cursor-pointer hover:text-primary/80'
                              onClick={handleViewPassword}
                            >
                              {viewPassword ? <EyeOff /> : <Eye />}
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='url'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='url'>URL</FormLabel>
                      <FormControl>
                        <Input
                          type='url'
                          id='url'
                          placeholder='URL'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className='mt-4'>
                <Button
                  type='submit'
                  className='w-28'
                  isLoading={passwordMutation.isPending}
                >
                  {!!defaultValue ? 'Save' : 'Add'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);
PasswordFormDialog.displayName = 'PasswordFormDialog';

export { PasswordFormDialog };
