import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import React from 'react';

import SelectUser from '@/components/form/SelectUser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeModal } from '@/redux/features/sidebar/modalConfig';
import useUserChatbot from '@/hooks/useUserChatbot';
import SelectModel from '@/components/form/SelectModel';
import { cn } from '@/lib/utils';

function Form({
  chatbotId,
  className,
}: {
  chatbotId: number | null;
  className?: string;
}) {
  const dispatch = useDispatch();

  const {
    selectInputRef,
    register,
    handleSubmit,
    errors,
    onSubmit,
    assignUserHandler,
  } = useUserChatbot(chatbotId);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('relative h-full', className)}
    >
      <div className="grid max-h-[100vh-500px] items-start gap-4">
        <div className="grid gap-2">
          <SelectUser
            chatbotId={chatbotId}
            labelShow
            ref={selectInputRef}
            className="flex-1"
            label="Select User"
            name="user"
            handleSets={assignUserHandler}
          />
        </div>

        <div className="grid gap-2">
          <SelectModel
            labelShow
            label="Model"
            name="model_id"
            defaultValue="0"
            placeholder="Open AI"
            register={register}
            error={errors?.model_id}
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          variant="destructive"
          type="button"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>

      {/* <div className=" absolute bottom-10 flex w-full flex-col gap-2 md:flex-row">
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
        <Button disabled={loading} className="flex-1" type="submit">
          Save{' '}
        </Button>
      </div> */}
    </form>
  );
}

function UserAssignModal({ chatbotId }: { chatbotId: number | null }) {
  const modalConfig = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={modalConfig.isAddOrUpdateModalOpen}
      onOpenChange={() => {
        dispatch(closeModal());
      }}
    >
      <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-[525px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Assigned User</DialogTitle>
          <DialogDescription>Manage Assigned User from here</DialogDescription>
          <hr
            style={{
              marginTop: '0.5rem',
            }}
          />
        </DialogHeader>
        <Form chatbotId={chatbotId} />
      </DialogContent>
    </Dialog>
  );
}

export default UserAssignModal;
