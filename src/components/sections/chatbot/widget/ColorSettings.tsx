import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import TextCheckbox from '@/components/form/TextCheckbox';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';

function CheckboxGroup({
  label,
  value,
  onChange,
  options,
  namePrefix,
  shade,
  changeShade,
}: {
  label: string;
  value: string;
  onChange: (_color: string) => void;
  options: string[];
  namePrefix: string;
  shade: number;
  changeShade: (_shade: number) => void;
}) {
  return (
    <div className="relative flex flex-wrap justify-between py-2">
      <div className="grid gap-2">
        <div className="text-sm">
          {label}:<span className="capitalize text-gray-400"> {value}</span>
        </div>
        <div className="flex gap-2">
          {options.map((color) => (
            <span key={color}>
              <TextCheckbox
                id={`${namePrefix}_${color}_1`}
                color={color}
                stateValue={value}
                handleChange={() => onChange(color)}
                value={color}
                name={namePrefix}
              />
            </span>
          ))}
          <div className="flex">
            <Button
              variant="outline"
              size="sm"
              className="rounded-r-none border-r-0"
              disabled={shade === 0}
              onClick={() => {
                if (shade <= 100) {
                  changeShade?.(shade - 50);
                } else {
                  changeShade?.(shade - 100);
                }
                // changeShade?.(shade - 100);
              }}
            >
              <MinusIcon className="h-3 w-3" />
            </Button>
            <Input
              value={shade}
              disabled
              className="h-9 w-12 rounded-none text-center"
            />
            <Button
              variant="outline"
              size="sm"
              disabled={shade === 900}
              className="rounded-l-none border-l-0"
              onClick={() => {
                changeShade?.(shade + 100);
              }}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorSettings({
  textColor,
  setTextColor,
  messageBoxColor,
  setMessageBoxColor,
  hearderColor,
  setHeaderColor,
  scrollbarRef,
  textShade,
  setTextShade,
  messageBoxShade,
  setMessageBoxShade,
  headerShade,
  setHeaderShade,
}: {
  textColor: string;
  setTextColor: React.Dispatch<React.SetStateAction<'white' | 'black'>>;
  messageBoxColor: string;
  setMessageBoxColor: React.Dispatch<
    React.SetStateAction<'white' | 'blue' | 'red' | 'green'>
  >;
  hearderColor: string;
  setHeaderColor: React.Dispatch<
    React.SetStateAction<'white' | 'blue' | 'red' | 'green'>
  >;
  scrollbarRef: React.RefObject<Scrollbars>;
  textShade: number;
  setTextShade: React.Dispatch<React.SetStateAction<number>>;
  messageBoxShade: number;
  setMessageBoxShade: React.Dispatch<React.SetStateAction<number>>;
  headerShade: number;
  setHeaderShade: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleColorChange = (
    type: string,
    setColor: (_value: string) => void,
    color: string,
  ) => {
    setColor(color);

    const shadeValue = color !== 'white' ? 500 : 0;
    if (type === 'header_color') setHeaderShade(shadeValue);
    if (type === 'message_box_color') setMessageBoxShade(shadeValue);
    scrollbarRef.current?.scrollToBottom();
  };

  return (
    <div>
      <h4 className="font-semibold">Color</h4>
      <div className="flex gap-1">
        <CheckboxGroup
          label="Text color"
          value={textColor}
          onChange={(color) => {
            handleColorChange(
              'text_color',
              setTextColor as (_value: string) => void,
              color as string,
            );

            if (color === 'white') {
              setTextShade(300);
            } else {
              setTextShade(700);
            }
          }}
          options={['white', 'black']}
          namePrefix="text_color"
          shade={textShade}
          changeShade={setTextShade}
        />
      </div>
      <CheckboxGroup
        label="Message bubble"
        value={messageBoxColor}
        onChange={(color) =>
          handleColorChange(
            'message_box_color',
            setMessageBoxColor as (_value: string) => void,
            color as string,
          )
        }
        options={['white', 'red', 'blue', 'green']}
        namePrefix="message_box"
        shade={messageBoxShade}
        changeShade={setMessageBoxShade}
      />
      <CheckboxGroup
        label="Chat Header"
        value={hearderColor}
        onChange={(color) =>
          handleColorChange(
            'header_color',
            setHeaderColor as (_value: string) => void,
            color as string,
          )
        }
        options={['white', 'red', 'blue', 'green']}
        namePrefix="chat_header"
        shade={headerShade}
        changeShade={setHeaderShade}
      />
    </div>
  );
}

export default ColorSettings;
