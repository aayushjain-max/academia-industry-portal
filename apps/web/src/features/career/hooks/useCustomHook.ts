import { useState } from 'react';

export const useCareer = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
