import React, { useState } from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

import useResponseHandler from '@/healpers/responseHelper';
import { useUpdateUserChatbotMutation } from '@/redux/features/assignedUser/assignedUser.api';
import Label from '../ui/label';

interface Props {
  recordId: number;
  labelShow?: boolean;
  label: string;
  name: keyof FieldValues;

  error?:
    | FieldError
    | {
        message: string;
      }
    | undefined;

  defaultValue?: string;
  className?: string;
}

export default function SelectAndChangeModel({
  recordId,
  labelShow,
  label,
  name,
  error,
  defaultValue,
  className,
}: Props) {
  const [loading, setLoading] = useState(false);
  const responseHandler = useResponseHandler();
  const [updateUserChatbot] = useUpdateUserChatbotMutation();

  const updateModelHandler = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setLoading(true);
    const modelId = e.target.value;
    const response = await responseHandler(
      updateUserChatbot({
        id: recordId,
        data: {
          model_id: modelId,
        },
      }),
    );
    if (response) {
      setLoading(false);
    }
  };
  return (
    <div className="mb-2 flex flex-col gap-1 ">
      {labelShow && <Label htmlFor={name.toString()}>{label}</Label>}
      <select
        onChange={updateModelHandler}
        className={`${className} flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50`}
        defaultValue={defaultValue}
        id={name.toString()}
        disabled={loading}
      >
        <option value="0">Open AI</option>
        <option value="1">AWS</option>
        <option value="2">Azure</option>
      </select>
      {error && <p className="text-sm text-red-500 ">{error.message}</p>}
    </div>
  );
}
