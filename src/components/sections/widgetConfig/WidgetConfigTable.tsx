/* eslint-disable import/no-unresolved */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import TableAction from '../../CustomTable/table-action';

const tableHead = [
  'id',
  'name',
  'Alignment',
  'bubble',
  'header',
  'text',
  'others',
  'action',
];

interface WidgetConfig {
  id: string;
  name: string;
  message_alignment: string;
  bubble_border: boolean;
  bubble_shadow: string;
  bubble_color: string;
  bubble_shade: number;
  header_color: string;
  header_shade: number;
  text_color: string;
  chat_history_option: boolean;
  feedback_option: boolean;
  voice_chat_option: boolean;
  text_shade: number;
}

function WidgetConfigsTable({
  data,
  isLoading,
}: {
  data: WidgetConfig[];
  isLoading: boolean;
}) {
  return (
    <div className=" rounded border">
      {' '}
      <Table className="">
        <TableHeader>
          <TableRow>
            {tableHead.map((head, index) => (
              <TableHead key={`${index + 1}`}>
                {head.split('_').join(' ')}
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
          ) : data.length > 0 ? (
            data.map((widget: WidgetConfig, index: number) => (
              <TableRow key={`th-${index + 1}`}>
                <TableCell>{widget.id}</TableCell>
                <TableCell>{widget.name}</TableCell>
                <TableCell>{widget.message_alignment}</TableCell>
                <TableCell>
                  <p>
                    <span className=" text-muted-foreground">Border: </span>
                    {widget.bubble_border ? 'Yes' : 'No'}
                  </p>

                  <p>
                    <span className=" text-muted-foreground">Shadow: </span>
                    {widget.bubble_shadow}
                  </p>

                  <p>
                    <span className=" text-muted-foreground">Color: </span>
                    {widget.bubble_color}
                  </p>

                  <p>
                    <span className=" text-muted-foreground">Shade: </span>
                    {widget.bubble_shade}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    <span className=" text-muted-foreground">Color: </span>
                    {widget.header_color}
                  </p>

                  <p>
                    <span className=" text-muted-foreground">Shade: </span>
                    {widget.header_shade}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    <span className=" text-muted-foreground">Color: </span>
                    {widget.text_color}
                  </p>

                  <p>
                    <span className=" text-muted-foreground">Shade: </span>
                    {widget.text_shade}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    <span className=" text-muted-foreground">
                      Chat History:{' '}
                    </span>
                    {widget.chat_history_option ? 'Yes' : 'No'}
                  </p>

                  <p>
                    <span className=" text-muted-foreground">Feedback: </span>
                    {widget.feedback_option ? 'Yes' : 'No'}
                  </p>

                  <p>
                    <span className=" text-muted-foreground">Voice Chat: </span>
                    {widget.voice_chat_option ? 'Yes' : 'No'}
                  </p>
                </TableCell>
                <TableCell>
                  <TableAction id={widget.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="py-10 text-center text-xl font-thin"
                colSpan={tableHead.length}
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default WidgetConfigsTable;
