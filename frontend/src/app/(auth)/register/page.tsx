'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  TRegisterUserSchema,
  registerUserSchema
} from './_schema/register-user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/auth/register';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const defaultRegisterFormValues: TRegisterUserSchema = {
  email: '',
  password: '',
  confirmPassword: ''
};

function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const registerUser = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: 'Registered successfully'
      });
      router.push('/');
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: err.message
      });
    }
  });

  const resolver = zodResolver(registerUserSchema);
  const form = useForm<TRegisterUserSchema>({
    resolver,
    defaultValues: defaultRegisterFormValues
  });

  const onSubmit: SubmitHandler<TRegisterUserSchema> = (
    data: TRegisterUserSchema
  ) => {
    registerUser.mutate(data);
  };

  return (
    <div className={'h-full flex justify-center items-center'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='w-[350px]'>
            <CardHeader>
              <CardTitle className={'text-center'}>Register</CardTitle>
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

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='confirmPassword'>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        id='confirmPassword'
                        placeholder='Confirm Password'
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
                isLoading={registerUser.isPending}
              >
                Register
              </Button>
              <div className='text-xs'>
                <Link href={'/login'}>Already have an account?</Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default RegisterPage;
