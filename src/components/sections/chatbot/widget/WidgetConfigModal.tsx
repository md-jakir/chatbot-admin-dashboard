/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import SelectWidgetConfig from '@/components/form/SelectWidgetConfig';
import { useGetSingleWidgetConfigQuery } from '@/redux/features/widgetConfig/widgetConfig.api';
import WidgetPreview from './preview/WidgetPreview';
import MessageSettings from './MessageSettings';
import ColorSettings from './ColorSettings';
import OthersConfiguration from './OthersConfiguration';
import CodeSnippet from './preview/CodeSnippet';

const chatDataWithBot = [
  {
    id: 1,
    sender: 'user',
    name: 'Jacob Jones',
    text: 'What types of shower products does Nikles manufact and supply?',
  },
  {
    id: 2,
    sender: 'bot',
    text: 'Nikles manufactures and supplies a range of shower products such as hand showers, shower heads, slide bars, shower systems, and kitchen sprays.',
  },
  {
    id: 1,
    sender: 'user',
    name: 'Jacob Jones',
    text: 'What types of shower products does Nikles manufacture and supply?',
  },
  {
    id: 2,
    sender: 'bot',
    text: 'Nikles manufactures and supplies a range of shower products such as hand showers, shower heads, slide bars, shower systems, and kitchen sprays.',
  },
];

function WidgetConfigModal({
  chatbotId,
  isWidgetConfigModalOpen,
  handleWidgetConfigModal,
}: {
  chatbotId: number | null;
  isWidgetConfigModalOpen: boolean;
  handleWidgetConfigModal: () => void;
}) {
  const [configId, setConfigId] = React.useState<string | null>(null);

  const { data }: any = useGetSingleWidgetConfigQuery(configId, {
    skip: !configId,
  });
  const scrollbarRef = React.useRef<Scrollbars>(null);
  const [text, setText] = React.useState('');
  const [messageAlignment, setMessageAlignment] = React.useState<
    'vertical' | 'horizontal'
  >('vertical');

  const [messageShadow, setMessageShadow] = React.useState<
    'outer' | 'inner' | 'none'
  >('outer');

  const [messageBorder, setMessageBorder] = React.useState(false);

  const [voiceChatOption, setVoiceChatOption] = React.useState(true);
  const [feedbackOption, setFeedbackOption] = React.useState(false);
  const [chatHistoryOption, setChatHistoryOption] = React.useState(false);

  const [textColor, setTextColor] = React.useState<'white' | 'black'>('black');
  const [messageBoxColor, setMessageBoxColor] = React.useState<
    'white' | 'blue' | 'red' | 'green'
  >('white');

  const [hearderColor, setHeaderColor] = React.useState<
    'white' | 'blue' | 'red' | 'green'
  >('white');

  const [textShade, setTextShade] = React.useState(700);
  const [messageBoxShade, setMessageBoxShade] = React.useState(0);
  const [headerShade, setHeaderShade] = React.useState(0);

  React.useEffect(() => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollToBottom();
    }
  }, [scrollbarRef]);

  React.useEffect(() => {
    if (configId && data) {
      setText('');
      setMessageAlignment(data?.message_alignment);
      setMessageShadow(data?.bubble_shadow);
      setMessageBorder(data?.bubble_border);

      setVoiceChatOption(data?.voice_chat_option);
      setFeedbackOption(data?.feedback_option);
      setChatHistoryOption(data?.chat_history_option);
      setTextColor(data?.text_color);
      setMessageBoxColor(data?.bubble_color);
      setHeaderColor(data?.header_color);
      setTextShade(data?.text_shade);
      setMessageBoxShade(data?.bubble_shade);
      setHeaderShade(data?.header_shade);
    } else {
      setText('');
      setMessageAlignment('vertical');
      setMessageShadow('outer');
      setMessageBorder(false);
      setVoiceChatOption(true);
      setFeedbackOption(false);
      setChatHistoryOption(false);
      setTextColor('black');
      setMessageBoxColor('white');
      setHeaderColor('white');
      setTextShade(700);
      setMessageBoxShade(0);
      setHeaderShade(0);
    }

    document.body.style.pointerEvents = '';
  }, [configId, data]);

  const selectExistingThemeHandler = async (id: string) => {
    setConfigId(id);
  };

  return (
    <div>
      <Dialog
        open={isWidgetConfigModalOpen}
        onOpenChange={() => {
          handleWidgetConfigModal();
        }}
      >
        <DialogContent className=" max-w-screen max-h-screen gap-1 overflow-auto lg:max-w-5xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="ml-2">Widget Configuration</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5 md:flex-row">
            <div className=" mx-auto overflow-auto max-md:w-[400px] max-sm:w-full md:flex-1">
              <WidgetPreview
                chatDataWithBot={chatDataWithBot}
                messageAlignment={messageAlignment}
                messageShadow={messageShadow}
                messageBorder={messageBorder}
                textColor={textColor}
                messageBoxColor={messageBoxColor}
                hearderColor={hearderColor}
                text={text}
                setText={setText}
                scrollbarRef={scrollbarRef}
                textShade={textShade}
                messageBoxShade={messageBoxShade}
                headerShade={headerShade}
                voiceChatOption={voiceChatOption}
                feedbackOption={feedbackOption}
                chatHistoryOption={chatHistoryOption}
              />
            </div>

            <div className="flex-1 rounded-md border px-5 py-2 shadow-md">
              <div className=" flex justify-end">
                <SelectWidgetConfig
                  changeThemeHandler={selectExistingThemeHandler}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="mb-8 mt-4 flex flex-col justify-between gap-1">
                    <MessageSettings
                      messageAlignment={messageAlignment}
                      setMessageAlignment={setMessageAlignment}
                      messageShadow={messageShadow}
                      setMessageShadow={setMessageShadow}
                      messageBorder={messageBorder}
                      setMessageBorder={setMessageBorder}
                      scrollbarRef={scrollbarRef}
                    />
                  </div>
                  <div className="mb-8 mt-4 flex flex-col justify-between gap-1">
                    <OthersConfiguration
                      voiceChatOption={voiceChatOption}
                      setVoiceChatOption={setVoiceChatOption}
                      feedbackOption={feedbackOption}
                      setFeedbackOption={setFeedbackOption}
                      chatHistoryOption={chatHistoryOption}
                      setChatHistoryOption={setChatHistoryOption}
                      scrollbarRef={scrollbarRef}
                    />
                  </div>
                </div>

                {/* color */}
                <div className=" flex flex-col justify-between gap-1">
                  <ColorSettings
                    textColor={textColor}
                    setTextColor={setTextColor}
                    messageBoxColor={messageBoxColor}
                    setMessageBoxColor={setMessageBoxColor}
                    hearderColor={hearderColor}
                    setHeaderColor={setHeaderColor}
                    scrollbarRef={scrollbarRef}
                    textShade={textShade}
                    setTextShade={setTextShade}
                    messageBoxShade={messageBoxShade}
                    setMessageBoxShade={setMessageBoxShade}
                    headerShade={headerShade}
                    setHeaderShade={setHeaderShade}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <CodeSnippet
              config={{
                chatbot_id: chatbotId || 0,
                messageAlignment,
                messageShadow,
                messageBorder,
                messageBoxColor,
                messageBoxShade,
                textColor,
                textShade,

                hearderColor,
                headerShade,

                voiceChatOption,
                feedbackOption,
                chatHistoryOption,
              }}
            />
          </div>
          <div className=" mt-5 flex justify-end">
            <Button
              variant="outline"
              className=" w-40"
              onClick={() => {
                handleWidgetConfigModal();
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WidgetConfigModal;
