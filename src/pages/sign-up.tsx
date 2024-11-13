import React from 'react';

// import SSOButtons from '@/components/customButtons/SSOButtons';
import TextButton from '@/components/customButtons/TextButton';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center p-6 ">
      <Card className="mx-auto h-full max-w-4xl flex-1 overflow-hidden rounded-lg  shadow-xl ">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className=" h-44 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="h-full w-full object-cover "
              src="/img/register.jpg"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center rounded-r-2xl  p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <CardHeader className="px-0">
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Sign up to create a new account
                </CardDescription>
              </CardHeader>

              <p className="mt-4 flex text-sm font-medium text-gray-600">
                Already have an account?
                <TextButton className="ml-1" href="/sign-in" text="Sign in" />
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
