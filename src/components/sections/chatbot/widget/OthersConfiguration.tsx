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

function OthersConfiguration({
  voiceChatOption,
  setVoiceChatOption,
  feedbackOption,
  setFeedbackOption,
  chatHistoryOption,
  setChatHistoryOption,
  scrollbarRef,
}: {
  voiceChatOption: boolean;
  setVoiceChatOption: React.Dispatch<React.SetStateAction<boolean>>;
  feedbackOption: boolean;
  setFeedbackOption: React.Dispatch<React.SetStateAction<boolean>>;
  chatHistoryOption: boolean;
  setChatHistoryOption: React.Dispatch<React.SetStateAction<boolean>>;
  scrollbarRef: React.RefObject<Scrollbars>;
}) {
  const handleVoiceChatOption = (value: string) => {
    setVoiceChatOption(value === 'on');
    scrollbarRef.current?.scrollToBottom();
  };

  const handleFeedbackOption = (value: string) => {
    setFeedbackOption(value === 'on');
    scrollbarRef.current?.scrollToBottom();
  };

  const handleBorderChange = (value: string) => {
    setChatHistoryOption(value === 'on');
    scrollbarRef.current?.scrollToBottom();
  };

  return (
    <div>
      <h4 className="font-semibold">Others</h4>
      <CheckboxGroup
        label="Voice chat"
        value={voiceChatOption ? 'on' : 'off'}
        onChange={handleVoiceChatOption}
        options={[
          { id: 'voice_chat_on_1', value: 'on', name: 'voice_chat_option' },
          { id: 'voice_chat_off_1', value: 'off', name: 'voice_chat_option' },
        ]}
      />
      <CheckboxGroup
        label="Feedback"
        value={feedbackOption ? 'on' : 'off'}
        onChange={handleFeedbackOption}
        options={[
          { id: 'chat_feedback_on_1', value: 'on', name: 'chat_feedback' },
          { id: 'chat_feedback_off_1', value: 'off', name: 'chat_feedback' },
        ]}
      />
      <CheckboxGroup
        label="Chat History"
        value={chatHistoryOption ? 'on' : 'off'}
        onChange={handleBorderChange}
        options={[
          {
            id: 'chat_history_optionon_1',
            value: 'on',
            name: 'chat_history_option',
          },
          {
            id: 'chat_history_option_off_1',
            value: 'off',
            name: 'chat_history_option',
          },
        ]}
      />
    </div>
  );
}

export default OthersConfiguration;
