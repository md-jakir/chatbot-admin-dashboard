import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import {
  useAddNewWidgetConfigMutation,
  useGetSingleWidgetConfigQuery,
  useUpdateWidgetConfigMutation,
} from '@/redux/features/widgetConfig/widgetConfig.api';
import useResponseHandler from '@/healpers/responseHelper';
import { toast } from '@/components/ui/use-toast';

const useWidgetConfig = () => {
  const modalConfig = useSelector((state: RootState) => state.modal);

  const { data }: any = useGetSingleWidgetConfigQuery(modalConfig.id, {
    skip: !modalConfig.id,
  });

  const responseHandler = useResponseHandler();
  const [addWidgetConfig] = useAddNewWidgetConfigMutation();
  const [updateWidgetConfig] = useUpdateWidgetConfigMutation();

  const scrollbarRef = React.useRef<Scrollbars>(null);
  const [text, setText] = React.useState('');
  const [messageAlignment, setMessageAlignment] = React.useState<
    'vertical' | 'horizontal'
  >('vertical');

  const [messageShadow, setMessageShadow] = React.useState<
    'outer' | 'inner' | 'none'
  >('outer');

  const [messageBorder, setMessageBorder] = React.useState(false);

  const [name, setName] = React.useState<string>('');

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
    if (modalConfig.id && data) {
      setText('');
      setMessageAlignment(data?.message_alignment);
      setMessageShadow(data?.bubble_shadow);
      setMessageBorder(data?.bubble_border);
      setName(data?.name);
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
      setName('');
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
  }, [modalConfig.isAddOrUpdateModalOpen, modalConfig.id, data]);

  //   React.useEffect(() => {
  //     refetch();
  //   }, [modalConfig.isAddOrUpdateModalOpen, refetch]);

  const submitWidgetConfig = async () => {
    if (name === '') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a name for the widget configuration',
      });
      return;
    }
    const structuralData = {
      name,
      message_alignment: messageAlignment,
      message_shadow: messageShadow,
      bubble_border: messageBorder,
      text_color: textColor,
      bubble_color: messageBoxColor,
      bubble_shadow: messageShadow,
      header_color: hearderColor,
      text_shade: textShade,
      bubble_shade: messageBoxShade,
      header_shade: headerShade,
      voice_chat_option: voiceChatOption,
      feedback_option: feedbackOption,
      chat_history_option: chatHistoryOption,
    };

    if (modalConfig.id) {
      await responseHandler(
        updateWidgetConfig({
          id: modalConfig.id,
          data: structuralData,
        }),
        'Widget updated successfully',
      );
    } else {
      await responseHandler(
        addWidgetConfig({
          data: structuralData,
        }),
      );
    }
  };

  return {
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
  };
};

export default useWidgetConfig;
