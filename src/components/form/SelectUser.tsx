import React from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

import Select from 'react-select';
import { useGetUsersAsOptionsQuery } from '@/redux/features/user/user.api';
import Label from '../ui/label';

interface Props {
  labelShow?: boolean;
  label: string;
  name: keyof FieldValues;

  error?:
    | FieldError
    | {
        message: string;
      }
    | undefined;

  defaultValue?: {
    value: number;
    label: string;
  }[];
  className?: string;
  chatbotId: number | null;
  handleSets: (_data: any) => void;
}

const SelectUser = React.forwardRef<any, Props>(
  (
    {
      labelShow,
      label,
      name,
      handleSets,
      error,
      chatbotId,
      defaultValue,
      className,
    },
    ref,
  ) => {
    const { data, isLoading }: any = useGetUsersAsOptionsQuery(
      `chatbotId=${chatbotId}`,
    );

    return (
      <div className="mb-2 flex flex-1 flex-col gap-1 ">
        {labelShow && <Label htmlFor={name.toString()}>{label}</Label>}
        <Select
          ref={ref}
          className={`${className}
        basic-multi-select
        `}
          defaultValue={defaultValue}
          isMulti
          onChange={(dataX) => {
            const ids = dataX.map((item) => item.value);
            handleSets(ids);
          }}
          isDisabled={isLoading}
          name="colors"
          options={isLoading ? [{ value: 'loading', label: 'loading' }] : data}
          classNamePrefix="select"
        />

        {error && <p className="text-sm text-red-500 ">{error.message}</p>}
      </div>
    );
  },
);

export default SelectUser;
