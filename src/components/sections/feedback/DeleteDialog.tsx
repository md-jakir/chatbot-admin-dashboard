/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeModal } from '@/redux/features/sidebar/modalConfig';
import { useDeleteUserMutation } from '@/redux/features/user/user.api';
import useResponseHandler from '@/healpers/responseHelper';
// import { DialogDescription } from '@radix-ui/react-dialog';

function WidgetConfigDeleteDialog() {
  const modalConfig = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const [deleteUser] = useDeleteUserMutation();

  const responseHandler = useResponseHandler();

  return (
    <Dialog
      open={modalConfig.isDeleteModalOpen}
      onOpenChange={() => {
        dispatch(closeModal());
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Delete feedback</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this feedback?
          </DialogDescription>
        </DialogHeader>
        <div className=" float-end grid grid-cols-2 gap-4">
          <Button
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            No
          </Button>
          <Button
            className=" bg-red-600"
            onClick={async () => {
              await responseHandler(
                deleteUser({
                  id: modalConfig.id,
                }),
                'WidgetConfig deleted successfully',
              );
              dispatch(closeModal());
            }}
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WidgetConfigDeleteDialog;
