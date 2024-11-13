'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { toast } from '@/components/ui/use-toast';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

const FormSchema = z.object({
  otp: z.string().min(4, {
    message: 'Your one-time password must be 4 characters.',
  }),
});

export default function InputOTPForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    form.reset();
  }

  return (
    <div className="flex min-h-screen items-center  p-6 ">
      <Card className="relative mx-auto h-full max-w-xl flex-1 overflow-hidden rounded-lg shadow-xl ">
        <Button
          onClick={() => {
            form.reset();
            router.back();
          }}
          type="button"
          className="p-6 px-10 pb-0 text-blue-500 hover:text-blue-600 hover:underline"
          variant="ghost"
        >
          <ChevronLeftIcon /> Back
        </Button>
        <div className="flex items-center justify-center rounded-l-2xl p-12 pt-4">
          <div className="w-full text-center">
            <CardHeader className="p-0">
              <CardTitle>Verify OTP</CardTitle>
              <CardDescription>
                Please enter the OTP sent to your registered email address
              </CardDescription>
            </CardHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto space-y-3"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center">
                      <FormControl>
                        <InputOTP maxLength={4} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className=" w-[calc(100%-3rem)]" type="submit">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    form.reset();
                    router.push('/sign-in');
                  }}
                  type="button"
                  className="w-full text-blue-500 hover:text-blue-600 hover:underline"
                  variant="ghost"
                >
                  Back to login?
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
}
