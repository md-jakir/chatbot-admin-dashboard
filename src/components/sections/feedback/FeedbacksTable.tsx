/* eslint-disable import/no-unresolved */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import ExpandableText from '@/components/ExpandableText';
import TableAction from '../../CustomTable/table-action';

const tableHead = [
  'id',
  'created_at',
  'qustion',
  'answer',
  'text_feedback',
  'feedback',
  'others',
  'action',
];

interface Feedback {
  id: string;
  name: string;

  cost: string;
  response_time: string;

  created_at: string;
  updatedAt: string;
}

function FeedbacksTable({
  data,
  isLoading,
}: {
  data: Feedback[];

  isLoading: boolean;
}) {
  return (
    <div className=" rounded border">
      {' '}
      <Table className="">
        <TableHeader>
          <TableRow>
            {tableHead.map((head, index) => (
              <TableHead className=" text-center" key={`${index + 1}`}>
                {head}
              </TableHead>
            ))}
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
          ) : (
            data.map((feedback: Feedback, index: number) => (
              <TableRow key={`th-${index + 1}`}>
                {tableHead.map((head, idx) => {
                  if (head === 'created_at' || head === 'updatedAt') {
                    const date = new Date(feedback[head]);

                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        {date.toLocaleString()}
                      </TableCell>
                    );
                  }
                  if (head === 'id') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        {feedback[head]}
                        {/* {user.id} */}
                      </TableCell>
                    );
                  }
                  if (head === 'others') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        <p className="flex gap-1">
                          {' '}
                          <span className=" text-muted-foreground">Cost: </span>
                          {feedback.cost}
                        </p>
                        <p className="flex gap-1">
                          {' '}
                          <span className=" text-muted-foreground">
                            ResponseTime:{' '}
                          </span>
                          {feedback.response_time}
                        </p>
                      </TableCell>
                    );
                  }
                  if (head === 'action') {
                    return (
                      <TableCell key={`${index + 1}`}>
                        <TableAction noEdit id={feedback.id} />
                      </TableCell>
                    );
                  }

                  if (head === 'answer') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        <ExpandableText
                          text={feedback[head as keyof Feedback]}
                          limit={50}
                        />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={`tr-${idx + 1}`}>
                      {feedback[head as keyof Feedback] !== null &&
                      feedback[head as keyof Feedback] !== '' ? (
                        feedback[head as keyof Feedback]
                      ) : (
                        <span className="w-full text-center">n/a</span>
                      )}
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

export default FeedbacksTable;
