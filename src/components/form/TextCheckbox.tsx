import { cn } from '@/lib/utils';
import React from 'react';
import { buttonVariants } from '../ui/button';

export default function TextCheckbox({
  id,
  color,
  stateValue,
  handleChange,
  value,
  name,
}: {
  id: string;
  color?: string;
  stateValue: string;
  handleChange: (_e: any) => void;
  value: string;
  name: string;
}) {
  return (
    <label
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'h-8 cursor-pointer appearance-none py-1 font-normal',
        stateValue === value && ' border-primary',
        color &&
          (color === 'white' ||
            (color === 'black' &&
              `bg-${color.trim().toLowerCase()} hover:bg-${color.trim().toLowerCase()}`)),
        color && color === 'blue' && `bg-blue-500 hover:bg-blue-600`,
        color && color === 'red' && `bg-red-500 hover:bg-red-600`,
        color && color === 'green' && `bg-green-500 hover:bg-green-600`,
      )}
      htmlFor={id}
    >
      <input
        id={id}
        className="hidden"
        type="radio"
        onClick={handleChange}
        defaultChecked={stateValue === value}
        name={name}
        value={value}
      />
      {!color && <span className="capitalize">{value}</span>}
    </label>
  );
}


