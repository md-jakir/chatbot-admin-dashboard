import React from 'react';

interface Props {
  inco: React.ReactNode;
  indicator?: number;
}

function ActionItem({ inco, indicator }: Props) {
  return (
    <button className="relative flex items-center gap-2">
      <div className="  flex items-center justify-center">{inco}</div>

      {indicator ? (
        <div className=" absolute right-0 top-0 flex h-3 w-3 flex-col items-center justify-center gap-2 rounded-full bg-yellow ">
          <p className="text-[8px] text-dark">{indicator}</p>
        </div>
      ) : null}
    </button>
  );
}



export default ActionItem;
