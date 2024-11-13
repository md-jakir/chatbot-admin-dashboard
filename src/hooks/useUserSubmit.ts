import useResponseHandler from '@/healpers/responseHelper';
import {
  useAddNewUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from '@/redux/features/user/user.api';
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

const useUserSubmit = () => {
  const [open, setOpen] = useState(false);
  const modalConfig = useSelector((state: RootState) => state.modal);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [addUser] = useAddNewUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading, refetch }: any = useGetSingleUserQuery(
    modalConfig.id,
    {
      skip: !modalConfig.id,
    },
  );

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    if (modalConfig.id) {
      await responseHandler(
        updateUser({
          id: modalConfig.id,
          data: {
            name: _data.name,
            email: _data.email,

            phone: _data.phone,
          },
          token: '',
        }),
        'User updated successfully',
      );
    } else {
      await responseHandler(
        addUser({
          data: {
            name: _data.name,
            email: _data.email,

            phone: _data.phone,
            password: _data.password,
          },
          token: '',
        }),
        'User added successfully',
      );
    }
    setLoading(false);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    open,
    setOpen,
    loading,
  };
};

export default useUserSubmit;
