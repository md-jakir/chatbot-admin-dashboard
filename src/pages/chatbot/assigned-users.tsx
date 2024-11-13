import TablePagination from '@/components/CustomTable/pagination';
import DataTable from '@/components/sections/chatbot/assignedUsers/DataTable';
import SearchRecord from '@/components/SearchRecord';
import { useGetAssignedUsersByChatbotIdQuery } from '@/redux/features/chatbot/chatbot.api';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import DeleteUserChatbotDialog from '@/components/sections/chatbot/assignedUsers/DeleteUserChatbotDialog';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/redux/features/sidebar/modalConfig';
import { PlusIcon } from '@radix-ui/react-icons';
import UserAssignModal from '@/components/sections/chatbot/assignedUsers/UserAssignModal';
import { RootState } from '@/redux/store';

type AssignUser = {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export default function AssignedUsers() {
  const router = useRouter();
  const dispatch = useDispatch();
  const update = useSelector((state: RootState) => state.updateConfig);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearch] = React.useState('');
  //   const { data } = useSession();

  const [chatbotId, setChatbotId] = React.useState<number | null>(null);
  const [chatborName, setChatbotName] = React.useState<string | null>(null);

  useEffect(() => {
    setChatbotId(Number(router.query.chatbotId) as number);
    setChatbotName(router.query.chatbotName as string);
  }, [router.query]);

  const { data, isLoading, refetch } = useGetAssignedUsersByChatbotIdQuery<{
    data: {
      data: AssignUser[];
      total: number;
    };

    isLoading: boolean;
  }>(
    {
      id: chatbotId,
      query: `skip=${currentPage - 1}&limit=${limit}&search=${search}`,
    },
    {
      skip: !chatbotId,
    },
  );

  useEffect(() => {
    if (chatbotId) refetch();
  }, [update.isUpdate, chatbotId]);

  const changePage = (_page: number) => {
    setCurrentPage(_page);
    refetch();
  };

  const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(+e.target.value);
  };

  return (
    <div className="mb-8 rounded ">
      <UserAssignModal chatbotId={chatbotId} />
      <DeleteUserChatbotDialog />
      <h2 className="mb-2 text-3xl font-bold tracking-tight">
        Assigned Users for {chatborName}
      </h2>
      <div className="mb-2 justify-between md:flex ">
        <div className="flex items-center justify-between gap-2">
          <p>Show</p>
          <select onChange={changeLimit} className="rounded px-1">
            {/* <option value={2}>2</option> */}
            <option value={10}>10</option>
            <option>20</option>
            <option>30</option>
          </select>
        </div>
        <div className=" flex flex-col items-end gap-2 md:flex-row">
          <SearchRecord setSearch={setSearch} />
          <Button
            onClick={() => {
              dispatch(
                openModal({
                  type: 'addOrUpdate',
                  id: null,
                }),
              );
            }}
          >
            {' '}
            <PlusIcon className="mr-2 h-4 w-4" /> Assign User
          </Button>
        </div>
      </div>

      <div className="ml-auto mt-4 flex flex-col gap-2">
        <DataTable data={(data?.data as any) || []} isLoading={isLoading} />
        <TablePagination
          currentPage={currentPage}
          total={data?.total || 0}
          limit={limit}
          changePage={changePage}
        />
      </div>
    </div>
  );
}

AssignedUsers.layout = 'dashboard';
