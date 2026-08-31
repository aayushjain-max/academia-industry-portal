import { useState } from 'react';

export const useSearch = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
