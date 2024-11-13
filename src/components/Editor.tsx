import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import dynamic from 'next/dynamic';
// import { useController } from 'react-hook-form';

// import { FormController, FormData, FormPath } from '@/types';
// import { Controller } from 'react-hook-form';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

// const QUILL_FORMATS = ['bold', 'italic', 'underline', 'list'];
const QUILL_MODULES = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

// type FormController<T> = {
//   onChange: (value: T) => void;
//   // other properties...
// };

type Props = {
  onChange: (_value: string) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function Editor({
  onChange,
  value,
  placeholder,
  disabled,
}: Props) {
  return (
    <ReactQuill
      theme="snow"
      onChange={onChange}
      value={value as string}
      style={{
        width: '100%',
        opacity: disabled ? '0.5' : '1',
        pointerEvents: disabled ? 'none' : 'all',
        cursor: disabled ? 'not-allowed' : 'default',
        background: 'white',
      }}
      placeholder={placeholder}
      modules={QUILL_MODULES}
    />

    // <Controller
    //   control={control}
    //   name={name}
    //   render={({ field }) => (
    //     <ReactQuill
    //       theme="snow"
    //       onChange={(value) => field.onChange(value)}
    //       value={field.value as string}
    //       style={{
    //         width: '100%',
    //         opacity: disabled ? '0.5' : '1',
    //         pointerEvents: disabled ? 'none' : 'all',
    //         cursor: disabled ? 'not-allowed' : 'default',
    //         background: 'white',
    //       }}
    //       placeholder={placeholder}
    //       modules={QUILL_MODULES}
    //     />
    //   )}
    // />
  );
}


