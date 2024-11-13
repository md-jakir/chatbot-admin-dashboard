import React, { useEffect, useState } from 'react';
import Search from './ui/search';

export default function SearchRecord({
  setSearch,
}: {
  setSearch: (_search: string) => void;
}) {
  const [text, setText] = useState('');

  useEffect(() => {
    const intervel = setTimeout(() => {
      setSearch(text);
    }, 1000);
    return () => {
      clearTimeout(intervel);
    };
  }, [text]);

  return (
    <Search
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        setText(e.target.value);
      }}
    />
  );
}
