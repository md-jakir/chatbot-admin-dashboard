/* eslint-disable import/no-unresolved */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Switch from '@/components/ui/switch';
import useResponseHandler from '@/healpers/responseHelper';
import { useUpdateChatbotStatusMutation } from '@/redux/features/chatbot/chatbot.api';
import { Button } from '@/components/ui/button';
import {
  ChatBubbleBottomCenterTextIcon,
  CodeBracketSquareIcon,
  EyeIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { SampleQustion, IknowledgeBase } from '@/types/ApiDataTypes';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/router';
import { WhatsAppIcon } from '@/assets/icons';
import TableAction from '../../CustomTable/table-action';
import SampleQustionDialog from './dialog/SampleQustionDialog';
import KnowledgeBaseModal from './dialog/KnowledgeBaseModal';
// import UserAssignModal from './assignedUsers/UserAssignModal';
import WidgetConfigModal from './widget/WidgetConfigModal';
import PromptDialog from './dialog/PromptDialog';
import WhatsAppConnectModal from './dialog/WhatsAppConnectModal';

type IUserChatbot = {
  user_id: string;
  chatbot_id: string;
  created_at: string;
  updatedAt: string;
};

const tableHead = [
  'id',
  'created_at',
  'name',
  'gretting_message',
  'assigned_users',
  'knowledge_base',
  'sample_qustion',
  'active_status',
  'action',
];

interface Chatbot {
  id: string;
  name: string;
  gretting_message: string;
  knowledge_base: IknowledgeBase[];
  active_status: boolean;
  sample_qustion: SampleQustion[];
  created_at: string;
  updatedAt: string;
  user_chatbot: IUserChatbot[];
}

function ChatbotTable({
  data,
  isLoading,
}: {
  data: Chatbot[];
  isLoading: boolean;
}) {
  const router = useRouter();
  const responsehandler = useResponseHandler();
  const [udateChatbotStatus] = useUpdateChatbotStatusMutation();

  const [chatbotId, setChatbotId] = useState<number | null>(null);

  const [viewSampleQustion, setViewSampleQustion] = useState(false);

  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);

  // const [showAssignedUsers, setShowAssignedUsers] = useState(false);

  const [isWidgetConfigModalOpen, setIsWidgetConfigModalOpen] = useState(false);

  const [isPromptDialogOpen, setIsPromptDialogOpen] = useState(false);

  const [isWhatsAppConnectModalOpen, setIsWhatsAppConnectModalOpen] =
    useState(false);

  const handleWhatsAppConnectModal = (_chatbotId?: number) => {
    setIsWhatsAppConnectModalOpen((prev) => !prev);
    if (_chatbotId) {
      setChatbotId(_chatbotId);
    } else {
      setChatbotId(null);
    }
  };

  const handleWidgetConfigModal = (_chatbotId?: number) => {
    setIsWidgetConfigModalOpen((prev) => !prev);
    if (_chatbotId) {
      setChatbotId(_chatbotId);
    } else {
      setChatbotId(null);
    }
  };

  const handlePromptDialog = (_chatbotId?: number) => {
    setIsPromptDialogOpen((prev) => !prev);
    if (_chatbotId) {
      setChatbotId(_chatbotId);
    } else {
      setChatbotId(null);
    }
  };

  const handleViewKnowledgeBase = (_chatbotId?: number) => {
    setShowKnowledgeBase((prev: boolean) => !prev);
    if (_chatbotId) {
      setChatbotId(_chatbotId);
    } else {
      setChatbotId(null);
    }
  };

  const handleViewSampleQustion = (_chatbotId?: number) => {
    setViewSampleQustion((prev: boolean) => !prev);
    if (_chatbotId) {
      setChatbotId(_chatbotId);
    } else {
      setChatbotId(null);
    }
  };

  // const handleViewAssignedUsers = (_chatbotId?: number) => {
  //   setShowAssignedUsers((prev: boolean) => !prev);
  //   if (_chatbotId) {
  //     setChatbotId(_chatbotId);
  //   } else {
  //     setChatbotId(null);
  //   }
  // };

  const updateStatusHandler = async (id: string, status: boolean) => {
    await responsehandler(
      udateChatbotStatus({
        id,
        data: {
          active_status: status,
        },
      }),
      'Something went wrong!',
    );
  };

  return (
    <div className="rounded border">
      <SampleQustionDialog
        chatbotId={chatbotId}
        // data={sampleQustion}
        viewSampleQustion={viewSampleQustion}
        handleViewSampleQustion={handleViewSampleQustion}
      />
      <KnowledgeBaseModal
        chatbotId={chatbotId}
        isOpen={showKnowledgeBase}
        handleOpen={handleViewKnowledgeBase}
      />

      <WidgetConfigModal
        chatbotId={chatbotId}
        isWidgetConfigModalOpen={isWidgetConfigModalOpen}
        handleWidgetConfigModal={handleWidgetConfigModal}
      />

      <PromptDialog
        chatbotId={chatbotId}
        isPromptDialogOpen={isPromptDialogOpen}
        handlePromptDialog={handlePromptDialog}
      />

      <WhatsAppConnectModal
        chatbotId={chatbotId}
        isWhatsAppConnectModalOpen={isWhatsAppConnectModalOpen}
        handleWhatsAppConnectModal={handleWhatsAppConnectModal}
      />

      <Table className="">
        <TableHeader>
          <TableRow>
            {tableHead.map((head, index) => {
              if (head === 'action') {
                return (
                  <TableHead className="text-center" key={`${index + 1}`}>
                    {head.replace('_', ' ')}
                  </TableHead>
                );
              }
              return (
                <TableHead key={`${index + 1}`}>
                  {head.replace('_', ' ')}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                className="py-10 text-center text-xl font-thin"
                colSpan={tableHead.length}
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length <= 0 ? (
            <TableRow className="w-full">
              <TableCell
                className="w-full py-10 text-center text-xl text-muted-foreground"
                colSpan={tableHead.length}
              >
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((chatbot: Chatbot, index: number) => (
              <TableRow key={`${index + 1}`}>
                {tableHead.map((head, idx) => {
                  if (head === 'created_at' || head === 'updatedAt') {
                    const date = new Date(chatbot[head]);
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        {date.toLocaleString()}
                      </TableCell>
                    );
                  }

                  if (head === 'action') {
                    return (
                      <TableCell key={`tr-${idx + 1}`} className="">
                        <div className="flex items-center gap-5">
                          <div className="flex items-center justify-center">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  className="p-1 hover:bg-transparent"
                                  onClick={() => {
                                    handleWidgetConfigModal(Number(chatbot.id));
                                  }}
                                  variant="ghost"
                                >
                                  <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Chatbot Widget Config</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  className="p-1 hover:bg-transparent"
                                  onClick={() => {
                                    handleWhatsAppConnectModal(
                                      Number(chatbot.id),
                                    );
                                  }}
                                  variant="ghost"
                                >
                                  <WhatsAppIcon className="h-4 w-4 fill-gray-900 dark:fill-gray-100" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Chat on Whatsapp</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  className="p-1 hover:bg-transparent"
                                  onClick={() => {
                                    handlePromptDialog(Number(chatbot.id));
                                  }}
                                  variant="ghost"
                                >
                                  <CodeBracketSquareIcon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Manage Prompt</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  className="p-1 hover:bg-transparent"
                                  onClick={() => {
                                    router.push(`/chatbot/${chatbot.id}`);
                                  }}
                                  variant="ghost"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Conversation</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <TableAction id={chatbot.id} />
                        </div>
                      </TableCell>
                    );
                  }

                  if (head === 'assigned_users') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        <div className="flex items-center gap-1">
                          <p>
                            {chatbot?.user_chatbot?.length > 0
                              ? `${chatbot?.user_chatbot?.length} User(s)`
                              : 'No User assigned'}
                          </p>{' '}
                          <Button
                            onClick={() => {
                              // handleViewAssignedUsers(Number(chatbot.id));
                              router.push(
                                `/chatbot/assigned-users?chatbotId=${chatbot.id}&chatbotName=${chatbot.name}`,
                              );
                            }}
                            variant="ghost"
                            className="text-xs"
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    );
                  }
                  if (head === 'knowledge_base') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        <div className="flex items-center gap-1">
                          <p>
                            {`${chatbot?.knowledge_base?.length} `}
                            Attachment(s)
                          </p>{' '}
                          <Button
                            onClick={() => {
                              handleViewKnowledgeBase(Number(chatbot.id));
                            }}
                            variant="ghost"
                            className="text-xs"
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    );
                  }
                  if (head === 'sample_qustion') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        <div className="flex items-center gap-1">
                          <p>
                            {`${chatbot?.sample_qustion?.length} `}
                            Qustion(s)
                          </p>
                          <Button
                            onClick={() => {
                              handleViewSampleQustion(Number(chatbot.id));
                            }}
                            variant="ghost"
                            className="text-xs"
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    );
                  }
                  if (head === 'active_status') {
                    return (
                      <TableCell className="text-center" key={`tr-${idx + 1}`}>
                        <Switch
                          onCheckedChange={(checked) => {
                            updateStatusHandler(chatbot.id, checked);
                          }}
                          checked={chatbot[head]}
                          id="airplane-mode"
                        />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={`tr-${idx + 1}`}>
                      {
                        chatbot[head as keyof Chatbot] as
                          | string
                          | number
                          | boolean
                      }
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ChatbotTable;
