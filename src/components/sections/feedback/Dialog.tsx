import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import InputArea from '@/components/form/InputArea';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeModal } from '@/redux/features/sidebar/modalConfig';
import useUserSubmit from '@/hooks/useUserSubmit';

function Form({
  // id,
  className,
}: React.ComponentProps<'form'> & {
  // id?: string;
  className?: string;
}) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, onSubmit } = useUserSubmit();

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
          label="username"
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
          label="Feedback Content"
          name="feedback_content"
          type="text"
          defaultValue=""
          placeholder=""
          register={register}
          error={errors?.email}
        />
      </div>
      <div className="grid gap-2">
        <InputArea
          label="Sentiment"
          name="sentiment"
          type="text"
          defaultValue=""
          placeholder=""
          register={register}
          error={errors?.phone}
        />
      </div>

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

function FeedbackDialog() {
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
            Feedback
          </SheetTitle>
        </SheetHeader>
        <Form id={modalConfig.id || undefined} />
      </SheetContent>
    </Sheet>
  );
}

export default FeedbackDialog;
