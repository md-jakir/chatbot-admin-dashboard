/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeModal } from '@/redux/features/sidebar/modalConfig';
import useWidgetConfig from '@/hooks/useWidgetConfig';
import Label from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import WidgetPreview from '../chatbot/widget/preview/WidgetPreview';
import MessageSettings from '../chatbot/widget/MessageSettings';
import ColorSettings from '../chatbot/widget/ColorSettings';
import OthersConfiguration from '../chatbot/widget/OthersConfiguration';

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

function WidgetConfigModal() {
  const modalConfig = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const {
    submitWidgetConfig,
    scrollbarRef,
    text,
    setText,
    messageAlignment,
    setMessageAlignment,
    messageShadow,
    setMessageShadow,
    messageBorder,
    setMessageBorder,
    name,
    setName,
    voiceChatOption,
    setVoiceChatOption,
    feedbackOption,
    setFeedbackOption,
    chatHistoryOption,
    setChatHistoryOption,
    textColor,
    setTextColor,
    messageBoxColor,
    setMessageBoxColor,
    hearderColor,
    setHeaderColor,
    textShade,
    setTextShade,
    messageBoxShade,
    setMessageBoxShade,
    headerShade,
    setHeaderShade,
  } = useWidgetConfig();

  return (
    <div>
      <Dialog
        open={modalConfig.isAddOrUpdateModalOpen}
        onOpenChange={() => {
          dispatch(closeModal());
        }}
      >
        <DialogContent className=" max-w-screen max-h-screen gap-1 overflow-auto lg:max-w-5xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="ml-2">
              {modalConfig.id ? 'Update ' : 'Add '}Widget Configuration
            </DialogTitle>
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

              <div className="flex flex-col gap-2">
                <div>
                  <Label>Theme Name</Label>
                  <Input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    name="name"
                    type="text"
                    defaultValue=""
                    placeholder="Theme 1"
                  />{' '}
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <Button
                    variant="outline"
                    className=" w-full"
                    onClick={() => {
                      dispatch(closeModal());
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    className=" w-full"
                    onClick={() => {
                      submitWidgetConfig();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WidgetConfigModal;
