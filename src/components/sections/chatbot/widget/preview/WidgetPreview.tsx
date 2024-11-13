import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { CpuChipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

type Props = {
  hearderColor: string;
  chatDataWithBot: {
    id: number;
    sender: string;
    name?: string;
    text: string;
  }[];
  messageAlignment: string;
  messageShadow: string;
  messageBorder: boolean;
  textColor: string;
  messageBoxColor: string;
  text: string;
  setText: (_e: any) => void;
  scrollbarRef: React.RefObject<Scrollbars>;
  textShade: number;
  messageBoxShade: number;
  headerShade: number;
  voiceChatOption: boolean;
  feedbackOption: boolean;
  chatHistoryOption: boolean;
};

export default function WidgetPreview({
  hearderColor,
  chatDataWithBot,
  messageAlignment,
  messageShadow,
  messageBorder,
  textColor,
  messageBoxColor,
  text,
  setText,
  scrollbarRef,
  textShade,
  messageBoxShade,
  headerShade,
  voiceChatOption,
  feedbackOption,
  chatHistoryOption,
}: Props) {
  const getColorClass = (color: string, shade: number, prefix: string) => {
    const shades: { [key: string]: string } = {
      '900': `${prefix}-900`,
      '800': `${prefix}-800`,
      '700': `${prefix}-700`,
      '600': `${prefix}-600`,
      '500': `${prefix}-500`,
      '400': `${prefix}-400`,
      '300': `${prefix}-300`,
      '200': `${prefix}-200`,
      '100': `${prefix}-100`,
      '50': `${prefix}-50`,
      '0': `${prefix}-white`,
    };

    const defaultShade = color === 'green' ? 'text-gray-50' : `${prefix}-500`;
    return shades[shade.toString()] || defaultShade;
  };

  const getHeaderColorClass = (color: string, shade: number) => {
    const colorPrefix = color === 'white' ? 'bg-gray' : `bg-${color}`;

    return getColorClass(color, shade, colorPrefix);
  };

  const getChatBubbleColorClass = (color: string, shade: number) => {
    if (!color) return 'bg-gray-500';
    const colorPrefix = color === 'white' ? 'bg-gray' : `bg-${color}`;
    return getColorClass(color, shade, colorPrefix);
  };

  const getTextColorClass = (color: string, shade: number) => {
    if (!color) return 'bg-gray-500';
    const colorPrefix =
      color === 'white' || color === 'black' ? 'text-gray' : `text-${color}`;
    return getColorClass(color, shade, colorPrefix);
  };

  return (
    <div className=" relative flex w-full flex-col overflow-hidden rounded-lg border bg-white pb-5 shadow-lg lg:h-full">
      <nav
        className={cn(
          ' flex justify-between pb-5 pl-8 pr-5 pt-5',
          // getTextColorClass(textColor, textShade),
          getHeaderColorClass(hearderColor, headerShade),
        )}
      >
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-xl font-bold ">Chat</h2>
          {chatHistoryOption ? (
            <button>
              <HamburgerMenuIcon className="mt-1 h-4 w-4" />
            </button>
          ) : null}
        </div>

        <button type="button" className="">
          <Cross1Icon className="h-4 w-4" />
        </button>
      </nav>
      <hr className="border-t-1 rounded-full border-gray-300" />
      <Scrollbars
        ref={scrollbarRef}
        className="max-f-full flex min-h-[500px] flex-1 flex-col gap-3 overflow-auto scroll-smooth py-3 max-lg:max-h-96"
      >
        <div className=" flex min-h-full items-end">
          <div className="px-8">
            {chatDataWithBot.map((chatData, _idx) => (
              <div
                key={`${_idx + 1}`}
                className={cn(
                  chatData.sender === 'user' ? 'justify-end' : 'justify-start',
                  'mb-4 flex pt-4',
                  messageAlignment === 'horizontal'
                    ? chatData.sender === 'user'
                      ? 'flex-row-reverse'
                      : 'flex-row'
                    : 'flex-col',
                )}
              >
                <div
                  className={cn(
                    'mx-2 flex items-center gap-2 py-1',
                    chatData.sender === 'user'
                      ? 'justify-end'
                      : 'justify-start',
                  )}
                >
                  {chatData.sender !== 'user' && (
                    <CpuChipIcon className="h-6 w-6 rounded-full object-cover text-blue-500" />
                  )}
                  <span
                    className={cn(
                      'text-sm font-semibold text-gray-700',
                      messageAlignment === 'horizontal' ? 'hidden' : '',
                    )}
                  >
                    {chatData.sender === 'user' ? chatData.name : 'Bot'}
                  </span>
                  <span />
                  {chatData.sender === 'user' && (
                    <img
                      src="/img/me_anime.jpg"
                      alt="user"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  )}
                </div>
                <div
                  className={cn(
                    'sm ml-2  rounded-lg p-2 text-sm',
                    messageShadow === 'none' && '',
                    messageShadow === 'outer' && 'shadow-sm',
                    messageShadow === 'inner' && ' shadow-outline',
                    messageBorder && 'border border-gray-200',
                    getTextColorClass(textColor, textShade),
                    getChatBubbleColorClass(messageBoxColor, messageBoxShade),
                  )}
                >
                  <span>{chatData.text}</span>

                  {feedbackOption && chatData.sender === 'bot' ? (
                    <div className="mt-3 flex gap-1">
                      <svg
                        className="h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        className="h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M11.873 21.496a1 1 0 0 1-.992.496l-.454-.056A4 4 0 0 1 7.1 16.79L7.65 15h-.718c-2.637 0-4.553-2.508-3.859-5.052l1.364-5A4 4 0 0 1 8.296 2h9.709a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-2c-.26 0-.5.14-.628.364zM14.005 4h-5.71a2 2 0 0 0-1.929 1.474l-1.363 5A2 2 0 0 0 6.933 13h2.072a1 1 0 0 1 .955 1.294l-.949 3.084a2 2 0 0 0 1.462 2.537l3.167-5.543a2.72 2.72 0 0 1 1.364-1.182V5a1 1 0 0 0-1-1m3 9V5c0-.35-.06-.687-.171-1h1.17a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scrollbars>
      <div className="flex items-center justify-between gap-2 bg-white px-5 ">
        {voiceChatOption ? (
          <div className="rounded-full bg-red-600 p-2">
            <MicrophoneIcon className="h-6 w-6 text-gray-200" />
          </div>
        ) : null}
        <div className="relative flex w-full rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none">
          <input
            disabled
            type="text"
            className="w-full rounded-lg bg-white p-2 text-gray-600 focus:outline-none"
            placeholder="Enter Qustion"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="button">
            <PaperAirplaneIcon className="mr-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
