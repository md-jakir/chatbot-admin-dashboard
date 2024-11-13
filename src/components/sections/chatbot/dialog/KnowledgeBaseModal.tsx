import InputDropZone from '@/components/form/InputDropZone';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
// import Switch from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import useResponseHandler from '@/healpers/responseHelper';
// import { useUpdateKnowledgeBaseMutation } from '@/redux/features/chatbot/chatbot.api';
import {
  useDeleteknowledgeBaseMutation,
  // useUpdateKnowledgeBaseStatusMutation,
} from '@/redux/features/knowledgeBase/knowledgeBase.api';
import { IknowledgeBase } from '@/types/ApiDataTypes';
import React from 'react';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import { useGetKnowledgeBaseByChatbotIdQuery } from '@/redux/features/chatbot/chatbot.api';

type UploadedFile = File & { preview: string };

function KnowledgeBaseModal({
  chatbotId,
  isOpen,
  handleOpen,
}: {
  chatbotId: number | null;

  isOpen: boolean;
  handleOpen: (_chatbotId?: number) => void;
}) {
  const { data, isLoading, refetch } = useGetKnowledgeBaseByChatbotIdQuery<{
    data: IknowledgeBase[];
    isLoading: boolean;
  }>(chatbotId, {
    skip: !chatbotId && !isOpen,
  });

  const responsehandler = useResponseHandler();

  // const [updateKnowledgeBaseStatusMutation] =
  //   useUpdateKnowledgeBaseStatusMutation();
  const [deleteKnowledgeBase] = useDeleteknowledgeBaseMutation();

  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);

  const removeUploadedFile = (file: UploadedFile) => {
    setUploadedFiles((previousFiles) =>
      previousFiles.filter((item) => item !== file),
    );
    URL.revokeObjectURL(file.preview);
  };

  const removePreUploadedFile = async (file: IknowledgeBase) => {
    setLoading(true);
    await responsehandler(
      deleteKnowledgeBase({
        id: file?.id,
      }),
    );
    refetch();
    setLoading(false);
  };

  // const changeFileStatus = async (id: number, status: boolean) => {
  //   setLoading(true);
  //   await responsehandler(
  //     updateKnowledgeBaseStatusMutation({
  //       id,
  //       data: {
  //         active_status: status,
  //       },
  //     }),
  //   );
  //   refetch();
  //   setLoading(false);
  // };

  const addUploadedFiles = async (acceptedFiles: UploadedFile[]) => {
    try {
      setLoading(true);
      const formData = new FormData();
      await acceptedFiles.forEach((file) => {
        formData.append('files', file);
      });

      let tempProgress = 0;

      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatbot/${chatbotId}/knowledge_base`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer `,
          },
          onUploadProgress: (progressEvent) => {
            // Calculate the percentage of the upload
            if (progressEvent && progressEvent.total) {
              tempProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
            } else {
              tempProgress = 0; // or any default value you want
            }

            if (tempProgress > 0 && tempProgress <= 100)
              setProgress(tempProgress);
          },
        },
      );

      setProgress(101);
      refetch();
      setLoading(false);
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          e?.error?.data?.message || e?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        handleOpen();
      }}
    >
      <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-[625px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Knowledge Base</DialogTitle>
          <DialogDescription>Manage Knowledge Base from here</DialogDescription>
          <hr
            style={{
              marginTop: '0.5rem',
            }}
          />
        </DialogHeader>

        <div className="flex-1 flex-wrap">
          {progress > 0 && progress < 100 && (
            <div className="flex items-center justify-center gap-2">
              <Progress value={progress} className="w-full" />
              <span>{progress}%</span>
            </div>
          )}
          <InputDropZone
            loading={loading}
            isPreFiles={data?.length > 0}
            label="Upload File"
            uploadedFiles={uploadedFiles}
            onDrop={addUploadedFiles}
            onRemove={removeUploadedFile}
          />
          {isLoading ? (
            <div>Loading... </div>
          ) : (
            data &&
            data.length > 0 && (
              <ul className=" max-h-[300px] overflow-auto pr-2">
                {data.map((file: IknowledgeBase) => (
                  <li
                    key={file?.id}
                    className="mt-2 flex items-center justify-between gap-2 rounded-lg border p-2 "
                  >
                    <div>
                      <p
                        style={{
                          wordBreak: 'break-word',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          // maxWidth: '150px', // Adjust the width as needed
                        }}
                        className="break-words px-1 text-sm font-medium text-neutral-500"
                      >
                        {file?.path}
                      </p>
                    </div>
                    <div className=" flex items-center gap-1">
                      <Button
                        disabled={loading}
                        type="button"
                        variant="ghost"
                        className=" mt-1 h-8 px-3 text-xs uppercase tracking-wider text-muted-foreground"
                        onClick={() => {
                          removePreUploadedFile(file);
                        }}
                      >
                        x
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
        {/* <DialogFooter>
          <Button
            variant="outline"
            className=" bg-red-500 text-gray-50 hover:bg-red-600 hover:text-gray-50"
            onClick={() => {
              handleOpen();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={submitKnowledgeBase}
            // disabled={uploadedFiles.length === 0}
          >
            Save
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default KnowledgeBaseModal;
