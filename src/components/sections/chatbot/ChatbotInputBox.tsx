import { cn } from '@/lib/utils';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';

function ChatbotInputBox({ handleSubmit, input, setInput, disabled }: any) {
  return (
    <form action="#" className="relative" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex gap-2 overflow-hidden shadow-sm ">
        {/* <button
					type="button"
					className="px-3 inline-flex items-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
				>
					<PaperClipIcon
						className="h-5 w-5 group-hover:text-gray-500"
						aria-hidden="true"
					/>
				</button> */}
        <SparklesIcon
          className="absolute left-3 top-3 h-5 w-5 text-slate-700/80 group-hover:text-slate-800/80 dark:text-slate-200/80"
          aria-hidden="true"
        />
        {/* <label htmlFor="message" className="sr-only">
            Send a message
          </label> */}
        <input
          type="text"
          name="message"
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-md block w-full rounded-lg border border-2 border-slate-200/80 pb-2.5 pl-10 pr-20 pt-2.5 placeholder:bg-transparent placeholder:text-gray-500"
          placeholder="Send a message"
        />
        <button
          type="submit"
          disabled={disabled}
          className={cn(
            input?.trim().length === 0
              ? 'absolute right-1 top-1 inline-flex cursor-not-allowed items-center rounded-md px-2 py-2 text-sm font-semibold text-slate-700/80 shadow-sm  dark:text-slate-200/80'
              : 'absolute right-1 top-1 inline-flex items-center rounded-md px-2 py-2 text-sm font-semibold text-slate-700/80  shadow-sm hover:text-slate-800/80 dark:text-slate-200/80  ',
          )}
        >
          <PaperAirplaneIcon
            className="h-5 w-5 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  );
}

export default ChatbotInputBox;
