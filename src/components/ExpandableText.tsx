import { useState } from 'react';

function ExpandableText({ text, limit }: { text: string; limit: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {isExpanded ? text : `${text.substring(0, limit)}...`}
      <button
        style={{ color: 'blue', cursor: 'pointer' }}
        onClick={handleToggle}
      >
        {' '}
        {isExpanded ? ' Show less' : ' Read more'}
      </button>
    </div>
  );
}

export default ExpandableText;
