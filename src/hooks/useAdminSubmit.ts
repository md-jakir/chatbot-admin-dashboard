import useResponseHandler from '@/healpers/responseHelper';
import {
  useAddNewAdminMutation,
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
  password?: string;
}

const useAdminSubmit = () => {
  const [open, setOpen] = useState(false);
  const modalConfig = useSelector((state: RootState) => state.modal);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [addAdmin] = useAddNewAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const { data, isLoading, refetch }: any = useGetSingleAdminQuery(
    modalConfig.id,
    {
      skip: !modalConfig.id,
    },
  );

  const responseHandler = useResponseHandler();

  useEffect(() => {
    if (modalConfig.id) {
      refetch();
    } else {
      reset();
    }
  }, [modalConfig.id, refetch, reset]);

  useEffect(() => {
    if (!modalConfig.id) {
      setValue('name', '');
      setValue('email', '');

      setValue('phone', '');
      setValue('password', '');
    }

    if (!isLoading && data) {
      setValue('name', data?.data.name);
      setValue('email', data?.data.email);

      setValue('phone', data?.data.phone);
    }
  }, [setValue, data, modalConfig, isLoading]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (_data) => {
    if (modalConfig.id) {
      await responseHandler(
        updateAdmin({
          id: modalConfig.id,
          data: {
            name: _data.name,
            email: _data.email,

            phone: _data.phone,
          },
          token: '',
        }),
        'Admin updated successfully',
      );
    } else {
      await responseHandler(
        addAdmin({
          data: {
            name: _data.name,
            email: _data.email,

            phone: _data.phone,
            password: _data.password,
          },
          token: '',
        }),
        'Admin added successfully',
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

export default useAdminSubmit;
