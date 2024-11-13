import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { SampleQustion } from '@/types/ApiDataTypes';

import {
  useGetPromptByChatbotIdQuery,
  useUpdatePromptMutation,
} from '@/redux/features/chatbot/chatbot.api';
import useResponseHandler from '@/healpers/responseHelper';

import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

// type SampleQuestion = {
//   chatbot_id: number;
//   created_at: string;
//   id: number;
//   text: string;
//   updated_at: string;
// };

function PromptDialog({
  chatbotId,
  isPromptDialogOpen,
  handlePromptDialog,
}: {
  chatbotId: number | null;
  isPromptDialogOpen: boolean;
  handlePromptDialog: () => void;
}) {
  const { data, refetch }: any = useGetPromptByChatbotIdQuery<{
    data: SampleQustion[];
    isLoading: boolean;
  }>(chatbotId, {
    skip: !chatbotId || !isPromptDialogOpen,
  });

  const responseHandler = useResponseHandler();

  const [updatePrompt] = useUpdatePromptMutation();

  const [loading, setLoading] = React.useState(false);

  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (data) {
      setText(data?.prompt_text);
    }
  }, [data]);

  const updatePromptHandler = async () => {
    if (text === '') {
      toast({
        description: 'Please enter Qustion',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    await responseHandler(
      updatePrompt({
        id: chatbotId,
        data: {
          prompt: text,
        },
      }),
    );
    refetch();
    setText('');
    handlePromptDialog();
    setLoading(false);
  };
  return (
    <div>
      <Dialog
        open={isPromptDialogOpen}
        onOpenChange={() => {
          handlePromptDialog();
        }}
      >
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader className="mb-4">
            <DialogTitle>Update chatbot Prompt</DialogTitle>
          </DialogHeader>

          <div>
            <Textarea
              disabled={loading}
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
              placeholder="Prompt"
              className=" max-h-full min-h-72 w-full"
            />
          </div>

          <div className=" flex justify-end ">
            <Button
              disabled={loading}
              className=" mr-4 w-40"
              onClick={() => updatePromptHandler()}
            >
              Save
            </Button>
            <Button
              variant="outline"
              className=" w-40"
              onClick={() => {
                handlePromptDialog();
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

export default PromptDialog;
