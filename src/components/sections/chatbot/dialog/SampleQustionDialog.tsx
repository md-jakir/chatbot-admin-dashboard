/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// // import { closeModal } from '@/redux/features/sidebar/modalConfig';
// import useResponseHandler from '@/healpers/responseHelper';
// import { useDeleteChatbotMutation } from '@/redux/features/chatbot/chatbot.api';
import { SampleQustion } from '@/types/ApiDataTypes';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useGetSampleQustionByChatbotIdQuery } from '@/redux/features/chatbot/chatbot.api';
import useResponseHandler from '@/healpers/responseHelper';
import {
  useAddNewSampleQustionMutation,
  useDeleteSampleQustionMutation,
  useUpdateSampleQustionMutation,
} from '@/redux/features/sampleQustion/sampleQustion.api';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

// type SampleQuestion = {
//   chatbot_id: number;
//   created_at: string;
//   id: number;
//   text: string;
//   updated_at: string;
// };

function DeleteDialog({
  qustionId,
  open,
  onOpenChange,
  refetch,
  loading,
  setLoading,
}: {
  qustionId: number | null;
  open: boolean;
  onOpenChange: () => void;
  refetch: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const responseHandler = useResponseHandler();
  const [deleteSampleQustion] = useDeleteSampleQustionMutation();

  const deleteSampleQustionHandler = async () => {
    setLoading(true);
    await responseHandler(
      deleteSampleQustion({
        id: qustionId,
      }),
    );
    refetch();
    onOpenChange();
    setLoading(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={() => {
          onOpenChange();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mb-4">
            <DialogTitle>Delete Chatbot</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Qustion?
            </DialogDescription>
          </DialogHeader>
          <div className=" flex justify-end gap-2">
            <Button
              variant="outline"
              className=" w-20"
              onClick={() => {
                onOpenChange();
              }}
            >
              Cancel
            </Button>
            <Button
              className=" w-20 bg-red-500 hover:bg-red-600"
              disabled={loading}
              onClick={() => {
                deleteSampleQustionHandler();
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SampleQustionDialog({
  chatbotId,
  viewSampleQustion,
  handleViewSampleQustion,
}: {
  chatbotId: number | null;
  viewSampleQustion: boolean;
  handleViewSampleQustion: () => void;
}) {
  const { data, isLoading, refetch } = useGetSampleQustionByChatbotIdQuery<{
    data: SampleQustion[];
    isLoading: boolean;
  }>(chatbotId, {
    skip: !chatbotId || !viewSampleQustion,
  });

  const responseHandler = useResponseHandler();
  const [addSampleQustion] = useAddNewSampleQustionMutation();
  const [updateSampleQustion] = useUpdateSampleQustionMutation();

  const [loading, setLoading] = React.useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [qustionId, setQustionId] = React.useState<number | null>(null);
  const [isAddQusPortalOpen, setIsAddQusPortalOpen] = React.useState(false);
  const [text, setText] = React.useState('');

  const addSampleQustionHandler = async () => {
    if (text === '') {
      toast({
        description: 'Please enter Qustion',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    if (qustionId) {
      await responseHandler(
        updateSampleQustion({
          id: qustionId,
          data: {
            chatbot_id: chatbotId,
            text,
          },
        }),
      );
    } else {
      await responseHandler(
        addSampleQustion({
          data: {
            chatbot_id: chatbotId,
            text,
          },
        }),
      );
    }
    refetch();
    setText('');
    setIsAddQusPortalOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <DeleteDialog
        loading={loading}
        setLoading={setLoading}
        open={isDeleteDialogOpen}
        onOpenChange={() => {
          setQustionId(null);
          setIsDeleteDialogOpen(false);
        }}
        qustionId={qustionId}
        refetch={refetch}
      />
      <Dialog
        open={viewSampleQustion}
        onOpenChange={() => {
          handleViewSampleQustion();
        }}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader className="mb-4">
            <DialogTitle>Qustion List</DialogTitle>
            <div className=" flex justify-between">
              <DialogDescription>Qustion List of Chatbot</DialogDescription>
              {isAddQusPortalOpen ? (
                <span />
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddQusPortalOpen(true);
                  }}
                >
                  Add Qustion
                </Button>
              )}
            </div>
            {isAddQusPortalOpen && (
              <div>
                <Textarea
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  value={text}
                  placeholder="Enter Qustion"
                  className="w-full"
                />
                <div className="mt-2 flex w-full gap-2">
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => {
                      setText('');
                      setQustionId(null);
                      setIsAddQusPortalOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={loading}
                    className="flex-1"
                    onClick={() => {
                      addSampleQustionHandler();
                    }}
                  >
                    {qustionId ? 'Update' : 'Add'} Qustion
                  </Button>
                </div>
              </div>
            )}
            <div className="max-h-[350px] overflow-auto pr-2">
              {isLoading ? (
                <div>Loading...</div>
              ) : data && data.length === 0 ? (
                <div>
                  <h2
                    className="
                   rounded-md px-2 pt-4 text-muted-foreground
                  "
                  >
                    No Qustion Found
                  </h2>
                </div>
              ) : (
                data?.map((qustion: SampleQustion) => (
                  <div
                    className="mt-2 flex w-full items-center justify-between gap-2 rounded border pl-2"
                    key={qustion.id}
                  >
                    <p className=" text-muted-foreground">{qustion.text}</p>
                    <div className=" mr-2 flex text-end">
                      <Button
                        variant="ghost"
                        className="px-1"
                        disabled={loading}
                        onClick={() => {
                          setText(qustion.text);
                          setQustionId(qustion?.id);
                          setIsAddQusPortalOpen(true);
                        }}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        className="px-1"
                        variant="ghost"
                        disabled={loading}
                        onClick={() => {
                          setQustionId(qustion?.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DialogHeader>
          <div className=" flex justify-end ">
            <Button
              variant="outline"
              className=" w-40"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                handleViewSampleQustion();
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SampleQustionDialog;
