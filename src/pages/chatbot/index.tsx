import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import TablePagination from '@/components/CustomTable/pagination';

import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/redux/features/sidebar/modalConfig';
import ChatbotTable from '@/components/sections/chatbot/ChatbotTable';
import ChatbotDialog from '@/components/sections/chatbot/dialog/Dialog';
import ChatbotDeleteDialog from '@/components/sections/chatbot/dialog/DeleteDialog';
import { useGetAllChatbotsQuery } from '@/redux/features/chatbot/chatbot.api';
import { RootState } from '@/redux/store';
import SearchRecord from '@/components/SearchRecord';

function Chatbot() {
  const dispatch = useDispatch();
  const update = useSelector((state: RootState) => state.updateConfig);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearch] = React.useState('');

  const { data, isLoading, refetch }: any = useGetAllChatbotsQuery(
    `skip=${currentPage - 1}&limit=${limit}&search=${search}`,
  );

  useEffect(() => {
    refetch();
  }, [update.isUpdate]);

  const changePage = (_page: number) => {
    setCurrentPage(_page);
    refetch();
  };

  const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(+e.target.value);
  };

  return (
    <div className="mb-8 rounded ">
      <ChatbotDialog />
      <ChatbotDeleteDialog />
      <h2 className="mb-2 text-3xl font-bold tracking-tight">Chatbot List</h2>
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
            <PlusIcon className="mr-2 h-4 w-4" /> Add Chatbot
          </Button>
        </div>
      </div>

      <div className="ml-auto mt-4 flex flex-col gap-2">
        <ChatbotTable data={(data?.data as any) || []} isLoading={isLoading} />
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
Chatbot.layout = 'dashboard';
export default Chatbot;
