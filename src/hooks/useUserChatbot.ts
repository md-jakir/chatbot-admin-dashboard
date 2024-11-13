import useResponseHandler from '@/healpers/responseHelper';
import { useBulkUpdateAssignedUserMutation } from '@/redux/features/assignedUser/assignedUser.api';

import { useGetSingleChatbotQuery } from '@/redux/features/chatbot/chatbot.api';
import { RootState } from '@/redux/store';

import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface LoginFormInputs {
  model_id: string;
}

const useUserChatbot = (chatbotId: number | null) => {
  const selectInputRef = useRef<any>();

  const modalConfig = useSelector((state: RootState) => state.modal);
  // const dispatch = useDispatch();

  const [userIds, setUserIds] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [loading, setLoading] = useState(false);

  const [bulkUpdateAssignedUser] = useBulkUpdateAssignedUserMutation();

  const { data, isLoading, refetch }: any = useGetSingleChatbotQuery(
    modalConfig.id,
    {
      skip: !modalConfig.id,
    },
  );

  const responsehandler = useResponseHandler();

  useEffect(() => {
    if (modalConfig.id) {
      refetch();
    } else {
      reset();
    }
  }, [modalConfig.id, refetch, reset]);

  useEffect(() => {
    if (!modalConfig.id) {
      setUserIds([]);
      setValue('model_id', '');
    }

    if (!isLoading && data) {
      setValue('model_id', data.model_id);
    }
  }, [setValue, data, modalConfig, isLoading]);

  const assignUserHandler = (ids: number[]) => {
    setUserIds(ids);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (_data) => {
    if (userIds.length === 0) {
      return;
    }
    if (!chatbotId) {
      return;
    }
    if (_data.model_id === '') {
      return;
    }

    setLoading(true);
    await responsehandler(
      bulkUpdateAssignedUser({
        id: chatbotId,
        data: userIds,
        modelId: _data?.model_id,
      }),
    );

    setUserIds([]);
    if (selectInputRef.current !== null) {
      selectInputRef.current.clearValue();
    }
    setLoading(false);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
    userIds,
    selectInputRef,
    assignUserHandler,
  };
};

export default useUserChatbot;
