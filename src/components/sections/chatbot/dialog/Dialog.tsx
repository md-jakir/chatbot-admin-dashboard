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
import InputDropZone from '@/components/form/InputDropZone';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeModal } from '@/redux/features/sidebar/modalConfig';
import useChatbotSubmit from '@/hooks/useChatbotSubmit';
import { Progress } from '@/components/ui/progress';

function ChatbotForm({ className }: { className?: string }) {
  const modalConfig = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    progress,
    uploadedFiles,
    addUploadedFiles,
    removeUploadedFile,
  } = useChatbotSubmit();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('relative mx-5 h-full overflow-hidden ', className)}
    >
      <div className="mb-4 flex items-center justify-center gap-2">
        {progress > 0 && progress < 101 && (
          <>
            <Progress value={progress} className="w-full" />
            <span>{progress}%</span>{' '}
          </>
        )}
      </div>
      {/* )} */}
      <div className="grid max-h-[100vh-500px] items-start gap-4 px-1">
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

        <div className="grid gap-2">
          <InputArea
            label="Greetings message"
            name="gretting_message"
            type="text"
            defaultValue=""
            placeholder="Welcome John"
            register={register}
            error={errors?.gretting_message}
          />
        </div>
        {!modalConfig?.id && (
          <div className="grid  gap-2">
            <InputDropZone
              label="Upload File"
              uploadedFiles={uploadedFiles}
              onDrop={addUploadedFiles}
              onRemove={removeUploadedFile}
            />
          </div>
        )}
      </div>

      <div className=" absolute bottom-20 flex w-full flex-col gap-2  md:flex-row">
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
      </div>
    </form>
  );
}

function ChatbotDialog() {
  const modalConfig = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  return (
    <Sheet
      open={modalConfig.isAddOrUpdateModalOpen}
      onOpenChange={() => {
        dispatch(closeModal());
      }}
    >
      <SheetContent className="p-0 sm:max-w-[425px]">
        <SheetHeader className="m-4">
          <SheetTitle>
            {modalConfig.id ? 'Update ' : 'Add '}
            Chatbot
          </SheetTitle>
        </SheetHeader>
        <ChatbotForm />
      </SheetContent>
    </Sheet>
  );
}

export default ChatbotDialog;
