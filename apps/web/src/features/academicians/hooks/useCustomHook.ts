import { useState } from 'react';

export const useAcademicians = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
