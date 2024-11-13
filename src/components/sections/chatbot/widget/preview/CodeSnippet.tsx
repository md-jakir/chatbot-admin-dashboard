import { Button } from '@/components/ui/button';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import React, { CSSProperties, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

const theme: { [key: string]: CSSProperties } = {
  'hljs-comment': {
    color: '#d4d0ab',
  },
  'hljs-quote': {
    color: '#d4d0ab',
  },
  'hljs-variable': {
    color: '#ffa07a',
  },
  'hljs-template-variable': {
    color: '#ffa07a',
  },
  'hljs-tag': {
    color: '#ffa07a',
  },
  'hljs-name': {
    color: '#ffa07a',
  },
  'hljs-selector-id': {
    color: '#ffa07a',
  },
  'hljs-selector-class': {
    color: '#ffa07a',
  },
  'hljs-regexp': {
    color: '#ffa07a',
  },
  'hljs-deletion': {
    color: '#ffa07a',
  },
  'hljs-number': {
    color: '#f5ab35',
  },
  'hljs-built_in': {
    color: '#f5ab35',
  },
  'hljs-builtin-name': {
    color: '#f5ab35',
  },
  'hljs-literal': {
    color: '#f5ab35',
  },
  'hljs-type': {
    color: '#f5ab35',
  },
  'hljs-params': {
    color: '#f5ab35',
  },
  'hljs-meta': {
    color: '#f5ab35',
  },
  'hljs-link': {
    color: '#f5ab35',
  },
  'hljs-attribute': {
    color: '#ffd700',
  },
  'hljs-string': {
    color: '#abe338',
  },
  'hljs-symbol': {
    color: '#abe338',
  },
  'hljs-bullet': {
    color: '#abe338',
  },
  'hljs-addition': {
    color: '#abe338',
  },
  'hljs-title': {
    color: '#00e0e0',
  },
  'hljs-section': {
    color: '#00e0e0',
  },
  'hljs-keyword': {
    color: '#dcc6e0',
  },
  'hljs-selector-tag': {
    color: '#dcc6e0',
  },
  hljs: {
    display: 'block',
    overflowX: 'auto',
    background: '#2b2b2b',
    color: '#f8f8f2',
    padding: '0.5em',
    borderRadius: '0.3em',
  },
  'hljs-emphasis': {
    fontStyle: 'italic',
  },
  'hljs-strong': {
    fontWeight: 'bold',
  },
};

function CodeSnippet({
  config,
}: {
  config: {
    chatbot_id: number;
    messageAlignment: string;
    messageShadow: string;
    messageBorder: boolean;
    messageBoxColor: string;
    messageBoxShade: number;
    textColor: string;
    textShade: number;
    hearderColor: string;
    headerShade: number;
    voiceChatOption: boolean;
    feedbackOption: boolean;
    chatHistoryOption: boolean;
  };
}) {
  const [copySuccess, setCopySuccess] = useState('');

  const codeSnippet = `
  <script
    src="${process.env.NEXT_PUBLIC_BASE_URL}/widgets/script.js"
    chatbot_id="${config.chatbot_id}"
    bubbleBorder="${config.messageBorder}"
    bubbleAlignment="${config.messageAlignment}"
    voice="${config.voiceChatOption}"
    feedback="${config.feedbackOption}"
    headerColor="${config.hearderColor}"
    headerColorShade="${config.headerShade}"
    buddleColor="${config.messageBoxColor}"
    buddleColorShade="${config.messageBoxShade}"
    textColor="${config.textColor}"
    textColorShade="${config.textShade}"
    chatHistory="${config.chatHistoryOption}"
    defer
  ></script>
  `;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet).then(
      () => setCopySuccess('Copied!'),
      () => setCopySuccess('Failed to copy'),
    );
  };

  return (
    <div className="relative mt-4">
      <SyntaxHighlighter language="javascript" style={theme}>
        {codeSnippet}
      </SyntaxHighlighter>
      <Button
        className=" absolute right-1 top-1 text-white hover:bg-transparent hover:text-gray-200"
        variant="ghost"
        onClick={copyToClipboard}
      >
        <ClipboardDocumentIcon className="mr-1 h-4 w-4" />{' '}
        {copySuccess ? <p>{copySuccess}</p> : <p>Copy</p>}
      </Button>
    </div>
  );
}

export default CodeSnippet;
