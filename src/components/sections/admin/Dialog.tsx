/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

// import { Textarea } from '@/components/ui/textarea';
// import usePatient from '@/hooks/usePatient';
import InputArea from '@/components/form/InputArea';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeModal } from '@/redux/features/sidebar/modalConfig';
import useAdminSubmit from '@/hooks/useAdminSubmit';

function AdminDialog() {
  const modalConfig = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  return (
    <Sheet
      open={modalConfig.isAddOrUpdateModalOpen}
      onOpenChange={() => {
        dispatch(closeModal());
      }}
    >
      <SheetContent className="sm:max-w-[425px] ">
        <SheetHeader className="mb-4">
          <SheetTitle>
            {modalConfig.id ? 'Update ' : 'Add '}
            Admin
          </SheetTitle>
        </SheetHeader>
        <ProfileForm id={modalConfig.id as any} />
      </SheetContent>
    </Sheet>
  );
}

function ProfileForm({
  id,
  className,
}: React.ComponentProps<'form'> & {
  id?: number | null;
  className?: string;
}) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, onSubmit } = useAdminSubmit();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid items-start gap-4', className)}
    >
      {/* first name and last name in same grid */}
      <div className="grid gap-2">
        <InputArea
          label="Name"
          name="name"
          type="text"
          defaultValue=""
          placeholder="John"
          register={register}
          error={errors?.name}
        />
      </div>

      {/* <div className="grid gap-2">
        <InputArea
          label="UserName"
          name="username"
          type="text"
          defaultValue=""
          placeholder="New York"
          register={register}
          error={errors?.username}
        />
      </div> */}

      <div className="grid gap-2">
        <InputArea
          label="Email"
          name="email"
          type="email"
          defaultValue=""
          placeholder="example@mail.com"
          register={register}
          error={errors?.email}
        />
      </div>
      <div className="grid gap-2">
        <InputArea
          label="Mobile Number"
          name="phone"
          required={false}
          type="text"
          defaultValue=""
          placeholder="+1 (555) 123-4567"
          register={register}
          error={errors?.phone}
        />
      </div>

      {!id && (
        <div className="grid gap-2">
          <InputArea
            label="Password"
            name="password"
            type="password"
            defaultValue=""
            placeholder="********"
            register={register}
            error={errors?.password}
          />
        </div>
      )}

      <div className="flex w-full flex-col gap-2 md:flex-row">
        <Button
          variant="destructive"
          type="button"
          className="flex-1"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Cancel
        </Button>
        <Button className="flex-1" type="submit">
          Save{' '}
        </Button>
      </div>
    </form>
  );
}

export default AdminDialog;
