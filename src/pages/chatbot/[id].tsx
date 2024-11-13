'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import Separator from '@/components/ui/separator';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { cn, generateRandomId } from '@/lib/utils';
import ChatbotInputBox from '@/components/sections/chatbot/ChatbotInputBox';

import { useGetSingleAdminQuery } from '@/redux/features/admin/admin.api';
import { useGetSingleChatbotQuery } from '@/redux/features/chatbot/chatbot.api';
import {
  ChevronLeftIcon,
  CpuChipIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  MicrophoneIcon,
  PauseCircleIcon,
  SpeakerWaveIcon,
  UserCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fetchEventSource } from '@microsoft/fetch-event-source';

interface Conversation {
  id: number;
  content: string;
  sender: string;
  isSpeaking?: boolean;
}

function Chatbot() {
  const router = useRouter();
  const { id } = router.query;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<Conversation[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [voiceRecognitionActive, setVoiceRecognitionActive] = useState(false);
  const [transcriptStarted, setTranscriptStarted] = useState(false);
  const [isSpeakerWaveAlt, setIsSpeakerWaveAlt] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const sessionIDRef = useRef<string | null>(null);

  const {
    data: session,
  }: {
    data: any;
  } = useSession();

  const { data: profile } = useGetSingleAdminQuery<any>(
    session?.user?.id as number,
    {
      skip: !session?.user?.id,
    },
  );

  const { data, isLoading, isError } = useGetSingleChatbotQuery<any>(id, {
    skip: !id,
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    setConversation([]);
    if (data?.sample_qustion.length <= 0) {
      setTimeout(() => {
        setConversation((current) => [
          ...current,
          {
            id: current.length + 1,
            content: data.gretting_message,
            sender: 'bot',
          },
        ]);
      }, 500);

      setTimeout(() => {
        setConversation((current) => [
          ...current,
          {
            id: current.length + 1,
            content: 'How can I assist you today?',
            sender: 'bot',
          },
        ]);
      }, 1000);
    }
    if (isError) {
      setConversation((current) => [
        ...current,
        {
          id: current.length + 1,
          content: 'Sorry, I am unable to fetch the data',
          sender: 'bot',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, sessionIDRef.current, isError]);

  useEffect(() => {
    if (!sessionIDRef.current) {
      sessionIDRef.current = generateRandomId();
    }
  }, []);

  const fetchData = useCallback(
    async (que: string) => {
      try {
        const raw = JSON.stringify({
          question: que,
          chatbot_id: data?.id.toString(),
          token: sessionIDRef.current,
          user_id: profile?.data.id,
        });
        setLoading(true);

        // console.log(raw)

        let newMessage = '';
        let boldOpen = false;
        let boldOpenByAsteric = false;

        await fetchEventSource(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/chatbot/chat`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: raw,
            onmessage(event) {
              setLoading(false);
              let chankData = event.data
                .trim()
                .replace(/^data: /, '')
                .replace(/" "/g, '')
                .replace(/^"/, '')
                .replace(/"$/, '')
                .replace(/\\u/g, '')
                .replace(/\\n/g, '<br />');

              if (chankData.trim().includes('\\"')) {
                if (boldOpen) {
                  chankData = ' </b> ';
                  boldOpen = false;
                } else {
                  chankData = ' <b> ';
                  boldOpen = true;
                }
              }
              if (chankData.trim().includes('**')) {
                if (boldOpenByAsteric) {
                  chankData = ' </b><br /><br /> ';
                  boldOpenByAsteric = false;
                } else {
                  chankData = ' <b> ';
                  boldOpenByAsteric = true;
                }
              }
              newMessage += chankData;
              setMessage((prevValue) => `${prevValue}${chankData} `);
            },
            onclose() {
              // console.log('Connection closed by the server');
            },
            onerror(_err) {
              // console.log('There was an error from server', err);
            },
          },
        );

        setConversation((current) => [
          ...current,
          {
            id: current.length + 1,
            content: newMessage,
            sender: 'bot',
          },
        ]);

        setMessage('');
      } catch (error) {
        setConversation((current) => [
          ...current,
          {
            id: current.length + 1,
            content: 'Sorry, I am unable to fetch the data',
            sender: 'bot',
          },
        ]);
      }
    },
    [data?.id, profile?.data.id],
  );

  const handleSubmit = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const isBlank = input.trim().length === 0;

    if (!isBlank) {
      setConversation((current) => [
        ...current,
        { id: current.length + 1, content: input, sender: 'user' },
      ]);

      fetchData(input);
      setInput('');

      // setConversation((current) => [
      //   ...current,
      //   {
      //     id: current.length + 1,
      //     content: result.response,
      //     sender: "bot",
      //   },
      // ]);
    }
  };

  const sendQusFromSampleQustion = async (qus: string) => {
    setConversation((current) => [
      ...current,
      { id: current.length + 1, content: qus, sender: 'user' },
    ]);
    fetchData(qus);
    setInput('');
  };

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  const stopListening = useCallback(() => {
    // SpeechRecognition.stopListening({
    //   continuous: false,
    // });
    SpeechRecognition.stopListening();
    setVoiceRecognitionActive(false);
    resetTranscript();
    setInput('');
  }, [resetTranscript]);

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB',
    });
  };

  const abortListening = useCallback(() => {
    SpeechRecognition.abortListening();
    setVoiceRecognitionActive(false);
    resetTranscript();
    setInput('');
  }, [resetTranscript]);

  useEffect(() => {
    if (listening) {
      setInput(transcript);
    } else {
      setInput('');
    }
  }, [listening, transcript]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // const handleSpeechChange = () => {
    //   if (transcript || interimTranscript) {
    //     clearTimeout(timeoutId);
    //   }
    // };

    const timeoutCallback = () => {
      stopListening();
      resetTranscript();
      setVoiceRecognitionActive(false);
      setInput('');
    };

    if (listening) {
      timeoutId = setTimeout(timeoutCallback, 5000);
    }

    // SpeechRecognition.onSpeechChange = handleSpeechChange;

    return () => {
      clearTimeout(timeoutId);
      // SpeechRecognition.onSpeechChange = null;
    };
  }, [
    listening,
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    stopListening,
    setVoiceRecognitionActive,
  ]);

  useEffect(() => {
    if (finalTranscript) {
      setInput(finalTranscript);
      setLoading(true);

      setConversation((current) => [
        ...current,
        { id: current.length + 1, content: finalTranscript, sender: 'user' },
      ]);

      fetchData(finalTranscript);
      setInput('');
      abortListening();
    }
  }, [
    finalTranscript,
    resetTranscript,
    abortListening,
    stopListening,
    fetchData,
  ]);

  const toggleVoiceRecognition = () => {
    if (voiceRecognitionActive) {
      stopListening();
      resetTranscript();
    } else {
      startListening();
    }
    setVoiceRecognitionActive(!voiceRecognitionActive);
  };

  useEffect(() => {
    if (transcript && !transcriptStarted) {
      setTranscriptStarted(true);
    }
  }, [transcript, transcriptStarted]);

  const cancelSpeechSynthesis = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
  };

  const handleUnload = useCallback(() => {
    cancelSpeechSynthesis();
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      cancelSpeechSynthesis();
    };
  }, [handleUnload]);

  const speakText = (text: string, messageId: number) => {
    const synth = window.speechSynthesis;

    // Cancel any existing speech synthesis
    synth.cancel();

    // Create a new utterance instance
    const utterance = new SpeechSynthesisUtterance(text);

    // Set up the onend event handler
    utterance.onend = () => {
      setIsSpeakerWaveAlt(false);
      setIsSpeaking(false);
      setConversation((current) =>
        current.map((msg) =>
          msg.id === messageId ? { ...msg, isSpeaking: false } : msg,
        ),
      );
    };

    // Start speaking
    synth.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsSpeaking(false);
  };

  const toggleSpeakerWaveIcon = (messageId: number, messageContent: string) => {
    setConversation((current) =>
      current.map((msg) =>
        msg.id === messageId ? { ...msg, isSpeaking: !msg.isSpeaking } : msg,
      ),
    );

    if (!isSpeakerWaveAlt && messageContent) {
      speakText(messageContent, messageId);
    } else {
      stopSpeaking();
    }
    setIsSpeakerWaveAlt((prevState) => !prevState);
  };

  const createNewSession = () => {
    sessionIDRef.current = generateRandomId();
    setConversation([]);
  };

  const handleBackToChatbot = () => {
    router.push('/chatbot');
  };
  return (
    <main className="fixed flex h-screen flex-col xl:w-9/12    2xl:w-9/12">
      <div>
        <header className="flex items-center ">
          <div className="flex flex-row items-center">
            {!isLoading ? (
              <button onClick={handleBackToChatbot}>
                <ChevronLeftIcon
                  className="mr-3 h-5 w-5 text-slate-700/80"
                  aria-hidden="true"
                />
              </button>
            ) : (
              ' '
            )}
            <h1 className="text-base font-semibold leading-7 text-slate-700/80 dark:text-slate-200/80">
              {isLoading ? 'Loading...' : data?.name || 'Chatbot'}
            </h1>
            {!isLoading ? (
              <button onClick={createNewSession}>
                <PencilSquareIcon
                  className="ml-3 h-5 w-5 text-slate-700/80"
                  aria-hidden="true"
                />
              </button>
            ) : (
              ' '
            )}
          </div>
        </header>
        <Separator className="mt-2" />
      </div>

      <div className="scrollbar-hide overflow-auto">
        <ul className="divide-dark/5 divide-y dark:divide-white/5">
          {conversation.map((messages) => (
            <li
              key={messages.id}
              className={cn(
                messages.sender === 'bot'
                  ? 'relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8'
                  : 'relative flex items-center space-x-4 bg-black bg-opacity-5  px-4 py-4 dark:bg-white dark:bg-opacity-5 sm:px-6 lg:px-8',
              )}
            >
              <div className="min-w-0  flex-auto">
                <div className="flex items-start gap-x-3">
                  <div>
                    {messages.sender === 'bot' ? (
                      <div>
                        <CpuChipIcon
                          className="h-6 w-6 text-blue-500"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <UserCircleIcon
                        className="h-5 w-5 text-slate-700/80"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <h2 className="min-w-0 text-base font-semibold leading-6 text-slate-700/80 dark:text-slate-200/80">
                    <p className="">
                      <span
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: messages?.content,
                        }}
                      />
                    </p>

                    <div className="flex items-center justify-items-center gap-2">
                      {messages.sender === 'bot' && (
                        <button
                          onClick={() =>
                            toggleSpeakerWaveIcon(messages.id, messages.content)
                          }
                          aria-label="Toggle Speaker Icon"
                        >
                          {messages.isSpeaking ? (
                            <PauseCircleIcon
                              className="fade-icon ml-1 h-3 w-3"
                              aria-hidden="true"
                            />
                          ) : (
                            <SpeakerWaveIcon
                              className="fade-icon ml-1 h-3 w-3"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      )}
                      {messages.sender === 'bot' && (
                        <div className="flex gap-2">
                          <HandThumbUpIcon
                            className="fade-icon ml-1 h-3 w-3"
                            aria-hidden="true"
                          />

                          <HandThumbDownIcon
                            className="fade-icon ml-1 h-3 w-3"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                  </h2>
                </div>
              </div>
            </li>
          ))}
          {message && (
            <li className="relative flex space-x-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-x-3">
                <div>
                  <CpuChipIcon
                    className="h-6 w-6 text-blue-500"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="min-w-0 text-base font-semibold leading-6 text-slate-700/80 dark:text-slate-200/80">
                  {/* eslint-disable-next-line react/no-danger */}
                  <span dangerouslySetInnerHTML={{ __html: message }} />
                </h2>
              </div>
            </li>
          )}
          {loading && (
            <li
              key={9999}
              className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
            >
              <div className="min-w-0 flex-auto">
                <div className="flex items-start gap-x-3">
                  <div>
                    <div>
                      <CpuChipIcon
                        className="h-6 w-6 text-blue-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                    <span className="italic text-gray-600">
                      Generating response...
                    </span>
                    {/* <span className="absolute inset-0" /> */}
                  </h2>
                </div>
              </div>
              <div
                className={cn(
                  'flex-none rounded-full px-2 py-1 text-xs font-medium  text-slate-700/80 ring-1 ring-inset dark:text-slate-200/80',
                )}
              >
                Loading
              </div>

              {/* <Spinner
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  /> */}
              <div
                className="text-surface inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </li>
          )}
        </ul>
        <div className="float-left clear-both" ref={scrollRef} />
      </div>

      <div className="flex-grow overflow-y-auto">
        {data?.sample_qustion.length > 0 && conversation.length === 0 && (
          <div className="mt-4 flex flex-col items-center text-center">
            {isLoading ? (
              <div className="w-full text-center">
                <h2 className="text-lg font-semibold">Loading...</h2>
              </div>
            ) : (
              <div className="scrollbar-hide h-full max-w-2xl overflow-y-auto">
                <h2 className="mb-4 text-xl text-slate-700/80 dark:text-slate-200/80">
                  {data?.gretting_message || 'Welcome to the chatbot'},{' '}
                  {data ? profile?.data?.name : 'Developer Mode'}
                </h2>
                <div className="grid place-items-center gap-5 px-5 md:grid-cols-2 ">
                  {data?.sample_qustion?.map(
                    (item: { id: number; text: string }) => (
                      <button
                        onClick={() => sendQusFromSampleQustion(item.text)}
                        key={item.id}
                        className="max-w-full rounded-lg border border-slate-300/80 p-4 2xl:w-full"
                        style={{ maxWidth: '100%' }}
                      >
                        <h2 className="min-w-0 text-sm leading-6 text-slate-700/80 dark:text-slate-200/80">
                          {item?.text}
                        </h2>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-24">
        {voiceRecognitionActive && !loading && (
          <div className="circle blink absolute -left-1 top-[36px] h-12 w-12 transform cursor-pointer rounded-full bg-gray-500 p-2 opacity-70" />
        )}
        {!loading && (
          <button
            className={`relative top-[40px] w-[40px] cursor-pointer rounded-full p-2 text-2xl text-white transition duration-1000 ease-in-out ${
              voiceRecognitionActive
                ? 'bg-black'
                : 'bg-red-500 hover:bg-white hover:text-red-500'
            }`}
            onClick={toggleVoiceRecognition}
            disabled={isSpeaking}
          >
            <MicrophoneIcon />
          </button>
        )}

        {loading && (
          <div
            className="relative top-[40px] w-[40px] rounded-full bg-red-500 p-2 text-2xl text-white opacity-70"
            style={{ pointerEvents: 'none' }}
          >
            <MicrophoneIcon />
          </div>
        )}
        <div className="relative ml-[53px]">
          <ChatbotInputBox
            handleSubmit={handleSubmit}
            input={input}
            setInput={setInput}
            disabled={isSpeaking}
          />
        </div>
      </div>
    </main>
  );
}

Chatbot.layout = 'dashboard';
export default Chatbot;
