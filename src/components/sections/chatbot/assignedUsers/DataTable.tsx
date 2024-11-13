import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  EnvelopeOpenIcon,
  IdCardIcon,
  PersonIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { openModal } from '@/redux/features/sidebar/modalConfig';
import { useDispatch } from 'react-redux';
import SelectAndChangeModel from '@/components/form/SelectAndChangeModel';

type IUserChatbot = {
  id: number;
  user_id: string;
  chatbot_id: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  model_id: string;
  created_at: string;
  updatedAt: string;
};

const tableHead = ['id', 'created_at', 'user', 'model_id', 'action'];

function DataTable({
  data,
  isLoading,
}: {
  data: IUserChatbot[];
  isLoading: boolean;
}) {
  const dispatch = useDispatch();
  return (
    <div className="rounded border">
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
              if (head === 'model_id') {
                return <TableHead key={`${index + 1}`}>Model</TableHead>;
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
            data.map((chatbot: IUserChatbot, index: number) => (
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

                  if (head === 'user') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        <span className="flex items-center">
                          <IdCardIcon className="mr-2 h-4 w-4" />
                          {chatbot.user.id}
                        </span>
                        <span className="flex items-center">
                          <PersonIcon className="mr-2 h-4 w-4" />
                          {chatbot.user.name}
                        </span>
                        <span className="flex items-center">
                          <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
                          {chatbot.user.email}
                        </span>
                        <span className="flex items-center">
                          <PhoneIcon className="mr-2 h-4 w-4" />
                          {chatbot.user.phone}
                        </span>
                      </TableCell>
                    );
                  }

                  if (head === 'model_id') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        <SelectAndChangeModel
                          recordId={chatbot.id}
                          defaultValue={chatbot.model_id}
                          label="Model"
                          name="model_id"
                        />
                      </TableCell>
                    );
                  }

                  if (head === 'action') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        <div className="flex h-full items-start justify-center">
                          <Button
                            variant="ghost"
                            className=" transition-all duration-300 hover:text-red-500"
                            onClick={() => {
                              dispatch(
                                openModal({
                                  type: 'delete',
                                  id: chatbot.id.toString(),
                                }),
                              );
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={`tr-${idx + 1}`}>
                      {
                        chatbot[head as keyof IUserChatbot] as
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

export default DataTable;
