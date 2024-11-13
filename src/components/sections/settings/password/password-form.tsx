import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import InputArea from '@/components/form/InputArea';
import { toast } from '@/components/ui/use-toast';
import useResponseHandler from '@/healpers/responseHelper';
import { useUpdatePasswordAdminMutation } from '@/redux/features/admin/admin.api';

export default function UpdatePasswordForm() {
  const {
    data: user,
  }: {
    data: any;
  } = useSession();
  const responseHandler = useResponseHandler();
  const [updatePasswordAdmin] = useUpdatePasswordAdminMutation();

  const userId: number = user?.user?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
      oldPassword: '',
    },
  });

  const onsubmit = async ({
    oldPassword,
    password,
    confirmPassword,
  }: {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Password and confirm password does not match',
      });
    }

    if (userId) {
      await responseHandler(
        updatePasswordAdmin({
          id: userId,
          data: {
            password: oldPassword,
            new_password: password,
            confirm_password: confirmPassword,
          },
          token: '',
        }),
        'Password updated successfully',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="space-y-8">
      <div className="grid gap-2">
        <InputArea
          label="Old Password"
          name="oldPassword"
          type="password"
          placeholder="********"
          register={register}
          error={errors?.oldPassword}
        />
      </div>

      <div className="grid gap-2">
        <InputArea
          register={register}
          label="New Password"
          name="password"
          type="password"
          placeholder="********"
          error={errors?.password}
        />
      </div>
      <div className="grid gap-2">
        <InputArea
          register={register}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="*******"
          error={errors?.confirmPassword}
        />
      </div>
      <Button type="submit">Update Password</Button>
    </form>
  );
}
