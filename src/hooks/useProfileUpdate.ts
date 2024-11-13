import useResponseHandler from '@/healpers/responseHelper';
import {
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
} from '@/redux/features/admin/admin.api';
import { RootState } from '@/redux/store';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface LoginFormInputs {
  name: string;
  email: string;
  phone: string;
}

const useProfileUpdate = (id: number) => {
  const [open, setOpen] = useState(false);
  const modalConfig = useSelector((state: RootState) => state.modal);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [updateAdmin] = useUpdateAdminMutation();
  const { data, isLoading, refetch }: any = useGetSingleAdminQuery(id, {
    skip: !id,
  });

  const responseHandler = useResponseHandler();

  useEffect(() => {
    if (id) {
      refetch();
    } else {
      reset();
    }
  }, [id, refetch, reset]);

  useEffect(() => {
    if (!id) {
      setValue('name', '');
      setValue('email', '');

      setValue('phone', '');
    }

    if (!isLoading && data) {
      setValue('name', data?.data.name);
      setValue('email', data?.data.email);

      setValue('phone', data?.data.phone);
    }
  }, [setValue, data, modalConfig, isLoading, id]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (_data) => {
    if (id) {
      await responseHandler(
        updateAdmin({
          id,
          data: {
            name: _data.name,
            email: _data.email,

            phone: _data.phone,
          },
          token: '',
        }),
        'Admin updated successfully',
      );
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    open,
    setOpen,
  };
};

export default useProfileUpdate;
