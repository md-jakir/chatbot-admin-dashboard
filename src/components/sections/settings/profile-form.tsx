// import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import useResponseHandler from '@/healpers/responseHelper';
import { useUpdateAdminMutation } from '@/redux/features/admin/admin.api';

import { useEffect } from 'react';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  // email: z
  //   .string({
  //     required_error: 'Email must not be empty.',
  //   })
  //   .email(),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({
  profile,
  refetch,
}: {
  profile: any;
  refetch: any;
}) {
  const responseHandler = useResponseHandler();
  const [updateAdmin] = useUpdateAdminMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile?.data?.name,
      phone: profile?.data?.phone,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (profile && profile?.data) {
      form.setValue('name', profile?.data?.name || null);
      form.setValue('phone', profile?.data?.phone || null);
    }
  }, [form, profile]);

  // const { fields, append } = useFieldArray({
  //   name: 'urls',
  //   control: form.control,
  // });

  async function onSubmit(data: ProfileFormValues) {
    await responseHandler(
      updateAdmin({
        id: profile?.data?.id as number,
        data: {
          name: data.name,
          phone: data.phone,
        },
        token: '',
      }),
      'Admin updated successfully',
    );

    refetch();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input
                  // defaultValue={session?.user?.name}
                  placeholder="siam"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="siam@example.com" {...field} />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your{' '}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  // defaultValue={session?.user?.phone}
                  type="tel"
                  placeholder="017xxxxxxxx"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can add a phone number to enable two-factor authentication.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <div>
          {fields.map((fieldValue, index) => (
            <FormField
              control={form.control}
              key={fieldValue.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: '' })}
          >
            Add URL
          </Button>
        </div> */}
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
