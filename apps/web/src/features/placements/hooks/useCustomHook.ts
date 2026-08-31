import { useState } from 'react';

export const usePlacements = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
