import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  EIncludeOpts,
  TGeneratePasswordSchema
} from './_schema/generate-password';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { useState } from 'react';
import { generatePassword } from '@/lib/password/generate-password';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const items: Array<{ id: z.infer<typeof EIncludeOpts>; label: string }> = [
  EIncludeOpts.Values.digits,
  EIncludeOpts.Values.lowerCase,
  EIncludeOpts.Values.specialChar,
  EIncludeOpts.Values.upperCase
].map((item) => ({
  id: item,
  label: item
}));

const defaultFormValue: TGeneratePasswordSchema = {
  passwordLen: 8,
  digits: true,
  lowerCase: true,
  upperCase: true,
  specialChar: true
};

function GeneratePasswordDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [genPassword, setGenPassword] = useState('');
  const { toast } = useToast();

  const form = useForm<TGeneratePasswordSchema>({
    defaultValues: defaultFormValue
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const pass = await generatePassword(data);
    setGenPassword(pass.password);
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
        setGenPassword('');
        setDialogOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button>Generate Password</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className='text-center'>
                Generate Password
              </DialogTitle>
            </DialogHeader>

            <div>
              <div className='py-4 flex gap-2 items-center'>
                <div className='relative flex-1'>
                  <Input
                    type='text'
                    defaultValue={genPassword}
                    className={cn(
                      'disabled:cursor-default disabled:opacity-100',
                      !!genPassword && 'pr-10'
                    )}
                    disabled
                  />
                  {!!genPassword && (
                    <div className='absolute top-0 right-2 h-full flex items-center'>
                      <div
                        className='hover:cursor-pointer hover:text-primary/80'
                        onClick={() => copyToClipboard(genPassword)}
                      >
                        <Copy />
                      </div>
                    </div>
                  )}
                </div>
                <Button type='submit'>Generate</Button>
              </div>

              <FormField
                control={form.control}
                name='passwordLen'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='passwordLen'>
                      Password Length: {field.value}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='range'
                        id='passwordLen'
                        placeholder='Password Length'
                        max={20}
                        min={8}
                        step={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={item.id}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            id={item.id}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor={item.id}
                          className='text-sm font-normal'
                        >
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { GeneratePasswordDialog };
