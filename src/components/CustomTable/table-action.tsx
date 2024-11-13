'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/features/sidebar/modalConfig';

function TableAction({ id, noEdit }: { id: any; noEdit?: boolean }) {
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {!noEdit ? (
          <DropdownMenuItem
            onClick={() => {
              dispatch(openModal({ type: 'addOrUpdate', id }));
            }}
          >
            Edit
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuItem
          onClick={() => {
            dispatch(openModal({ type: 'delete', id }));
          }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TableAction;
