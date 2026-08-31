import { useState } from 'react';

export const useMentorship = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
