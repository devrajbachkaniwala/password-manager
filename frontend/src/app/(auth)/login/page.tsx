'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { TLoginUserSchema, loginUserSchema } from './_schema/login-user';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/auth/login';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/account/getProfile';
import { queryClient } from '@/app/_components/QueryProvider';

const defaultLoginFormValues: TLoginUserSchema = {
  email: '',
  password: ''
};

function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const loginUser = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      toast({
        variant: 'default',
        title: 'Login successful'
      });
      const profile = await getProfile();

      queryClient.setQueryData(['userProfile'], profile);

      router.replace('/');
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: err.message
      });
    }
  });
  const resolver = zodResolver(loginUserSchema);
  const form = useForm<TLoginUserSchema>({
    resolver,
    defaultValues: defaultLoginFormValues
  });

  const onSubmit: SubmitHandler<TLoginUserSchema> = (
    data: TLoginUserSchema
  ) => {
    loginUser.mutate(data);
  };

  return (
    <div className={'h-full flex justify-center items-center'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='w-[350px]'>
            <CardHeader>
              <CardTitle className={'text-center'}>Login</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        id='email'
                        placeholder='Email'
                        {...field}
                      />
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
                      <Input
                        type='password'
                        id='password'
                        placeholder='Password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
              <Button
                type='submit'
                className='w-28'
                isLoading={loginUser.isPending}
              >
                Login
              </Button>
              <div className='text-xs'>
                <Link href={'/register'}>{`Don't have an account?`}</Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
