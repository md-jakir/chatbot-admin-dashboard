import { toast } from '@/components/ui/use-toast';
import useResponseHandler from '@/healpers/responseHelper';

import {
  useGetSingleChatbotQuery,
  useUpdateChatbotMutation,
} from '@/redux/features/chatbot/chatbot.api';
import { closeModal } from '@/redux/features/sidebar/modalConfig';
import { toggleUpdate } from '@/redux/features/sidebar/updateFlag';
import { RootState } from '@/redux/store';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

interface LoginFormInputs {
  name: string;
  gretting_message: string;
}

type UploadedFile = File & { preview: string };

const useAdminSubmit = () => {
  const [open, setOpen] = useState(false);
  const modalConfig = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const [updateChatbot] = useUpdateChatbotMutation();
  const { data, isLoading, refetch }: any = useGetSingleChatbotQuery(
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
      setValue('gretting_message', '');
    }

    if (!isLoading && data) {
      setValue('name', data?.name);
      setValue('gretting_message', data?.gretting_message);
    }
  }, [setValue, data, modalConfig, isLoading]);

  const addUploadedFiles = (acceptedFiles: UploadedFile[]) => {
    if (acceptedFiles?.length) {
      setUploadedFiles((previousFiles: UploadedFile[]) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ]);
    }
  };

  const removeUploadedFile = (file: UploadedFile) => {
    setUploadedFiles((previousFiles) =>
      previousFiles.filter((item) => item !== file),
    );
    URL.revokeObjectURL(file.preview);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (_data) => {
    if (modalConfig.id) {
      setLoading(true);
      await responseHandler(
        updateChatbot({
          id: modalConfig.id,
          data: {
            name: _data.name,
            gretting_message: _data.gretting_message,
          },
          token: '',
        }),
        'Chatbot updated successfully',
      );
      setLoading(false);
    } else {
      setLoading(true);

      const formData = new FormData();
      await uploadedFiles.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('name', _data.name);
      formData.append('gretting_message', _data.gretting_message);

      let tempProgress = 0;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatbot`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer `,
          },
          onUploadProgress: (progressEvent) => {
            // Calculate the percentage of the upload
            if (progressEvent && progressEvent.total) {
              tempProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
            } else {
              tempProgress = 0; // or any default value you want
            }
            // console.log('tempProgress', tempProgress);

            if (tempProgress > 0 && tempProgress <= 100)
              setProgress(tempProgress);
          },
        },
      );

      if (response) {
        toast({
          title: 'success',
          description: response?.data?.message || 'Chatbot added successfully',
        });
        dispatch(toggleUpdate());
        setUploadedFiles([]);
        dispatch(closeModal());
        setProgress(101);
      }

      setLoading(false);
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    open,
    setOpen,
    loading,
    progress,
    uploadedFiles,
    addUploadedFiles,
    removeUploadedFile,
  };
};

export default useAdminSubmit;
