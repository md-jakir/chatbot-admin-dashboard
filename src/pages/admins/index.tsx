import { Button } from '@/components/ui/button';
import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import TablePagination from '@/components/CustomTable/pagination';

import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/features/sidebar/modalConfig';

import AdminDialog from '@/components/sections/admin/Dialog';
import { useGetAllAdminsQuery } from '@/redux/features/admin/admin.api';
import AdminDeleteDialog from '@/components/sections/admin/DeleteDialog';
import AdminTable from '@/components/sections/admin/Table';
import SearchRecord from '@/components/SearchRecord';

function Admin() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearch] = React.useState('');
  //   const { data } = useSession();

  const { data, isLoading }: any = useGetAllAdminsQuery(
    `skip=${currentPage - 1}&limit=${limit}&search=${search}`,
  );

  const changePage = (_page: number) => {
    setCurrentPage(_page);
  };

  const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(+e.target.value);
  };

  return (
    <div className="mb-8 rounded ">
      <AdminDialog />
      <AdminDeleteDialog />
      <h2 className="mb-2 text-3xl font-bold tracking-tight">Admin List</h2>
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
            <PlusIcon className="mr-2 h-4 w-4" /> Add Admin
          </Button>
        </div>
      </div>

      <div className="ml-auto mt-4 flex flex-col gap-2">
        <AdminTable data={(data?.data as any) || []} isLoading={isLoading} />
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
Admin.layout = 'dashboard';
export default Admin;
