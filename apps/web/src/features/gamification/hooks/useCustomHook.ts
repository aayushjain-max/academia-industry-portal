import { useState } from 'react';

export const useGamification = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
