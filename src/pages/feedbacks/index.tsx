import React from 'react';
import TablePagination from '@/components/CustomTable/pagination';

import FeedbacksTable from '@/components/sections/feedback/FeedbacksTable';
import FeedbackDialog from '@/components/sections/feedback/Dialog';
import FeedbackDeleteDialog from '@/components/sections/feedback/DeleteDialog';
import { useGetAllFeedbacksQuery } from '@/redux/features/SessionHistory/sessionHistory.api';
import SearchRecord from '@/components/SearchRecord';

function Feedback() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearch] = React.useState('');
  //   const { data } = useSession();

  const { data, isLoading, refetch }: any = useGetAllFeedbacksQuery(
    `skip=${currentPage - 1}&limit=${limit}&search=${search}`,
  );

  const changePage = (_page: number) => {
    setCurrentPage(_page);
    refetch();
  };

  const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(+e.target.value);
  };

  return (
    <div className="mb-8 rounded ">
      <FeedbackDialog />
      <FeedbackDeleteDialog />
      <h2 className="mb-2 text-3xl font-bold tracking-tight">Feedbacks List</h2>
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
        </div>
      </div>

      <div className="ml-auto mt-4 flex flex-col gap-2">
        <FeedbacksTable
          data={(data?.data as any) || []}
          isLoading={isLoading}
        />
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
Feedback.layout = 'dashboard';
export default Feedback;
