import { useState } from 'react';

export const useLearning = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
