
/* eslint-disable */
const getColor = (e, t) => {
    if ('green' === e) {
      if ('50' === t) return '#f0fdf4';
      if ('100' === t) return '#dcfce7';
      if ('200' === t) return '#bbf7d0';
      else if ('300' === t) return '#86efac';
      else if ('400' === t) return '#4ade80';
      else if ('500' === t) return '#22c55e';
      else if ('600' === t) return '#16a34a';
      else if ('700' === t) return '#15803d';
      else if ('800' === t) return '#166534';
      else if ('900' === t) return '#14532d';
    } else if ('blue' === e) {
      if ('50' === t) return '#eff6ff';
      if ('100' === t) return '#dbeafe';
      if ('200' === t) return '#bfdbfe';
      else if ('300' === t) return '#93c5fd';
      else if ('400' === t) return '#60a5fa';
      else if ('500' === t) return '#3b82f6';
      else if ('600' === t) return '#2563eb';
      else if ('700' === t) return '#1d4ed8';
      else if ('800' === t) return '#1e40af';
      else if ('900' === t) return '#1e3a8a';
    } else if ('red' === e) {
      if ('50' === t) return '#fef2f2';
      if ('100' === t) return '#fee2e2';
      if ('200' === t) return '#fecaca';
      else if ('300' === t) return '#fca5a5';
      else if ('400' === t) return '#f87171';
      else if ('500' === t) return '#ef4444';
      else if ('600' === t) return '#dc2626';
      else if ('700' === t) return '#b91c1c';
      else if ('800' === t) return '#991b1b';
      else if ('900' === t) return '#7f1d1d';
    } else if ('white' === e || 'black' === e) {
      if ('50' === t) return '#ffffff';
      if ('100' === t) return '#f3f4f6';
      if ('200' === t) return '#e5e7eb';
      else if ('300' === t) return '#d1d5db';
      else if ('400' === t) return '#9ca3af';
      else if ('500' === t) return '#6b7280';
      else if ('600' === t) return '#52525b';
      else if ('700' === t) return '#3f3f46';
      else if ('800' === t) return '#1f2937';
      else if ('900' === t) return '#000000';
    }
  },
  chatbot_id = document.currentScript.getAttribute('chatbot_id') || '34',
  user_id = document.currentScript.getAttribute('user_id') || '83';
'' === chatbot_id && console.error('Chatbot ID is required');
const bubbleBoxShadow =
    document.currentScript.getAttribute('bubbleBoxShadow') || 'outer',
  bubbleBorder = document.currentScript.getAttribute('bubbleBorder') || 'false',
  bubbleAlignment =
    document.currentScript.getAttribute('bubbleAlignment') || 'horizontal',
  isVoiceChatActive = document.currentScript.getAttribute('voice') || !1,
  isFeedbackActive = document.currentScript.getAttribute('feedback') || !1,
  headerColor = document.currentScript.getAttribute('headerColor') || 'white',
  headerColorShade =
    document.currentScript.getAttribute('headerColorShade') || '100',
  buddleColor = document.currentScript.getAttribute('buddleColor') || 'white',
  buddleColorShade =
    document.currentScript.getAttribute('buddleColorShade') || '100',
  textColor = document.currentScript.getAttribute('textColor') || 'black',
  textColorShade =
    document.currentScript.getAttribute('textColorShade') || '700',
  voiceIndicator = isVoiceChatActive
    ? `<div
            style="
              border-radius: 9999px;
              width: 40px;
              height: 40px;
              color: #fff;
              background-color: #dc2626;
              padding: 0.5rem;
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              class="h-6 w-6 text-gray-200"
            >
              <path
                d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z"
              ></path>
              <path
                d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z"
              ></path>
            </svg>
          </div>`
    : '<span></span>',
  feedbackButtons = isFeedbackActive
    ? `<div class="mt-3 flex gap-1">
   <svg class="h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path>
   </svg>
   <svg class="h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path fill="currentColor" fill-rule="evenodd" d="M11.873 21.496a1 1 0 0 1-.992.496l-.454-.056A4 4 0 0 1 7.1 16.79L7.65 15h-.718c-2.637 0-4.553-2.508-3.859-5.052l1.364-5A4 4 0 0 1 8.296 2h9.709a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-2c-.26 0-.5.14-.628.364zM14.005 4h-5.71a2 2 0 0 0-1.929 1.474l-1.363 5A2 2 0 0 0 6.933 13h2.072a1 1 0 0 1 .955 1.294l-.949 3.084a2 2 0 0 0 1.462 2.537l3.167-5.543a2.72 2.72 0 0 1 1.364-1.182V5a1 1 0 0 0-1-1m3 9V5c0-.35-.06-.687-.171-1h1.17a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1z" clip-rule="evenodd"></path>
   </svg>
</div>`
    : '';
document.body.innerHTML += `<div>
    <!-- <div class="loader"></div> -->
    <button style="z-index: 50" class="chatbot-toggler">
      <svg
        style="padding: 4px"
        width="40px"
        height="40px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 12H8.01M12 12H12.01M16 12H16.01M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
          fill="#fff"
        />
      </svg>
    </button>
    <div class="chatbot">
      <header style="background: ${getColor(headerColor, headerColorShade)};">
        <h2>Chat</h2>
        <button
          style="
            background: none;
            border: none;
            cursor: pointer;
            font-size: large;
          "
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
          >
            <path
              d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </header>
      <hr
        style="
          border-top-width: 1px;
          border-top-style: solid;
          border-top-color: hsl(214.3 31.8% 91.4%);
        "
      />
      <div
        class="chatbox"
        style="
          position: relative;
          padding-bottom: 10px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
        "
      >
        <div
          id="chatbot__welcome_animation"
          style="
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 85%;
            transform: translate(-50%, 0);
            margin: auto;
          "
        >
          <div id="chatbot__sample_qustion" >
          
            </div>
          
         
        </div>
        <div
          id="chatbot__conversation"
          style="
            width: 100%;
            margin-top: auto;
            max-height: 100%;
            overflow: auto;
            padding: 0 2rem 0 2rem;
          "
        ></div>
      </div>
      <div style="width: 100%">
        <form class="chat-input" action="">
          ${voiceIndicator}
          
          <div
            style="
              flex: 1 1 0%;
              display: flex;
              align-items: center;
              border: 1px solid hsl(214.3 31.8% 91.4%);
              border-radius: 10px;
            "
          >
            <input placeholder="Enter a message..." />
            <svg
              id="send-btn"
              style="
                width: 1.5rem;
                height: auto;
                margin-right: 0.75rem;
                cursor: pointer;
              "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              class="mr-2 h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              ></path>
            </svg>
          </div>
        </form>
      </div>
    </div>

    <!-- <div
      id="overlay"
      style="
        height: 100vh;
        width: 100vw;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
      "
      class="overlay"
    /> -->
  </div>`;
const style = document.createElement('style');
(style.innerHTML = `
.chatbot-toggler {
        position: fixed;
        bottom: 30px;
        right: 35px;
        outline: none;
        border: none;
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        border-radius: 50%;
        background: #585979;
        transition: all 0.2s ease;
      }

      .show-chatbot .chatbot-toggler {
        transform: rotate(90deg);
      }

      .chatbot-toggler svg {
        position: absolute;
      }

      .show-chatbot .chatbot-toggler svg:first-child,
      .chatbot-toggler svg:last-child {
        opacity: 0;
      }

      .show-chatbot .chatbot-toggler svg:last-child {
        opacity: 1;
      }

      .chatbot {
        font-family: "Inter", sans-serif;
        position: fixed;
        z-index: 999;
        width: 380px;
        right: 35px;
        bottom: 90px;
        transform: scale(0.5);
        opacity: 0;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 0.5rem;
        border: hsl(214.3 31.8% 91.4%);
        border-width: 1px;
        border-style: solid;
        background-color: #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding-bottom: 1.25rem;

      }

      hr {
        border: hsl(214.3 31.8% 91.4%);
      }

      .show-chatbot .chatbot {
        transform: scale(1);
        opacity: 1;
        pointer-events: auto;
      }

      .chatbot header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 1.25rem; /* 5 */
        padding-left: 2rem; /* 8 */
        padding-right: 1.25rem; /* 5 */
        padding-top: 1.25rem; /* 5 */
        background-color: #ffffff; /* white */
        color: rgba(56, 56, 56, 0.9); /* text-gray-900/90 */
      }

      .chatbot header h2 {
        font-size: 1.5rem; /* text-xl */
        font-weight: 700; /* font-bold */
      }

      .chatbot .chatbox {
        height: 440px;
        overflow-y: auto;
        width: 100%;
      }

      .chatbot .chat__bubble {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 0.75rem;
        
      }

      .incoming {
        flex-direction: ${'horizontal' === bubbleAlignment ? 'row' : 'column'};
        justify-content: flex-start;
      }

      .outgoing {
        flex-direction: ${'horizontal' === bubbleAlignment ? 'row-reverse' : 'column'};
        justify-content: flex-end;
      }

      .chatbot .chat__bubble___header {
        // margin-left: 0.5rem;
        // margin-right: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        justify-content: flex-start;
      }
      .chatbot .chat__bubble___header svg {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 9999px;
        object-fit: cover;
        color: #3b82f6;
      }

      .chatbot .chat__bubble___header .chatbot__user__name {
        font-size: 0.875rem;
        font-weight: 600;
        color: #374151;
        display: ${'horizontal' === bubbleAlignment ? 'none' : 'block'};
      }

      .outgoing .chatbot__user__name {
        color: #3b82f6;
      }

     
      #chatbot__conversation::-webkit-scrollbar {
        width: 6px;
      }

      .chat__bubble___text {
        background-color: ${getColor(buddleColor, buddleColorShade)} !important;
        color: ${getColor(textColor, textColorShade)} !important;
      }

      #chatbot__conversation::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2); /* color of the scrollbar thumb */
        border-radius: 10px;
        cursor: pointer;
      }

      .outgoing .chat__bubble___header {
        flex-direction: row-reverse;
      }

      .outgoing .chat__bubble___text {
        display: flex;
        justify-content: end;
        /* margin-right: 20px; */
      }

      .chat__bubble .chat__bubble___text {
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-all;

        margin-left:${'horizontal' === bubbleAlignment ? '0.5rem' : '0'};
        border-radius: 0.5rem;
        padding: 0.5rem;
        font-size: 0.875rem;
        color: #4b5563;
        background-color: #ffffff;
        border: ${'true' === bubbleBorder ? '1px solid #e5e7eb;' : 'none;'}
        box-shadow: ${'inner' === bubbleBoxShadow ? 'inset gray 0px 0px 20px -14px;' : 'outer' === bubbleBoxShadow && '0 1px 2px rgba(0, 0, 0, 0.1);'}
      }

      /* .chatbot .outgoing {
        margin: 20px 0;
        justify-content: flex-end;
      } */

      .chatbot .chat-input {
        display: flex;
        align-items: center; /* items-center */
        justify-content: space-between; /* justify-between */
        gap: 0.5rem; /* gap-2 */
        background-color: #ffffff; /* bg-white */
        padding-left: 1.25rem; /* px-5 */
        padding-right: 1.25rem; /* px-5 */
      }
      /* .chatbot .chat-input {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        gap: 5px;
        background: #fff;
        border-top: 1px solid #ccc;
      } */

      .chat-input input {
        width: 100%; /* w-full */
        border-radius: 0.5rem; /* rounded-lg */
        background-color: #ffffff; /* bg-white */
        padding: 0.5rem; /* p-2 */
        color: #4b5563; /* text-gray-600 */
        outline: none;
        border: none;
        height: 40px;
        font-size: 16px;
      }

      .chat-input input::placeholder {
        color: #4b5563;
        opacity: 50%;
      }

      /*.chat-input svg {
        align-self: flex-end;
        cursor: pointer;
        height: 30px;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        font-size: 1.35rem;
      } */

      @media (max-width: 490px) {
        .chatbot {
          right: 0;
          bottom: 0;
          height: 100%;
          border-radius: 0;
          width: 100%;
        }
        .chatbot .chatbox {
          height: 90%;
        }
      }

      .loading__message {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        margin-left: 1.25rem;
        border-radius: 0.75rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        overflow-wrap: break-word;
        background: transparent;
        max-width: 80%;
      }

      .chat__title_p {
        max-width: 95%;
        margin-top: 10px;
      }

      #card {
        color: #dfcaca;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #card_body {
        background: #eeeded;
        border-radius: 10px;
        height: auto;
        width: 250px;
        overflow: hidden;
      }

      #card_img {
        min-height: 120px;
        height: 135px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #b8b4b4;
        margin: 10px 10px 0px 10px;
        border-radius: 10px 10px 0px 0px;
        overflow: hidden;
      }

      #product_img {
        max-width: auto;
        max-height: 100%;
      }

      #card_text {
        color: black;
        margin: 0px 10px 10px 10px;
        background: #ffffff;
        padding-left: 10px;
        padding-right: 10px;
        overflow: hidden;
        height: auto;
        border-radius: 0px 0px 10px 10px;
      }

      a {
        color: #724ae8;
        text-decoration: none;
      }

      a:hover {
        color: #724ae8;
        text-decoration: underline;
      }

      .loader {
        width: 50px;
        aspect-ratio: 2;
        --_g: no-repeat radial-gradient(circle closest-side, #6366f1 90%, #0000);
        background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
        background-size: calc(100% / 3) 50%;
        animation: l3 1s infinite linear;
      }
      @keyframes l3 {
        20% {
          background-position: 0% 0%, 50% 50%, 100% 50%;
        }
        40% {
          background-position: 0% 100%, 50% 0%, 100% 50%;
        }
        60% {
          background-position: 0% 50%, 50% 100%, 100% 0%;
        }
        80% {
          background-position: 0% 50%, 50% 50%, 100% 100%;
        }
      }
`),
  document.head.appendChild(style);
let qustions = '';
async function getChatbotById(e) {
  try {
    let t = await fetch(`https://chatbot-server.sense-23.com/api/chatbot/${e}`),
      _ = await t.json(),
      $ = '';
    _ &&
      _?.sample_qustion?.map((e) => {
        $ += `<button
        onclick="handleChatResponse(document.querySelector('.chat-input input').value = '${e.text}')"
        style="width: 100%; margin-bottom: 5px; background: transparent; border-radius: 5px; border: 1px solid hsl(214.3 31.8% 91.4%); padding-top: 5px; padding-bottom: 5px; cursor: pointer;">${e.text}</button>`;
      }),
      (document.getElementById('chatbot__sample_qustion').innerHTML = $);
  } catch (r) {
    console.error(r);
  }
}
getChatbotById(chatbot_id);
let session_id = null;
const chatInput = document.querySelector('.chat-input input'),
  sendChatBtn = document.getElementById('send-btn'),
  chatbox = document.querySelector('#chatbot__conversation'),
  chatbotToggle = document.querySelector('.chatbot-toggler');
let userMessage;
const createChatLi = (e, t) => {
    let _ = document.createElement('div');
    if ((_.classList.add('chat__bubble', t), 'outgoing' === t)) {
      _.classList.add('outgoing');
      let $ = `<div class="outgoing chat__bubble">
            <div class="chat__bubble___header">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="chatbot__user__name">Jacob Jones</span>
              <span></span>
            </div>
            <div style="display: flex; justify-content: end">
              <p class="chat__bubble___text">
                <span
                  >${e}</span
                >
              </p>
            </div>
            
          </div>`;
      (_.innerHTML = $),
        null == session_id && (session_id = crypto.randomUUID());
    } else {
      let r = `<div class="incoming chat__bubble">
            <div class="chat__bubble___header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                ></path>
              </svg>
              <span class="chatbot__user__name">Bot</span>
              <span></span>
            </div>
            <div style="display: flex; justify-content: start">
            <div class="chat__bubble___text">
              <p >
                <span>
                  </span>
              </p>
              <div class="loader"></div>
              <div class='chatbot__feedback'></div>
              </div>
              
            </div>
          </div>`;
      (_.innerHTML = r), _.classList.add('generating_message');
    }
    return _;
  },
  generateResponse = async (e) => {
    let t = {
        question: userMessage,
        chatbot_id: chatbot_id,
        token: chatbot_id,
        user_id: user_id,
      },
      _ = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(t),
      },
      $ = await fetch('http://localhost:8000/api/chatbot/chat', _),
      r = $.headers.get('Content-Type');
    if (r && r.includes('application/json')) {
      let o = await $.json();
      e(o);
    } else {
      let a = $.body.getReader(),
        i = new TextDecoder(),
        n = '';
      for (;;) {
        let { value: l, done: d } = await a.read();
        if (d) break;
        e(
          (n += i
            .decode(l, { stream: !0 })
            .trim()
            .replace(/data: /g, '')
            .replace(/"/g, '')
            .replace(/^"/, '')
            .replace(/"$/, '')
            .replace(/\\u/g, '')),
        );
      }
    }
  },
  handleJsonResponse = (e) => {
    let t = document.createElement('div');
    t.classList.add('card'),
      (t.innerHTML = `
  <div style="display: flex;">
  <svg width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8C15.1046 8 16 8.89543 16 10V14C16 15.1046 15.1046 16 14 16H10C8.89543 16 8 15.1046 8 14V10C8 8.89543 8.89543 8 10 8H14ZM13 10C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11C10 10.4477 10.4477 10 11 10H13Z" fill="#0F0F0F"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11 2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2V4H15V2C15 1.44772 15.4477 1 16 1C16.5523 1 17 1.44772 17 2V4C18.6569 4 20 5.34315 20 7H22C22.5523 7 23 7.44771 23 8C23 8.55229 22.5523 9 22 9H20V11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H20V15H22C22.5523 15 23 15.4477 23 16C23 16.5523 22.5523 17 22 17H20C20 18.6569 18.6569 20 17 20V22C17 22.5523 16.5523 23 16 23C15.4477 23 15 22.5523 15 22V20H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V20H9V22C9 22.5523 8.55229 23 8 23C7.44771 23 7 22.5523 7 22V20C5.34315 20 4 18.6569 4 17H2C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15H4V13H2C1.44772 13 1 12.5523 1 12C1 11.4477 1.44772 11 2 11H4V9H2C1.44772 9 1 8.55229 1 8C1 7.44771 1.44772 7 2 7H4C4 5.34315 5.34315 4 7 4V2C7 1.44772 7.44771 1 8 1C8.55229 1 9 1.44772 9 2V4H11V2ZM17 6C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18H7C6.44771 18 6 17.5523 6 17V7C6 6.44771 6.44772 6 7 6H17Z" fill="#5F5A5A"/>
</svg>
    <div>
    ${e?.map(
      (e) => `<div id="card">
      <div id="card_body">
        <div id="card_img">
          <img id="product_img" src="${e.image_url}" alt="image" />
        </div>
        <div id="card_text">
          <div>
            <b><a href="${e.url}">${e.name}</a></b><br>
            ${e.code}
          </div>
          <div style="margin-top: 10px">
            ${e.description}
          </div>
        </div>
      </div>
    </div>`,
    )}
    
  `);
    var _ = document.querySelector('.generating_message:last-child');
    (_.style.display = 'none'), _.parentNode.removeChild(_);
    let $ = document.createElement('div');
    $.classList.add('chat', 'incoming'),
      $.appendChild(t),
      null == session_id && (session_id = crypto.randomUUID()),
      chatbox.appendChild($),
      chatbox.scrollTo(0, chatbox.scrollHeight);
  },
  handleChatResponse = (e) => {
    if (!(userMessage = e)) return;
    let t = document.getElementById('chatbot__welcome_animation');
    t && (t.style.display = 'none'),
      chatbox.appendChild(createChatLi(e, 'outgoing')),
      (chatInput.value = '');
    let _ = createChatLi('', 'incoming');
    function $(e) {
      return /^\[.*\]$/.test(e);
    }
    _.cloneNode(!0),
      chatbox.appendChild(_),
      chatbox.scrollTo(0, chatbox.scrollHeight);
    let r = (e) => {
      let t =
        /(?:https?|ftp):\/\/[\n\S]+|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      return e.replace(t, (e) =>
        e.includes('@')
          ? `<a href="mailto:${e}">${e}</a>`
          : `<a href="${e}" target="_blank">${e}</a>`,
      );
    };
    return (
      generateResponse((e) => {
        (chatLiLoader = chatbox.querySelector('.loader')) &&
          chatLiLoader.classList.remove('loader'),
          $(e)
            ? handleJsonResponse((e = JSON.parse(e)))
            : ((e = e.replace(/\\n/g, '<br>')),
              (_.querySelector('p').innerHTML = r(
                e.replace(/\n/g, '').replace(/\n\n/g, ''),
              )),
              isFeedbackActive &&
                (_.querySelector('.chatbot__feedback').innerHTML =
                  `<div style="margin-top: 12px; display: flex; gap: 4px;">
            <svg style="height: 16px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path>
            </svg>
            <svg style="height: 16px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" transform="rotate(180)">
                <path fill="currentColor" fill-rule="evenodd" d="M11.873 21.496a1 1 0 0 1-.992.496l-.454-.056A4 4 0 0 1 7.1 16.79L7.65 15h-.718c-2.637 0-4.553-2.508-3.859-5.052l1.364-5A4 4 0 0 1 8.296 2h9.709a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-2c-.26 0-.5.14-.628.364zM14.005 4h-5.71a2 2 0 0 0-1.929 1.474l-1.363 5A2 2 0 0 0 6.933 13h2.072a1 1 0 0 1 .955 1.294l-.949 3.084a2 2 0 0 0 1.462 2.537l3.167-5.543a2.72 2.72 0 0 1 1.364-1.182V5a1 1 0 0 0-1-1m3 9V5c0-.35-.06-.687-.171-1h1.17a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1z" clip-rule="evenodd"></path>
            </svg>

            <svg style="height: 16px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M11.873 21.496a1 1 0 0 1-.992.496l-.454-.056A4 4 0 0 1 7.1 16.79L7.65 15h-.718c-2.637 0-4.553-2.508-3.859-5.052l1.364-5A4 4 0 0 1 8.296 2h9.709a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-2c-.26 0-.5.14-.628.364zM14.005 4h-5.71a2 2 0 0 0-1.929 1.474l-1.363 5A2 2 0 0 0 6.933 13h2.072a1 1 0 0 1 .955 1.294l-.949 3.084a2 2 0 0 0 1.462 2.537l3.167-5.543a2.72 2.72 0 0 1 1.364-1.182V5a1 1 0 0 0-1-1m3 9V5c0-.35-.06-.687-.171-1h1.17a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1z" clip-rule="evenodd"></path>
            </svg>
        </div>`),
              chatbox.scrollTo(0, chatbox.scrollHeight));
      }),
      !1
    );
  },
  handleChat = async (e) => {
    e.preventDefault(), handleChatResponse(chatInput.value.trim());
  };
sendChatBtn.addEventListener('click', handleChat),
  chatInput.addEventListener('keydown', function (e) {
    if ('Enter' === e.key) {
      e.preventDefault();
      var t = new MouseEvent('click', {
        bubbles: !0,
        cancelable: !0,
        view: window,
      });
      sendChatBtn.dispatchEvent(t);
    }
  }),
  chatbotToggle.addEventListener('click', () => {
    if (
      (document.querySelector('.chatbox'),
      document.body.classList.contains('show-chatbot'))
    ) {
      (session_id = null),
        (document.getElementById('chatbot__conversation').innerHTML = ''),
        document.body.classList.remove('show-chatbot');
      let e = document.getElementById('chatbot__welcome_animation');
      e && (e.style.display = 'none');
    } else {
      document.body.classList.add('show-chatbot'), getChatbotById(chatbot_id);
      let t = document.getElementById('chatbot__welcome_animation');
      t && (t.style.display = 'block');
    }
  });
