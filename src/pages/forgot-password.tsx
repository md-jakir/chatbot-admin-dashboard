import { Go, LockIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import TextButton from '@/components/customButtons/TextButton';
import InputArea from '@/components/form/InputArea';
import React from 'react';
import useLoginSubmit from '@/hooks/useLoginSubmit';

export default function ForgotPassword() {
  const { register, handleSubmit, errors, submitForgotPassword } =
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
              Forgot your password?
            </h3>
            <p className=" mt-2 text-center text-sm text-slate-800/70 dark:text-slate-200/70">
              Please enter the email address associated with your account and We
              will email you a link to reset your password.
            </p>
          </div>
          <form className=" mt-14" onSubmit={handleSubmit(submitForgotPassword)}>
            <InputArea
              label="Email"
              labelShow={false}
              name="email"
              type="email"
              placeholder="Wayne@example.com"
              required
              className="h-14"
              register={register}
              error={errors?.email}
            />
            <Button
              type="submit"
              color="dark"
              className="mt-4 w-full"
              onClick={() => {}}
            >
              Send Reset Link
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
