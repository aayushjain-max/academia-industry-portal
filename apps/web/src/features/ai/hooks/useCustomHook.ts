import { useState } from 'react';

export const useAi = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
