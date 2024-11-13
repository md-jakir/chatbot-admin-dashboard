import { Go, LockIcon } from '@/assets/icons';
import TextButton from '@/components/customButtons/TextButton';
import InputArea from '@/components/form/InputArea';
import { Button } from '@/components/ui/button';
import useLoginSubmit from '@/hooks/useLoginSubmit';
import React from 'react';

export default function Resetpassword() {
  const { register, handleSubmit, errors, submitResetPassword } =
    useLoginSubmit();

  return (
    <div className=" relative h-screen w-screen bg-background">
      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className=" max-w-[400px] ">
          <div>
            <div>
              <LockIcon className=" mx-auto h-20 w-20" />
            </div>
            <h3 className=" mt-4 text-center text-3xl font-bold text-slate-800/90 dark:text-slate-50/90">
              Reset your password
            </h3>
            <p className=" mt-2 text-center text-sm text-slate-800/70 dark:text-slate-200/70">
              Please enter your new password. Make sure password and confirm
              password are same.
            </p>
          </div>
          <form className=" mt-14" onSubmit={handleSubmit(submitResetPassword)}>
            <InputArea
              label="password"
              labelShow={false}
              name="password"
              type="password"
              placeholder="Password"
              required
              className="h-14"
              register={register}
              error={errors?.password}
            />
            <InputArea
              label="Confirm password"
              labelShow={false}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              className="h-14"
              register={register}
              error={errors?.confirmPassword}
            />
            <Button
              type="submit"
              color="dark"
              className="mt-4 w-full"
              onClick={() => {}}
            >
              Reset password
            </Button>
          </form>

          <div className="mt-4 flex justify-center">
            <TextButton
              icon={<Go className="rotate-180 hover:fill-indigo-500" />}
              className="group text-slate-800/90 hover:fill-indigo-500 hover:text-indigo-500"
              text="Return to sign in"
              href="/sign-in"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
