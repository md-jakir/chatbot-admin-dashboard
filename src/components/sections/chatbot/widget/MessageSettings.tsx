import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import TextCheckbox from '@/components/form/TextCheckbox';

function CheckboxGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (_value: string) => void;
  options: { id: string; value: string; name: string }[];
}) {
  return (
    <div className="relative flex flex-wrap justify-between py-2">
      <div className="grid gap-2">
        <div className="text-sm">
          {label}:<span className="capitalize text-gray-400"> {value}</span>
        </div>
        <div className="flex gap-2">
          {options.map((option) => (
            <span key={option.id}>
              <TextCheckbox
                id={option.id}
                stateValue={value}
                handleChange={() => onChange(option.value)}
                value={option.value}
                name={option.name}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageSettings({
  messageAlignment,
  setMessageAlignment,
  messageShadow,
  setMessageShadow,
  messageBorder,
  setMessageBorder,
  scrollbarRef,
}: {
  messageAlignment: string;
  setMessageAlignment: React.Dispatch<
    React.SetStateAction<'vertical' | 'horizontal'>
  >;
  messageShadow: string;
  setMessageShadow: React.Dispatch<
    React.SetStateAction<'outer' | 'inner' | 'none'>
  >;
  messageBorder: boolean;
  setMessageBorder: React.Dispatch<React.SetStateAction<boolean>>;
  scrollbarRef: React.RefObject<Scrollbars>;
}) {
  const handleAlignmentChange = (value: 'horizontal' | 'vertical') => {
    setMessageAlignment(value);
    scrollbarRef.current?.scrollToBottom();
  };

  const handleShadowChange = (value: 'outer' | 'inner' | 'none') => {
    setMessageShadow(value);
    scrollbarRef.current?.scrollToBottom();
  };

  const handleBorderChange = (value: string) => {
    setMessageBorder(value === 'on');
    scrollbarRef.current?.scrollToBottom();
  };

  return (
    <div>
      <h4 className="font-semibold">Message</h4>
      <CheckboxGroup
        label="Alignment"
        value={messageAlignment}
        onChange={handleAlignmentChange as (_value: string) => void}
        options={[
          {
            id: 'horizontal_1',
            value: 'horizontal',
            name: 'message_alignment',
          },
          { id: 'vertical_1', value: 'vertical', name: 'message_alignment' },
        ]}
      />
      <CheckboxGroup
        label="Shadow"
        value={messageShadow}
        onChange={handleShadowChange as (_value: string) => void}
        options={[
          { id: 'outer_1', value: 'outer', name: 'message_shadow' },
          { id: 'inner_1', value: 'inner', name: 'message_shadow' },
          { id: 'none_1', value: 'none', name: 'message_shadow' },
        ]}
      />
      <CheckboxGroup
        label="Border"
        value={messageBorder ? 'on' : 'off'}
        onChange={handleBorderChange}
        options={[
          { id: 'on_1', value: 'on', name: 'message_border' },
          { id: 'off_1', value: 'off', name: 'message_border' },
        ]}
      />
    </div>
  );
}

export default MessageSettings;
