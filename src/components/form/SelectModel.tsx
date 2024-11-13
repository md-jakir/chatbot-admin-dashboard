import React from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

import Label from '../ui/label';

interface Props {
  labelShow?: boolean;
  label: string;
  name: keyof FieldValues;
  register: any;
  error?:
    | FieldError
    | {
        message: string;
      }
    | undefined;

  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
}

export default function SelectModel({
  labelShow,
  label,
  name,
  register,
  error,
  placeholder,
  required,
  defaultValue,
  className,
}: Props) {
  return (
    <div className="mb-2 flex flex-col gap-1 ">
      {labelShow && <Label htmlFor={name.toString()}>{label}</Label>}
      <select
        className={`${className} flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50`}
        defaultValue={defaultValue}
        placeholder={placeholder || label}
        id={name.toString()}
        {...register(name, { required })}
      >
        <option value="0">Open AI</option>
        <option value="1">AWS</option>
        <option value="2">Azure</option>
      </select>
      {error && <p className="text-sm text-red-500 ">{error.message}</p>}
    </div>
  );
}
