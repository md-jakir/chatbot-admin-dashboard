/* eslint-disable import/no-unresolved */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { patients, tableHead } from '@/utils/table';
import TableAction from './table-action';

function RootTable() {
  return (
    <div className=" rounded border border-slate-300">
      {' '}
      <Table className="">
        <TableHeader className=" bg-slate-300 dark:bg-slate-600">
          <TableRow>
            {tableHead.map((head, index) => (
              <TableHead key={`${index + 1}`}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map(
            (invoice: { [key: string]: string | number }, index: number) => (
              <TableRow key={`${index + 1}`}>
                {tableHead.map((head: any) => {
                  if (head === 'action') {
                    return (
                      <TableCell key={`${index + 1}`}>
                        <TableAction id={invoice.id} />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={invoice.invoice}>{invoice[head]}</TableCell>
                  );
                })}
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default RootTable;
